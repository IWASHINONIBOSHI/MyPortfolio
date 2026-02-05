import Link from 'next/link';

export default function ExtensionPage() {
  return (
    <div>
      <h2>文字数カウント拡張機能</h2>
      <p>右クリックメニューから、選択したテキストの文字数を瞬時にカウントできるChrome拡張機能です。</p>
      
      {/* 共通の背景色変数を使用 */}
      <div style={{ margin: '30px 0', padding: '30px', backgroundColor: 'var(--secondary-bg)', borderRadius: '8px' }}>
        <div style={{ marginBottom: '15px' }}>
          <strong>【開発技術】</strong>
          <p style={{ margin: '5px 0 0 0' }}>JavaScript, Manifest V3</p>
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <strong>【概要】</strong>
          <p style={{ margin: '5px 0 0 0' }}>選択範囲の文字数をカウントし、アラートで表示するシンプルなツールです。</p>
        </div>

        <div>
          <strong>【苦労した点】</strong>
          <p style={{ margin: '5px 0 0 0' }}>コンテキストメニュー(Context Menus API)の仕様理解と、Service Workerのライフサイクル管理に時間がかかりました。</p>
        </div>
      </div>

      <Link href="/" style={{ color: '#888', textDecoration: 'underline' }}>
        &larr; ホームに戻る
      </Link>
    </div>
  );
}