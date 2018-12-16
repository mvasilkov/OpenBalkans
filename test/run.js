#!/usr/bin/env node
'use strict'

const fs = require('fs')

function runTests(a) {
    const tests = require('./' + a)
    for (let b in tests) {
        if (!b.startsWith('test') || typeof tests[b] != 'function')
            continue

        console.log(`\t* ${b}`)
        tests[b]()
    }
}

function run() {
    const files = fs.readdirSync(__dirname, { encoding: 'utf8' })
    for (let a of files) {
        if (!a.startsWith('test_') || !a.endsWith('.js'))
            continue

        console.log(`* ${a.substr(0, a.length - 3)}`)
        runTests(a)
    }
}

if (require.main === module) {
    run()
}
