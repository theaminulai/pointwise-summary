<?php
/**
 * Prompt builder utilities for Pointwise Summary.
 *
 * @package PointwiseSummary
 */

namespace PointwiseSummary\Frontend;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class PromptBuilder {
	/**
	 * Builds the final AI prompt for a given post.
	 *
	 * Assembles the prompt in four ordered steps:
	 *  1. Injects post data into the user-defined template via {placeholders}.
	 *  2. Appends a summary length hint (always present).
	 *  3. Appends optional heading structure (if enabled in settings).
	 *  4. Appends optional post metadata (if enabled in settings).
	 *  5. Closes with a format-lock instruction.
	 *
	 * @since  1.0.0
	 *
	 * @param  string $template    The prompt template entered by the user.
	 *                             Supports {title}, {url}, {content}, {site_name}.
	 * @param  int    $post_id     The WordPress post ID to summarize.
	 * @param  array  $ai_settings {
	 *     AI settings from the plugin options.
	 *     @type string $summaryLength    Summary length key. Accepts 'short', 'medium', 'detailed'.
	 *     @type bool   $includeHeadings  Whether to extract and append H1–H6 headings.
	 *     @type bool   $includeMetadata  Whether to append author, publish date, and excerpt.
	 * }
	 *
	 * @return string The fully assembled prompt string ready to send to the AI platform.
	 */
	public static function build_prompt( $template, $post_id, $ai_settings ) {
		$post_data = self::get_post_data( $post_id );
		$content   = self::normalize_content( $post_data['content'] );

		$used_fields      = self::detect_placeholders( $template );
		$user_prompt      = self::build_user_prompt( $template );
		$context_block    = self::build_context_block( $used_fields, $post_data, $content );
		$enrichment_block = self::build_enrichment_block( $ai_settings, $post_id, $content );
		$closing_block    = self::build_closing_block();

		$final_prompt = $user_prompt . $context_block . $enrichment_block . $closing_block;
		$final_prompt = self::cleanup_prompt( $final_prompt );

		return trim( $final_prompt );
	}

	/**
	 * Get basic post data for prompt building.
	 *
	 * @param int $post_id Post ID.
	 * @return array
	 */
	private static function get_post_data( $post_id ) {
		return array(
			'title'     => get_the_title( $post_id ),
			'url'       => get_permalink( $post_id ),
			'site_name' => get_bloginfo( 'name' ),
			'content'   => get_post_field( 'post_content', $post_id ),
		);
	}

	/**
	 * Normalize content spacing and length.
	 *
	 * @param string $content Raw content.
	 * @return string
	 */
	private static function normalize_content( $content ) {
		$content = wp_strip_all_tags( strip_shortcodes( $content ) );
		$content = preg_replace( '/\s+/', ' ', $content );
		$content = trim( $content );
		return wp_trim_words( $content, 50, '...' );
	}

	/**
	 * Detect placeholders used in the template.
	 *
	 * @param string $template Template.
	 * @return array
	 */
	private static function detect_placeholders( $template ) {
		$fields       = array();
		$placeholders = array( 'title', 'url', 'site_name', 'content' );

		foreach ( $placeholders as $placeholder ) {
			if ( strpos( $template, '{' . $placeholder . '}' ) !== false ) {
				$fields[] = $placeholder;
			}
		}

		return $fields;
	}

	/**
	 * Build the user prompt without placeholders.
	 *
	 * @param string $template Template.
	 * @return string
	 */
	private static function build_user_prompt( $template ) {
		$user_prompt = preg_replace( '/\{(title|url|site_name|content)\}/', '', $template );
		$user_prompt = preg_replace( '/\s+/', ' ', $user_prompt );
		return trim( $user_prompt );
	}

	/**
	 * Build the post context block.
	 *
	 * @param array  $used_fields Placeholder list.
	 * @param array  $post_data Post data.
	 * @param string $content Normalized content.
	 * @return string
	 */
	private static function build_context_block( $used_fields, $post_data, $content ) {
		$context_lines = array();

		if ( in_array( 'title', $used_fields, true ) && ! empty( $post_data['title'] ) ) {
			$context_lines[] = ' Title: ' . trim( $post_data['title'] );
		}

		if ( in_array( 'url', $used_fields, true ) && ! empty( $post_data['url'] ) ) {
			$context_lines[] = ' URL: ' . trim( $post_data['url'] );
		}

		if ( in_array( 'site_name', $used_fields, true ) && ! empty( $post_data['site_name'] ) ) {
			$context_lines[] = ' Site: ' . trim( $post_data['site_name'] );
		}

		if ( in_array( 'content', $used_fields, true ) && ! empty( $content ) ) {
			$context_lines[] = " Content: \n" . trim( $content );
		}

		if ( empty( $context_lines ) ) {
			return '';
		}

		return "\n ## POST CONTEXT: \n" . implode( "\n\n", $context_lines );
	}

	/**
	 * Build enrichment block from settings.
	 *
	 * @param array  $ai_settings Settings.
	 * @param int    $post_id Post ID.
	 * @param string $content Normalized content.
	 * @return string
	 */
	private static function build_enrichment_block( $ai_settings, $post_id, $content ) {
		$enrichments   = array();
		$length_labels = array(
			'short'    => 'Short (2-3 key points, 150-250 words)',
			'medium'   => 'Medium (4-6 key points, 250-350 words)',
			'detailed' => 'Detailed (5-8 key points, 350-500 words)',
			'large'    => 'Large (8-12 key points, 500-800 words)',
			'extra'    => 'Extra Large (12+ key points, 800+ words)',
		);

		$length        = $ai_settings['summaryLength'] ?? 'medium';
		$enrichments[] = ' Summary length: ' . ( $length_labels[ $length ] ?? $length_labels['medium'] );

		if ( ! empty( $ai_settings['includeHeadings'] ) ) {
			$headings = array_slice( (array) self::extract_headings( $post_id ), 0, 5 );
			if ( ! empty( $headings ) ) {
				$enrichments[] = ' Article headings: ' . implode( ' > ', $headings );
			}
		}

		if ( ! empty( $ai_settings['includeMetadata'] ) ) {
			$author      = get_the_author_meta( 'display_name', (int) get_post_field( 'post_author', $post_id ) );
			$date        = get_the_date( '', $post_id );
			$raw_excerpt = get_post_field( 'post_excerpt', $post_id );
			$excerpt     = '';

			if ( ! empty( $raw_excerpt ) ) {
				$excerpt = wp_strip_all_tags( $raw_excerpt );
			} elseif ( ! empty( $content ) ) {
				$excerpt = wp_trim_words( $content, 30, '...' );
			}

			$enrichments[] = " Author: {$author}. Published: {$date}.";
			if ( ! empty( $excerpt ) ) {
				$enrichments[] = 'Excerpt: ' . $excerpt;
			}
		}

		if ( empty( $enrichments ) ) {
			return '';
		}

		return "\n ## ADDITIONAL CONTEXT:\n" . implode( "\n", $enrichments );
	}

	/**
	 * Build the closing instruction block.
	 *
	 * @return string
	 */
	private static function build_closing_block() {
		return "\n ## CLOSING INSTRUCTIONS:\n" . "Respond strictly in the format described above.\n Do not add explanations outside the format.";
	}

	/**
	 * Cleanup prompt spacing.
	 *
	 * @param string $prompt Prompt string.
	 * @return string
	 */
	private static function cleanup_prompt( $prompt ) {
		$prompt = preg_replace( '/\n{3,}/', "\n\n", $prompt );
		$prompt = preg_replace( '/\s+:/', ':', $prompt );
		return $prompt;
	}

	/**
	 * Extract headings from post content.
	 *
	 * @param int $post_id Post ID.
	 * @return array
	 */
	public static function extract_headings( $post_id ) {
		$content = get_post_field( 'post_content', $post_id );
		if ( empty( $content ) ) {
			return array();
		}

		$matches = array();
		preg_match_all( '/<h[1-6][^>]*>(.*?)<\/h[1-6]>/i', $content, $matches );
		if ( empty( $matches[1] ) ) {
			return array();
		}

		return array_values(
			array_filter(
				array_map(
					static function ( $heading ) {
						return trim( wp_strip_all_tags( $heading ) );
					},
					$matches[1]
				)
			)
		);
	}
}
