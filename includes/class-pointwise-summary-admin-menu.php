<?php
/**
 * Admin menu and page rendering for Pointwise Summary.
 *
 * @package PointwiseSummary
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Pointwise_Summary_Admin_Menu {

	use Pointwise_Summary_Singleton;

	/**
	 * Setup hooks.
	 */
	protected function __setup() {
		add_action( 'admin_menu', array( $this, 'register_admin_menu' ) );
	}

	/**
	 * Register the admin menu for Pointwise Summary plugin.
	 * URL: tools.php?page=pointwise-summary
	 */
	public function register_admin_menu() {
		add_submenu_page(
			'tools.php',
			esc_html__( 'AI Summary (TL;DR)', 'pointwise-summary' ),
			esc_html__( 'AI Summary (TL;DR)', 'pointwise-summary' ),
			'manage_options',
			'pointwise-summary',
			array( $this, 'render_admin_page' )
		);
	}

	/**
	 * Render the admin page with React root element.
	 */
	public function render_admin_page() {
		?>
		<div class="wrap">
			<div id="pointwise-summary-admin-root"></div>
		</div>
		<?php
	}
}
