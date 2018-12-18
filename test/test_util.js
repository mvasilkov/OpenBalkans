const assert = require('assert')
const jwt = require('jsonwebtoken')

const { PEM, getPK } = require('../balkans/util')
const { kdf } = require('../balkans/warpwallet')

exports.testRoundTripPEM = function testRoundTripPEM() {
    const sk = kdf('Chickens')
    const pk = getPK(sk)
    const encoded = PEM.encodeKeyPair(sk, pk)
    assert(PEM.decodePK(encoded.pk).equals(pk))
    assert(PEM.decodeSK(encoded.sk).equals(sk))
    const decoded = PEM.decodeKeyPair(encoded.sk)
    assert(decoded.pk.equals(pk))
    assert(decoded.sk.equals(sk))
}

exports.testRoundTripJWT = function testRoundTripJWT() {
    const encoded = PEM.encodeKeyPair(kdf('Chickens'))
    const token = jwt.sign({ a: 64 }, encoded.sk, { algorithm: 'ES256' })
    const props = jwt.verify(token, encoded.pk, { algorithms: ['ES256'] })
    assert(Object.is(props.a, 64))
}

exports.testCompressedJWT = function testCompressedJWT() {
    const sk = kdf('Chickens')
    const pk = getPK(sk, true)
    assert(Object.is(pk.length, 33))
    const token = jwt.sign({ a: 64 }, PEM.encodeSK(sk), { algorithm: 'ES256' })
    const props = jwt.verify(token, PEM.encodePK(pk), { algorithms: ['ES256'] })
    assert(Object.is(props.a, 64))
}
