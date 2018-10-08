install:
	npm install
publish:
	npm publish
lint:
	npm run eslint ./
build:
	npx babel src --out-dir dist