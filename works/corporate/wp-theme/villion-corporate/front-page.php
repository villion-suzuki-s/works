<?php
/**
 * フロントページ（設定 > 表示設定 で固定ページを指定しても、このテンプレートが使われます）
 *
 * @package villion-corporate
 */

get_header();
?>
<section class="hero" aria-labelledby="hero-title">
  <div class="container hero__in">
    <div>
      <p class="hero__label">PRECISION MACHINING / SINCE 1978</p>
      <h1 id="hero-title">図面の<span class="num">±0.01</span>を、<br>1個から量産まで。</h1>
      <p class="hero__lead">みなせ精工は、アルミ・ステンレス・樹脂の精密切削加工を行う町工場です。試作の1個から月数千個のロットまで、図面の確認から検査・納品まで社内で一貫して対応します。</p>
      <div class="hero__actions">
        <a class="btn btn--primary" href="<?php echo esc_url( home_url( '/contact/' ) ); ?>">図面を送って見積りを依頼</a>
        <a class="btn btn--ghost" href="<?php echo esc_url( home_url( '/business/' ) ); ?>">事業内容を見る</a>
      </div>
    </div>
    <div>
      <div class="hero__drawing">
        <svg viewBox="0 0 520 340" role="img" aria-labelledby="draw-t">
          <title id="draw-t">フランジ付きの円筒部品を正面と側面から描いた加工図面風のイラスト</title>
          <g fill="none" stroke="#c9d4e3" stroke-width="1.5">
            <rect x="60" y="80" width="150" height="180"/>
            <rect x="40" y="110" width="20" height="120"/>
            <rect x="210" y="110" width="20" height="120"/>
            <line x1="60" y1="140" x2="210" y2="140" stroke-dasharray="6 4"/>
            <line x1="60" y1="200" x2="210" y2="200" stroke-dasharray="6 4"/>
            <circle cx="390" cy="170" r="100"/>
            <circle cx="390" cy="170" r="60"/>
            <circle cx="390" cy="170" r="30" stroke="#ff9d7c" stroke-width="2"/>
            <circle cx="390" cy="85" r="8"/><circle cx="390" cy="255" r="8"/><circle cx="305" cy="170" r="8"/><circle cx="475" cy="170" r="8"/>
          </g>
          <g stroke="#9fb0c8" stroke-width="1" stroke-dasharray="14 4 3 4">
            <line x1="20" y1="170" x2="250" y2="170"/>
            <line x1="270" y1="170" x2="510" y2="170"/>
            <line x1="390" y1="50" x2="390" y2="290"/>
          </g>
          <g stroke="#ff9d7c" stroke-width="1.2" fill="#ff9d7c">
            <line x1="60" y1="290" x2="210" y2="290"/>
            <path d="M60 290l8-4v8zM210 290l-8-4v8z"/>
            <line x1="60" y1="265" x2="60" y2="296" stroke-width=".8"/>
            <line x1="210" y1="265" x2="210" y2="296" stroke-width=".8"/>
            <line x1="360" y1="170" x2="420" y2="170"/>
          </g>
          <g font-family="SF Mono, Menlo, Consolas, monospace" font-size="13" fill="#e6ecf4">
            <text x="100" y="312">60.00 ±0.01</text>
            <text x="404" y="160">⌀30 H7</text>
            <text x="20" y="40" fill="#9fb0c8" font-size="11">PART NO. MS-2041-A　MATERIAL A5052　SCALE 1:1</text>
          </g>
        </svg>
      </div>
      <dl class="hero__spec">
        <div><dt>対応ロット</dt><dd>1<small>個〜</small></dd></div>
        <div><dt>試作の目安</dt><dd>5<small>営業日</small></dd></div>
        <div><dt>保有設備</dt><dd>24<small>台</small></dd></div>
      </dl>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="svc-title">
  <div class="container">
    <div class="section-head section-head--split">
      <div>
        <p class="eyebrow">BUSINESS</p>
        <h2 id="svc-title">削る・確かめる・組む。<br>3つの工程を一つの工場で。</h2>
      </div>
      <p>工程ごとに外注先を探す手間をなくし、窓口をひとつにまとめます。担当者が図面を読み込み、加工方法や材質の代替案まで含めてご提案します。</p>
    </div>
    <div class="services">
      <a class="service" href="<?php echo esc_url( home_url( '/business/' ) ); ?>#machining">
        <span class="service__no">01</span>
        <svg viewBox="0 0 64 64" aria-hidden="true"><rect x="8" y="40" width="48" height="12" fill="#10213a"/><rect x="26" y="8" width="12" height="20" fill="#5b6b80"/><path d="M32 28v10" stroke="#d6451b" stroke-width="4"/><path d="M20 40h24v-4H20z" fill="#d6451b"/></svg>
        <h3>精密切削加工</h3>
        <p>マシニングセンタとCNC旋盤による、アルミ・ステンレス・樹脂部品の切削加工。</p>
        <span class="service__more">詳しく見る →</span>
      </a>
      <a class="service" href="<?php echo esc_url( home_url( '/business/' ) ); ?>#prototype">
        <span class="service__no">02</span>
        <svg viewBox="0 0 64 64" aria-hidden="true"><rect x="10" y="10" width="44" height="44" fill="none" stroke="#10213a" stroke-width="3"/><path d="M10 24h44M24 10v44" stroke="#5b6b80" stroke-width="2" stroke-dasharray="3 3"/><circle cx="40" cy="40" r="8" fill="#d6451b"/></svg>
        <h3>試作・小ロット</h3>
        <p>3Dデータのみ・手書きのポンチ絵からでも対応。1個からの試作を短納期で。</p>
        <span class="service__more">詳しく見る →</span>
      </a>
      <a class="service" href="<?php echo esc_url( home_url( '/business/' ) ); ?>#inspection">
        <span class="service__no">03</span>
        <svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="28" cy="28" r="16" fill="none" stroke="#10213a" stroke-width="4"/><path d="M40 40l14 14" stroke="#10213a" stroke-width="6" stroke-linecap="round"/><path d="M21 28l5 5 9-10" stroke="#d6451b" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <h3>検査・組立</h3>
        <p>三次元測定機による全数・抜き取り検査と、ユニット単位のサブ組立まで。</p>
        <span class="service__more">詳しく見る →</span>
      </a>
    </div>
  </div>
</section>

<section class="section section--navy" aria-labelledby="flow-title">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow">FLOW</p>
      <h2 id="flow-title">お問い合わせから納品まで</h2>
      <p>見積りは図面受領から原則2営業日以内に回答します。</p>
    </div>
    <ol class="process">
      <li><div><h3>お問い合わせ</h3><p>フォーム・電話・メールで図面をお送りください。</p></div></li>
      <li><div><h3>図面確認</h3><p>公差や仕上げなど、気になる点を担当者から確認します。</p></div></li>
      <li><div><h3>お見積り</h3><p>加工方法と納期、代替案を添えてご提示します。</p></div></li>
      <li><div><h3>加工</h3><p>工程表を共有し、進捗をお知らせします。</p></div></li>
      <li><div><h3>検査</h3><p>指定の検査項目に加え、必要に応じ成績書を添付します。</p></div></li>
      <li><div><h3>納品</h3><p>梱包仕様のご指定にも対応します。</p></div></li>
    </ol>
  </div>
</section>

<section class="section section--white" aria-labelledby="facts-title">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow">NUMBERS</p>
      <h2 id="facts-title">数字で見るみなせ精工</h2>
    </div>
    <dl class="facts">
      <div><dt>創業</dt><dd>1978<small>年</small></dd></div>
      <div><dt>従業員</dt><dd>32<small>名</small></dd></div>
      <div><dt>工作機械</dt><dd>24<small>台</small></dd></div>
      <div><dt>工場延床面積</dt><dd>1,850<small>㎡</small></dd></div>
    </dl>
  </div>
</section>

<section class="section" aria-labelledby="news-title">
  <div class="container">
    <div class="section-head section-head--split">
      <div>
        <p class="eyebrow">NEWS</p>
        <h2 id="news-title">お知らせ</h2>
      </div>
    </div>
    <ul class="news">
      <?php
      $villion_news = new WP_Query( array(
        'post_type'           => 'post',
        'posts_per_page'      => 3,
        'ignore_sticky_posts' => true,
        'no_found_rows'       => true,
      ) );
      if ( $villion_news->have_posts() ) :
        while ( $villion_news->have_posts() ) :
          $villion_news->the_post();
          $villion_cat = get_the_category();
          ?>
      <li><a href="<?php the_permalink(); ?>"><span><time datetime="<?php echo esc_attr( get_the_date( 'Y-m-d' ) ); ?>"><?php echo esc_html( get_the_date( 'Y.m.d' ) ); ?></time><?php if ( $villion_cat ) : ?><span class="cat"><?php echo esc_html( $villion_cat[0]->name ); ?></span><?php endif; ?></span><span class="ttl"><?php the_title(); ?></span></a></li>
          <?php
        endwhile;
        wp_reset_postdata();
      else :
        ?>
      <li><span style="display:block;padding:18px 4px;color:var(--ink-sub)">現在お知らせはありません。</span></li>
        <?php
      endif;
      ?>
    </ul>
  </div>
</section>
<section class="cta-band" aria-labelledby="cta-title">
  <div class="container cta-band__in">
    <div>
      <h2 id="cta-title">図面1枚から、お気軽にご相談ください。</h2>
      <p>「この公差で作れるか」「材質を変えてコストを下げたい」といったご相談も歓迎です。</p>
    </div>
    <div>
      <a class="cta-band__tel" href="tel:000-0000-0000">000-0000-0000</a>
      <span class="cta-band__tel-note">平日 8:30〜17:30（土日祝休み）</span>
    </div>
    <a class="btn" href="<?php echo esc_url( home_url( '/contact/' ) ); ?>">フォームで問い合わせる</a>
  </div>
</section>
<?php
get_footer();
