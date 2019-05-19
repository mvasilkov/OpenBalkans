'use strict'

const base58 = require('base-x')('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz')
const ObjectId = require('bson/lib/objectid')

// Post key

exports.encodePostKey = function encodePostKey(objectid, pk) {
    return [objectid.id, pk].map(base58.encode).join('.')
}

exports.decodePostKey = function decodePostKey(a) {
    const [buf, pk] = a.split('.').map(base58.decode)
    return [new ObjectId(buf), pk]
}
