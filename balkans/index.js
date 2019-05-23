const ObjectId = require('cwb/objectid')

const { CriticalSection } = require('./util/critical_section')
const { getPublicKey, longPublicKey } = require('./util/curve')
const { PEM } = require('./util/container')({ getPublicKey, longPublicKey })
const { base58, decodePostKey, encodePostKey } = require('./util/util')
const { kdf } = require('./warpwallet')
const { WorkerClient } = require('./worker')

module.exports = {
    ObjectId,
    CriticalSection,
    base58,
    decodePostKey,
    encodePostKey,
    getPublicKey,
    longPublicKey,
    PEM,
    kdf,
    WorkerClient,
}
