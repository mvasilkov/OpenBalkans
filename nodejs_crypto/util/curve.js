'use strict'

const crypto = require('crypto')

exports.getPublicKey = function getPublicKey(sk, short = false) {
    const curve = crypto.createECDH('prime256v1')
    curve.setPrivateKey(sk)
    return curve.getPublicKey(null, short ? 'compressed' : 'uncompressed')
}
