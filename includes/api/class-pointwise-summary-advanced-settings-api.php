<?php
/**
 * Advanced settings REST API endpoints for Pointwise Summary.
 *
 * @package PointwiseSummary
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Pointwise_Summary_Advanced_Settings_API {

	use Pointwise_Summary_Singleton;

	/**
	 * Option name.
	 */
	const OPTION_NAME = 'pointwise_summary_advanced_settings';

	/**
	 * Setup hooks.
	 */
	protected function __setup() {
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
	}

	/**
	 * Register routes.
	 */
	public function register_routes() {
		register_rest_route(
			'pointwise-summary/v1',
			'/advanced-settings',
			array(
				array(
					'methods'             => 'GET',
					'callback'            => array( $this, 'get_advanced_settings' ),
					'permission_callback' => array( $this, 'can_manage_options' ),
				),
				array(
					'methods'             => 'POST',
					'callback'            => array( $this, 'update_advanced_settings' ),
					'permission_callback' => array( $this, 'can_manage_options' ),
				),
			)
		);

		register_rest_route(
			'pointwise-summary/v1',
			'/advanced-settings/reset',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'reset_advanced_settings' ),
				'permission_callback' => array( $this, 'can_manage_options' ),
			)
		);
	}

	/**
	 * Permission callback.
	 *
	 * @return bool
	 */
	public function can_manage_options() {
		return current_user_can( 'manage_options' );
	}

	/**
	 * Get default advanced settings.
	 *
	 * @return array
	 */
	public function get_default_advanced_settings() {
		return array(
			'postTypes'     => $this->get_dynamic_post_types(),
			'exclusion'     => array(
				'excludedIds' => '12, 45, 789',
			),
			'styling'       => array(
				'customCss'      => "/* Add your custom CSS here */\n.pointwise-summary-btn {\n  /* Custom styles */\n}",
				'customCssClass' => 'my-custom-class',
			),
			'performance'   => array(
				'enableCache' => false,
				'cacheExpiry' => 24,
				'dataCleanup' => false,
			),
			'accessibility' => array(
				'enableKeyboard'      => false,
				'keyboardShortcut'    => 'Alt+S',
				'enableRTL'           => false,
				'enableAccessibility' => true,
			),
			'seo'           => array(
				'excludeNoindex' => true,
				'seoElement'     => 'link',
				'noFollow'       => true,
				'platform'       => array(
					'yoast' => array(
						'name'     => 'Yoast SEO',
						'file'     => 'wordpress-seo/wp-seo.php',
						'meta_key' => '_yoast_wpseo_meta-robots-noindex',
						'noindex'  => '1',
					),
					'rankmath' => array(
						'name'     => 'Rank Math',
						'file'     => 'seo-by-rank-math/rank-math.php',
						'meta_key' => 'rank_math_robots',
						'noindex'  => 'noindex',
						'is_array' => true,
					),
					'aioseo' => array(
						'name'   => 'All in One SEO',
						'file'   => 'all-in-one-seo-pack/all_in_one_seo_pack.php',
						'custom' => true,
					),
					'seopress' => array(
						'name'     => 'SEOPress',
						'file'     => 'wp-seopress/seopress.php',
						'meta_key' => '_seopress_robots_index',
						'noindex'  => 'yes',
					),
					'tsf' => array(
						'name'     => 'The SEO Framework',
						'file'     => 'autodescription/autodescription.php',
						'meta_key' => '_genesis_noindex',
						'noindex'  => '1',
					),
				),
			),
			'translations'  => array(
				array(
					'locale'     => 'en_US',
					'label'      => 'English',
					'buttonText' => 'Ask AI',
				),
				array(
					'locale'     => 'fr_FR',
					'label'      => 'French',
					'buttonText' => 'Resume IA',
				),
			),
			'editorSupport' => array(
				array(
					'editor'      => 'classic',
					'label'       => 'Classic Editor',
					'description' => 'Supports the traditional WordPress editor.',
					'supported'   => true,
				),
				array(
					'editor'      => 'block',
					'label'       => 'Gutenberg Block Editor',
					'description' => 'Supports the modern Gutenberg block editor.',
					'supported'   => true,
				),
				array(
					'editor'      => 'elementor',
					'label'       => 'Elementor Page Builder',
					'description' => 'Supports the Elementor page builder.',
					'supported'   => true,
				),
				array(
					'editor'      => 'other-builders',
					'label'       => 'Other Page Builders',
					'description' => 'Supports other page builders, like Divi, Beaver Builder, etc.',
					'supported'   => false,
				),
			),
		);
	}

	/**
	 * Build a dynamic post type list from registered WordPress post types.
	 *
	 * Includes custom post types and keeps defaults enabled for posts/pages.
	 *
	 * @return array
	 */
	public function get_dynamic_post_types() {
		$post_type_objects = get_post_types(
			array(
				'show_ui' => true,
			),
			'objects'
		);

		$excluded_types = array(
			'attachment',
			'revision',
			'nav_menu_item',
			'custom_css',
			'customize_changeset',
			'oembed_cache',
			'user_request',
			'shop_coupon',
			'shop_order',
			'shop_order_refund',
			'acf-field-group',
			'acf-ui-options-page',
			'acf-post-type',
			'acf-taxonomy',
			'wp_block',
			'wp_template',
			'wp_template_part',
			'wp_global_styles',
			'wp_navigation',
			'wp_font_family',
			'wp_font_face',
		);

		$post_types = array();

		foreach ( $post_type_objects as $post_type ) {
			if ( ! isset( $post_type->name ) ) {
				continue;
			}

			$post_type_id = sanitize_key( (string) $post_type->name );

			if ( in_array( $post_type_id, $excluded_types, true ) ) {
				continue;
			}

			$label = isset( $post_type->labels->name ) ? (string) $post_type->labels->name : $post_type_id;

			$post_types[] = array(
				'id'      => $post_type_id,
				'label'   => sanitize_text_field( $label ),
				'enabled' => in_array( $post_type_id, array( 'post', 'page' ), true ),
			);
		}

		usort(
			$post_types,
			static function ( $a, $b ) {
				return strcasecmp( $a['label'], $b['label'] );
			}
		);

		return $post_types;
	}

	/**
	 * Build a canonical map of known post types.
	 *
	 * @return array
	 */
	public function get_default_post_type_map() {
		$defaults = $this->get_default_advanced_settings();
		$map      = array();

		foreach ( $defaults['postTypes'] as $type ) {
			$map[ $type['id'] ] = $type;
		}

		return $map;
	}

	/**
	 * Build a canonical map of known editor support records.
	 *
	 * @return array
	 */
	public function get_default_editor_support_map() {
		$defaults = $this->get_default_advanced_settings();
		$map      = array();

		foreach ( $defaults['editorSupport'] as $editor ) {
			$map[ $editor['editor'] ] = $editor;
		}

		return $map;
	}

	/**
	 * Sanitize advanced settings payload.
	 *
	 * @param mixed $input Raw settings payload.
	 * @return array
	 */
	public function sanitize_advanced_settings( $input ) {
		$defaults           = $this->get_default_advanced_settings();
		$post_type_map      = $this->get_default_post_type_map();
		$editor_support_map = $this->get_default_editor_support_map();

		if ( ! is_array( $input ) ) {
			return $defaults;
		}

		$sanitized = $defaults;

		// Helper
		$get_bool = fn( $arr, $key, $default ) => isset( $arr[ $key ] ) ? (bool) $arr[ $key ] : $default;
		$get_text = fn( $arr, $key, $default ) => isset( $arr[ $key ] ) ? sanitize_text_field( (string) $arr[ $key ] ) : $default;

		/**
		 * Post Types
		 */
		if ( ! empty( $input['postTypes'] ) && is_array( $input['postTypes'] ) ) {
			$enabled_map = array();

			foreach ( $input['postTypes'] as $type ) {
				if ( empty( $type['id'] ) || ! is_array( $type ) ) {
					continue;
				}

				$id = sanitize_key( $type['id'] );

				if ( isset( $post_type_map[ $id ] ) ) {
					$enabled_map[ $id ] = $get_bool( $type, 'enabled', $post_type_map[ $id ]['enabled'] );
				}
			}

			$sanitized['postTypes'] = array_map(
				function ( $type ) use ( $enabled_map ) {
					$id = $type['id'];
					return array(
						'id'      => $id,
						'label'   => $type['label'],
						'enabled' => $enabled_map[ $id ] ?? $type['enabled'],
					);
				},
				$defaults['postTypes']
			);
		}

		/**
		 * Exclusion
		 */
		if ( ! empty( $input['exclusion'] ) ) {
			$sanitized['exclusion']['excludedIds'] =
				$get_text( $input['exclusion'], 'excludedIds', $defaults['exclusion']['excludedIds'] );
		}

		/**
		 * Styling
		 */
		if ( ! empty( $input['styling'] ) ) {
			$styling = $input['styling'];

			$sanitized['styling'] = array(
				'customCss'      => isset( $styling['customCss'] )
					? sanitize_textarea_field( $styling['customCss'] )
					: $defaults['styling']['customCss'],

				'customCssClass' => isset( $styling['customCssClass'] )
					? sanitize_html_class( $styling['customCssClass'] )
					: $defaults['styling']['customCssClass'],
			);
		}

		/**
		 * Performance
		 */
		if ( ! empty( $input['performance'] ) ) {
			$p = $input['performance'];

			$sanitized['performance'] = array(
				'enableCache' => $get_bool( $p, 'enableCache', $defaults['performance']['enableCache'] ),
				'cacheExpiry' => isset( $p['cacheExpiry'] )
					? max( 1, min( 168, absint( $p['cacheExpiry'] ) ) )
					: $defaults['performance']['cacheExpiry'],
				'dataCleanup' => $get_bool( $p, 'dataCleanup', $defaults['performance']['dataCleanup'] ),
			);
		}

		/**
		 * Accessibility
		 */
		if ( ! empty( $input['accessibility'] ) ) {
			$a = $input['accessibility'];

			$sanitized['accessibility'] = array(
				'enableKeyboard'      => $get_bool( $a, 'enableKeyboard', $defaults['accessibility']['enableKeyboard'] ),
				'keyboardShortcut'    => $get_text( $a, 'keyboardShortcut', $defaults['accessibility']['keyboardShortcut'] ),
				'enableRTL'           => $get_bool( $a, 'enableRTL', $defaults['accessibility']['enableRTL'] ),
				'enableAccessibility' => $get_bool( $a, 'enableAccessibility', $defaults['accessibility']['enableAccessibility'] ),
			);
		}

		/**
		 * SEO
		 */
		if ( ! empty( $input['seo'] ) ) {
			$seo = $input['seo'];

			$sanitized['seo'] = array(
				'excludeNoindex' => $get_bool( $seo, 'excludeNoindex', $defaults['seo']['excludeNoindex'] ),
				'noFollow'       => $get_bool( $seo, 'noFollow', $defaults['seo']['noFollow'] ),
				'seoElement'     => in_array(
					$seo['seoElement'] ?? '',
					array( 'link', 'button' ),
					true
				) ? sanitize_text_field( $seo['seoElement'] ) : $defaults['seo']['seoElement'],
			);

			$sanitized['seo']['platform'] = $this->sanitize_seo_platforms(
				$seo['platform'] ?? null,
				$defaults
			);
		}

		/**
		 * Translations
		 */
		if ( ! empty( $input['translations'] ) ) {
			$sanitized['translations'] = array_values(
				array_filter(
					array_map(
						function ( $t ) {
							if ( empty( $t['locale'] ) ) {
								return null;
							}

							$locale = sanitize_text_field( $t['locale'] );

							return array(
								'locale'     => $locale,
								'label'      => sanitize_text_field( $t['label'] ?? $locale ),
								'buttonText' => sanitize_text_field( $t['buttonText'] ?? '' ),
							);
						},
						$input['translations']
					)
				)
			);
		}

		/**
		 * Editor Support
		 */
		if ( ! empty( $input['editorSupport'] ) ) {
			$sanitized['editorSupport'] = array_values(
				array_filter(
					array_map(
						function ( $editor ) use ( $editor_support_map ) {
							if ( empty( $editor['editor'] ) ) {
								return null;
							}

							$id = sanitize_key( $editor['editor'] );

							if ( ! isset( $editor_support_map[ $id ] ) ) {
								return null;
							}

							$base = $editor_support_map[ $id ];

							return array(
								'editor'      => $base['editor'],
								'label'       => $base['label'],
								'description' => $base['description'],
								'supported'   => isset( $editor['supported'] )
									? (bool) $editor['supported']
									: $base['supported'],
							);
						},
						$input['editorSupport']
					)
				)
			);
		}

		return $sanitized;
	}

	/**
	 * Sanitize SEO platforms while keeping default metadata.
	 *
	 * @param mixed $input Platform payload.
	 * @param array $defaults Default settings.
	 * @return array
	 */
	private function sanitize_seo_platforms( $input, $defaults ) {
		$platform_defaults = $defaults['seo']['platform'] ?? array();
		if ( empty( $platform_defaults ) || ! is_array( $platform_defaults ) ) {
			return array();
		}

		if ( ! is_array( $input ) ) {
			return $platform_defaults;
		}

		$name_map = array();
		foreach ( $platform_defaults as $slug => $platform ) {
			if ( ! empty( $platform['name'] ) ) {
				$name_map[ strtolower( (string) $platform['name'] ) ] = $slug;
			}
		}

		$sanitized = array();
		foreach ( $input as $key => $value ) {
			if ( is_array( $value ) ) {
				$slug = is_string( $key ) ? sanitize_key( $key ) : '';
				if ( empty( $slug ) || ! isset( $platform_defaults[ $slug ] ) ) {
					continue;
				}

				$base               = $platform_defaults[ $slug ];
				$sanitized[ $slug ] = array(
					'name'     => sanitize_text_field( (string) ( $value['name'] ?? $base['name'] ?? '' ) ),
					'file'     => sanitize_text_field( (string) ( $value['file'] ?? $base['file'] ?? '' ) ),
					'meta_key' => sanitize_text_field( (string) ( $value['meta_key'] ?? $base['meta_key'] ?? '' ) ),
					'noindex'  => sanitize_text_field( (string) ( $value['noindex'] ?? $base['noindex'] ?? '' ) ),
					'is_array' => isset( $value['is_array'] ) ? (bool) $value['is_array'] : ( $base['is_array'] ?? false ),
					'custom'   => isset( $value['custom'] ) ? (bool) $value['custom'] : ( $base['custom'] ?? false ),
				);
				continue;
			}

			if ( is_string( $value ) ) {
				$slug = sanitize_key( $value );
				if ( isset( $platform_defaults[ $slug ] ) ) {
					$sanitized[ $slug ] = $platform_defaults[ $slug ];
					continue;
				}

				$name_key = strtolower( $value );
				if ( isset( $name_map[ $name_key ] ) ) {
					$slug               = $name_map[ $name_key ];
					$sanitized[ $slug ] = $platform_defaults[ $slug ];
				}
			}
		}

		return empty( $sanitized ) ? $platform_defaults : $sanitized;
	}

	/**
	 * Return merged advanced settings with defaults.
	 *
	 * @return array
	 */
	public function get_advanced_settings_option() {
		$defaults = $this->get_default_advanced_settings();
		$stored   = get_option( self::OPTION_NAME, array() );
		if ( empty( $stored ) ) {
			return $defaults;
		}

		return $this->sanitize_advanced_settings( $stored );
	}

	/**
	 * REST Callback: Get advanced settings.
	 *
	 * @return WP_REST_Response
	 */
	public function get_advanced_settings() {
		return new WP_REST_Response(
			array(
				'success' => true,
				'data'    => $this->get_advanced_settings_option(),
			),
			200
		);
	}

	/**
	 * REST Callback: Update advanced settings.
	 *
	 * @param WP_REST_Request $request Request object.
	 * @return WP_REST_Response
	 */
	public function update_advanced_settings( $request ) {
		$params    = $request->get_json_params();
		$sanitized = $this->sanitize_advanced_settings( $params );

		update_option( self::OPTION_NAME, $sanitized, false );

		return new WP_REST_Response(
			array(
				'success' => true,
				'message' => __( 'Advanced settings updated successfully', 'pointwise-summary' ),
				'data'    => $this->get_advanced_settings_option(),
			),
			200
		);
	}

	/**
	 * REST Callback: Reset advanced settings.
	 *
	 * @return WP_REST_Response
	 */
	public function reset_advanced_settings() {
		$defaults = $this->get_default_advanced_settings();
		update_option( self::OPTION_NAME, $defaults, false );

		return new WP_REST_Response(
			array(
				'success' => true,
				'message' => __( 'Advanced settings reset to defaults', 'pointwise-summary' ),
				'data'    => $this->get_advanced_settings_option(),
			),
			200
		);
	}
}
