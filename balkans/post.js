const jwt = require('jsonwebtoken')
const ObjectId = require('bson/lib/objectid')
const { PEM, getPK, encodePostKey, decodePostKey } = require('./util')

class Post {
    constructor(jwtString) {
        const decoded = jwt.decode(jwtString)
        const [objectid, pk] = decodePostKey(decoded.pk)
        this.props = jwt.verify(jwtString, PEM.encodePK(pk), { algorithms: ['ES256'] })
        this.jwtString = jwtString
        this.objectid = objectid
    }
}

Post.create = function create(sk, props) {
    props.pk = encodePostKey(new ObjectId, getPK(sk, true))
    const jwtString = jwt.sign(props, PEM.encodeSK(sk), { algorithm: 'ES256' })
    return new Post(jwtString)
}

module.exports = Post
