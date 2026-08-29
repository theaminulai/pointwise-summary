<?php
/**
 * Display settings REST API endpoints for Pointwise Summary.
 *
 * @package PointwiseSummary
 */

namespace PointwiseSummary\Api;

use PointwiseSummary\Helpers\SingletonTrait;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class DisplaySettings extends Controller {

	use SingletonTrait;

	/**
	 * Option name.
	 */
	const OPTION_NAME = 'pointwise_summary_display_settings';

	/**
	 * Register routes.
	 */
	public function register_routes() {
		register_rest_route(
			'pointwise-summary/v1',
			'/display-settings',
			array(
				array(
					'methods'             => 'GET',
					'callback'            => array( $this, 'get_display_settings' ),
					'permission_callback' => array( $this, 'can_manage_options' ),
				),
				array(
					'methods'             => 'POST',
					'callback'            => array( $this, 'update_display_settings' ),
					'permission_callback' => array( $this, 'can_manage_options' ),
				),
			)
		);

		register_rest_route(
			'pointwise-summary/v1',
			'/display-settings/reset',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'reset_display_settings' ),
				'permission_callback' => array( $this, 'can_manage_options' ),
			)
		);
	}

	/**
	 * Get default display settings.
	 *
	 * @return array
	 */
	public function get_default_display_settings() {
		return array(
			'mode'     => array(
				'displayMode'         => 'inline',
				'enableScrollTrigger' => true,
				'scrollTrigger'       => 10,
			),
			'position' => array(
				'floatingPosition' => 'bottom-right',
				'buttonAlignment'  => 'left',
				'inlinePosition'   => 'after-content',
			),
			'style'    => array(
				'buttonStyle'      => 'default',
				'buttonShape'      => 'rounded',
				'iconDisplay'      => 'icons-text',
				'enableAnimations' => true,
				'floatingStyle'    => 'collapsed',
			),
		);
	}

	/**
	 * Sanitize display settings payload.
	 *
	 * @param mixed $input Raw settings payload.
	 * @return array
	 */
	public function sanitize_display_settings( $input ) {
		$defaults = $this->get_default_display_settings();

		if ( ! is_array( $input ) ) {
			return $defaults;
		}

		$sanitized = $defaults;

		// Mode Settings
		if ( isset( $input['mode'] ) && is_array( $input['mode'] ) ) {
			$mode                                     = $input['mode'];
			$sanitized['mode']['displayMode']         = isset( $mode['displayMode'] ) ? sanitize_text_field( $mode['displayMode'] ) : $defaults['mode']['displayMode'];
			$sanitized['mode']['enableScrollTrigger'] = isset( $mode['enableScrollTrigger'] ) ? (bool) $mode['enableScrollTrigger'] : $defaults['mode']['enableScrollTrigger'];
			$sanitized['mode']['scrollTrigger']       = isset( $mode['scrollTrigger'] ) ? absint( $mode['scrollTrigger'] ) : $defaults['mode']['scrollTrigger'];
		}

		// Position Settings
		if ( isset( $input['position'] ) && is_array( $input['position'] ) ) {
			$pos                                       = $input['position'];
			$sanitized['position']['floatingPosition'] = isset( $pos['floatingPosition'] ) ? sanitize_text_field( $pos['floatingPosition'] ) : $defaults['position']['floatingPosition'];
			$sanitized['position']['buttonAlignment']  = isset( $pos['buttonAlignment'] ) ? sanitize_text_field( $pos['buttonAlignment'] ) : $defaults['position']['buttonAlignment'];
			$sanitized['position']['inlinePosition']   = isset( $pos['inlinePosition'] ) ? sanitize_text_field( $pos['inlinePosition'] ) : $defaults['position']['inlinePosition'];
		}

		// Style Settings
		if ( isset( $input['style'] ) && is_array( $input['style'] ) ) {
			$style                                  = $input['style'];
			$sanitized['style']['buttonStyle']      = isset( $style['buttonStyle'] ) ? sanitize_text_field( $style['buttonStyle'] ) : $defaults['style']['buttonStyle'];
			$sanitized['style']['buttonShape']      = isset( $style['buttonShape'] ) ? sanitize_text_field( $style['buttonShape'] ) : $defaults['style']['buttonShape'];
			$sanitized['style']['iconDisplay']      = isset( $style['iconDisplay'] ) ? sanitize_text_field( $style['iconDisplay'] ) : $defaults['style']['iconDisplay'];
			$sanitized['style']['enableAnimations'] = isset( $style['enableAnimations'] ) ? (bool) $style['enableAnimations'] : $defaults['style']['enableAnimations'];
			$sanitized['style']['floatingStyle']    = isset( $style['floatingStyle'] ) ? sanitize_text_field( $style['floatingStyle'] ) : $defaults['style']['floatingStyle'];
		}

		return $sanitized;
	}

	/**
	 * Get persisted display settings.
	 *
	 * @return array
	 */
	public function get_display_settings_option() {
		$defaults = $this->get_default_display_settings();
		$stored   = get_option( self::OPTION_NAME, array() );

		if ( empty( $stored ) ) {
			return $defaults;
		}

		return $this->sanitize_display_settings( $stored );
	}

	/**
	 * REST Callback: Get display settings.
	 *
	 * @return \WP_REST_Response
	 */
	public function get_display_settings() {
		return new \WP_REST_Response(
			array(
				'success' => true,
				'data'    => $this->get_display_settings_option(),
			),
			200
		);
	}

	/**
	 * REST Callback: Update display settings.
	 *
	 * @param \WP_REST_Request $request Request object.
	 * @return \WP_REST_Response
	 */
	public function update_display_settings( $request ) {
		$params    = $request->get_json_params();
		$sanitized = $this->sanitize_display_settings( $params );

		update_option( self::OPTION_NAME, $sanitized, false );

		return new \WP_REST_Response(
			array(
				'success' => true,
				'message' => __( 'Display settings updated successfully', 'pointwise-summary' ),
				'data'    => $this->get_display_settings_option(),
			),
			200
		);
	}

	/**
	 * REST Callback: Reset display settings.
	 *
	 * @return \WP_REST_Response
	 */
	public function reset_display_settings() {
		$defaults = $this->get_default_display_settings();
		update_option( self::OPTION_NAME, $defaults, false );

		return new \WP_REST_Response(
			array(
				'success' => true,
				'message' => __( 'Display settings reset to defaults', 'pointwise-summary' ),
				'data'    => $this->get_display_settings_option(),
			),
			200
		);
	}
}
