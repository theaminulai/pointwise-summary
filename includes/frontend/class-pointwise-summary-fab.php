<?php
/**
 * Floating action button for Pointwise Summary.
 *
 * @package PointwiseSummary
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Pointwise_Summary_FAB {
	use Pointwise_Summary_Singleton;

	/**
	 * Setup hooks.
	 */
	protected function __setup() {
		add_action( 'wp_footer', array( $this, 'render_fab' ) );
	}

	/**
	 * Render floating action button.
	 */
	public function render_fab() {
		$frontend = Pointwise_Summary_Frontend::get_instance();
		if ( ! $frontend->should_render() ) {
			return;
		}

		$display  = $frontend->get_display_settings();
		$advanced = $frontend->get_advanced_settings();
		$mode     = $display['mode']['displayMode'] ?? 'inline';
		if ( 'floating' !== $mode && 'both' !== $mode ) {
			return;
		}

		$post_id = get_the_ID();
		if ( ! $post_id ) {
			return;
		}

		$buttons = \PointwiseSummary\Frontend\ButtonRenderer::get_instance()->render_buttons( $post_id, 'floating' );
		if ( empty( $buttons ) ) {
			return;
		}

		$position       = $display['position']['floatingPosition'] ?? 'bottom-right';
		$scroll_enabled = ! empty( $display['mode']['enableScrollTrigger'] );
		$scroll_trigger = isset( $display['mode']['scrollTrigger'] ) ? absint( $display['mode']['scrollTrigger'] ) : 10;

		// Extract display style settings.
		$button_style                = $display['style']['buttonStyle'] ?? 'brand';
		$button_shape                = $display['style']['buttonShape'] ?? 'rounded';
		$icon_display                = $display['style']['iconDisplay'] ?? 'icons-text';
		$animations                  = ! empty( $display['style']['enableAnimations'] );
		$floating_style              = $display['style']['floatingStyle'] ?? 'collapsed';
		$toggle_button_text          = $frontend->get_translated_button_text( $advanced, __( 'Ask AI', 'pointwise-summary' ) );
		$rtl_enabled                 = ! empty( $advanced['accessibility']['enableRTL'] );
		$accessibility_enabled       = ! empty( $advanced['accessibility']['enableAccessibility'] );
		$direction                   = $rtl_enabled ? 'rtl' : 'ltr';
		$wrapper_accessibility_attrs = '';
		$panel_accessibility_attrs   = '';

		if ( $accessibility_enabled ) {
			$wrapper_accessibility_attrs = ' role="complementary" aria-label="' . esc_attr__( 'Summary quick actions', 'pointwise-summary' ) . '"';
			$panel_accessibility_attrs   = ' role="group" aria-label="' . esc_attr__( 'Summary action panel', 'pointwise-summary' ) . '"';
		}

		// Build wrapper classes.
		$wrapper_classes = array(
			'pointwise-summary-fab-wrapper',
			'pointwise-summary-fab-' . sanitize_html_class( $position ),
			'pointwise-summary-icons-' . sanitize_html_class( $icon_display ),
			'pointwise-summary-fab-' . sanitize_html_class( $floating_style ),
		);

		if ( $rtl_enabled ) {
			$wrapper_classes[] = 'pointwise-summary-rtl';
		}

		if ( $animations ) {
			$wrapper_classes[] = 'pointwise-summary-animate';
		}

		// Render flat style (all buttons visible without toggle).
		if ( 'flat' === $floating_style ) {
			?>
			<div
				class="<?php echo esc_attr( implode( ' ', $wrapper_classes ) ); ?>"
				data-scroll-trigger="<?php echo esc_attr( $scroll_enabled ? '1' : '0' ); ?>"
				data-scroll-threshold="<?php echo esc_attr( $scroll_trigger ); ?>"
				dir="<?php echo esc_attr( $direction ); ?>"
				<?php echo $wrapper_accessibility_attrs; ?>
			>
				<?php echo $buttons; ?>
			</div>
			<?php
			return;
		}

		// Build button classes for collapsed style.
		$button_classes = array(
			'pointwise-summary-fab-button',
			'pointwise-summary-style-' . sanitize_html_class( $button_style ),
			'pointwise-summary-shape-' . sanitize_html_class( $button_shape ),
		);

		$toggle_icon  = \PointwiseSummary\Frontend\ButtonRenderer::get_instance()->render_icon( 'ask-ai', $icon_display );
		$toggle_label = \PointwiseSummary\Frontend\ButtonRenderer::get_instance()->render_label( $toggle_button_text, $icon_display );
		?>
		<div
			class="<?php echo esc_attr( implode( ' ', $wrapper_classes ) ); ?>"
			data-scroll-trigger="<?php echo esc_attr( $scroll_enabled ? '1' : '0' ); ?>"
			data-scroll-threshold="<?php echo esc_attr( $scroll_trigger ); ?>"
			dir="<?php echo esc_attr( $direction ); ?>"
			<?php echo $wrapper_accessibility_attrs; ?>
		>
			<button type="button" class="<?php echo esc_attr( implode( ' ', $button_classes ) ); ?>" aria-expanded="false">
				<?php echo $toggle_icon; ?>
				<?php echo $toggle_label; ?>
			</button>
			<div class="pointwise-summary-fab-panel" hidden <?php echo $panel_accessibility_attrs; ?>>
				<?php echo $buttons; ?>
			</div>
		</div>
		<?php
	}
}
