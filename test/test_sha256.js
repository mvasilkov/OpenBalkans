'use strict'

const { assertEqual } = require('./util')

const enc = new TextEncoder
const string = 'sha256'
const uint8a = enc.encode(string)
const buf = Buffer.from(uint8a)
const result = '5d5b09f6dcb2d53a5fffc60c4ac0d55fabdf556069d6631545f42aa6e3500f2e'

exports.testSha256 = function testSha256({ sha256 }) {
    assertEqual(sha256(string), result)
    assertEqual(sha256(uint8a), result)
    assertEqual(sha256(buf), result)
}
