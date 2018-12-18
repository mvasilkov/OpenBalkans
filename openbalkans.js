#!/usr/bin/env node
'use strict'

const assert = require('assert')
const fs = require('fs')

const figures = require('prompts/lib/util/figures')
Object.assign(figures, {
    tick: ' ',
    cross: ' ',
    ellipsis: figures.pointerSmall,
    pointer: '>',
})
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
        writeFile('public.pem', pk)
        writeFile('secret.pem', sk)
    })
})

if (require.main === module) {
    yargs.argv
}

function writeFile(name, contents) {
    console.log('Writing', name)
    fs.writeFileSync(name, contents, { encoding: 'utf8' })
}
