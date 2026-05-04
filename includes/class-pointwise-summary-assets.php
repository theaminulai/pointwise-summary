<?php
/**
 * Admin assets (scripts and styles) for Pointwise Summary.
 *
 * @package PointwiseSummary
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Pointwise_Summary_Assets {

	use Pointwise_Summary_Singleton;

	/**
	 * Setup hooks.
	 */
	protected function __setup() {
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_admin_assets' ) );
	}

	/**
	 * Enqueue admin scripts and styles.
	 *
	 * @param string $hook The current admin page hook.
	 */
	public function enqueue_admin_assets( $hook ) {
		// Only load on our plugin pages
		$plugin_pages = array( 'tools_page_pointwise-summary' );

		if ( ! in_array( $hook, $plugin_pages, true ) ) {
			return;
		}

		$asset_file_path = POINTWISE_SUMMARY_PLUGIN_DIR . 'build/admin/admin.asset.php';
		if ( ! file_exists( $asset_file_path ) ) {
			return;
		}

		$asset_file = include $asset_file_path;

		// Enqueue the admin JavaScript
		wp_enqueue_script(
			'pointwise-summary-admin-script',
			plugins_url( 'build/admin/admin.js', POINTWISE_SUMMARY_PLUGIN_DIR . 'pointwise-summary.php' ),
			$asset_file['dependencies'],
			$asset_file['version'],
			true
		);

		// Enqueue the admin CSS if it exists
		$admin_css = POINTWISE_SUMMARY_PLUGIN_DIR . 'build/admin/admin.css';
		if ( file_exists( $admin_css ) ) {
			wp_enqueue_style(
				'pointwise-summary-admin-style',
				plugins_url( 'build/admin/admin.css', POINTWISE_SUMMARY_PLUGIN_DIR . 'pointwise-summary.php' ),
				array( 'wp-components' ),
				$asset_file['version']
			);
		}

		// Pass data to JavaScript
		wp_localize_script(
			'pointwise-summary-admin-script',
			'pointwiseSummary',
			array(
				'apiUrl'        => esc_url_raw( rest_url( 'pointwise-summary/v1' ) ),
				'nonce'         => wp_create_nonce( 'wp_rest' ),
				'pluginUrl'     => plugins_url( '/', POINTWISE_SUMMARY_PLUGIN_DIR . 'pointwise-summary.php' ),
				'version'       => POINTWISE_SUMMARY_VERSION,
				'isDevelopment' => defined( 'POINTWISE_SUMMARY_DEV' ) && POINTWISE_SUMMARY_DEV,
				'currentPage'   => isset( $_GET['page'] ) ? sanitize_text_field( wp_unslash( $_GET['page'] ) ) : 'pointwise-summary',
			)
		);
	}
}
