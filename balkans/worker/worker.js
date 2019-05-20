'use strict'

const { kdf } = require('../warpwallet')

exports.initWorker = function initWorker() {
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
