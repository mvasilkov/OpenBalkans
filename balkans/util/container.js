'use strict'

const pem = require('pem-file')

const ASN1_PK = Buffer.from([48, 89, 48, 19, 6, 7, 42, 134, 72, 206, 61, 2, 1, 6, 8, 42, 134, 72, 206, 61, 3, 1, 7, 3, 66, 0])
const ASN1_SK_1 = Buffer.from([48, 119, 2, 1, 1, 4, 32])
const ASN1_SK_2 = Buffer.from([160, 10, 6, 8, 42, 134, 72, 206, 61, 3, 1, 7, 161, 68, 3, 66, 0])
const ASN1_SK_END = ASN1_SK_1.length + 32 // Length of the private key

const PEM_PK = 'PUBLIC KEY'
const PEM_SK = 'EC PRIVATE KEY'

function _assert(a, b) {
    if (a) return
    throw Error(`Assertion failed in PEM.${b}()`)
}

// PEM encode

function _encodeKeyPair(getPublicKey, longPublicKey) {
    const encodePrivateKey = _encodePrivateKey(getPublicKey)
    const encodePublicKey = _encodePublicKey(longPublicKey)

    return function encodeKeyPair(sk, pk = null) {
        if (pk == null) pk = getPublicKey(sk)
        return {
            pk: encodePublicKey(pk),
            sk: encodePrivateKey(sk, pk),
        }
    }
}

function _encodePrivateKey(getPublicKey) {
    return function encodePrivateKey(sk, pk = null) {
        if (pk == null) pk = getPublicKey(sk)
        return pem.encode(Buffer.concat([ASN1_SK_1, sk, ASN1_SK_2, pk]), PEM_SK)
    }
}

function _encodePublicKey(longPublicKey) {
    return function encodePublicKey(pk) {
        pk = longPublicKey(pk)
        return pem.encode(Buffer.concat([ASN1_PK, pk]), PEM_PK)
    }
}

// PEM decode

function decodeKeyPair(a) {
    const buf = pem.decode(a)
    _assert(ASN1_SK_1.compare(buf, 0, ASN1_SK_1.length) == 0, 'decodeKeyPair')
    return {
        pk: buf.slice(ASN1_SK_END + ASN1_SK_2.length),
        sk: buf.slice(ASN1_SK_1.length, ASN1_SK_END),
    }
}

function decodePrivateKey(a) {
    const buf = pem.decode(a)
    _assert(ASN1_SK_1.compare(buf, 0, ASN1_SK_1.length) == 0, 'decodePrivateKey')
    return buf.slice(ASN1_SK_1.length, ASN1_SK_END)
}

function decodePublicKey(a) {
    const buf = pem.decode(a)
    _assert(ASN1_PK.compare(buf, 0, ASN1_PK.length) == 0, 'decodePublicKey')
    return buf.slice(ASN1_PK.length)
}

module.exports = ({ getPublicKey, longPublicKey }) => ({
    PEM: {
        decodeKeyPair,
        decodePrivateKey,
        decodePublicKey,
        encodeKeyPair: _encodeKeyPair(getPublicKey, longPublicKey),
        encodePrivateKey: _encodePrivateKey(getPublicKey),
        encodePublicKey: _encodePublicKey(longPublicKey),
    },
})
