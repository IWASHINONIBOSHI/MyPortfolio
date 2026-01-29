from http.server import BaseHTTPRequestHandler
from urllib.parse import parse_qs, urlparse
import json
import numpy as np

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            # 1. URLからクエリパラメータを取得 (例: /api?coeffs=1,-3,1)
            query = urlparse(self.path).query
            params = parse_qs(query)
            
            # 'coeffs' というパラメータを探す (デフォルトは 4_2 の 1,-3,1)
            coeffs_str = params.get('coeffs', ['1,-3,1'])[0]
            
            # 文字列 "1,-3,1" を 数値リスト [1.0, -3.0, 1.0] に変換
            coeffs = [float(x) for x in coeffs_str.split(',')]

            # 2. numpyを使って根（Roots）を計算
            # np.roots は多項式の係数リストを渡すと根を複素数で返します
            roots = np.roots(coeffs)

            # 3. 結果をJSON用に整形 (複素数を文字列などに変換)
            formatted_roots = []
            for r in roots:
                # 実部と虚部に分ける
                formatted_roots.append({
                    "real": r.real,
                    "imag": r.imag,
                    "string": str(r).replace('j', 'i') # Pythonのjを数学のiに置換
                })

            result = {
                "polynomial_coefficients": coeffs,
                "roots": formatted_roots,
                "status": "success"
            }
            status_code = 200

        except Exception as e:
            # エラー処理 (変な文字が入っていた場合など)
            result = {
                "error": str(e),
                "status": "error"
            }
            status_code = 400

        # 4. レスポンスを返却
        self.send_response(status_code)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(result).encode('utf-8'))
        return