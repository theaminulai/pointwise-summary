<?php
/**
 * Shared REST controller boilerplate for the plugin's settings API resources.
 *
 * @package PointwiseSummary
 */

namespace PointwiseSummary\Api;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Abstract base class for the plugin's `pointwise-summary/v1` REST resources.
 *
 * Concrete resources (AiSettings, AdvancedSettings, etc.) still add
 * `use \PointwiseSummary\Helpers\SingletonTrait;` themselves — trait members are
 * copied into whichever class uses them, so each subclass gets its own
 * singleton storage. If the trait were used here instead, every subclass would
 * share one static `$instance` slot through inheritance and only one resource
 * could ever be instantiated at a time.
 */
abstract class Controller {

	/**
	 * Hook route registration into `rest_api_init`.
	 *
	 * The singleton trait's constructor calls `__setup()` automatically if the
	 * class defines it; defined once here so subclasses don't each repeat it.
	 */
	protected function __setup() {
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
	}

	/**
	 * Register this resource's REST routes.
	 */
	abstract public function register_routes();

	/**
	 * Shared permission callback: require `manage_options`.
	 *
	 * @return bool
	 */
	public function can_manage_options() {
		return current_user_can( 'manage_options' );
	}
}
