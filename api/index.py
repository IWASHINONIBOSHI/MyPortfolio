from http.server import BaseHTTPRequestHandler
from urllib.parse import parse_qs, urlparse
import json
import numpy as np
import sympy
# pyknotidのカタログから結び目データを取得する関数
from pyknotid.catalogue import get_knot

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            # 1. URLパラメータを取得 (例: /api?knot_id=4_1)
            query = urlparse(self.path).query
            params = parse_qs(query)
            
            # デフォルトは '4_1' (8の字結び目)
            knot_id = params.get('knot_id', ['4_1'])[0]
            
            # 2. pyknotidを使って結び目オブジェクトを取得
            # 入力例: "3_1", "4_1", "5_2" など
            try:
                knot = get_knot(knot_id)
            except Exception:
                # データベースが見つからない、またはIDが無効な場合のフォールバック
                # (Vercel環境ではDBロードに失敗することがあるため、例外処理を入れています)
                raise ValueError(f"Knot '{knot_id}' not found or database unavailable.")

            # 3. Alexander多項式を計算 (変数tを使用)
            # 例: 4_1 -> t^2 - 3t + 1 (またはその同値)
            poly = knot.alexander_polynomial()
            
            # 4. SymPyを使って係数リストを抽出
            t = sympy.Symbol('t')
            # 多項式として正規化
            p = sympy.Poly(poly, t)
            # 係数リストを取得 (降べきの順: t^2, t^1, t^0...)
            coeffs = [float(c) for c in p.all_coeffs()]

            # 5. NumPyで根 (Roots) を計算
            roots = np.roots(coeffs)

            # 6. 結果を整形
            formatted_roots = []
            for r in roots:
                formatted_roots.append({
                    "real": r.real,
                    "imag": r.imag,
                    "string": str(r).replace('j', 'i')
                })

            result = {
                "knot_id": knot_id,
                "polynomial_str": str(poly).replace('**', '^'), # 読みやすく整形
                "coefficients": coeffs,
                "roots": formatted_roots,
                "status": "success"
            }
            status_code = 200

        except Exception as e:
            # エラー発生時
            result = {
                "error": str(e),
                "knot_id": knot_id if 'knot_id' in locals() else "unknown",
                "status": "error"
            }
            status_code = 400

        # レスポンス返却
        self.send_response(status_code)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(result).encode('utf-8'))
        return