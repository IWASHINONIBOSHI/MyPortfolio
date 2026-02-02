import Link from 'next/link';

export default function TimetablePage() {
  return (
    <div>
      <h2>時刻表アプリケーション</h2>
      <p>TypeScriptを用いて作成した、バスや電車の時刻表管理アプリです。</p>
      
      <div style={{ margin: '30px 0', padding: '30px', backgroundColor: 'var(--secondary-bg)', borderRadius: '8px' }}>
        <div style={{ marginBottom: '15px' }}>
          <strong>【開発技術】</strong>
          <p style={{ margin: '5px 0 0 0' }}>React, TypeScript</p>
        </div>
        
        <div>
          <strong>【特徴】</strong>
          <p style={{ margin: '5px 0 0 0' }}>ネットワークがない環境でも時刻を確認できるよう、PWA（Progressive Web App）化を検討中です。</p>
        </div>
      </div>

      <Link href="/" style={{ color: '#888', textDecoration: 'underline' }}>
        &larr; ホームに戻る
      </Link>
    </div>
  );
}