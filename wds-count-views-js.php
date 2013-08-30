<?php
/**
 * Plugin Name: WDS Cookie Count Views
 * Plugin URI:  http://webdevstudios.com
 * Description: Counts user's pageviews in a cookie for use in ad targeting.
 * Version:     0.1.0
 * Author:      WebDevStudios
 * Author URI:  http://webdevstudios.com
 * Donate link: http://webdevstudios.com
 * License:     GPLv2+
 */

add_action( 'wp_enqueue_scripts', 'wds_enqueue_viewcounter', 0 );
/**
 * Enqueue our script early so it can be used by other scripts
 * @since  0.1.0
 */
function wds_enqueue_viewcounter() {
	if ( is_admin() )
		return;
	// Whether to display concatenated file
	$suffix = defined('SCRIPT_DEBUG') && SCRIPT_DEBUG ? '' : '.min';
	$url = plugins_url( '/js/viewscount'. $suffix .'.js', __FILE__ );
	// include our script for reading/getting page count cookie
	wp_enqueue_script( 'wds-viewscount', $url, null, '1.0.0' );

}