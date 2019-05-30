'use strict'

const assert = require('assert')
const jwt = require('jsonwebtoken')

const { assertEqual } = require('./util')
const { sk } = require('./test_container')

exports.testCreatePost = function testCreatePost({ getPublicKey, decodePostKey, PEM, Post }) {
    const pk = getPublicKey(sk, true)
    const post = Post.create(sk, { a: 64 })
    const props = jwt.verify(post.jwtString, PEM.encodePublicKey(pk), { algorithms: ['ES256'] })
    assert(Object.is(props.a, 64))
    assertEqual(decodePostKey(props.pk).pop(), pk)
}

exports.testDecodePost = function testDecodePost({ Post }) {
    const a = Post.create(sk, { a: 64 })
    const b = new Post(a.jwtString)
    assert(Object.is(b.props.a, 64))
    assert(Object.is(a.props.pk, b.props.pk))
}

exports.testPostCycle = function testPostCycle({ ObjectId, getPublicKey, encodePostKey, Post }) {
    const pk = getPublicKey(sk, true)
    const aObjectId = new ObjectId
    const bObjectId = new ObjectId
    const a = Post.create(aObjectId, sk, { other: encodePostKey(bObjectId, pk) })
    const b = Post.create(bObjectId, sk, { other: encodePostKey(aObjectId, pk) })
    assert(Object.is(a.props.other, b.props.pk))
    assert(Object.is(b.props.other, a.props.pk))
}

exports.testNoTypeIssuedAt = function testNoTypeIssuedAt({ Post }) {
    const post = Post.create(sk, { a: 64 })
    const decoded = jwt.decode(post.toString(), { complete: true })
    assert(Object.is(decoded.header.hasOwnProperty('typ'), false))
    assert(Object.is(decoded.payload.hasOwnProperty('iat'), false))
    assert(Object.is(decoded.payload.a, 64))
}
