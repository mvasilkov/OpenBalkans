client := ./client/balkans.js
client_out := ./client/build/balkans.js
worker := ./client/balkans.worker.js
worker_out := ./client/build/balkans.worker.js

.PHONY: client
client:
	webpack $(client) -o $(client_out) \
		--output-library Balkans --output-library-target=umd \
		--module-bind js=babel-loader --mode production \
		--target web --display-modules

	webpack $(worker) -o $(worker_out) \
		--module-bind js=babel-loader --mode production \
		--target web --display-modules

	node client/build/clean.js
