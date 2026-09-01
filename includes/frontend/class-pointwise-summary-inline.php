<?php
/**
 * Inline content insertion for Pointwise Summary.
 *
 * @package PointwiseSummary
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Pointwise_Summary_Inline {
	use Pointwise_Summary_Singleton;

	/**
	 * Track processed post IDs to prevent infinite loops in title filters.
	 *
	 * @var array
	 */
	private static $processed_posts = array();

	/**
	 * Setup hooks.
	 */
	protected function __setup() {
		$priority = 12;
		add_filter( 'the_title', array( $this, 'inject_before_title' ), $priority, 2 );
		add_filter( 'the_title', array( $this, 'inject_after_title' ), $priority + 2, 2 );
		add_filter( 'the_content', array( $this, 'inject_before_content' ), $priority );
		add_filter( 'the_content', array( $this, 'inject_after_content' ), $priority + 1 );
	}

	/**
	 * Insert buttons before the title.
	 *
	 * @param string $title Title.
	 * @param int    $post_id Post ID.
	 * @return string
	 */
	public function inject_before_title( $title, $post_id = 0 ) {
		if ( ! $post_id ) {
			global $post;
			$post_id = $post ? $post->ID : 0;
		}

		// Prevent infinite loops by tracking which posts we've processed.
		$key = 'before_' . $post_id;
		if ( isset( self::$processed_posts[ $key ] ) ) {
			return $title;
		}
		self::$processed_posts[ $key ] = true;

		if ( ! $post_id || ! $this->should_inject( 'before-title' ) ) {
			unset( self::$processed_posts[ $key ] );
			return $title;
		}

		$buttons = $this->get_buttons_html( $post_id );
		unset( self::$processed_posts[ $key ] );
		return $buttons ? $buttons . $title : $title;
	}

	/**
	 * Insert buttons after the title.
	 *
	 * @param string $title Title.
	 * @param int    $post_id Post ID.
	 * @return string
	 */
	public function inject_after_title( $title, $post_id = 0 ) {
		if ( ! $post_id ) {
			global $post;
			$post_id = $post ? $post->ID : 0;
		}

		// Prevent infinite loops by tracking which posts we've processed.
		$key = 'after_' . $post_id;
		if ( isset( self::$processed_posts[ $key ] ) ) {
			return $title;
		}
		self::$processed_posts[ $key ] = true;

		if ( ! $post_id || ! $this->should_inject( 'after-title' ) ) {
			unset( self::$processed_posts[ $key ] );
			return $title;
		}

		$buttons = $this->get_buttons_html( $post_id );
		unset( self::$processed_posts[ $key ] );
		return $buttons ? $title . $buttons : $title;
	}

	/**
	 * Insert buttons before content.
	 *
	 * @param string $content Content.
	 * @return string
	 */
	public function inject_before_content( $content ) {
		if ( ! $this->should_inject( 'before-content' ) ) {
			return $content;
		}

		$buttons = $this->get_buttons_html();
		return $buttons ? $buttons . $content : $content;
	}

	/**
	 * Insert buttons after content.
	 *
	 * @param string $content Content.
	 * @return string
	 */
	public function inject_after_content( $content ) {
		if ( ! $this->should_inject( 'after-content' ) ) {
			return $content;
		}

		$buttons = $this->get_buttons_html();
		return $buttons ? $content . $buttons : $content;
	}

	/**
	 * Determine if buttons should be injected.
	 *
	 * @param string $position Position check.
	 * @return bool
	 */
	private function should_inject( $position ) {
		$frontend = Pointwise_Summary_Frontend::get_instance();
		if ( ! $frontend->should_render() ) {
			return false;
		}

		$display         = $frontend->get_display_settings();
		$mode            = $display['mode']['displayMode'] ?? 'inline';
		$inline_position = $display['position']['inlinePosition'] ?? 'after-content';

		if ( ! in_array( $mode, array( 'inline', 'both', 'collapse' ), true ) ) {
			return false;
		}

		if ( 'disabled' === $inline_position ) {
			return false;
		}

		return $inline_position === $position;
	}

	/**
	 * Get buttons HTML.
	 *
	 * @param int $post_id Post ID (optional, defaults to current post).
	 * @return string
	 */
	private function get_buttons_html( $post_id = 0 ) {
		if ( ! $post_id ) {
			$post_id = get_the_ID();
		}

		if ( ! $post_id ) {
			return '';
		}

		return \PointwiseSummary\Frontend\ButtonRenderer::get_instance()->render_buttons( $post_id, 'inline' );
	}
}
