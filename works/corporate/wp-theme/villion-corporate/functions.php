<?php
/**
 * VILLION Corporate テーマの機能定義
 *
 * @package villion-corporate
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'VILLION_THEME_VERSION', '1.1.0' );

/**
 * テーマのセットアップ
 */
function villion_setup() {
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ) );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'align-wide' );

	register_nav_menus(
		array(
			'global' => 'グローバルナビゲーション',
		)
	);
}
add_action( 'after_setup_theme', 'villion_setup' );

/**
 * CSS / JS の読み込み
 */
function villion_enqueue_assets() {
	wp_enqueue_style( 'villion-style', get_stylesheet_uri(), array(), VILLION_THEME_VERSION );
	wp_enqueue_script(
		'villion-main',
		get_template_directory_uri() . '/assets/main.js',
		array(),
		VILLION_THEME_VERSION,
		array(
			'in_footer' => true,
			'strategy'  => 'defer',
		)
	);
}
add_action( 'wp_enqueue_scripts', 'villion_enqueue_assets' );

/**
 * 演出用のクラスを、描画の前に <html> へ付ける
 * （動きを減らす設定の閲覧者には付けない。JSが読み込めなかったときは2.5秒後に外す）
 */
function villion_motion_flag() {
	echo "<script>(function(h){try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)h.className+=' fx';}catch(e){}setTimeout(function(){if(!window.FX_READY)h.classList.remove('fx');},2500);})(document.documentElement);</script>\n";
}
add_action( 'wp_head', 'villion_motion_flag', 1 );

/**
 * タイトルの区切り文字を「｜」にする
 *
 * @return string
 */
function villion_title_separator() {
	return '｜';
}
add_filter( 'document_title_separator', 'villion_title_separator' );

/**
 * meta description を出力する
 * 固定ページ・投稿は抜粋、それ以外はサイトのキャッチフレーズを使う。
 * SEOプラグインを使う場合は、この関数を header.php から外してください。
 */
function villion_meta_description() {
	$description = '';
	if ( is_singular() ) {
		$post = get_queried_object();
		if ( $post && has_excerpt( $post ) ) {
			$description = get_the_excerpt( $post );
		}
	}
	if ( '' === $description ) {
		$description = get_bloginfo( 'description' );
	}
	if ( '' !== $description ) {
		printf( '<meta name="description" content="%s">' . "\n", esc_attr( wp_strip_all_tags( $description ) ) );
	}
}

/**
 * 固定ページで抜粋を使えるようにする（meta description 用）
 */
function villion_page_excerpt() {
	add_post_type_support( 'page', 'excerpt' );
}
add_action( 'init', 'villion_page_excerpt' );

/**
 * メニュー項目に追加CSSクラス「nav-cta」を付けると、ボタン表示になる（外観 > メニュー > 表示オプション > CSSクラス）
 * 追加の処理は不要。ここでは説明のみ。
 */
