<?php
/**
 * Frontend button rendering for Pointwise Summary.
 *
 * @package PointwiseSummary
 */

namespace PointwiseSummary\Frontend;

use PointwiseSummary\Helpers\SingletonTrait;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class ButtonRenderer {
	use SingletonTrait;

	/**
	 * Render combined AI + social buttons.
	 *
	 * @param int    $post_id Post ID.
	 * @param string $context Render context (inline|floating).
	 * @return string
	 */
	public function render_buttons( $post_id, $context = 'inline' ) {
		$frontend           = \Pointwise_Summary_Frontend::get_instance();
		$ai_settings        = $frontend->get_ai_settings();
		$social_settings    = $frontend->get_social_settings();
		$display_settings   = $frontend->get_display_settings();
		$advanced_settings  = $frontend->get_advanced_settings();
		$display_mode       = $display_settings['mode']['displayMode'] ?? 'inline';
		$cache_enabled      = ! empty( $advanced_settings['performance']['enableCache'] );
		$cache_expiry_hours = isset( $advanced_settings['performance']['cacheExpiry'] ) ? absint( $advanced_settings['performance']['cacheExpiry'] ) : 24;

		$cache_key = '';
		if ( $cache_enabled ) {
			$cache_key     = $this->get_cache_key( $post_id, $context, $ai_settings, $social_settings, $display_settings, $advanced_settings );
			$cached_output = get_transient( $cache_key );
			if ( false !== $cached_output && is_string( $cached_output ) ) {
				return $cached_output;
			}
		}

		$ai_buttons     = $this->build_ai_buttons( $post_id, $ai_settings, $display_settings, $advanced_settings, $context, $display_mode );
		$social_buttons = $this->build_social_buttons( $post_id, $social_settings, $display_settings, $advanced_settings );

		if ( empty( $ai_buttons ) && empty( $social_buttons ) ) {
			return '';
		}

		$order  = $social_settings['buttonOrder'] ?? 'social-first';
		$pieces = array();

		if ( 'mixed' === $order ) {
			$pieces = $this->interleave_arrays( $social_buttons, $ai_buttons );
		} elseif ( 'ai-first' === $order ) {
			$pieces = array_merge( $ai_buttons, $social_buttons );
		} else {
			$pieces = array_merge( $social_buttons, $ai_buttons );
		}

		$classes             = $this->get_container_classes( $display_settings, $advanced_settings, $context );
		$dir                 = ! empty( $advanced_settings['accessibility']['enableRTL'] ) ? 'rtl' : 'ltr';
		$accessibility_attrs = '';
		if ( ! empty( $advanced_settings['accessibility']['enableAccessibility'] ) ) {
			$accessibility_attrs = ' role="group" aria-label="' . esc_attr__( 'Summary actions', 'pointwise-summary' ) . '"';
		}

		$output = sprintf(
			'<div class="%s" data-context="%s" dir="%s"%s>%s</div>',
			esc_attr( implode( ' ', $classes ) ),
			esc_attr( $context ),
			esc_attr( $dir ),
			$accessibility_attrs,
			implode( '', $pieces )
		);

		if ( $cache_enabled && ! empty( $cache_key ) ) {
			set_transient( $cache_key, $output, max( 1, $cache_expiry_hours ) * HOUR_IN_SECONDS );
		}

		return $output;
	}

	/**
	 * Build AI buttons.
	 *
	 * @param int   $post_id Post ID.
	 * @param array $ai_settings AI settings.
	 * @param array $display_settings Display settings.
	 * @param array $advanced_settings Advanced settings.
	 * @return array
	 */
	private function build_ai_buttons( $post_id, $ai_settings, $display_settings, $advanced_settings, $context = 'inline', $display_mode = 'inline' ) {
		$frontend          = \Pointwise_Summary_Frontend::get_instance();
		$enabled_platforms = $frontend->get_enabled_ai_platforms( $ai_settings );
		if ( empty( $enabled_platforms ) || empty( $ai_settings['enableAiSummary'] ) ) {
			return array();
		}

		$global_prompt = $ai_settings['globalPrompt'] ?? '';

		$button_style       = $display_settings['style']['buttonStyle'] ?? 'brand';
		$icon_display       = $display_settings['style']['iconDisplay'] ?? 'icons-text';
		$button_shape       = $display_settings['style']['buttonShape'] ?? 'rounded';
		$button_alignment   = $display_settings['position']['buttonAlignment'] ?? 'left';
		$toggle_button_text = $frontend->get_translated_button_text( $advanced_settings, __( 'Ask AI', 'pointwise-summary' ) );
		$rel                = $this->get_rel_attr( $advanced_settings );
		$element_type       = $this->get_element_type( $advanced_settings );

		$buttons = array();
		foreach ( $enabled_platforms as $platform ) {
			$platform_id     = $platform['id'] ?? '';
			$platform_name   = $platform['name'] ?? ucfirst( (string) $platform_id );
			$platform_prompt = isset( $platform['prompt'] ) ? trim( (string) $platform['prompt'] ) : '';
			$prompt_template = $platform_prompt ?: trim( $global_prompt );

			if ( empty( $platform_id ) || empty( $prompt_template ) ) {
				continue;
			}

			$prompt = PromptBuilder::build_prompt( $prompt_template, $post_id, $ai_settings );
			$url    = $this->get_ai_url( $platform_id, $prompt );
			if ( empty( $url ) ) {
				continue;
			}

			$icon    = $this->render_icon( $platform_id, $icon_display );
			$label   = $this->render_label( $platform_name, $icon_display );
			$classes = array(
				'pointwise-summary-button',
				'pointwise-summary-ai-button',
				'pointwise-summary-platform-' . sanitize_html_class( $platform_id ),
				'pointwise-summary-style-' . sanitize_html_class( $button_style ),
				'pointwise-summary-shape-' . sanitize_html_class( $button_shape ),
			);

			$aria_label = sprintf(
				/* translators: %s: AI platform name. */
				__( 'Summarize with %s', 'pointwise-summary' ),
				$platform_name
			);

			if ( 'button' === $element_type ) {
				$buttons[] = sprintf(
					'<button type="button" class="%s" data-url="%s" data-platform="%s" aria-label="%s">%s%s</button>',
					esc_attr( implode( ' ', $classes ) ),
					esc_url( $url ),
					esc_attr( $platform_id ),
					esc_attr( $aria_label ),
					$icon,
					$label
				);
			} else {
				$buttons[] = sprintf(
					'<a class="%s" href="%s" data-platform="%s" target="_blank" rel="%s" aria-label="%s">%s%s</a>',
					esc_attr( implode( ' ', $classes ) ),
					esc_url( $url ),
					esc_attr( $platform_id ),
					esc_attr( $rel ),
					esc_attr( $aria_label ),
					$icon,
					$label
				);
			}
		}

		if ( 'collapse' === $display_mode && 'inline' === $context && ! empty( $buttons ) ) {
			$toggle_classes = array(
				'pointwise-summary-button',
				'pointwise-summary-ai-button',
				'pointwise-summary-ai-collapse-toggle',
				'pointwise-summary-style-' . sanitize_html_class( $button_style ),
				'pointwise-summary-shape-' . sanitize_html_class( $button_shape ),
			);

			$toggle_icon  = $this->render_icon( 'ask-ai', $icon_display );
			$toggle_label = $this->render_label( $toggle_button_text, $icon_display );

			$toggle_button = sprintf(
				'<button type="button" class="%s" aria-expanded="false" aria-controls="pointwise-summary-collapse-panel-%d">%s%s</button>',
				esc_attr( implode( ' ', $toggle_classes ) ),
				absint( $post_id ),
				$toggle_icon,
				$toggle_label
			);

			$panel = sprintf(
				'<div id="pointwise-summary-collapse-panel-%d" class="pointwise-summary-collapse-panel" hidden>%s</div>',
				absint( $post_id ),
				implode( '', $buttons )
			);

			return array(
				sprintf(
					'<div class="pointwise-summary-collapse pointwise-summary-collapse-align-%s">%s%s</div>',
					esc_attr( sanitize_html_class( $button_alignment ) ),
					$toggle_button,
					$panel
				),
			);
		}

		return $buttons;
	}

	/**
	 * Interleave two arrays, preserving relative order in each.
	 *
	 * @param array $first First sequence.
	 * @param array $second Second sequence.
	 * @return array
	 */
	private function interleave_arrays( $first, $second ) {
		$result = array();
		$max    = max( count( $first ), count( $second ) );

		for ( $i = 0; $i < $max; $i++ ) {
			if ( isset( $first[ $i ] ) ) {
				$result[] = $first[ $i ];
			}
			if ( isset( $second[ $i ] ) ) {
				$result[] = $second[ $i ];
			}
		}

		return $result;
	}

	/**
	 * Build social buttons.
	 *
	 * @param int   $post_id Post ID.
	 * @param array $social_settings Social settings.
	 * @param array $display_settings Display settings.
	 * @param array $advanced_settings Advanced settings.
	 * @return array
	 */
	private function build_social_buttons( $post_id, $social_settings, $display_settings, $advanced_settings ) {
		$frontend         = \Pointwise_Summary_Frontend::get_instance();
		$enabled_networks = $frontend->get_enabled_social_networks( $social_settings );
		if ( empty( $enabled_networks ) || empty( $social_settings['enableSocialSharing'] ) ) {
			return array();
		}

		$url          = get_permalink( $post_id );
		$title        = get_the_title( $post_id );
		$rel          = $this->get_rel_attr( $advanced_settings );
		$element_type = $this->get_element_type( $advanced_settings );
		$icon_display = $display_settings['style']['iconDisplay'] ?? 'icons-text';
		$button_style = $display_settings['style']['buttonStyle'] ?? 'brand';
		$button_shape = $display_settings['style']['buttonShape'] ?? 'rounded';

		$buttons = array();
		foreach ( $enabled_networks as $network ) {
			$network_id   = $network['id'] ?? '';
			$network_name = $network['name'] ?? ucfirst( (string) $network_id );
			$share_url    = $this->get_social_url( $network_id, $url, $title, $network );
			if ( empty( $network_id ) || empty( $share_url ) ) {
				continue;
			}

			$icon    = $this->render_icon( $network_id, $icon_display );
			$label   = $this->render_label( $network_name, $icon_display );
			$classes = array(
				'pointwise-summary-button',
				'pointwise-summary-social-button',
				'pointwise-summary-network-' . sanitize_html_class( $network_id ),
				'pointwise-summary-style-' . sanitize_html_class( $button_style ),
				'pointwise-summary-shape-' . sanitize_html_class( $button_shape ),
			);

			$aria_label = sprintf(
				/* translators: %s: social network name. */
				__( 'Share on %s', 'pointwise-summary' ),
				$network_name
			);

			if ( 'button' === $element_type ) {
				$buttons[] = sprintf(
					'<button type="button" class="%s" data-url="%s" data-platform="%s" aria-label="%s">%s%s</button>',
					esc_attr( implode( ' ', $classes ) ),
					esc_url( $share_url ),
					esc_attr( $network_id ),
					esc_attr( $aria_label ),
					$icon,
					$label
				);
			} else {
				$buttons[] = sprintf(
					'<a class="%s" href="%s" data-platform="%s" target="_blank" rel="%s" aria-label="%s">%s%s</a>',
					esc_attr( implode( ' ', $classes ) ),
					esc_url( $share_url ),
					esc_attr( $network_id ),
					esc_attr( $rel ),
					esc_attr( $aria_label ),
					$icon,
					$label
				);
			}
		}

		return $buttons;
	}

	/**
	 * Render icon placeholder.
	 *
	 * @param string $id Platform/network ID.
	 * @param string $icon_display Icon display mode.
	 * @return string
	 */
	public function render_icon( $id, $icon_display ) {
		if ( 'text-only' === $icon_display ) {
			return '';
		}

		return IconLibrary::get_instance()->render_icon( $id );
	}

	/**
	 * Render label based on icon mode.
	 *
	 * @param string $label Label text.
	 * @param string $icon_display Icon display mode.
	 * @return string
	 */
	public function render_label( $label, $icon_display ) {
		if ( 'icons-only' === $icon_display ) {
			return '';
		}

		return sprintf( '<span class="pointwise-summary-label">%s</span>', esc_html( $label ) );
	}

	/**
	 * Build AI model URL.
	 *
	 * @param string $platform_id Platform ID.
	 * @param string $prompt Prompt text.
	 * @return string
	 */
	private function get_ai_url( $platform_id, $prompt ) {
		$encoded = rawurlencode( $prompt );

		$map = array(
			'chatgpt'    => 'https://chatgpt.com/?q=' . $encoded,
			'gemini'     => 'https://gemini.google.com/app?prompt=' . $encoded,
			'claude'     => 'https://claude.ai/new?q=' . $encoded,
			'perplexity' => 'https://www.perplexity.ai/?q=' . $encoded,
			'grok'       => 'https://grok.com/?q=' . $encoded,
			'google-ai'  => 'https://www.google.com/search?udm=50&aep=11&q=' . $encoded,
		);

		return $map[ $platform_id ] ?? '';
	}

	/**
	 * Build social share URL.
	 *
	 * @param string $network_id Network ID.
	 * @param string $url Post URL.
	 * @param string $title Post title.
	 * @param array  $network Network settings.
	 * @return string
	 */
	private function get_social_url( $network_id, $url, $title, $network ) {
		$encoded_url   = rawurlencode( $url );
		$encoded_title = rawurlencode( $title );

		switch ( $network_id ) {
			case 'twitter':
				$mention = '';
				if ( ! empty( $network['mentionOption'] ) && ! empty( $network['mention'] ) ) {
					$mention = ' ' . rawurlencode( $network['mention'] );
				}
				return "https://twitter.com/intent/tweet?text={$encoded_title}{$mention}&url={$encoded_url}";
			case 'facebook':
				return "https://www.facebook.com/sharer/sharer.php?u={$encoded_url}";
			case 'linkedin':
				return "https://www.linkedin.com/sharing/share-offsite/?url={$encoded_url}";
			case 'telegram':
				return "https://t.me/share/url?url={$encoded_url}&text={$encoded_title}";
			case 'whatsapp':
				return "https://api.whatsapp.com/send?text={$encoded_title}%20{$encoded_url}";
			case 'email':
				return "mailto:?subject={$encoded_title}&body={$encoded_url}";
			case 'raindrop':
				return "https://app.raindrop.io/add?link={$encoded_url}&title={$encoded_title}";
			default:
				return '';
		}
	}

	/**
	 * Get container classes.
	 *
	 * @param array  $display_settings Display settings.
	 * @param array  $advanced_settings Advanced settings.
	 * @param string $context Render context.
	 * @return array
	 */
	private function get_container_classes( $display_settings, $advanced_settings, $context ) {
		$button_alignment = $display_settings['position']['buttonAlignment'] ?? 'left';
		$icon_display     = $display_settings['style']['iconDisplay'] ?? 'icons-text';
		$animations       = ! empty( $display_settings['style']['enableAnimations'] );
		$custom_class     = $advanced_settings['styling']['customCssClass'] ?? '';

		$classes = array(
			'pointwise-summary-container',
			'pointwise-summary-align-' . sanitize_html_class( $button_alignment ),
			'pointwise-summary-icons-' . sanitize_html_class( $icon_display ),
			'pointwise-summary-context-' . sanitize_html_class( $context ),
		);

		if ( $animations ) {
			$classes[] = 'pointwise-summary-animate';
		}

		if ( ! empty( $custom_class ) ) {
			$classes[] = sanitize_html_class( $custom_class );
		}

		return $classes;
	}

	/**
	 * Get rel attribute for external links.
	 *
	 * @param array $advanced_settings Advanced settings.
	 * @return string
	 */
	private function get_rel_attr( $advanced_settings ) {
		$nofollow = ! empty( $advanced_settings['seo']['noFollow'] );
		return $nofollow ? 'noopener noreferrer nofollow' : 'noopener noreferrer';
	}

	/**
	 * Get element type for buttons.
	 *
	 * @param array $advanced_settings Advanced settings.
	 * @return string
	 */
	private function get_element_type( $advanced_settings ) {
		$element = $advanced_settings['seo']['seoElement'] ?? 'link';
		return ( 'button' === $element ) ? 'button' : 'link';
	}

	/**
	 * Build a deterministic cache key for rendered button markup.
	 *
	 * @param int    $post_id Post ID.
	 * @param string $context Render context.
	 * @param array  $ai_settings AI settings.
	 * @param array  $social_settings Social settings.
	 * @param array  $display_settings Display settings.
	 * @param array  $advanced_settings Advanced settings.
	 * @return string
	 */
	private function get_cache_key( $post_id, $context, $ai_settings, $social_settings, $display_settings, $advanced_settings ) {
		$payload = array(
			'version'  => defined( 'POINTWISE_SUMMARY_VERSION' ) ? POINTWISE_SUMMARY_VERSION : '0',
			'post_id'  => absint( $post_id ),
			'context'  => sanitize_key( (string) $context ),
			'blog_id'  => get_current_blog_id(),
			'locale'   => determine_locale(),
			'ai'       => $ai_settings,
			'social'   => $social_settings,
			'display'  => $display_settings,
			'advanced' => $advanced_settings,
		);

		$encoded = wp_json_encode( $payload );
		if ( false === $encoded ) {
			$encoded = serialize( $payload );
		}

		return 'pointwise_summary_buttons_' . md5( (string) $encoded );
	}
}
