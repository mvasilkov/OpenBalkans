'use strict'

import { deriveKey as _pbkdf2 } from '@stablelib/pbkdf2'
import { deriveKey as _scrypt } from '@stablelib/scrypt'
import { SHA256 } from '@stablelib/sha256'
import nacl from 'tweetnacl'

const SK_SIZE = nacl.sign.seedLength

function pbkdf2(passphrase: Uint8Array, salt: Uint8Array): Uint8Array {
    return _pbkdf2(SHA256, passphrase, salt, 2 ** 16, SK_SIZE)
}

function scrypt(passphrase: Uint8Array, salt: Uint8Array): Uint8Array {
    return _scrypt(passphrase, salt, 2 ** 18, 8, 1, SK_SIZE)
}

function xor(a: Uint8Array, b: Uint8Array): Uint8Array {
    const buf = new Uint8Array(SK_SIZE)
    for (let n = 0; n < SK_SIZE; ++n) {
        buf[n] = a[n] ^ b[n]
    }
    return buf
}

function padWith(typedArray: Uint8Array, padding: number): Uint8Array {
    const result = new Uint8Array(typedArray.length + 1)
    result.set(typedArray)
    result[typedArray.length] = padding
    return result
}

export function deriveKey(passphrase: string, salt: string = '') {
    const enc = new TextEncoder
    const _passphrase = enc.encode(passphrase)
    const _salt = enc.encode(salt)

    return xor(
        scrypt(padWith(_passphrase, 1), padWith(_salt, 1)),
        pbkdf2(padWith(_passphrase, 2), padWith(_salt, 2))
    )
}
