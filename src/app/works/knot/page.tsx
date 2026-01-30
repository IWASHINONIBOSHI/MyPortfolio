'use client'; 

import { useState } from 'react';
import Link from 'next/link';

interface RootResult {
  real: number;
  imag: number;
  string: string;
}

interface ApiResult {
  knot_id: string;
  polynomial_str?: string; // 多項式の式も表示できるように追加
  coefficients?: number[];
  roots?: RootResult[];
  status: string;
  error?: string;
}

export default function KnotPage() {
  // 入力値を '1,-3,1' から '4_1' のようなIDに変更
  const [knotId, setKnotId] = useState('4_1');
  const [result, setResult] = useState<ApiResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCalculate = async () => {
    setLoading(true);
    setResult(null);
    setError('');

    try {
      // パラメータ名を 'coeffs' から 'knot_id' に変更
      const res = await fetch(`/api?knot_id=${knotId}`);
      const data = await res.json();
      
      if (!res.ok || data.status === 'error') {
        throw new Error(data.error || `Server Error: ${res.status}`);
      }
      
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || '計算に失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Alexander多項式の根計算 (Pyknotid)</h2>
      <p>結び目IDを指定して、Alexander多項式の根を計算します。</p>

      <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', margin: '20px 0' }}>
        <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
          結び目ID (Rolfsen Table)
        </label>
        <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '10px' }}>
          例: 3_1 (三葉結び目), 4_1 (8の字結び目), 5_2 ...
        </p>
        
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <input 
            type="text" 
            value={knotId}
            onChange={(e) => setKnotId(e.target.value)}
            placeholder="4_1"
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

        {result && result.roots && (
          <div style={{ backgroundColor: '#f0f9ff', padding: '15px', borderRadius: '5px', textAlign: 'left' }}>
            <h4 style={{ margin: '0 0 10px 0' }}>計算結果 ({result.knot_id}):</h4>
            <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>
              Δ(t) = {result.polynomial_str}
            </p>
            <ul style={{ fontFamily: 'monospace' }}>
              {result.roots.map((root, index) => (
                <li key={index}>
                  x = {root.string} <br/>
                  <span style={{color: '#888', fontSize: '0.8em'}}>
                    (Re: {root.real.toFixed(5)}, Im: {root.imag.toFixed(5)})
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