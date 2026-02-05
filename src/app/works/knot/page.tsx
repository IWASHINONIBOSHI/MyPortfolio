'use client'; 
import { useState } from 'react';
import Link from 'next/link';

// ... (interface定義は前と同じ) ...
interface ApiResult {
  knot_id: string;
  polynomial_str?: string;
  coefficients?: number[];
  roots?: { string: string }[]; // 構造に合わせて少し修正
  status: string;
  error?: string;
}

export default function KnotPage() {
  const [knotId, setKnotId] = useState('4_1');
  const [result, setResult] = useState<ApiResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // 🐟アニメーション用フラグ
  const [showFish, setShowFish] = useState(false);

  const handleCalculate = async () => {
    setLoading(true);
    setResult(null);
    setError('');
    setShowFish(false); // 一旦隠す

    try {
      const res = await fetch(`/api?knot_id=${knotId}`);
      const data = await res.json();
      
      if (!res.ok || data.status === 'error') {
        throw new Error(data.error || `Server Error: ${res.status}`);
      }
      
      setResult(data);
      
      // 計算成功！魚を飛ばす
      setTimeout(() => setShowFish(true), 100);

    } catch (err: any) {
      console.error(err);
      setError(err.message || '計算に失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>
      
      {/* 🐟 魚のアニメーション要素 */}
      <div className={`fish-container ${showFish ? 'swim' : ''}`}>
        <div className="fish-body">🐟</div>
        <div className="bubble b1">.。o</div>
        <div className="bubble b2">o</div>
      </div>

      {/* スタイル定義（CSSファイルに移してもOK） */}
      <style jsx>{`
        .fish-container {
          position: fixed;
          bottom: -100px;
          right: -100px;
          font-size: 5rem;
          pointer-events: none;
          z-index: 50;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .fish-container.swim {
          opacity: 1;
          animation: fishJump 2s ease-in-out forwards;
        }
        @keyframes fishJump {
          0% { transform: translate(0, 0) rotate(-10deg); }
          20% { transform: translate(-20vw, -30vh) rotate(-30deg); }
          50% { transform: translate(-50vw, -10vh) rotate(10deg); }
          100% { transform: translate(-120vw, -80vh) rotate(45deg); }
        }
        .bubble { position: absolute; font-size: 1rem; color: #88ccff; }
        .b1 { top: -20px; left: 0; }
        .b2 { top: -40px; left: 10px; }
      `}</style>

      
      <h2>Alexander多項式の根計算())</h2>
      
      {/* ... 入力フォームなどは前のコードと同じ ... */}
      <div style={{ padding: '30px', backgroundColor: 'var(--secondary-bg)', borderRadius: '8px', margin: '30px 0' }}>
         <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <input 
            type="text" 
            value={knotId}
            onChange={(e) => setKnotId(e.target.value)}
            placeholder="4_1"
          />
          <button onClick={handleCalculate} disabled={loading}>
            {loading ? '計算中...' : '計算実行'}
          </button>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {result && (
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '6px' }}>
             <h4>結果 ({result.knot_id}):</h4>
             <p style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Δ(t) = {result.polynomial_str}</p>
             <ul>
               {result.roots?.map((r, i) => (
                 <li key={i}>x = {r.string}</li>
               ))}
             </ul>
          </div>
        )}
      </div>

      <Link href="/" style={{ color: '#888', textDecoration: 'underline' }}>&larr; ホームに戻る</Link>
    </div>
  );
}