<?php
/**
 * Uninstall routine for Pointwise Summary.
 *
 * @package PointwiseSummary
 */

if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit;
}

$advanced        = get_option( 'pointwise_summary_advanced_settings', array() );
$cleanup_enabled = ! empty( $advanced['performance']['dataCleanup'] );

if ( ! $cleanup_enabled ) {
	return;
}

// Delete plugin options.
delete_option( 'pointwise_summary_ai_settings' );
delete_option( 'pointwise_summary_display_settings' );
delete_option( 'pointwise_summary_social_sharing_settings' );
delete_option( 'pointwise_summary_advanced_settings' );

// Delete button cache transients.
global $wpdb;
if ( isset( $wpdb ) ) {
	$transient_like = $wpdb->esc_like( '_transient_pointwise_summary_buttons_' ) . '%';
	$timeout_like   = $wpdb->esc_like( '_transient_timeout_pointwise_summary_buttons_' ) . '%';

	$wpdb->query(
		$wpdb->prepare(
			"DELETE FROM {$wpdb->options} WHERE option_name LIKE %s OR option_name LIKE %s",
			$transient_like,
			$timeout_like
		)
	);
}
