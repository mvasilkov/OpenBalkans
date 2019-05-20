'use strict'

exports.CriticalSection = class CriticalSection {
    constructor() {
        this.queue = []
        this.working = false
    }

    enter() {
        return new Promise(resolve => {
            this.queue.push(resolve)
            if (this.working) return
            this.working = true
            this.queue.shift()()
        })
    }

    leave(a) {
        if (this.queue.length) this.queue.shift()()
        else this.working = false
        return a
    }
}
