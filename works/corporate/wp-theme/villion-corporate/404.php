<?php
/**
 * 404
 *
 * @package villion-corporate
 */

get_header();
?>
<section class="page-hero">
	<div class="container page-hero__in">
		<p class="eyebrow">404 NOT FOUND</p>
		<h1>ページが見つかりません</h1>
		<p>お探しのページは移動または削除された可能性があります。</p>
	</div>
</section>
<section class="section">
	<div class="container">
		<a class="btn btn--primary" href="<?php echo esc_url( home_url( '/' ) ); ?>">トップページへ戻る</a>
	</div>
</section>
<?php
get_footer();
