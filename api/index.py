from http.server import BaseHTTPRequestHandler
from urllib.parse import parse_qs, urlparse
import json
import os
import numpy as np # 念のため計算用

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            # クエリ取得
            query = urlparse(self.path).query
            params = parse_qs(query)
            knot_id = params.get('knot_id', ['4_1'])[0]

            # JSONファイルのパス (apiフォルダと同じ場所にある前提)
            json_path = os.path.join(os.path.dirname(__file__), 'knot_data.json')
            
            # JSONを読み込む
            with open(json_path, 'r') as f:
                database = json.load(f)

            if knot_id in database:
                data = database[knot_id]
                
                # JSONには文字列で保存されているので、必要なら整形
                result = {
                    "knot_id": knot_id,
                    "polynomial_str": data["polynomial"],
                    "coefficients": data["coeffs"],
                    "roots": [{"string": r} for r in data["roots"]], # 簡易形式
                    "status": "success"
                }
            else:
                 # データがない場合 (動的計算はVercelでは諦めるか、numpyだけで頑張る)
                 # 今回は簡易的にエラーを返す
                 raise ValueError(f"Knot {knot_id} is not in the pre-calculated database.")

            status_code = 200

        except Exception as e:
            result = {
                "error": str(e),
                "status": "error"
            }
            status_code = 400

        self.send_response(status_code)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(result).encode('utf-8'))