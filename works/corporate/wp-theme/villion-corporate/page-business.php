<?php
/**
 * 固定ページ「事業紹介」（スラッグ: business）
 *
 * @package villion-corporate
 */

get_header();
?>
<section class="page-hero">
  <div class="container page-hero__in">
    <nav class="breadcrumb" aria-label="パンくずリスト"><a href="<?php echo esc_url( home_url( '/' ) ); ?>">トップ</a> ／ 事業紹介</nav>
    <p class="eyebrow">BUSINESS</p>
    <h1>事業紹介</h1>
    <p>切削加工を中心に、試作・検査・サブ組立まで。工程を社内でつなぐことで、品質と納期の責任を一か所で持ちます。</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <article class="biz" id="machining">
      <div class="biz__fig" aria-hidden="true">
        <svg viewBox="0 0 400 250"><rect x="40" y="180" width="320" height="30" fill="#10213a"/><rect x="150" y="30" width="100" height="80" fill="#5b6b80"/><rect x="185" y="110" width="30" height="30" fill="#8796aa"/><path d="M200 140v20" stroke="#d6451b" stroke-width="8"/><rect x="120" y="160" width="160" height="20" fill="#d6451b"/><g stroke="#d6451b" stroke-width="3" stroke-linecap="round"><path d="M170 150l-14-8M230 150l14-8M176 160l-20 2M224 160l20 2"/></g></svg>
      </div>
      <div>
        <p class="biz__no">01 / MACHINING</p>
        <h2>精密切削加工</h2>
        <p>マシニングセンタ・CNC旋盤・複合加工機を組み合わせ、角物・丸物どちらの部品にも対応します。半導体製造装置や検査装置の構造部品、治具の加工を多く手がけています。</p>
        <ul class="check">
          <li>寸法公差 ±0.01mm（形状・材質によりご相談）</li>
          <li>加工サイズ 最大 W800 × D500 × H400mm</li>
          <li>アルマイト・メッキ等の表面処理も手配可能</li>
        </ul>
      </div>
    </article>
    <article class="biz" id="prototype">
      <div class="biz__fig" aria-hidden="true">
        <svg viewBox="0 0 400 250"><rect x="60" y="40" width="180" height="170" fill="#ffffff" stroke="#10213a" stroke-width="3"/><g stroke="#5b6b80" stroke-width="2"><path d="M80 80h140M80 110h100M80 140h120"/></g><path d="M90 180c20-20 40 10 60-10s30 0 50-10" stroke="#d6451b" stroke-width="3" fill="none"/><path d="M270 80l60 34v68l-60 34-60-34v-68z" fill="#e6ecf4" stroke="#10213a" stroke-width="3"/><path d="M270 80v68l60 34M270 148l-60 34" stroke="#10213a" stroke-width="2" fill="none"/></svg>
      </div>
      <div>
        <p class="biz__no">02 / PROTOTYPE</p>
        <h2>試作・小ロット</h2>
        <p>2D図面がない段階でも、3Dデータや手書きのスケッチから加工用の図面を起こして試作します。開発段階の設計変更にも、版管理をしながら柔軟に対応します。</p>
        <ul class="check">
          <li>1個から受注、試作の納期目安は5営業日</li>
          <li>STEP / IGES / DXF / PDF のデータに対応</li>
          <li>量産時の加工コストを見据えた形状のご提案</li>
        </ul>
      </div>
    </article>
    <article class="biz" id="inspection">
      <div class="biz__fig" aria-hidden="true">
        <svg viewBox="0 0 400 250"><rect x="80" y="190" width="240" height="20" fill="#10213a"/><rect x="100" y="50" width="16" height="140" fill="#5b6b80"/><rect x="284" y="50" width="16" height="140" fill="#5b6b80"/><rect x="100" y="50" width="200" height="16" fill="#5b6b80"/><rect x="190" y="66" width="20" height="60" fill="#8796aa"/><circle cx="200" cy="132" r="6" fill="#d6451b"/><rect x="160" y="150" width="80" height="40" fill="#e6ecf4" stroke="#10213a" stroke-width="2"/></svg>
      </div>
      <div>
        <p class="biz__no">03 / INSPECTION &amp; ASSEMBLY</p>
        <h2>検査・組立</h2>
        <p>温度管理された検査室で、三次元測定機と各種測定器による検査を行います。加工した部品をユニットとして組み立て、動作確認をしたうえで納品することも可能です。</p>
        <ul class="check">
          <li>検査成績書・ミルシートの添付に対応</li>
          <li>空圧機器・ベアリング等の購入品を含むサブ組立</li>
          <li>トレーサビリティのためのロット管理</li>
        </ul>
      </div>
    </article>
  </div>
</section>

<section class="section section--white" aria-labelledby="equip-title">
  <div class="container two-col">
    <div>
      <div class="section-head">
        <p class="eyebrow">EQUIPMENT</p>
        <h2 id="equip-title">主要設備</h2>
      </div>
      <div class="table-wrap">
        <table class="data-table">
          <thead><tr><th scope="col">設備</th><th scope="col">仕様・用途</th><th scope="col" style="text-align:right">台数</th></tr></thead>
          <tbody>
            <tr><th scope="row">5軸マシニングセンタ</th><td>複雑形状・多面加工</td><td class="num">3</td></tr>
            <tr><th scope="row">立形マシニングセンタ</th><td>テーブル 1,000 × 500mm</td><td class="num">8</td></tr>
            <tr><th scope="row">CNC旋盤</th><td>最大加工径 ⌀300mm</td><td class="num">6</td></tr>
            <tr><th scope="row">複合加工機</th><td>旋削＋ミーリング</td><td class="num">2</td></tr>
            <tr><th scope="row">ワイヤ放電加工機</th><td>精密な抜き形状</td><td class="num">2</td></tr>
            <tr><th scope="row">三次元測定機</th><td>温度管理室に設置</td><td class="num">2</td></tr>
            <tr><th scope="row">画像寸法測定器</th><td>小物部品の全数検査</td><td class="num">1</td></tr>
          </tbody>
        </table>
      </div>
    </div>
    <div>
      <div class="section-head">
        <p class="eyebrow">MATERIALS</p>
        <h2>対応材質</h2>
      </div>
      <h3 style="font-size:15px;margin-bottom:10px">金属</h3>
      <ul class="chips"><li>アルミ（A5052 / A6061 / A7075）</li><li>ステンレス（SUS303 / SUS304）</li><li>鉄（SS400 / S45C）</li><li>真鍮</li><li>銅</li></ul>
      <h3 style="font-size:15px;margin:24px 0 10px">樹脂</h3>
      <ul class="chips"><li>POM</li><li>PEEK</li><li>MCナイロン</li><li>アクリル</li><li>PTFE</li></ul>
      <p style="margin-top:20px;font-size:14px;color:var(--ink-sub)">上記以外の材質も、まずはご相談ください。</p>
    </div>
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
