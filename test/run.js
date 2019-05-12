#!/usr/bin/env node
'use strict'

const fs = require('fs')

const Balkans = [
    { title: 'JavaScript', b: require('../balkans') },
    { title: 'Node.js crypto', b: require('../nodejs_crypto') },
]

function runTests(balkans, a) {
    const tests = require('./' + a)
    for (let b in tests) {
        if (!b.startsWith('test') || typeof tests[b] != 'function')
            continue

        console.log(`\t* ${b}`)
        tests[b](balkans)
    }
}

function runSuite(balkans) {
    const files = fs.readdirSync(__dirname, { encoding: 'utf8' })
    for (let a of files) {
        if (!a.startsWith('test_') || !a.endsWith('.js'))
            continue

        console.log(`* ${a.substr(0, a.length - 3)}`)
        runTests(balkans, a)
    }
}

function run() {
    Balkans.forEach(({ title, b }) => {
        console.log(`--- ${title} ---`)
        runSuite(b)
    })
}

if (require.main === module) {
    if (typeof TextEncoder == 'undefined') // node.js < 11
        global.TextEncoder = require('util').TextEncoder

    run()
}
