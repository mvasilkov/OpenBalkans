'use strict'

const assert = require('assert').strict
const { Buffer } = require('buffer')

const { Document } = require('../javascript/types')

function createDocument(Ld) {
    return new Document({
        Ld,
        Buf: Buffer.from('Contents', 'utf8'),
        Web: 'Web address',
        Ref: 'Reference tokens'.split(' '),
        Pon: 'Pon',
    })
}

exports.testBadLd = function testBadLd() {
    assert.throws(function () { createDocument('Pon') }, /Bad Ld: Pon/)
}

exports.testBuf = function testBuf() {
    const doc = createDocument('Buf')
}

exports.testWeb = function testWeb() {
    const doc = createDocument('Web')
}

exports.testJSON = function testJSON() {
    const doc = createDocument('JSON')
}
