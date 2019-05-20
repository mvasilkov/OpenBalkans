'use strict'

const assert = require('assert')

const { assertEqual, assertNotEqual } = require('./util')

const chickens = 'Chickens'
const chickensSk = 'f0547fab4470cc8c5c3ab32282be4795e81652e30fe02815564b376980684b7e'
const salt = 'chickens@salt.org'
const saltSk = '1bd7e263cf0eee0cd5e19e0a65e361386b7a9e83c5e32bc0203b121c0015d335'

assert(chickensSk.length == 64)
assert(saltSk.length == 64)

exports.testWarpWallet = function testWarpWallet({ kdf }) {
    console.log('\t\tWith purejs not set')
    assertEqual(kdf(chickens), chickensSk)
    assertEqual(kdf(chickens, salt), saltSk)

    if (kdf.toString().includes('purejs')) {
        console.log('\t\tWith purejs = true')
        assertEqual(kdf(chickens, '', true), chickensSk)
        assertEqual(kdf(chickens, salt, true), saltSk)
    }

    // bad path
    assertNotEqual(kdf(chickens + ' '), chickensSk)
    assertNotEqual(kdf(chickens, salt + ' '), saltSk)
}

const c1 = 'Chicke\u00f1s' // 'Chickeñs'.length == 8
const c2 = 'Chicken\u0303s' // 'Chickeñs'.length == 9

exports.testWarpWalletNFC = function testWarpWalletNFC({ kdf }) {
    assertEqual(kdf(c1), kdf(c2), 'Should normalize passphrase')
    assertEqual(kdf(chickens, c1), kdf(chickens, c2), 'Should normalize salt')

    // bad path
    assertNotEqual(kdf(chickens), kdf(c1))
}
