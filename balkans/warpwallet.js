'use strict'

const sha256 = require('fast-sha256')
const scrypt = require('scrypt-async')

const SK_SIZE = 32

exports.pbkdf2 = function pbkdf2(pwd, salt) {
    const enc = new TextEncoder
    pwd = enc.encode(pwd)
    salt = enc.encode(salt)
    return sha256.pbkdf2(pwd, salt, 2 ** 16, SK_SIZE)
}

exports.scrypt = function _scrypt(pwd, salt) {
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
    const buf = new Uint8Array(SK_SIZE)
    for (let n = 0; n < SK_SIZE; ++n) {
        buf[n] = a[n] ^ b[n]
    }
    return buf
}

exports.kdf = function kdf(pwd, salt = '') {
    pwd = pwd.normalize('NFC')
    salt = salt.normalize('NFC')
    return exports.xor(
        exports.scrypt(pwd + '\u0001', salt + '\u0001'),
        exports.pbkdf2(pwd + '\u0002', salt + '\u0002')
    )
}
