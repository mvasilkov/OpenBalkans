'use strict'

const assert = require('assert').strict

const { deriveKey } = require('../javascript/warpwallet')

const chickens = 'Chickens'
const chickensSk = 'f0547fab4470cc8c5c3ab32282be4795e81652e30fe02815564b376980684b7e'
const salt = 'chickens@salt.org'
const saltSk = '1bd7e263cf0eee0cd5e19e0a65e361386b7a9e83c5e32bc0203b121c0015d335'

function toString(buf) {
    return Buffer.from(buf).toString('hex')
}

exports['test WarpWallet'] = () => {
    // Without salt
    assert.strictEqual(toString(deriveKey(chickens)), chickensSk)
    // With salt
    assert.strictEqual(toString(deriveKey(chickens, salt)), saltSk)
}
