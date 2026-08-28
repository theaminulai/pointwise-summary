<?php
/**
 * PSR-4 class autoloader for the `PointwiseSummary\` namespace.
 *
 * Hand-written (not `vendor/autoload.php`) so no `vendor/` folder needs to ship
 * in the WordPress.org SVN repo just for autoloading. This follows the PSR-4
 * spec's own reference implementation:
 *
 * @see https://www.php-fig.org/psr/psr-4/#example-implementation
 *
 * As of this version nothing in `includes/` is namespaced yet, so registering
 * this has no effect on the plugin's behavior — it only prepares the ground
 * for the class-by-class PSR-4 migration tracked in dev-docs/RELEASE_PLAN.md.
 *
 * @package PointwiseSummary
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register the `PointwiseSummary\` namespace autoloader.
 */
function pointwise_summary_register_autoloader() {
	spl_autoload_register(
		function ( $class ) {
			$prefix = 'PointwiseSummary\\';

			// Not one of ours, let the next registered autoloader handle it.
			if ( 0 !== strncmp( $prefix, $class, strlen( $prefix ) ) ) {
				return;
			}

			$relative_class = substr( $class, strlen( $prefix ) );
			$relative_path  = str_replace( '\\', DIRECTORY_SEPARATOR, $relative_class ) . '.php';
			$file           = POINTWISE_SUMMARY_PLUGIN_DIR . 'includes' . DIRECTORY_SEPARATOR . $relative_path;

			if ( file_exists( $file ) ) {
				require $file;
			}
		}
	);
}
