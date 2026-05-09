<?php
/**
 * System info REST API for Pointwise Summary.
 *
 * @package PointwiseSummary
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Pointwise_Summary_System_Info_API {

	use Pointwise_Summary_Singleton;

	/**
	 * Setup hooks.
	 */
	protected function __setup() {
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
	}

	/**
	 * Register routes.
	 */
	public function register_routes() {
		register_rest_route(
			'pointwise-summary/v1',
			'/system-info',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'get_system_info' ),
				'permission_callback' => array( $this, 'can_manage_options' ),
			)
		);
	}

	/**
	 * Permission callback.
	 *
	 * @return bool
	 */
	public function can_manage_options() {
		return current_user_can( 'manage_options' );
	}

	/**
	 * REST Callback: return system & plugin info.
	 *
	 * @return WP_REST_Response
	 */
	public function get_system_info() {
		$theme = wp_get_theme();
		$data  = array(
			'plugin' => array(
				array(
					'label'      => __( 'Version', 'pointwise-summary' ),
					'value'      => defined( 'POINTWISE_SUMMARY_VERSION' ) ? POINTWISE_SUMMARY_VERSION : '',
					'valueClass' => 'text-gray-900',
				),
				array(
					'label'      => __( 'Status', 'pointwise-summary' ),
					'value'      => 'Active',
					'valueClass' => 'text-green-600',
				),
				array(
					'label'      => __( 'Database Version', 'pointwise-summary' ),
					'value'      => '1.0',
					'valueClass' => 'text-gray-900',
				),
			),
			'environment' => array(
				array(
					'label' => __( 'WordPress Version', 'pointwise-summary' ),
					'value' => get_bloginfo( 'version' ),
				),
				array(
					'label' => __( 'PHP Version', 'pointwise-summary' ),
					'value' => PHP_VERSION,
				),
				array(
					'label' => __( 'Theme', 'pointwise-summary' ),
					'value' => $theme->get( 'Name' ),
				),
			),
		);

		return new WP_REST_Response(
			array(
				'success' => true,
				'data'    => $data,
			),
			200
		);
	}
}
