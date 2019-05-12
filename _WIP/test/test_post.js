const assert = require('assert')
const jwt = require('jsonwebtoken')

const { PEM, getPK, decodePostKey } = require('../balkans/util')
const { kdf } = require('../balkans/warpwallet')
const Post = require('../balkans/post')

const sk = kdf('Chickens')

exports.testPostCreate = function testPostCreate() {
    const pk = getPK(sk, true)
    const post = Post.create(sk, { a: 64 })
    const props = jwt.verify(post.jwtString, PEM.encodePK(pk), { algorithms: ['ES256'] })
    assert(Object.is(props.a, 64))
    assert(Object.is(decodePostKey(props.pk).pop().compare(pk), 0))
}

exports.testPostDecode = function testPostDecode() {
    const a = Post.create(sk, { a: 64 })
    const b = new Post(a.jwtString)
    assert(Object.is(b.props.a, 64))
    assert(Object.is(a.props.pk, b.props.pk))
}
