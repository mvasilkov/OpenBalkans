#!/usr/bin/env node
'use strict'

const fs = require('fs')
const yargs = require('yargs')

const { PEM } = require('./balkans/util')
const { kdfInteractive } = require('./tools/interactive')

yargs.command('keygen', 'Save WarpWallet keys as PEM', yargs => {
    yargs.option('show', {
        alias: 'S',
        describe: 'Show passwords',
        type: 'boolean',
    })
}, argv => {
    kdfInteractive(argv.show).then(sk => {
        const encoded = PEM.encodeKeyPair(sk)
        writeFile('public.pem', encoded.pk)
        writeFile('secret.pem', encoded.sk)
    })
})

if (require.main === module) {
    yargs.argv
}

function writeFile(name, contents) {
    console.log('Writing', name)
    fs.writeFileSync(name, contents, { encoding: 'utf8' })
}
