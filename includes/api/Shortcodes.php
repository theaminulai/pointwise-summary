<?php
/**
 * Shortcode examples REST API for Pointwise Summary.
 *
 * @package PointwiseSummary
 */

namespace PointwiseSummary\Api;

use PointwiseSummary\Helpers\SingletonTrait;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Shortcodes extends Controller {

	use SingletonTrait;

	/**
	 * Register routes.
	 */
	public function register_routes() {
		register_rest_route(
			'pointwise-summary/v1',
			'/shortcodes',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'get_shortcode_examples' ),
				'permission_callback' => array( $this, 'can_manage_options' ),
			)
		);
	}

	/**
	 * REST Callback: return helpful shortcode examples.
	 *
	 * @return \WP_REST_Response
	 */
	public function get_shortcode_examples() {
		$examples = array(
			array(
				'code'        => '[pointwise_summary]',
				'description' => __( 'Basic usage - displays all enabled AI platforms and social sharing with default settings', 'pointwise-summary' ),
			),
			array(
				'code'        => '[pointwise_summary ai="true"]',
				'description' => __( 'Show AI platforms, extra : style="minimal" align="center"', 'pointwise-summary' ),
			),
			array(
				'code'        => '[pointwise_summary ai="true" ai_list="chatgpt,gemini"]',
				'description' => __( 'Show only specific AI platforms', 'pointwise-summary' ),
			),
			array(
				'code'        => '[pointwise_summary style="minimal" align="center"]',
				'description' => __( 'Extra: Customize styling and alignment', 'pointwise-summary' ),
			),
			array(
				'code'        => '[pointwise_summary social="true"]',
				'description' => __( 'Show social platforms', 'pointwise-summary' ),
			),
			array(
				'code'        => '[pointwise_summary social="true" order="ai-first"]',
				'description' => __( 'Include social sharing with a custom button order', 'pointwise-summary' ),
			),
			array(
				'code'        => '[pointwise_summary social="true" social_list="chatgpt,gemini"]',
				'description' => __( 'Show only specific social platforms', 'pointwise-summary' ),
			),
			array(
				'code'        => '[pointwise_summary ai="true" ai_list="chatgpt,gemini" social="true" order="mixed" style="gradient" align="center"]',
				'description' => __( 'Complex example combining AI platforms, social sharing, mixed order and custom styling', 'pointwise-summary' ),
			),
		);

		return new \WP_REST_Response(
			array(
				'success' => true,
				'data'    => $examples,
			),
			200
		);
	}
}
