'use strict'

const assert = require('assert').strict
const { Buffer } = require('buffer')

const ObjectId = require('../bson/objectid')
const { PostRef, PostRefCollection } = require('../javascript/types')

const REF_A = new PostRef({
    Pk: Buffer.alloc(32, 0x0a),
    Id: ObjectId.createFromTime(0x0a),
    Dig: Buffer.alloc(32, 0x0a),
})
const REF_B = new PostRef({
    Pk: Buffer.alloc(32, 0x0b),
    Id: ObjectId.createFromTime(0x0b),
    Dig: Buffer.alloc(32, 0x0b),
})

exports.testEquals = function testEquals() {
    assert.strictEqual(REF_A.equals(REF_A), true)
    assert.strictEqual(REF_A.equals(REF_B), false)
}
