'use strict'

const EC = require('elliptic').ec

exports.getPublicKey = function getPublicKey(sk, short = false) {
    const curve = new EC('p256')
    return Buffer.from(curve.keyFromPrivate(sk, 10).getPublic(short, true))
}

exports.longPublicKey = function longPublicKey(pk) {
    if (pk.length < 64) {
        const curve = new EC('p256')
        return Buffer.from(curve.keyFromPublic(pk, 10).getPublic(false, true))
    }
    return pk
}
