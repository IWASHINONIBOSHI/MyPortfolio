// src/App.tsx
import './App.css'

function App() {
  return (
    <div className="container">
      {/*header*/}
      <header className="site-header">
        <h1>自己紹介兼ポートフォリオ</h1>
      </header>

      {/*body*//}
      <main className="site-main">
        <h2>自己紹介</h2>
        <p>いわしです。お絵描きを専攻しています。</p>
        <p>開発もどきをしています。ものすごい初心者です。</p>
        <h3>つくったもの</h3>
        <ul color='black'>
          <li>右クリックで文字数をカウントするgoogle chrome extension</li>
          <li>TypeScriptで作った時刻表アプリケーション</li>
        </ul>

        <div style={{ marginTop: '40px' }}>
          <h3>Links(No links are available. sorry!)</h3>
          <ul>
            <li>
              <a href="" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <a href="" target="_blank" rel="noreferrer">
                X (Twitter)
              </a>
            </li>
          </ul>
        </div>
      </main>

      {/*Footer*/}
      <footer className="site-footer">
        <p>&copy; {new Date().getFullYear()} Iwamoto</p>
      </footer>
    </div>
  )
}

export default App
