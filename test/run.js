#!/usr/bin/env node
'use strict'

const fs = require('fs')

async function test(a) {
    const tests = require('./' + a)
    for (const b in tests) {
        if (!b.startsWith('test') || typeof tests[b] != 'function')
            continue

        console.log(`\t* ${b}`)
        await tests[b]()
    }
}

async function run() {
    const files = fs.readdirSync(__dirname, { encoding: 'utf8' })
    for (const a of files) {
        if (!a.startsWith('test_') || !a.endsWith('.js'))
            continue

        console.log(`* ${a.substr(0, a.length - 3)}`)
        await test(a)
    }
}

if (require.main === module) {
    process.on('unhandledRejection', err => { throw err })

    run()
}
