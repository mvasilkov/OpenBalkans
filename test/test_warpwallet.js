const assert = require('assert')

const { kdf } = require('../balkans/warpwallet')

const chickens = 'Chickens'
const chickensSk = 'f0547fab4470cc8c5c3ab32282be4795e81652e30fe02815564b376980684b7e'
const salt = 'chickens@salt.org'
const saltSk = '1bd7e263cf0eee0cd5e19e0a65e361386b7a9e83c5e32bc0203b121c0015d335'

assert(chickensSk.length == 64)
assert(saltSk.length == 64)

exports.testWarpWallet = function testWarpWallet() {
    assert(Object.is(kdf(chickens).toString('hex'), chickensSk))
    assert(Object.is(kdf(chickens, salt).toString('hex'), saltSk))

    assert(Object.is(kdf(chickens, '', true).toString('hex'), chickensSk))
    assert(Object.is(kdf(chickens, salt, true).toString('hex'), saltSk))
}

const c1 = 'Chicke\u00f1s' // 'Chickeñs'.length == 8
const c2 = 'Chicken\u0303s' // 'Chickeñs'.length == 9

exports.testWarpWalletNFC = function testWarpWalletNFC() {
    assert(kdf(c1).equals(kdf(c2)), 'Should normalize passphrase')
    assert(kdf(chickens, c1).equals(kdf(chickens, c2)), 'Should normalize salt')
}
