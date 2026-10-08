<?php
/**
 * ヘッダー
 *
 * @package villion-corporate
 */
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#10213a">
<?php villion_meta_description(); ?>
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<a class="skip-link" href="#main">本文へスキップ</a>
<header class="site-header">
  <div class="container site-header__in">
    <a class="site-logo" href="<?php echo esc_url( home_url( '/' ) ); ?>">
      <svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 2l16 9v18l-16 9-16-9V11z" fill="#10213a"/><circle cx="20" cy="20" r="7" fill="none" stroke="#d6451b" stroke-width="3"/><path d="M20 2v6M36 11l-5 3M36 29l-5-3M20 38v-6M4 29l5-3M4 11l5 3" stroke="#f5f5f1" stroke-width="1.5"/></svg>
      <span><span class="site-logo__ja">みなせ精工</span><span class="site-logo__en">MINASE SEIKO CO., LTD.</span></span>
    </a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="global-nav"><span></span><span></span><span></span><span class="screen-reader-text">メニューを開く</span></button>
    <nav id="global-nav" class="global-nav" aria-label="グローバルナビゲーション">
      <?php
      if ( has_nav_menu( 'global' ) ) {
        wp_nav_menu( array(
          'theme_location' => 'global',
          'container'      => false,
          'items_wrap'     => '<ul>%3$s</ul>',
          'depth'          => 1,
        ) );
      } else {
        ?>
      <ul>
        <li><a href="<?php echo esc_url( home_url( '/' ) ); ?>" data-en="TOP"<?php if ( is_front_page() ) echo ' aria-current="page"'; ?>>トップ</a></li>
        <li><a href="<?php echo esc_url( home_url( '/business/' ) ); ?>" data-en="BUSINESS"<?php if ( is_page( 'business' ) ) echo ' aria-current="page"'; ?>>事業紹介</a></li>
        <li><a href="<?php echo esc_url( home_url( '/company/' ) ); ?>" data-en="COMPANY"<?php if ( is_page( 'company' ) ) echo ' aria-current="page"'; ?>>会社概要</a></li>
        <li class="nav-cta"><a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>"<?php if ( is_page( 'contact' ) ) echo ' aria-current="page"'; ?>>お問い合わせ</a></li>
      </ul>
        <?php
      }
      ?>
    </nav>
  </div>
</header>

<main id="main">
