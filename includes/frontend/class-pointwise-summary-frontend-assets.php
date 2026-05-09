<?php
/**
 * Frontend assets for Pointwise Summary.
 *
 * @package PointwiseSummary
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Pointwise_Summary_Frontend_Assets {
	use Pointwise_Summary_Singleton;

	/**
	 * Setup hooks.
	 */
	protected function __setup() {
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_assets' ) );
	}

	/**
	 * Enqueue frontend assets.
	 */
	public function enqueue_assets() {
		$frontend = Pointwise_Summary_Frontend::get_instance();
		if ( ! $frontend->should_render() ) {
			return;
		}

		$asset_file_path = POINTWISE_SUMMARY_PLUGIN_DIR . 'build/frontend/frontend.asset.php';
		if ( ! file_exists( $asset_file_path ) ) {
			return;
		}

		$asset_file = include $asset_file_path;

		wp_enqueue_script(
			'pointwise-summary-frontend',
			plugins_url( 'build/frontend/frontend.js', POINTWISE_SUMMARY_PLUGIN_DIR . 'pointwise-summary.php' ),
			$asset_file['dependencies'],
			$asset_file['version'],
			true
		);

		$advanced      = $frontend->get_advanced_settings();
		$accessibility = $advanced['accessibility'] ?? array();

		wp_localize_script(
			'pointwise-summary-frontend',
			'pointwiseSummaryFrontend',
			array(
				'accessibility' => array(
					'enableKeyboard'      => ! empty( $accessibility['enableKeyboard'] ),
					'keyboardShortcut'    => isset( $accessibility['keyboardShortcut'] ) ? sanitize_text_field( (string) $accessibility['keyboardShortcut'] ) : 'Alt+S',
					'enableRTL'           => ! empty( $accessibility['enableRTL'] ),
					'enableAccessibility' => ! empty( $accessibility['enableAccessibility'] ),
				),
			)
		);

		$frontend_css = POINTWISE_SUMMARY_PLUGIN_DIR . 'build/frontend/frontend.css';
		if ( file_exists( $frontend_css ) ) {
			wp_enqueue_style(
				'pointwise-summary-frontend',
				plugins_url( 'build/frontend/frontend.css', POINTWISE_SUMMARY_PLUGIN_DIR . 'pointwise-summary.php' ),
				array(),
				$asset_file['version']
			);
		} else {
			wp_register_style( 'pointwise-summary-frontend', false, array(), $asset_file['version'] );
			wp_enqueue_style( 'pointwise-summary-frontend' );
		}

		$custom_css = $advanced['styling']['customCss'] ?? '';
		if ( ! empty( $custom_css ) ) {
			wp_add_inline_style( 'pointwise-summary-frontend', $custom_css );
		}
	}
}
