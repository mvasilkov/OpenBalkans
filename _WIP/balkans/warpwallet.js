'use strict'

const crypto = require('crypto')
const scrypt = require('scrypt-async')

const SK_SIZE = 32

exports.pbkdf2 = function pbkdf2(pwd, salt) {
    return crypto.pbkdf2Sync(pwd, salt, 2 ** 16, SK_SIZE, 'sha256')
}

exports.scrypt = function _scrypt(pwd, salt, purejs = false) {
    if (!purejs) {
        return crypto.scryptSync(pwd, salt, SK_SIZE, {
            N: 2 ** 18,
            r: 8,
            p: 1,
            maxmem: 335544320,
        })
    }

    let buf
    scrypt(pwd, salt, {
        N: 2 ** 18,
        r: 8,
        p: 1,
        dkLen: SK_SIZE,
        encoding: 'binary',
    }, function (dk) {
        buf = dk
    })
    return buf
}

exports.xor = function xor(a, b) {
    const buf = Buffer.allocUnsafe(SK_SIZE)
    for (let n = 0; n < SK_SIZE; ++n) {
        buf[n] = a[n] ^ b[n]
    }
    return buf
}

exports.kdf = function kdf(pwd, salt = '', purejs = false) {
    pwd = pwd.normalize('NFC')
    salt = salt.normalize('NFC')
    return exports.xor(
        exports.scrypt(pwd + '\u0001', salt + '\u0001', purejs),
        exports.pbkdf2(pwd + '\u0002', salt + '\u0002')
    )
}
