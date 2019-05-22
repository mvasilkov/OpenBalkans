'use strict'

const ObjectId = require('cwb/objectid')

const { assertEqual } = require('./util')
const { sk } = require('./test_container')

exports.testRoundTripPostKey = function testRoundTripPostKey({ getPublicKey, encodePostKey, decodePostKey }) {
    const pk = getPublicKey(sk, true)
    const objectid = new ObjectId
    const [a, b] = decodePostKey(encodePostKey(objectid, pk))
    assertEqual(a, objectid)
    assertEqual(b, pk)
}
