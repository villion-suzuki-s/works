<?php
/**
 * 投稿一覧・個別投稿など、専用テンプレートがない場合の表示
 *
 * @package villion-corporate
 */

get_header();
?>
<section class="page-hero">
	<div class="container page-hero__in">
		<p class="eyebrow"><?php echo is_singular() ? 'NEWS' : 'ARCHIVE'; ?></p>
		<h1>
			<?php
			if ( is_home() ) {
				echo 'お知らせ';
			} elseif ( is_archive() ) {
				the_archive_title();
			} elseif ( is_search() ) {
				printf( '「%s」の検索結果', esc_html( get_search_query() ) );
			} elseif ( is_singular() ) {
				single_post_title();
			} else {
				echo 'お知らせ';
			}
			?>
		</h1>
	</div>
</section>

<section class="section">
	<div class="container">
		<?php if ( have_posts() ) : ?>
			<?php if ( is_singular() ) : ?>
				<?php
				while ( have_posts() ) :
					the_post();
					?>
					<article id="post-<?php the_ID(); ?>" <?php post_class( 'entry' ); ?>>
						<p><time datetime="<?php echo esc_attr( get_the_date( 'Y-m-d' ) ); ?>" style="font-family:var(--mono);color:var(--steel)"><?php echo esc_html( get_the_date( 'Y.m.d' ) ); ?></time></p>
						<div class="entry-content"><?php the_content(); ?></div>
					</article>
				<?php endwhile; ?>
			<?php else : ?>
				<ul class="news">
					<?php
					while ( have_posts() ) :
						the_post();
						$villion_cat = get_the_category();
						?>
						<li><a href="<?php the_permalink(); ?>"><span><time datetime="<?php echo esc_attr( get_the_date( 'Y-m-d' ) ); ?>"><?php echo esc_html( get_the_date( 'Y.m.d' ) ); ?></time><?php if ( $villion_cat ) : ?><span class="cat"><?php echo esc_html( $villion_cat[0]->name ); ?></span><?php endif; ?></span><span class="ttl"><?php the_title(); ?></span></a></li>
					<?php endwhile; ?>
				</ul>
				<div class="pagination"><?php the_posts_pagination( array( 'mid_size' => 1 ) ); ?></div>
			<?php endif; ?>
		<?php else : ?>
			<p>該当する記事は見つかりませんでした。</p>
		<?php endif; ?>
	</div>
</section>
<?php
get_footer();
