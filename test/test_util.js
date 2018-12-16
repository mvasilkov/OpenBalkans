const assert = require('assert')
const jwt = require('jsonwebtoken')

const { PEM, getPK } = require('../balkans/util')
const { kdf } = require('../balkans/warpwallet')

exports.testRoundTrip = function testRoundTrip() {
    const { pk, sk } = PEM.encodeKeyPair(kdf('Chickens'))
    const token = jwt.sign({ a: 64 }, sk, { algorithm: 'ES256' })
    const props = jwt.verify(token, pk, { algorithms: ['ES256'] })
    assert(Object.is(props.a, 64))
}

exports.testCompressed = function testCompressed() {
    const sk = kdf('Chickens')
    const pk = getPK(sk, true)
    assert(Object.is(pk.length, 33))
    const token = jwt.sign({ a: 64 }, PEM.encodeSK(sk), { algorithm: 'ES256' })
    const props = jwt.verify(token, PEM.encodePK(pk), { algorithms: ['ES256'] })
    assert(Object.is(props.a, 64))
}
