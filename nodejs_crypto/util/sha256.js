'use strict'

const crypto = require('crypto')

exports.sha256 = function sha256(a) {
    const b = crypto.createHash('sha256')
    b.update(a, 'utf8')
    return b.digest()
}
