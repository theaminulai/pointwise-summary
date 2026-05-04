<?php
/**
 * Plugin Name:       Pointwise Summary
 * Description:       Create instant TL;DR summaries with AI-powered summarization buttons. Add "Summarize" and "Get TL;DR" buttons to help readers quickly grasp article content.
 * Version:           0.5.0
 * Requires at least: 6.1
 * Requires PHP:      7.4
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
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


