<?php
/**
 * Plugin Name:       Pointwise Summary
 * Description:       Generate instant TL;DR summaries using ChatGPT, Claude, Gemini, Grok, and more. Add customizable summary buttons anywhere on your site with flexible auto-insertion support.
 * Version: 1.2.1
 * Requires at least: 6.1
 * Requires PHP:      7.4
 * License:           GPL-3.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain:       pointwise-summary
 *
 * @package PointwiseSummary
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
define( 'POINTWISE_SUMMARY_VERSION', '1.0.0' );
define( 'POINTWISE_SUMMARY_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'POINTWISE_SUMMARY_DEV', WP_DEBUG );

// Include REST API endpoints
require_once POINTWISE_SUMMARY_PLUGIN_DIR . 'includes/plugin.php';

/**
 * Add settings link to plugin action links.
 *
 * @param array $links Plugin action links.
 * @return array Modified plugin action links.
 */
function pointwise_summary_plugin_action_links( $links ) {
	$settings_link = sprintf(
		'<a href="%1$s">%2$s</a>',
		admin_url( 'tools.php?page=pointwise-summary#/ai-settings' ),
		esc_html__( 'Settings', 'pointwise-summary' )
	);

	array_unshift( $links, $settings_link );

	return $links;
}
add_filter( 'plugin_action_links_' . plugin_basename( __FILE__ ), 'pointwise_summary_plugin_action_links' );
