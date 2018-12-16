const assert = require('assert')
const jwt = require('jsonwebtoken')

const { PEM } = require('../balkans/util')
const { kdf } = require('../balkans/warpwallet')

exports.testRoundTrip = function testRoundTrip() {
    const { pk, sk } = PEM.encodeKeyPair(kdf('Chickens'))
    const token = jwt.sign({ a: 64 }, sk, { algorithm: 'ES256' })
    const props = jwt.verify(token, pk, { algorithms: ['ES256'] })
    assert(Object.is(props.a, 64))
}
