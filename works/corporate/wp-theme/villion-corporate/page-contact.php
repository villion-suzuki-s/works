<?php
/**
 * 固定ページ「お問い合わせ」（スラッグ: contact）。本文にフォームプラグインのショートコードを入れるとそちらを表示します
 *
 * @package villion-corporate
 */

get_header();
?>
<section class="page-hero">
  <div class="container page-hero__in">
    <nav class="breadcrumb" aria-label="パンくずリスト"><a href="<?php echo esc_url( home_url( '/' ) ); ?>">トップ</a> ／ お問い合わせ</nav>
    <p class="eyebrow">CONTACT</p>
    <h1>お問い合わせ</h1>
    <p>お見積り・技術的なご相談・工場見学のお申し込みを受け付けています。2営業日以内に担当者からご連絡します。</p>
  </div>
</section>

<section class="section">
  <div class="container contact-grid">
    <aside class="contact-side" aria-label="お電話・メールでのお問い合わせ">
      <div class="contact-card">
        <h2>お電話</h2>
        <a class="tel" href="tel:000-0000-0000">000-0000-0000</a>
        <p>平日 8:30〜17:30（土日祝休み）</p>
      </div>
      <div class="contact-card">
        <h2>メール</h2>
        <p style="margin-top:4px"><a href="mailto:info@example.com">info@example.com</a></p>
        <p>図面ファイルの添付は、合計10MBまで受け取れます。</p>
      </div>
      <div class="contact-card">
        <h2>図面の秘密保持について</h2>
        <p>お預かりした図面・データは見積りと加工の目的にのみ使用します。秘密保持契約の締結にも対応します。</p>
      </div>
    </aside>

    <?php
    while ( have_posts() ) :
      the_post();
      if ( '' !== trim( get_the_content() ) ) :
        ?>
    <div class="form entry-content"><?php the_content(); ?></div>
        <?php
      else :
        ?>
    <form class="form js-contact" action="#" method="post">
      <div class="form-row form-row--wide">
        <fieldset>
          <legend>お問い合わせ種別<span class="badge">必須</span></legend>
          <div class="radio-row">
            <label><input type="radio" name="kind" value="estimate" checked>お見積り</label>
            <label><input type="radio" name="kind" value="tech">技術的なご相談</label>
            <label><input type="radio" name="kind" value="visit">工場見学</label>
            <label><input type="radio" name="kind" value="other">その他</label>
          </div>
        </fieldset>
      </div>
      <div class="form-row"><label for="c-company">会社名<span class="badge">必須</span></label><input id="c-company" type="text" name="company" autocomplete="organization" required></div>
      <div class="form-row"><label for="c-dept">部署名<span class="badge badge--opt">任意</span></label><input id="c-dept" type="text" name="department"></div>
      <div class="form-row"><label for="c-name">お名前<span class="badge">必須</span></label><input id="c-name" type="text" name="name" autocomplete="name" required></div>
      <div class="form-row"><label for="c-tel">電話番号<span class="badge">必須</span></label><input id="c-tel" type="tel" name="tel" autocomplete="tel" placeholder="000-0000-0000" required></div>
      <div class="form-row form-row--wide"><label for="c-mail">メールアドレス<span class="badge">必須</span></label><input id="c-mail" type="email" name="email" autocomplete="email" placeholder="name@example.com" required></div>
      <div class="form-row"><label for="c-qty">数量<span class="badge badge--opt">任意</span></label>
        <select id="c-qty" name="qty"><option>1〜10個</option><option>11〜100個</option><option>101〜1,000個</option><option>1,001個以上</option><option>未定</option></select>
      </div>
      <div class="form-row"><label for="c-due">希望納期<span class="badge badge--opt">任意</span></label><input id="c-due" type="text" name="due" placeholder="例）11月末"></div>
      <div class="form-row form-row--wide"><label for="c-file">図面・データ<span class="badge badge--opt">任意</span></label><input id="c-file" type="file" name="drawing" accept=".pdf,.dxf,.step,.stp,.igs,.iges" aria-describedby="c-file-hint"><span class="hint" id="c-file-hint">PDF / DXF / STEP / IGES、合計10MBまで</span></div>
      <div class="form-row form-row--wide"><label for="c-msg">お問い合わせ内容<span class="badge">必須</span></label><textarea id="c-msg" name="message" required placeholder="材質・表面処理・用途など、分かる範囲でご記入ください"></textarea></div>
      <label class="agree"><input type="checkbox" name="agree" required><span>入力した情報を、お問い合わせへの回答のために利用することに同意します。</span></label>
      <button class="btn btn--primary" type="submit">送信内容を確認して送る</button>
      <p class="form-done" role="status" aria-live="polite" tabindex="-1">お問い合わせを受け付けました。2営業日以内に担当者からご連絡します。</p>
    </form>
        <?php
      endif;
    endwhile;
    ?>
  </div>
</section>
<?php
get_footer();
