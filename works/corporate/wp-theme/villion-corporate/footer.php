</main>

<footer class="site-footer">
  <div class="container site-footer__in">
    <div>
      <a class="site-logo" href="<?php echo esc_url( home_url( '/' ) ); ?>">
        <svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 2l16 9v18l-16 9-16-9V11z" fill="#ffffff"/><circle cx="20" cy="20" r="7" fill="none" stroke="#d6451b" stroke-width="3"/><path d="M20 2v6M36 11l-5 3M36 29l-5-3M20 38v-6M4 29l5-3M4 11l5 3" stroke="#0b1729" stroke-width="1.5"/></svg>
        <span><span class="site-logo__ja">株式会社みなせ精工</span><span class="site-logo__en">MINASE SEIKO CO., LTD.</span></span>
      </a>
      <address>〒000-0000 長野県上田市 みなせ台工業団地 3-12<br>TEL 000-0000-0000 ／ FAX 000-0000-0001<br>info@example.com</address>
    </div>
    <nav class="footer-nav" aria-label="フッターナビゲーション">
      <ul>
        <li><a href="<?php echo esc_url( home_url( '/' ) ); ?>">トップ</a></li>
        <li><a href="<?php echo esc_url( home_url( '/business/' ) ); ?>">事業紹介</a></li>
        <li><a href="<?php echo esc_url( home_url( '/company/' ) ); ?>">会社概要</a></li>
        <li><a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>">お問い合わせ</a></li>
      </ul>
    </nav>
  </div>
  <div class="container site-footer__copy">&copy; <?php echo esc_html( wp_date( 'Y' ) ); ?> MINASE SEIKO CO., LTD.</div>
</footer>
<?php wp_footer(); ?>
</body>
</html>
