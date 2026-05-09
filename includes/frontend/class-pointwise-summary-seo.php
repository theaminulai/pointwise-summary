<?php
/**
 * SEO integration helpers for Pointwise Summary.
 *
 * @package PointwiseSummary
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Pointwise_Summary_SEO {

	/**
	 * Detect active SEO plugin.
	 *
	 * @param array $platform Optional platform specified in settings.
	 * @return array|false
	 */
	public static function detect_seo_plugin( $platform = array() ) {
		if ( ! function_exists( 'is_plugin_active' ) ) {
			include_once ABSPATH . 'wp-admin/includes/plugin.php';
		}

		foreach ( $platform as $slug => $plugin ) {
			if ( is_plugin_active( $plugin['file'] ) ) {
				return array(
					'slug' => $slug,
					'name' => $plugin['name'],
				);
			}
		}

		return false;
	}

	/**
	 * Check if a post is marked noindex.
	 *
	 * @param int   $post_id Post ID.
	 * @param array $seo_settings SEO settings from advanced settings.
	 * @return bool
	 */
	public static function is_post_noindex( $post_id, $seo_settings = array() ) {
		$platform = $seo_settings['platform'] ?? '';
		$seo      = self::detect_seo_plugin( $platform );
		if ( ! $seo ) {
			return false;
		}

		$config = $platform[ $seo['slug'] ];

		if ( ! empty( $config['custom'] ) && $seo['slug'] === 'aioseo' ) {
			return self::check_aioseo_noindex( $post_id );
		}

		$meta = get_post_meta( $post_id, $config['meta_key'], true );
		if ( empty( $meta ) ) {
			return false;
		}

		if ( ! empty( $config['is_array'] ) ) {
			$meta = is_array( $meta ) ? $meta : maybe_unserialize( $meta );
			return is_array( $meta ) && in_array( $config['noindex'], $meta, true );
		}

		return $meta === $config['noindex'];
	}

	/**
	 * Check noindex status for All in One SEO (v4+).
	 *
	 * @param int $post_id Post ID.
	 * @return bool
	 */
	private static function check_aioseo_noindex( $post_id ) {
		global $wpdb;

		if ( function_exists( 'aioseo' ) && method_exists( aioseo(), 'helpers' ) ) {
			if ( class_exists( 'AIOSEO\Plugin\Models\Post' ) ) {
				$aioseo_post = AIOSEO\Plugin\Models\Post::getPost( $post_id );
				if ( $aioseo_post && isset( $aioseo_post->robots_noindex ) ) {
					return (bool) $aioseo_post->robots_noindex;
				}
			}
		}

		$table_name   = $wpdb->prefix . 'aioseo_posts';
		$table_exists = $wpdb->get_var(
			$wpdb->prepare( 'SHOW TABLES LIKE %s', $table_name )
		);

		if ( $table_exists ) {
			// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
			$result = $wpdb->get_var(
				$wpdb->prepare( "SELECT robots_noindex FROM {$table_name} WHERE post_id = %d", $post_id )
			);
			if ( null !== $result ) {
				return (int) $result === 1;
			}
		}

		$legacy_meta = get_post_meta( $post_id, '_aioseo_noindex', true );
		return ! empty( $legacy_meta ) && ( $legacy_meta === '1' || $legacy_meta === 1 || true === $legacy_meta );
	}
}
