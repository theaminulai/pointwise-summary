<?php
/**
 * Social sharing settings REST API endpoints for Pointwise Summary.
 *
 * @package PointwiseSummary
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Pointwise_Summary_Social_Sharing_API {

	use Pointwise_Summary_Singleton;

	/**
	 * Option name.
	 */
	const OPTION_NAME = 'pointwise_summary_social_sharing_settings';

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
			'/social-sharing',
			array(
				array(
					'methods'             => 'GET',
					'callback'            => array( $this, 'get_social_sharing_settings' ),
					'permission_callback' => array( $this, 'can_manage_options' ),
				),
				array(
					'methods'             => 'POST',
					'callback'            => array( $this, 'update_social_sharing_settings' ),
					'permission_callback' => array( $this, 'can_manage_options' ),
				),
			)
		);

		register_rest_route(
			'pointwise-summary/v1',
			'/social-sharing/reset',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'reset_social_sharing_settings' ),
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
	 * Get default social sharing settings.
	 *
	 * @return array
	 */
	public function get_default_social_sharing_settings() {
		return array(
			'enableSocialSharing' => false,
			'buttonOrder'         => 'social-first',
			'networks'            => array(
				array(
					'id'            => 'twitter',
					'name'          => 'X / Twitter',
					'iconKey'       => 'twitter',
					'enabled'       => true,
					'color'         => 'bg-black',
					'mentionOption' => true,
					'mention'       => '@yourhandle',
				),
				array(
					'id'            => 'facebook',
					'name'          => 'Facebook',
					'iconKey'       => 'facebook',
					'enabled'       => true,
					'color'         => 'bg-blue-700',
					'mentionOption' => false,
				),
				array(
					'id'            => 'linkedin',
					'name'          => 'LinkedIn',
					'iconKey'       => 'linkedin',
					'enabled'       => true,
					'color'         => 'bg-blue-600',
					'mentionOption' => false,
				),
				array(
					'id'            => 'telegram',
					'name'          => 'Telegram',
					'iconKey'       => 'telegram',
					'enabled'       => false,
					'color'         => 'bg-sky-500',
					'mentionOption' => false,
				),
				array(
					'id'            => 'whatsapp',
					'name'          => 'WhatsApp',
					'iconKey'       => 'whatsapp',
					'enabled'       => false,
					'color'         => 'bg-green-500',
					'mentionOption' => false,
				),
				array(
					'id'            => 'email',
					'name'          => 'Email',
					'iconKey'       => 'email',
					'enabled'       => false,
					'color'         => 'bg-gray-600',
					'mentionOption' => false,
				),
				array(
					'id'            => 'raindrop',
					'name'          => 'Raindrop',
					'iconKey'       => 'raindrop',
					'enabled'       => false,
					'color'         => 'bg-indigo-500',
					'mentionOption' => false,
				),
			),
		);
	}

	/**
	 * Build canonical network map from defaults.
	 *
	 * @return array
	 */
	public function get_default_network_map() {
		$defaults = $this->get_default_social_sharing_settings();
		$map      = array();

		foreach ( $defaults['networks'] as $network ) {
			$map[ $network['id'] ] = $network;
		}

		return $map;
	}

	/**
	 * Sanitize social sharing settings payload.
	 *
	 * @param mixed $input Raw settings payload.
	 * @return array
	 */
	public function sanitize_social_sharing_settings( $input ) {
		$defaults    = $this->get_default_social_sharing_settings();
		$network_map = $this->get_default_network_map();

		if ( ! is_array( $input ) ) {
			return $defaults;
		}

		$sanitized = $defaults;

		$sanitized['enableSocialSharing'] = isset( $input['enableSocialSharing'] ) ? (bool) $input['enableSocialSharing'] : $defaults['enableSocialSharing'];

		if ( isset( $input['buttonOrder'] ) ) {
			$allowed_orders           = array( 'social-first', 'ai-first', 'mixed' );
			$button_order             = sanitize_text_field( (string) $input['buttonOrder'] );
			$sanitized['buttonOrder'] = in_array( $button_order, $allowed_orders, true ) ? $button_order : $defaults['buttonOrder'];
		}

		if ( isset( $input['networks'] ) && is_array( $input['networks'] ) ) {
			$networks = array();

			foreach ( $input['networks'] as $network ) {
				if ( ! is_array( $network ) || empty( $network['id'] ) ) {
					continue;
				}

				$network_id = sanitize_key( (string) $network['id'] );
				if ( ! isset( $network_map[ $network_id ] ) ) {
					continue;
				}

				$base = $network_map[ $network_id ];

				$networks[] = array(
					'id'            => $base['id'],
					'name'          => $base['name'],
					'iconKey'       => $base['iconKey'],
					'enabled'       => isset( $network['enabled'] ) ? (bool) $network['enabled'] : $base['enabled'],
					'color'         => $base['color'],
					'mentionOption' => (bool) $base['mentionOption'],
					'mention'       => isset( $network['mention'] ) ? sanitize_text_field( (string) $network['mention'] ) : ( isset( $base['mention'] ) ? $base['mention'] : '' ),
				);
			}

			if ( ! empty( $networks ) ) {
				$sanitized['networks'] = $networks;
			}
		}

		return $sanitized;
	}

	/**
	 * Return merged social sharing settings with defaults.
	 *
	 * @return array
	 */
	public function get_social_sharing_settings_option() {
		$defaults = $this->get_default_social_sharing_settings();
		$stored   = get_option( self::OPTION_NAME, array() );

		if ( empty( $stored ) ) {
			return $defaults;
		}

		return $this->sanitize_social_sharing_settings( $stored );
	}

	/**
	 * REST Callback: Get social sharing settings.
	 *
	 * @return WP_REST_Response
	 */
	public function get_social_sharing_settings() {
		return new WP_REST_Response(
			array(
				'success' => true,
				'data'    => $this->get_social_sharing_settings_option(),
			),
			200
		);
	}

	/**
	 * REST Callback: Update social sharing settings.
	 *
	 * @param WP_REST_Request $request Request object.
	 * @return WP_REST_Response
	 */
	public function update_social_sharing_settings( $request ) {
		$params    = $request->get_json_params();
		$sanitized = $this->sanitize_social_sharing_settings( $params );

		update_option( self::OPTION_NAME, $sanitized, false );

		return new WP_REST_Response(
			array(
				'success' => true,
				'message' => __( 'Social sharing settings updated successfully', 'pointwise-summary' ),
				'data'    => $this->get_social_sharing_settings_option(),
			),
			200
		);
	}

	/**
	 * REST Callback: Reset social sharing settings.
	 *
	 * @return WP_REST_Response
	 */
	public function reset_social_sharing_settings() {
		$defaults = $this->get_default_social_sharing_settings();
		update_option( self::OPTION_NAME, $defaults, false );

		return new WP_REST_Response(
			array(
				'success' => true,
				'message' => __( 'Social sharing settings reset to defaults', 'pointwise-summary' ),
				'data'    => $this->get_social_sharing_settings_option(),
			),
			200
		);
	}
}
