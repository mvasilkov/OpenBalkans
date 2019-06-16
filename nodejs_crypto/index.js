const ObjectId = require('cwb/objectid')

const { CriticalSection } = require('../balkans/util/critical_section')
const { getPublicKey, longPublicKey } = require('./util/curve')
const { PEM } = require('../balkans/util/container')({ getPublicKey, longPublicKey })
const { Post } = require('../balkans/post')({ getPublicKey, PEM })
const { base58, base64url, decodePostKey, encodePostKey } = require('../balkans/util/util')
const { kdf } = require('./warpwallet')
const { sha256 } = require('./util/sha256')
const { WorkerClient } = require('../balkans/worker')

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
