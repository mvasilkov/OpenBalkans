const ObjectId = require('cwb/objectid')

const { CriticalSection } = require('./util/critical_section')
const { getPublicKey, longPublicKey } = require('./util/curve')
const { PEM } = require('./util/container')({ getPublicKey, longPublicKey })
const { Post } = require('./post')({ getPublicKey, PEM })
const { base58, base64url, decodePostKey, encodePostKey } = require('./util/util')
const { kdf } = require('./warpwallet')
const { sha256 } = require('./util/sha256')
const { WorkerClient } = require('./worker')

module.exports = {
    ObjectId,
    CriticalSection,
    base58,
    base64url,
    decodePostKey,
    encodePostKey,
    getPublicKey,
    longPublicKey,
    PEM,
    Post,
    kdf,
    sha256,
    WorkerClient,
}
