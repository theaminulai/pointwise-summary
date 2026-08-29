<?php
/**
 * Singleton trait to provide a consistent singleton pattern across the plugin.
 *
 * PSR-4 namespaced counterpart of the original global
 * `Pointwise_Summary_Singleton` trait (includes/helpers/trait-pointwise-summary-singleton.php).
 * That trait stays in place until every class still using it has been migrated
 * (tracked in dev-docs/RELEASE_PLAN.md); this copy is for newly migrated,
 * namespaced classes only.
 *
 * @package PointwiseSummary
 */

namespace PointwiseSummary\Helpers;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

trait SingletonTrait {

	/**
	 * Single instance of the class.
	 *
	 * @var static|null
	 */
	protected static $instance = null;

	/**
	 * Get singleton instance.
	 *
	 * @return static
	 */
	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new static();
		}

		return self::$instance;
	}

	/**
	 * Private constructor to prevent direct instantiation.
	 */
	protected function __construct() {
		// Child classes should implement override __setup() instead of constructor if needed,
		// or call parent::__construct().
		if ( method_exists( $this, '__setup' ) ) {
			$this->__setup();
		}
	}

	/**
	 * Prevent cloning of the instance.
	 */
	protected function __clone() {}

	/**
	 * Prevent unserializing of the instance.
	 */
	public function __wakeup() {
		throw new \Exception( 'Cannot unserialize a singleton.' );
	}
}
