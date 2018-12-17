const assert = require('assert')
const fs = require('fs')

const figures = require('prompts/lib/util/figures')
figures.cross = figures.tick = ' '

const prompts = require('prompts')
const yargs = require('yargs')

const { PEM } = require('./balkans/util')
const { kdf } = require('./balkans/warpwallet')

yargs.command('keygen', 'Save WarpWallet keys as PEM', yargs => {
    yargs.option('show', {
        alias: 'S',
        describe: 'Show passwords',
        type: 'boolean',
    })
}, argv => {
    const type = argv.show ? 'text' : 'password'
    prompts([
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

        const { pk, sk } = PEM.encodeKeyPair(kdf(props.pwd, props.salt))
        fs.writeFileSync('public.pem', pk, { encoding: 'utf8' })
        fs.writeFileSync('secret.pem', sk, { encoding: 'utf8' })
    })
}).argv
