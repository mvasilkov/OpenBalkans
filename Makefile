client: client/build/balkans.js client/build/web_workers.js

client/build/balkans.js: client/balkans.js
	browserify client/balkans.js --standalone Balkans | terser -c -o client/build/balkans.js

client/build/web_workers.js: client/web_workers.js
	browserify client/web_workers.js | terser -c -o client/build/web_workers.js
