FROM node:20-alpine

WORKDIR /app

# パッケージ定義を先にコピー（キャッシュ効率化のため）
COPY package*.json ./

# 依存関係のインストール
RUN npm install

# 全ファイルをコピー
COPY . .

# Viteのデフォルトポート
EXPOSE 5173

# 開発サーバー起動
CMD ["npm", "run", "dev", "--", "--host"]
