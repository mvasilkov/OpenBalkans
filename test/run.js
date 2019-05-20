#!/usr/bin/env node
'use strict'

const fs = require('fs')

const Balkans = [
    { title: 'JavaScript', b: require('../balkans') },
    { title: 'Node.js crypto', b: require('../nodejs_crypto') },
]

async function runTests(balkans, a) {
    const tests = require('./' + a)
    for (const b in tests) {
        if (!b.startsWith('test') || typeof tests[b] != 'function')
            continue

        console.log(`\t* ${b}`)
        await tests[b](balkans)
    }
}

async function runSuite(balkans) {
    const files = fs.readdirSync(__dirname, { encoding: 'utf8' })
    for (const a of files) {
        if (!a.startsWith('test_') || !a.endsWith('.js'))
            continue

        console.log(`* ${a.substr(0, a.length - 3)}`)
        await runTests(balkans, a)
    }
}

async function run() {
    for (const { title, b } of Balkans) {
        console.log(`--- ${title} ---`)
        await runSuite(b)
    }
}

if (require.main === module) {
    if (typeof TextEncoder == 'undefined') // node.js < 11
        global.TextEncoder = require('util').TextEncoder

    run()
}
