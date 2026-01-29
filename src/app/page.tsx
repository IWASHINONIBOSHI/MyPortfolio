// src/app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <h2>自己紹介</h2>
      <p>いわしです。お絵描きを専攻しています。</p>
      <p>開発もどきをしています。ものすごい初心者です。</p>

      <h3>つくったもの</h3>
      {/* リストのデザイン調整 */}
      <ul style={{ color: 'black', lineHeight: '2' }}>
        <li>
          <Link href="/works/extension" style={{ color: 'blue', textDecoration: 'underline' }}>
            右クリックで文字数をカウントするgoogle chrome extension &rarr;
          </Link>
        </li>
        <li>
          <Link href="/works/timetable" style={{ color: 'blue', textDecoration: 'underline' }}>
            TypeScriptで作った時刻表アプリケーション &rarr;
          </Link>
        </li>
      </ul>

      <div style={{ marginTop: '40px' }}>
        <h3>Links (No links are available. sorry!)</h3>
        <ul>
          <li><a href="" target="_blank" rel="noreferrer">GitHub</a></li>
          <li><a href="" target="_blank" rel="noreferrer">X (Twitter)</a></li>
        </ul>
      </div>

      {/* 結び目計算へのリンクエリア */}
      <div style={{ marginTop: '50px', borderTop: '1px solid #ddd', paddingTop: '20px' }}>
        <p>▼ 開発中の機能</p>
        <Link 
          href="/knot"
          style={{ 
            display: 'inline-block',
            padding: '10px 20px', 
            backgroundColor: '#0070f3', 
            color: 'white', 
            textDecoration: 'none', 
            borderRadius: '5px' 
          }}
        >
          Alexander多項式の根を計算する (Python連携) &rarr;
        </Link>
      </div>
    </>
  );
}