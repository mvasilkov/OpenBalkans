'use strict'

const _sha256 = require('fast-sha256')

let enc = null

exports.sha256 = function sha256(a) {
    if (typeof a == 'string') {
        if (enc == null) enc = new TextEncoder
        a = enc.encode(a)
    }
    return _sha256(a)
}
