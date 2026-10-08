<?php
/**
 * 固定ページ（専用テンプレートがないページ）
 *
 * @package villion-corporate
 */

get_header();

while ( have_posts() ) :
	the_post();
	?>
<section class="page-hero">
	<div class="container page-hero__in">
		<nav class="breadcrumb" aria-label="パンくずリスト"><a href="<?php echo esc_url( home_url( '/' ) ); ?>">トップ</a> ／ <?php the_title(); ?></nav>
		<h1><?php the_title(); ?></h1>
		<?php if ( has_excerpt() ) : ?>
			<p><?php echo esc_html( get_the_excerpt() ); ?></p>
		<?php endif; ?>
	</div>
</section>

<section class="section">
	<div class="container">
		<article id="post-<?php the_ID(); ?>" <?php post_class( 'entry' ); ?>>
			<div class="entry-content"><?php the_content(); ?></div>
		</article>
	</div>
</section>
	<?php
endwhile;

get_footer();
