<?php
/**
 * REST API bootstrap for Pointwise Summary.
 *
 * @package PointwiseSummary
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Still used by the classes below that aren't migrated to PSR-4 yet (see dev-docs/RELEASE_PLAN.md).
require_once POINTWISE_SUMMARY_PLUGIN_DIR . 'includes/helpers/trait-pointwise-summary-singleton.php';

// The 6 REST API resource classes now live under includes/Api/ as PSR-4 classes
// (PointwiseSummary\Api\*) and are loaded automatically by the autoloader
// registered in pointwise-summary.php — no require_once needed here anymore.

// Include Admin UI helpers
require_once POINTWISE_SUMMARY_PLUGIN_DIR . 'includes/class-pointwise-summary-admin-menu.php';
require_once POINTWISE_SUMMARY_PLUGIN_DIR . 'includes/class-pointwise-summary-assets.php';
require_once POINTWISE_SUMMARY_PLUGIN_DIR . 'includes/class-pointwise-summary-blocks.php';

// Include Frontend helpers
// SeoIntegration, IconLibrary, PromptBuilder and ButtonRenderer now live under
// includes/Frontend/ as PSR-4 classes (PointwiseSummary\Frontend\*), autoloaded —
// no require_once needed for those 4 anymore (see dev-docs/RELEASE_PLAN.md).
require_once POINTWISE_SUMMARY_PLUGIN_DIR . 'includes/frontend/class-pointwise-summary-frontend.php';
require_once POINTWISE_SUMMARY_PLUGIN_DIR . 'includes/frontend/class-pointwise-summary-inline.php';
require_once POINTWISE_SUMMARY_PLUGIN_DIR . 'includes/frontend/class-pointwise-summary-fab.php';
require_once POINTWISE_SUMMARY_PLUGIN_DIR . 'includes/frontend/class-pointwise-summary-frontend-assets.php';


// Initialize singletons.
Pointwise_Summary_Admin_Menu::get_instance();
Pointwise_Summary_Assets::get_instance();
Pointwise_Summary_Blocks::get_instance();

// API endpoints (PSR-4, PointwiseSummary\Api\*)
\PointwiseSummary\Api\AiSettings::get_instance();
\PointwiseSummary\Api\AdvancedSettings::get_instance();
\PointwiseSummary\Api\DisplaySettings::get_instance();
\PointwiseSummary\Api\SocialSharing::get_instance();
\PointwiseSummary\Api\Shortcodes::get_instance();
\PointwiseSummary\Api\SystemInfo::get_instance();

// Frontend helpers
Pointwise_Summary_Frontend::get_instance();
\PointwiseSummary\Frontend\ButtonRenderer::get_instance();
Pointwise_Summary_Inline::get_instance();
Pointwise_Summary_FAB::get_instance();
Pointwise_Summary_Frontend_Assets::get_instance();
