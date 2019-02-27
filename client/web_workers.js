const { kdf } = require('../balkans/warpwallet')

onmessage = function onmessage(event) {
    const [fun, ...args] = event.data
    switch (fun) {
        case 'kdf':
            const [pwd, salt] = args
            postMessage(kdf(pwd, salt, true))
            break

        default:
            throw Error('Unknown function')
    }
}
