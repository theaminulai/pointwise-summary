<?php
/**
 * Block registration and management for Pointwise Summary.
 * Handles the inclusion of blocks metadata and assets.
 *
 * @package PointwiseSummary
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Pointwise_Summary_Blocks {

	use Pointwise_Summary_Singleton;

	/**
	 * Setup hooks.
	 */
	protected function __setup() {
		add_action( 'init', array( $this, 'register_blocks' ) );
	}

	/**
	 * Registers the blocks using a `blocks-manifest.php` file and metadata collection.
	 *
	 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
	 */
	public function register_blocks() {
		$blocks_dir    = POINTWISE_SUMMARY_PLUGIN_DIR . 'build/blocks';
		$manifest_path = POINTWISE_SUMMARY_PLUGIN_DIR . 'build/blocks-manifest.php';

		if ( ! file_exists( $blocks_dir ) || ! file_exists( $manifest_path ) ) {
			return;
		}

		/**
		 * Registers the block(s) metadata from the `blocks-manifest.php` and registers the block type(s)
		 * based on the registered block metadata.
		 * Added in WordPress 6.8 to simplify the block metadata registration process.
		 */
		if ( function_exists( 'wp_register_block_types_from_metadata_collection' ) ) {
			wp_register_block_types_from_metadata_collection( $blocks_dir, $manifest_path );
			return;
		}

		/**
		 * Registers the block(s) metadata from the `blocks-manifest.php` file.
		 * Added to WordPress 6.7 to improve the performance of block type registration.
		 */
		if ( function_exists( 'wp_register_block_metadata_collection' ) ) {
			wp_register_block_metadata_collection( $blocks_dir, $manifest_path );
		}

		/**
		 * Registers the block type(s) in the `blocks-manifest.php` file.
		 */
		$manifest_data = require $manifest_path;
		foreach ( array_keys( $manifest_data ) as $block_type ) {
			register_block_type( POINTWISE_SUMMARY_PLUGIN_DIR . "build/blocks/{$block_type}" );
		}
	}
}
