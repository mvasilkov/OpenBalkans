const assert = require('assert')

const chickens = 'Chickens'
const chickensSk = 'f0547fab4470cc8c5c3ab32282be4795e81652e30fe02815564b376980684b7e'
const salt = 'chickens@salt.org'
const saltSk = '1bd7e263cf0eee0cd5e19e0a65e361386b7a9e83c5e32bc0203b121c0015d335'

assert(chickensSk.length == 64)
assert(saltSk.length == 64)

function toString(buf) {
    switch (buf.constructor.name) {
        case 'Buffer':
            return buf.toString('hex')

        case 'Uint8Array':
            return Array.from(buf).map(b => b.toString(16).padStart(2, '0')).join('')
    }
    throw Error(`Unknown buf: ${buf}`)
}

exports.testWarpWallet = function testWarpWallet({ kdf }) {
    console.log('\t\tWith purejs = false')
    assert(Object.is(toString(kdf(chickens)), chickensSk))
    assert(Object.is(toString(kdf(chickens, salt)), saltSk))

    if (kdf.toString().includes('purejs')) {
        console.log('\t\tWith purejs = true')
        assert(Object.is(toString(kdf(chickens, '', true)), chickensSk))
        assert(Object.is(toString(kdf(chickens, salt, true)), saltSk))
    }

    // bad path
    assert(!Object.is(toString(kdf(chickens + ' ')), chickensSk))
    assert(!Object.is(toString(kdf(chickens, salt + ' ')), saltSk))
}

const c1 = 'Chicke\u00f1s' // 'Chickeñs'.length == 8
const c2 = 'Chicken\u0303s' // 'Chickeñs'.length == 9

exports.testWarpWalletNFC = function testWarpWalletNFC({ kdf }) {
    assert(Object.is(toString(kdf(c1)), toString(kdf(c2))),
        'Should normalize passphrase')
    assert(Object.is(toString(kdf(chickens, c1)), toString(kdf(chickens, c2))),
        'Should normalize salt')

    // bad path
    assert(!Object.is(toString(kdf(chickens)), toString(kdf(c1))))
}
