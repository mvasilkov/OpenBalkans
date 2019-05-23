'use strict'

const $ = a => document.getElementById(a)

function print(a = '') {
    const line = document.createElement('code')
    line.appendChild(document.createTextNode(a + '\n'))
    $('output').appendChild(line)
}

function printBuf(buf) {
    print(Array.from(buf).map(b => b.toString(16).padStart(2, '0')).join(' '))
}

$('compute').addEventListener('click', _ => {
    const pwd = $('passphrase').value
    const salt = $('salt').value

    const worker = new Balkans.WorkerClient('/client/build/balkans.worker.js')
    worker.kdf(pwd, salt).then(sk => {
        print('Private key:')
        printBuf(sk)
        print()

        const pk = Balkans.getPublicKey(sk, true)
        print('Public key (short):')
        printBuf(pk)
        print()

        const pk2 = Balkans.getPublicKey(sk)
        print('Public key (long):')
        printBuf(pk2)
        print()

        const encoded = Balkans.PEM.encodeKeyPair(sk, pk)
        print('Private key PEM:')
        print(encoded.sk)
        print()

        print('Public key PEM:')
        print(encoded.pk)
        print()

        const post = Balkans.Post.create(sk, { a: 64 })
        print('Post({ a: 64 })')
        print(post.toString())
    })
})
