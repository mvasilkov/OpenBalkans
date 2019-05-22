const ObjectId = require('cwb/objectid')

const { CriticalSection } = require('./util/critical_section')
const { getPublicKey, longPublicKey } = require('./util/curve')
const { PEM } = require('./util/container')({ getPublicKey, longPublicKey })
const { decodePostKey, encodePostKey } = require('./util/util')
const { kdf } = require('./warpwallet')
const { WorkerClient } = require('./worker')

module.exports = {
    ObjectId,
    CriticalSection,
    decodePostKey,
    encodePostKey,
    getPublicKey,
    longPublicKey,
    PEM,
    kdf,
    WorkerClient,
}
