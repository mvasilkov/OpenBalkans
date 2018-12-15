import assert from 'assert'
import test from 'ava'

import { kdf } from '../balkans/warpwallet'

const chickens = 'Chickens'
const chickensSk = 'f0547fab4470cc8c5c3ab32282be4795e81652e30fe02815564b376980684b7e'
const salt = 'chickens@salt.org'
const saltSk = '1bd7e263cf0eee0cd5e19e0a65e361386b7a9e83c5e32bc0203b121c0015d335'

assert(chickensSk.length == 64)
assert(saltSk.length == 64)

test('WarpWallet', t => {
    t.is(kdf(chickens).toString('hex'), chickensSk)
    t.is(kdf(chickens, salt).toString('hex'), saltSk)
})
