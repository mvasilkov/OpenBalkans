'use strict'

// PEM encode

function _encodeKeyPair(getPublicKey, longPublicKey) {
    return function encodeKeyPair(sk, pk = null) {
    }
}

function _encodePrivateKey(getPublicKey) {
    return function encodePrivateKey(sk, pk = null) {
    }
}

function _encodePublicKey(longPublicKey) {
    return function encodePublicKey(pk) {
    }
}

// PEM decode

function decodeKeyPair(a) {
}

function decodePrivateKey(a) {
}

function decodePublicKey(a) {
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
