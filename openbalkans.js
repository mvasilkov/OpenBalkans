#!/usr/bin/env node
'use strict'

const fs = require('fs')
const yargs = require('yargs')

const { PEM } = require('./balkans/util')
const { kdfInteractive } = require('./tools/interactive')
const options = require('./tools/options')

yargs.command('weblog', 'Weblog actions', argv => {
    yargs.command('init <FILE>', 'Initialize weblog', yargs => {
        options.accept(yargs, ['show', 'sk'])
    }, argv => {
        (argv.sk ? readPEM(argv.sk) : kdfInteractive(argv.show)).then(sk => {
            console.log(sk)
        })
    }).demandCommand()
})

yargs.command('keygen', 'Save WarpWallet keys as PEM', yargs => {
    options.accept(yargs, ['show'])
}, argv => {
    kdfInteractive(argv.show).then(sk => {
        const encoded = PEM.encodeKeyPair(sk)
        writeFile('public.pem', encoded.pk)
        writeFile('secret.pem', encoded.sk)
    })
})

if (require.main === module) {
    yargs.demandCommand().argv
}

function writeFile(name, contents) {
    console.log('Writing', name)
    fs.writeFileSync(name, contents, { encoding: 'utf8' })
}

function readPEM(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, { encoding: 'utf8' }, (err, contents) => {
            err ? reject(err) : resolve(PEM.decodeSK(contents))
        })
    })
}
