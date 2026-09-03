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
require_once POINTWISE_SUMMARY_PLUGIN_DIR . 'includes/Helpers/trait-pointwise-summary-singleton.php';

// The 6 REST API resource classes now live under includes/Api/ as PSR-4 classes
// (PointwiseSummary\Api\*) and are loaded automatically by the autoloader
// registered in pointwise-summary.php — no require_once needed here anymore.

// Include Admin UI helpers
require_once POINTWISE_SUMMARY_PLUGIN_DIR . 'includes/class-pointwise-summary-admin-menu.php';
require_once POINTWISE_SUMMARY_PLUGIN_DIR . 'includes/class-pointwise-summary-assets.php';
require_once POINTWISE_SUMMARY_PLUGIN_DIR . 'includes/class-pointwise-summary-blocks.php';

// Include Frontend helpers
// SeoIntegration, IconLibrary, PromptBuilder, ButtonRenderer, RenderContext,
// ContentInjector, FloatingActionButton and Assets now live under includes/Frontend/
// as PSR-4 classes (PointwiseSummary\Frontend\*), autoloaded — no require_once
// needed for those anymore (see dev-docs/RELEASE_PLAN.md, and the folder-rename
// note above — same caveat applies here).

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

// Frontend helpers (PSR-4, PointwiseSummary\Frontend\*)
\PointwiseSummary\Frontend\RenderContext::get_instance();
\PointwiseSummary\Frontend\ButtonRenderer::get_instance();
\PointwiseSummary\Frontend\ContentInjector::get_instance();
\PointwiseSummary\Frontend\FloatingActionButton::get_instance();
\PointwiseSummary\Frontend\Assets::get_instance();
