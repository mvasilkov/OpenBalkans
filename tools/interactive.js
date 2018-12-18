const assert = require('assert')

const figures = require('prompts/lib/util/figures')
Object.assign(figures, {
    tick: ' ',
    cross: ' ',
    ellipsis: figures.pointerSmall,
    pointer: '>',
})
const prompts = require('prompts')

const { kdf } = require('../balkans/warpwallet')

exports.kdfInteractive = function kdfInteractive(showPasswords = false) {
    const type = showPasswords ? 'text' : 'password'
    return prompts([
        {
            message: 'Passphrase',
            name: 'pwd',
            type,
        },
        {
            message: 'Email',
            name: 'salt',
            type,
        },
    ]).then(props => {
        assert(props.hasOwnProperty('pwd'))
        assert(props.hasOwnProperty('salt'))

        return kdf(props.pwd, props.salt)
    })
}
