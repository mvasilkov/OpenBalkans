'use strict'

const ObjectId = require('cwb/objectid')

const { assertEqual } = require('./util')
const { sk } = require('./test_container')

const b = a => Buffer.from(a, 'hex')

const tests = [
    { bytes: b(''), base58: '', base64url: '' },
    { bytes: b('feff'), base58: 'LQW', base64url: '_v8' },
    { bytes: b('000102'), base58: '15T', base64url: 'AAEC' },
    { bytes: b('deface'), base58: '2Htzh', base64url: '3vrO' },
    { bytes: b('0548fe3143'), base58: 'base58', base64url: 'BUj-MUM' },
]

exports.testBase58 = function testBase58({ base58 }) {
    for (const a of tests) {
        assertEqual(base58.encode(a.bytes), a.base58)
        assertEqual(base58.decode(a.base58), a.bytes)
    }
}

exports.testBase64url = function testBase64url({ base64url }) {
    for (const a of tests) {
        assertEqual(base64url.encode(a.bytes), a.base64url)
        assertEqual(base64url.decode(a.base64url), a.bytes)
    }
}

exports.testRoundTripPostKey = function testRoundTripPostKey({ getPublicKey, encodePostKey, decodePostKey }) {
    const pk = getPublicKey(sk, true)
    const objectid = new ObjectId
    const [a, b] = decodePostKey(encodePostKey(objectid, pk))
    assertEqual(a, objectid)
    assertEqual(b, pk)
}
