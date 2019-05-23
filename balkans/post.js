'use strict'

const jwt = require('jsonwebtoken')
const ObjectId = require('cwb/objectid')

const { decodePostKey, encodePostKey } = require('./util/util')

module.exports = ({ getPublicKey, PEM }) => {
    class Post {
        constructor(jwtString) {
            const decoded = jwt.decode(jwtString)
            const [objectid, pk] = decodePostKey(decoded.pk)
            this.props = jwt.verify(jwtString, PEM.encodePublicKey(pk), { algorithms: ['ES256'] })
            this.jwtString = jwtString
            this.objectid = objectid
        }

        toString() {
            return this.jwtString
        }
    }

    Post.create = function create(objectid, sk, props) {
        if (typeof props == 'undefined') {
            props = sk
            sk = objectid
            objectid = new ObjectId
        }
        props.pk = encodePostKey(objectid, getPublicKey(sk, true))
        const jwtString = jwt.sign(props, PEM.encodePrivateKey(sk), { algorithm: 'ES256' })
        return new Post(jwtString)
    }

    return { Post }
}
