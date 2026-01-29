import Link from 'next/link';

export default function ExtensionPage() {
  return (
    <div style={{ color: '#fff', padding: '20px', fontFamily: 'Arial' }}>
      <h2 >文字数カウント拡張機能</h2>
      <p>右クリックメニューから、選択したテキストの文字数を瞬時にカウントできるChrome拡張機能です。</p>
      
      <div style={{ margin: '30px 0', padding: '20px', backgroundColor: "#31097a", borderRadius: '8px' }}>
        <ul ><strong>【開発技術】</strong> JavaScript, Manifest V3</ul>
        <li><strong>【概要】</strong> </li>
        <ul><strong>【苦労した点】</strong> コンテキストメニューのAPIの仕様理解に時間がかかりました。</ul>
      </div>

      <Link href="/" style={{ color: '#666', textDecoration: 'underline' }}>
        &larr; ホームに戻る
      </Link>
    </div>
  );
}