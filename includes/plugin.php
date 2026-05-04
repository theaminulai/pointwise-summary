<?php
/**
 * REST API bootstrap for Pointwise Summary.
 *
 * @package PointwiseSummary
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once POINTWISE_SUMMARY_PLUGIN_DIR . 'includes/helpers/trait-pointwise-summary-singleton.php';
require_once POINTWISE_SUMMARY_PLUGIN_DIR . 'includes/api/class-pointwise-summary-ai-settings-api.php';
require_once POINTWISE_SUMMARY_PLUGIN_DIR . 'includes/api/class-pointwise-summary-advanced-settings-api.php';
require_once POINTWISE_SUMMARY_PLUGIN_DIR . 'includes/api/class-pointwise-summary-display-settings-api.php';
require_once POINTWISE_SUMMARY_PLUGIN_DIR . 'includes/api/class-pointwise-summary-social-sharing-api.php';

// Include Admin UI helpers
require_once POINTWISE_SUMMARY_PLUGIN_DIR . 'includes/class-pointwise-summary-admin-menu.php';
require_once POINTWISE_SUMMARY_PLUGIN_DIR . 'includes/class-pointwise-summary-assets.php';
require_once POINTWISE_SUMMARY_PLUGIN_DIR . 'includes/class-pointwise-summary-blocks.php';

Pointwise_Summary_Admin_Menu::get_instance();
Pointwise_Summary_Assets::get_instance();
Pointwise_Summary_AI_Settings_API::get_instance();
Pointwise_Summary_Advanced_Settings_API::get_instance();
Pointwise_Summary_Display_Settings_API::get_instance();
Pointwise_Summary_Social_Sharing_API::get_instance();
Pointwise_Summary_Blocks::get_instance();
