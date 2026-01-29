'use client'; 

import { useState } from 'react';
import Link from 'next/link';

// ▼ 1. 型定義を追加 (ここが修正ポイント)
interface RootResult {
  real: number;
  imag: number;
  string: string;
}

interface ApiResult {
  polynomial_coefficients: number[];
  roots: RootResult[];
  status: string;
  source?: string;
}

export default function KnotPage() {
  const [coeffs, setCoeffs] = useState('1,-3,1');
  // ▼ 2. <any> を <ApiResult | null> に変更
  const [result, setResult] = useState<ApiResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCalculate = async () => {
    setLoading(true);
    setResult(null);
    setError('');

    try {
      const res = await fetch(`/api?coeffs=${coeffs}`);
      
      if (!res.ok) {
        throw new Error(`Server Error: ${res.status}`);
      }
      
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError('計算に失敗しました。Vercel環境(またはAPIサーバー)が起動しているか確認してください。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Alexander多項式の根計算</h2>
      <p>Python (NumPy) を使用して、多項式の根を計算します。</p>

      <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', margin: '20px 0' }}>
        <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
          係数入力 (カンマ区切り)
        </label>
        <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '10px' }}>
          例: 4_2結び目 (t² - 3t + 1) → 1,-3,1
        </p>
        
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <input 
            type="text" 
            value={coeffs}
            onChange={(e) => setCoeffs(e.target.value)}
            style={{ padding: '8px', flex: 1, fontSize: '16px', border: '1px solid #999', borderRadius: '4px' }}
          />
          <button 
            onClick={handleCalculate} 
            disabled={loading}
            style={{
              padding: '10px 20px',
              cursor: loading ? 'not-allowed' : 'pointer',
              backgroundColor: loading ? '#ccc' : '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontWeight: 'bold',
            }}
          >
            {loading ? '計算中...' : '計算実行'}
          </button>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {result && (
          <div style={{ backgroundColor: '#f0f9ff', padding: '15px', borderRadius: '5px', textAlign: 'left' }}>
            <h4 style={{ margin: '0 0 10px 0' }}>計算結果:</h4>
            <ul style={{ fontFamily: 'monospace' }}>
              {result.roots.map((root, index) => (
                <li key={index}>
                  x = {root.string} <br/>
                  <span style={{color: '#888', fontSize: '0.8em'}}>
                    (Re: {root.real}, Im: {root.imag})
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <Link href="/" style={{ color: '#666', textDecoration: 'underline' }}>
        &larr; ホームに戻る
      </Link>
    </div>
  );
}