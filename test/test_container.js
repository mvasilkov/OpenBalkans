const assert = require('assert')
const jwt = require('jsonwebtoken')

const { assertEqual } = require('./util')
const { kdf } = require('../balkans/warpwallet')

const sk = kdf('PEM')

exports.testRoundTripPEM = function testRoundTripPEM({ getPublicKey, PEM }) {
    const pk = getPublicKey(sk)
    const encoded = PEM.encodeKeyPair(sk, pk)
    assertEqual(PEM.decodePublicKey(encoded.pk), pk)
    assertEqual(PEM.decodePrivateKey(encoded.sk), sk)
    const decoded = PEM.decodeKeyPair(encoded.sk)
    assertEqual(decoded.pk, pk)
    assertEqual(decoded.sk, sk)
}

exports.testRoundTripJWT = function testRoundTripJWT({ PEM }) {
    const encoded = PEM.encodeKeyPair(sk)
    const token = jwt.sign({ a: 64 }, encoded.sk, { algorithm: 'ES256' })
    const props = jwt.verify(token, encoded.pk, { algorithms: ['ES256'] })
    assert(Object.is(props.a, 64))
}

exports.testCompressedJWT = function testCompressedJWT({ getPublicKey, PEM }) {
    const pk = getPublicKey(sk, true)
    assert(Object.is(pk.length, 33))
    const token = jwt.sign({ a: 64 }, PEM.encodePrivateKey(sk), { algorithm: 'ES256' })
    const props = jwt.verify(token, PEM.encodePublicKey(pk), { algorithms: ['ES256'] })
    assert(Object.is(props.a, 64))
}
