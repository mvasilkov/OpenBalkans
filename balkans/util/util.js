'use strict'

const base58 = require('base-x')('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz')
const base64url = require('base64url')
const ObjectId = require('cwb/objectid')

exports.base58 = base58
exports.base64url = {
    encode: base64url.encode,
    decode: base64url.toBuffer,
}

// Post key

exports.encodePostKey = function encodePostKey(objectid, pk) {
    return [objectid.id, pk].map(base58.encode).join('.')
}

exports.decodePostKey = function decodePostKey(a) {
    const [buf, pk] = a.split('.').map(base58.decode)
    return [new ObjectId(buf), pk]
}
