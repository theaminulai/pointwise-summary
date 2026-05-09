<?php
/**
 * Plugin Name:       Pointwise Summary
 * Description:       AI-powered text summarizer with ChatGPT, Claude, Gemini, and Grok support. Generate TL;DR summaries, key points, and condensed content with customizable AI summary buttons and auto-insert support.
 * Version:           0.5.0
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
define( 'POINTWISE_SUMMARY_VERSION', '0.5.0' );
define( 'POINTWISE_SUMMARY_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'POINTWISE_SUMMARY_DEV', WP_DEBUG );

// Include REST API endpoints
require_once POINTWISE_SUMMARY_PLUGIN_DIR . 'includes/plugin.php';
