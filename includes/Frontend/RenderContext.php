<?php
/**
 * Frontend helpers for Pointwise Summary.
 *
 * @package PointwiseSummary
 */

namespace PointwiseSummary\Frontend;

use PointwiseSummary\Helpers\SingletonTrait;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class RenderContext {
	use SingletonTrait;

	/**
	 * Get AI settings.
	 *
	 * @return array
	 */
	public function get_ai_settings() {
		$instance    = \PointwiseSummary\Api\AiSettings::get_instance();
		$ai_settings = $instance->get_ai_settings_option();
		return $ai_settings;
	}

	/**
	 * Get display settings.
	 *
	 * @return array
	 */
	public function get_display_settings() {
		$instance         = \PointwiseSummary\Api\DisplaySettings::get_instance();
		$display_settings = $instance->get_display_settings_option();
		return $display_settings;
	}

	/**
	 * Get social sharing settings.
	 *
	 * @return array
	 */
	public function get_social_settings() {
		$instance        = \PointwiseSummary\Api\SocialSharing::get_instance();
		$social_settings = $instance->get_social_sharing_settings_option();
		return $social_settings;
	}

	/**
	 * Get advanced settings.
	 *
	 * @return array
	 */
	public function get_advanced_settings() {
		$instance          = \PointwiseSummary\Api\AdvancedSettings::get_instance();
		$advanced_settings = $instance->get_advanced_settings_option();
		return $advanced_settings;
	}

	/**
	 * Resolve translated summary button text for current locale.
	 *
	 * @param array  $advanced_settings Advanced settings payload.
	 * @param string $default_text Default fallback text.
	 * @return string
	 */
	public function get_translated_button_text( $advanced_settings, $default_text = 'Ask AI' ) {
		$translations = $advanced_settings['translations'] ?? array();
		if ( empty( $translations ) || ! is_array( $translations ) ) {
			return $default_text;
		}

		$current_locale = determine_locale();
		$current_locale = sanitize_text_field( (string) $current_locale );
		$current_lang   = strtolower( preg_replace( '/[_-].*$/', '', $current_locale ) );

		$language_match = '';

		foreach ( $translations as $translation ) {
			if ( ! is_array( $translation ) ) {
				continue;
			}

			$locale      = sanitize_text_field( (string) ( $translation['locale'] ?? '' ) );
			$button_text = sanitize_text_field( (string) ( $translation['buttonText'] ?? '' ) );

			if ( '' === $locale || '' === $button_text ) {
				continue;
			}

			if ( strtolower( $locale ) === strtolower( $current_locale ) ) {
				return $button_text;
			}

			$locale_lang = strtolower( preg_replace( '/[_-].*$/', '', $locale ) );
			if ( '' !== $current_lang && $locale_lang === $current_lang && '' === $language_match ) {
				$language_match = $button_text;
			}
		}

		if ( '' !== $language_match ) {
			return $language_match;
		}

		return $default_text;
	}

	/**
	 * Determine whether frontend output should render.
	 *
	 * @param int|null $post_id Post ID.
	 * @return bool
	 */
	public function should_render( $post_id = null ) {
		if ( ! is_singular() ) {
			return false;
		}

		$post_id = $post_id ?: get_the_ID();
		if ( ! $post_id ) {
			return false;
		}

		$advanced  = $this->get_advanced_settings();
		$post_type = get_post_type( $post_id );

		if ( ! $this->is_post_type_enabled( $post_type, $advanced ) ) {
			return false;
		}
		// TODO: IN future, we may want to add a filter here to allow other exclusion logic without needing to modify the plugin code directly.
		// if ( $this->is_post_excluded( $post_id, $advanced ) ) {
		// return false;
		// }

		if ( $this->is_noindex_excluded( $post_id, $advanced ) ) {
			return false;
		}

		return $this->has_enabled_buttons();
	}

	/**
	 * Check if any buttons are enabled.
	 *
	 * @return bool
	 */
	public function has_enabled_buttons() {
		$ai_settings     = $this->get_ai_settings();
		$social_settings = $this->get_social_settings();

		$enabled_ai     = $this->get_enabled_ai_platforms( $ai_settings );
		$enabled_social = array();
		if ( ! empty( $social_settings['enableSocialSharing'] ) ) {
			$enabled_social = $this->get_enabled_social_networks( $social_settings );
		}

		return ! empty( $enabled_ai ) || ! empty( $enabled_social );
	}

	/**
	 * Get enabled AI platforms.
	 *
	 * @param array $ai_settings AI settings.
	 * @return array
	 */
	public function get_enabled_ai_platforms( $ai_settings ) {
		if ( empty( $ai_settings['platforms'] ) || ! is_array( $ai_settings['platforms'] ) ) {
			return array();
		}

		return array_values(
			array_filter(
				$ai_settings['platforms'],
				static function ( $platform ) {
					return ! empty( $platform['enabled'] );
				}
			)
		);
	}

	/**
	 * Get enabled social networks.
	 *
	 * @param array $social_settings Social settings.
	 * @return array
	 */
	public function get_enabled_social_networks( $social_settings ) {
		if ( empty( $social_settings['networks'] ) || ! is_array( $social_settings['networks'] ) ) {
			return array();
		}

		return array_values(
			array_filter(
				$social_settings['networks'],
				static function ( $network ) {
					return ! empty( $network['enabled'] );
				}
			)
		);
	}

	/**
	 * Check if post type is enabled.
	 *
	 * @param string $post_type Post type.
	 * @param array  $advanced Advanced settings.
	 * @return bool
	 */
	private function is_post_type_enabled( $post_type, $advanced ) {
		if ( empty( $advanced['postTypes'] ) || ! is_array( $advanced['postTypes'] ) ) {
			return true;
		}

		foreach ( $advanced['postTypes'] as $type ) {
			if ( ! is_array( $type ) || empty( $type['id'] ) ) {
				continue;
			}

			if ( $type['id'] === $post_type ) {
				return ! empty( $type['enabled'] );
			}
		}

		return false;
	}

	/**
	 * Check exclusion list for post ID.
	 *
	 * @param int   $post_id Post ID.
	 * @param array $advanced Advanced settings.
	 * @return bool
	 */
	private function is_post_excluded( $post_id, $advanced ) {
		$excluded_ids = $advanced['exclusion']['excludedIds'] ?? '';
		if ( empty( $excluded_ids ) ) {
			return false;
		}

		$ids = array_filter( array_map( 'absint', preg_split( '/[\s,]+/', (string) $excluded_ids ) ) );
		return in_array( (int) $post_id, $ids, true );
	}

	/**
	 * Check SEO noindex exclusion.
	 *
	 * @param int   $post_id Post ID.
	 * @param array $advanced Advanced settings.
	 * @return bool
	 */
	private function is_noindex_excluded( $post_id, $advanced ) {
		$exclude = $advanced['seo']['excludeNoindex'] ?? false;
		if ( ! $exclude ) {
			return false;
		}

		return SeoIntegration::is_post_noindex( $post_id, $advanced['seo'] );
	}
}
