const crypto = require('crypto')
const pem = require('pem-file')

const ASN1_PK = Buffer.from([48, 89, 48, 19, 6, 7, 42, 134, 72, 206, 61, 2, 1, 6, 8, 42, 134, 72, 206, 61, 3, 1, 7, 3, 66, 0])
const ASN1_SK_1 = Buffer.from([48, 119, 2, 1, 1, 4, 32])
const ASN1_SK_2 = Buffer.from([160, 10, 6, 8, 42, 134, 72, 206, 61, 3, 1, 7, 161, 68, 3, 66, 0])

const PEM_PK = 'PUBLIC KEY'
const PEM_SK = 'EC PRIVATE KEY'

exports.getPK = function getPK(sk, short = false) {
    const curve = crypto.createECDH('prime256v1')
    curve.setPrivateKey(sk)
    return curve.getPublicKey(null, short ? 'compressed' : 'uncompressed')
}

function encodePK(pk) {
    if (pk.length < 64)
        pk = crypto.ECDH.convertKey(pk, 'prime256v1')
    return pem.encode(Buffer.concat([ASN1_PK, pk]), PEM_PK)
}

function encodeSK(sk, pk = null) {
    if (pk == null) pk = exports.getPK(sk)
    return pem.encode(Buffer.concat([ASN1_SK_1, sk, ASN1_SK_2, pk]), PEM_SK)
}

function encodeKeyPair(sk, pk = null) {
    if (pk == null) pk = exports.getPK(sk)
    return {
        pk: encodePK(pk),
        sk: encodeSK(sk),
    }
}

exports.PEM = {
    encodeKeyPair,
    encodePK,
    encodeSK,
}
