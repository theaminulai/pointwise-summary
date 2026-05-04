<?php
/**
 * AI settings REST API endpoints for Pointwise Summary.
 *
 * @package PointwiseSummary
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Pointwise_Summary_AI_Settings_API {

	use Pointwise_Summary_Singleton;

	/**
	 * Option name.
	 */
	const OPTION_NAME = 'pointwise_summary_ai_settings';

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
			'/ai-settings',
			array(
				array(
					'methods'             => 'GET',
					'callback'            => array( $this, 'get_ai_settings' ),
					'permission_callback' => array( $this, 'can_manage_options' ),
				),
				array(
					'methods'             => 'POST',
					'callback'            => array( $this, 'update_ai_settings' ),
					'permission_callback' => array( $this, 'can_manage_options' ),
				),
			)
		);

		register_rest_route(
			'pointwise-summary/v1',
			'/ai-settings/reset',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'reset_ai_settings' ),
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
	 * Get default AI settings.
	 *
	 * @return array
	 */
	public function get_default_ai_settings() {
		return array(
			'summaryLength'   => 'medium',
			'includeHeadings' => false,
			'includeMetadata' => false,
			'globalPrompt'    => 'Please provide a concise summary of this article in 3-5 bullet points.',
			'useGlobalPrompt' => true,
			'platforms'       => array(
				array(
					'id'          => 'chatgpt',
					'name'        => 'ChatGPT',
					'description' => 'OpenAI ChatGPT - Most popular AI assistant',
					'logoKey'     => 'chatgpt',
					'enabled'     => true,
					'prompt'      => 'Please provide a concise summary of this article in 3-5 bullet points.',
				),
				array(
					'id'          => 'gemini',
					'name'        => 'Google Gemini',
					'description' => 'Google\'s advanced AI model',
					'logoKey'     => 'gemini',
					'enabled'     => true,
					'prompt'      => 'Summarize this article in bullet points, focusing on key takeaways.',
				),
				array(
					'id'          => 'claude',
					'name'        => 'Claude',
					'description' => 'Anthropic Claude - Advanced reasoning AI',
					'logoKey'     => 'claude',
					'enabled'     => true,
					'prompt'      => 'Create a brief summary of this article with main points.',
				),
				array(
					'id'          => 'perplexity',
					'name'        => 'Perplexity',
					'description' => 'Perplexity AI - Research-focused assistant',
					'logoKey'     => 'perplexity',
					'enabled'     => false,
					'prompt'      => 'Provide a structured summary of this article.',
				),
				array(
					'id'          => 'grok',
					'name'        => 'Grok',
					'description' => 'xAI Grok - Real-time AI assistant',
					'logoKey'     => 'grok',
					'enabled'     => false,
					'prompt'      => 'Summarize this content in an easy-to-understand format.',
				),
				array(
					'id'          => 'google-ai',
					'name'        => 'Google AI',
					'description' => 'Google AI Studio integration',
					'logoKey'     => 'google-ai',
					'enabled'     => false,
					'prompt'      => 'Generate a comprehensive summary of this article.',
				),
			),
		);
	}

	/**
	 * Build canonical platform map from defaults.
	 *
	 * @return array
	 */
	public function get_default_platform_map() {
		$defaults = $this->get_default_ai_settings();
		$map      = array();

		foreach ( $defaults['platforms'] as $platform ) {
			$map[ $platform['id'] ] = $platform;
		}

		return $map;
	}

	/**
	 * Sanitize AI settings payload.
	 *
	 * @param mixed $input Raw settings payload.
	 * @return array
	 */
	public function sanitize_ai_settings( $input ) {
		$defaults      = $this->get_default_ai_settings();
		$platforms_map = $this->get_default_platform_map();

		if ( ! is_array( $input ) ) {
			return $defaults;
		}

		$sanitized = $defaults;

		if ( isset( $input['summaryLength'] ) ) {
			$allowed_lengths           = array( 'short', 'medium', 'detailed' );
			$summary_length            = sanitize_text_field( $input['summaryLength'] );
			$sanitized['summaryLength'] = in_array( $summary_length, $allowed_lengths, true ) ? $summary_length : $defaults['summaryLength'];
		}

		$sanitized['includeHeadings'] = isset( $input['includeHeadings'] ) ? (bool) $input['includeHeadings'] : $defaults['includeHeadings'];
		$sanitized['includeMetadata'] = isset( $input['includeMetadata'] ) ? (bool) $input['includeMetadata'] : $defaults['includeMetadata'];
		$sanitized['useGlobalPrompt'] = isset( $input['useGlobalPrompt'] ) ? (bool) $input['useGlobalPrompt'] : $defaults['useGlobalPrompt'];

		if ( isset( $input['globalPrompt'] ) ) {
			$sanitized['globalPrompt'] = sanitize_textarea_field( (string) $input['globalPrompt'] );
		}

		if ( isset( $input['platforms'] ) && is_array( $input['platforms'] ) ) {
			$platforms = array();

			foreach ( $input['platforms'] as $platform ) {
				if ( ! is_array( $platform ) || empty( $platform['id'] ) ) {
					continue;
				}

				$platform_id = sanitize_key( (string) $platform['id'] );
				if ( ! isset( $platforms_map[ $platform_id ] ) ) {
					continue;
				}

				$base = $platforms_map[ $platform_id ];

				$platforms[] = array(
					'id'          => $base['id'],
					'name'        => $base['name'],
					'description' => $base['description'],
					'logoKey'     => $base['logoKey'],
					'enabled'     => isset( $platform['enabled'] ) ? (bool) $platform['enabled'] : $base['enabled'],
					'prompt'      => isset( $platform['prompt'] ) ? sanitize_textarea_field( (string) $platform['prompt'] ) : $base['prompt'],
				);
			}

			if ( ! empty( $platforms ) ) {
				$sanitized['platforms'] = $platforms;
			}
		}

		return $sanitized;
	}

	/**
	 * Return merged AI settings with defaults.
	 *
	 * @return array
	 */
	public function get_ai_settings_option() {
		$defaults = $this->get_default_ai_settings();
		$stored   = get_option( self::OPTION_NAME, array() );

		if ( empty( $stored ) ) {
			return $defaults;
		}

		return $this->sanitize_ai_settings( $stored );
	}

	/**
	 * Get persisted AI settings used by the React ai-settings page.
	 *
	 * @return WP_REST_Response
	 */
	public function get_ai_settings() {
		return new WP_REST_Response(
			array(
				'success' => true,
				'data'    => $this->get_ai_settings_option(),
			),
			200
		);
	}

	/**
	 * Update AI settings for the React ai-settings page.
	 *
	 * @param WP_REST_Request $request Request object.
	 * @return WP_REST_Response
	 */
	public function update_ai_settings( $request ) {
		$params    = $request->get_json_params();
		$sanitized = $this->sanitize_ai_settings( $params );

		update_option( self::OPTION_NAME, $sanitized, false );

		return new WP_REST_Response(
			array(
				'success' => true,
				'message' => __( 'AI settings updated successfully', 'pointwise-summary' ),
				'data'    => $this->get_ai_settings_option(),
			),
			200
		);
	}

	/**
	 * Reset AI settings to defaults.
	 *
	 * @return WP_REST_Response
	 */
	public function reset_ai_settings() {
		$defaults = $this->get_default_ai_settings();
		update_option( self::OPTION_NAME, $defaults, false );

		return new WP_REST_Response(
			array(
				'success' => true,
				'message' => __( 'AI settings reset to defaults', 'pointwise-summary' ),
				'data'    => $this->get_ai_settings_option(),
			),
			200
		);
	}
}