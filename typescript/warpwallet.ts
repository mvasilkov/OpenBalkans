'use strict'

import { deriveKey as _pbkdf2 } from '@stablelib/pbkdf2'
import { deriveKey as _scrypt } from '@stablelib/scrypt'
import { SHA256 } from '@stablelib/sha256'
import nacl from 'tweetnacl'

const SK_SIZE = nacl.sign.seedLength

function pbkdf2(_passphrase: string, _salt: string): Uint8Array {
    const enc = new TextEncoder
    const passphrase = enc.encode(_passphrase)
    const salt = enc.encode(_salt)
    return _pbkdf2(SHA256, passphrase, salt, 2 ** 16, SK_SIZE)
}

function scrypt(_passphrase: string, _salt: string): Uint8Array {
    const enc = new TextEncoder
    const passphrase = enc.encode(_passphrase)
    const salt = enc.encode(_salt)
    return _scrypt(passphrase, salt, 2 ** 18, 8, 1, SK_SIZE)
}

function xor(a: Uint8Array, b: Uint8Array): Uint8Array {
    const buf = new Uint8Array(SK_SIZE)
    for (let n = 0; n < SK_SIZE; ++n) {
        buf[n] = a[n] ^ b[n]
    }
    return buf
}

export function deriveKey(passphrase: string, salt: string = '') {
    return xor(
        scrypt(passphrase + '\u0001', salt + '\u0001'),
        pbkdf2(passphrase + '\u0002', salt + '\u0002')
    )
}
