'use strict'

const ObjectId = require('cwb/objectid')

const { assertEqual } = require('./util')
const { sk } = require('./test_container')

exports.testBase58 = function testBase58({ base58 }) {
    const b = a => Buffer.from(a, 'hex')
    assertEqual(base58.encode(b('deface')), '2Htzh')
    assertEqual(base58.decode('base58'), b('0548fe3143'))
}

exports.testRoundTripPostKey = function testRoundTripPostKey({ getPublicKey, encodePostKey, decodePostKey }) {
    const pk = getPublicKey(sk, true)
    const objectid = new ObjectId
    const [a, b] = decodePostKey(encodePostKey(objectid, pk))
    assertEqual(a, objectid)
    assertEqual(b, pk)
}
