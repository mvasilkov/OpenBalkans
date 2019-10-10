'use strict'

const assert = require('assert')
const { Buffer } = require('buffer')

const BSON = require('../bson/bson')
const ObjectId = require('../bson/objectid')

exports.testBuffer = function testBuffer() {
    const buf = Buffer.from('hello, world', 'utf8')
    const a = BSON.serialize({ buf })
    const b = BSON.deserialize(a).buf
    assert(buf.equals(b.buffer))
}

exports.testObjectId = function testObjectId() {
    const obj = new ObjectId
    const a = BSON.serialize({ obj })
    const b = BSON.deserialize(a).obj
    assert.strictEqual(obj.toString(), b.toString())
}
