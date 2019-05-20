'use strict'

const assert = require('assert')

exports.toString = function toString(buf) {
    switch (buf.constructor.name) {
        case 'Buffer':
            return buf.toString('hex')

        case 'ObjectId':
            return buf.toString()

        case 'String':
            return buf

        case 'Uint8Array':
            return Array.from(buf).map(b => b.toString(16).padStart(2, '0')).join('')
    }
    throw Error(`Unknown buf: ${buf}`)
}

exports.assertEqual = function assertEqual(a, b, err) {
    assert(Object.is(exports.toString(a), exports.toString(b)), err)
}

exports.assertNotEqual = function assertNotEqual(a, b, err) {
    assert(!Object.is(exports.toString(a), exports.toString(b)), err)
}
