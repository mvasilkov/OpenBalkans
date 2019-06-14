'use strict'

const sha256 = require('fast-sha256')

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

    sha256(a) {
        return this.pcs.enter()
            .then(() => this.workerInvoke(['sha256', a]))
            .then(b => this.pcs.leave(b))
    }
}

exports.setupWorker = function setupWorker() {
    const enc = new TextEncoder

    addEventListener('message', ({ data: options }) => {
        const fun = options.shift()
        switch (fun) {
            case 'kdf':
                postMessage(kdf.apply(null, options))
                break

            case 'sha256':
                const a = typeof options[0] == 'string' ? enc.encode(options[0]) : options[0]
                postMessage(sha256(a))
                break

            default:
                throw Error('NotImplemented')
        }
    })
}
