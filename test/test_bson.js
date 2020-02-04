'use strict'

const assert = require('assert').strict
const { Buffer } = require('buffer')

const bson = require('../bson/bson')
const Binary = require('../bson/binary')
const ObjectId = require('../bson/objectid')

exports['test Buffer |> serialize |> deserialize'] = () => {
    const buf = Buffer.from('hello, world', 'utf8')
    const a = bson.serialize({ buf })
    const b = bson.deserialize(a).buf

    assert(b instanceof Binary)
    assert(buf.equals(b.buffer))
}

exports['test ObjectId |> serialize |> deserialize'] = () => {
    const obj = new ObjectId
    const a = bson.serialize({ obj })
    const b = bson.deserialize(a).obj

    assert(b instanceof ObjectId)
    assert(/^[0-9a-f]{24}$/.test('' + b))
    assert.strictEqual(obj.toString(), b.toString())
}
