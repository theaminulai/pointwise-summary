<?php
/**
 * Singleton trait to provide a consistent singleton pattern across the plugin.
 *
 * @package PointwiseSummary
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

trait Pointwise_Summary_Singleton {

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
