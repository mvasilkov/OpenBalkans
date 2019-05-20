'use strict'

const assert = require('assert')

const sleep = pause => new Promise(resolve => setTimeout(resolve, pause))

exports.testNoCriticalSection = async function testNoCriticalSection() {
    const stack = []

    function a() {
        return Promise.resolve()
            .then(() => sleep(200))
            .then(() => stack.push(1))
    }

    function b() {
        return Promise.resolve()
            .then(() => sleep(100))
            .then(() => stack.push(2))
    }

    await Promise.all([a(), b()])
    assert.deepStrictEqual(stack, [2, 1])
}

exports.testCriticalSection = async function testCriticalSection({ CriticalSection }) {
    const pcs = new CriticalSection
    const stack = []

    function a() {
        return pcs.enter()
            .then(() => sleep(200))
            .then(() => stack.push(1))
            .then(() => pcs.leave())
    }

    function b() {
        return pcs.enter()
            .then(() => sleep(100))
            .then(() => stack.push(2))
            .then(() => pcs.leave())
    }

    await Promise.all([a(), b()])
    assert.deepStrictEqual(stack, [1, 2])
}
