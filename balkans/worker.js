'use strict'

const { CriticalSection } = require('./util/critical_section')
const { kdf } = require('./warpwallet')

exports.WorkerClient = class WorkerClient {
    constructor(url) {
        if (typeof url == 'string')
            this.worker = new Worker(url)
        else this.worker = url

        this.pcs = new CriticalSection
    }

    workerInvoke(options) {
        return new Promise(resolve => {
            const handler = ({ data }) => {
                this.worker.removeEventListener('message', handler)
                resolve(data)
            }
            this.worker.addEventListener('message', handler)
            this.worker.postMessage(options)
        })
    }

    kdf(pwd, salt) {
        return this.pcs.enter()
            .then(() => this.workerInvoke(['kdf', pwd, salt]))
            .then(sk => this.pcs.leave(sk))
    }
}

exports.setupWorker = function setupWorker() {
    addEventListener('message', ({ data: options }) => {
        const fun = options.shift()
        switch (fun) {
            case 'kdf':
                postMessage(kdf.apply(null, options))
                break

            default:
                throw Error('NotImplemented')
        }
    })
}
