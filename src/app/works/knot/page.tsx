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
  polynomial_str?: string;
  coefficients?: number[];
  roots?: RootResult[];
  status: string;
  error?: string;
}

export default function KnotPage() {
  const [knotId, setKnotId] = useState('4_1');
  const [result, setResult] = useState<ApiResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCalculate = async () => {
    setLoading(true);
    setResult(null);
    setError('');

    try {
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

      <div style={{ padding: '30px', backgroundColor: 'var(--secondary-bg)', borderRadius: '8px', margin: '30px 0' }}>
        <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
          結び目ID (Rolfsen Table)
        </label>
        <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '15px' }}>
          例: 3_1 (三葉結び目), 4_1 (8の字結び目), 5_2 ...
        </p>
        
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <input 
            type="text" 
            value={knotId}
            onChange={(e) => setKnotId(e.target.value)}
            placeholder="4_1"
          />
          <button 
            onClick={handleCalculate} 
            disabled={loading}
          >
            {loading ? '計算中...' : '計算実行'}
          </button>
        </div>

        {error && <p style={{ color: 'black', fontWeight: 'bold' }}>{error}</p>}

        {result && result.roots && (
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '6px', border: '1px solid var(--border)' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '1.2rem' }}>計算結果 ({result.knot_id}):</h4>
            <p style={{ fontWeight: 'bold', marginBottom: '15px', color: 'var(--primary)', fontSize: '1.1rem' }}>
              Δ(t) = {result.polynomial_str}
            </p>
            <ul style={{ fontFamily: 'monospace', listStyle: 'none' }}>
              {result.roots.map((root, index) => (
                <li key={index} style={{ marginBottom: '5px' }}>
                  x = {root.string} <br/>
                  <span style={{color: '#888', fontSize: '0.85em'}}>
                    (Re: {root.real.toFixed(5)}, Im: {root.imag.toFixed(5)})
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <Link href="/" style={{ color: '#888', textDecoration: 'underline' }}>
        &larr; ホームに戻る
      </Link>
    </div>
  );
}