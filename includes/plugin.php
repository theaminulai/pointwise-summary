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
require_once POINTWISE_SUMMARY_PLUGIN_DIR . 'includes/api/class-pointwise-summary-shortcode-api.php';
require_once POINTWISE_SUMMARY_PLUGIN_DIR . 'includes/api/class-pointwise-summary-system-info-api.php';

// Include Admin UI helpers
require_once POINTWISE_SUMMARY_PLUGIN_DIR . 'includes/class-pointwise-summary-admin-menu.php';
require_once POINTWISE_SUMMARY_PLUGIN_DIR . 'includes/class-pointwise-summary-assets.php';
require_once POINTWISE_SUMMARY_PLUGIN_DIR . 'includes/class-pointwise-summary-blocks.php';

// Include Frontend helpers
require_once POINTWISE_SUMMARY_PLUGIN_DIR . 'includes/frontend/class-pointwise-summary-seo.php';
require_once POINTWISE_SUMMARY_PLUGIN_DIR . 'includes/frontend/class-pointwise-summary-icons.php';
require_once POINTWISE_SUMMARY_PLUGIN_DIR . 'includes/frontend/class-pointwise-summary-frontend.php';
require_once POINTWISE_SUMMARY_PLUGIN_DIR . 'includes/frontend/class-pointwise-summary-prompt.php';
require_once POINTWISE_SUMMARY_PLUGIN_DIR . 'includes/frontend/class-pointwise-summary-buttons.php';
require_once POINTWISE_SUMMARY_PLUGIN_DIR . 'includes/frontend/class-pointwise-summary-inline.php';
require_once POINTWISE_SUMMARY_PLUGIN_DIR . 'includes/frontend/class-pointwise-summary-fab.php';
require_once POINTWISE_SUMMARY_PLUGIN_DIR . 'includes/frontend/class-pointwise-summary-frontend-assets.php';


// Initialize singletons.
Pointwise_Summary_Admin_Menu::get_instance();
Pointwise_Summary_Assets::get_instance();
Pointwise_Summary_Blocks::get_instance();

// API endpoints
Pointwise_Summary_AI_Settings_API::get_instance();
Pointwise_Summary_Advanced_Settings_API::get_instance();
Pointwise_Summary_Display_Settings_API::get_instance();
Pointwise_Summary_Social_Sharing_API::get_instance();
Pointwise_Summary_Shortcode_API::get_instance();
Pointwise_Summary_System_Info_API::get_instance();

// Frontend helpers
Pointwise_Summary_Frontend::get_instance();
Pointwise_Summary_Buttons::get_instance();
Pointwise_Summary_Inline::get_instance();
Pointwise_Summary_FAB::get_instance();
Pointwise_Summary_Frontend_Assets::get_instance();
