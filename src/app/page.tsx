import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <h2>自己紹介</h2>
      <p>IWASHINONIBOSHIです。結び目理論を専攻しています。</p>
      <p>TypeScriptでWebアプリなどの開発や、Pythonで実際の研究内容をシミュレーションするなどしています。</p>

      <h3>つくったもの</h3>
      {/* globals.css の .works-list を適用 */}
      <div className="works-list">
        <p>
          <Link href="/works/extension" style={{ textDecoration: 'underline', color: 'var(--primary)' }}>
            右クリックで文字数をカウントする Google Chrome Extension &rarr;
          </Link>
        </p>
        <p>
          <Link href="/works/timetable" style={{ textDecoration: 'underline', color: 'var(--primary)' }}>
            TypeScriptで作った時刻表アプリケーション &rarr;
          </Link>
        </p>
      </div>

      <div style={{ marginTop: '40px' }}>
        <h3>Links</h3>
        <p className="works-list">
          <a href="https://github.com/IWASHINONIBOSHI" target="_blank" rel="noreferrer">GitHub</a>
          <span style={{ margin: '0 10px' }}>/</span>
          <a href="#" target="_blank" rel="noreferrer">X (Twitter)</a>
        </p>
      </div>

      {/* 結び目計算へのリンクエリア */}
      <div style={{ marginTop: '50px', borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
        <p>▼ 開発中の機能</p>
        {/* globals.css で定義したボタン風リンククラスを使用 */}
        <Link href="/knot" className="button-link">
          Alexander多項式の根を計算する (Python連携) &rarr;
        </Link>
      </div>
    </>
  );
}