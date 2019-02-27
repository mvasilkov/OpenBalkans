exports.Worker = class BalkansWorker {
    constructor(url) {
        this._worker = new Worker(url)
    }

    kdf(pwd, salt, done) {
        this._worker.onmessage = function onmessage(event) {
            done(event.data)
        }
        this._worker.postMessage(['kdf', pwd, salt])
    }
}
