import Link from 'next/link';

export default function TimetablePage() {
  return (
    <div>
      <h2>時刻表アプリケーション</h2>
      <p>TypeScriptを用いて作成した、バスや電車の時刻表管理アプリです。</p>
      
      <div style={{ margin: '30px 0', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <p><strong>【開発技術】</strong> React, TypeScript</p>
        <p><strong>【特徴】</strong> オフラインでも動作するようにPWA化を検討中です。</p>
      </div>

      <Link href="/" style={{ color: '#666', textDecoration: 'underline' }}>
        &larr; ホームに戻る
      </Link>
    </div>
  );
}