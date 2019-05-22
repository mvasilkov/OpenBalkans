const fs = require('fs')
const _path = require('path')

const clean = path => {
    console.log(`--- ${path} ---`)
    path = _path.resolve(__dirname, path)
    let a = fs.readFileSync(path, { encoding: 'utf8' })
    a = a.replace(/\n*\/\*![^]*?\*\/\n*/g, b => {
        console.log(`Cleaning up: '''${b}'''`)
        return ''
    })
    fs.writeFileSync(path, a, { encoding: 'utf8' })
}

clean('balkans.js')
clean('balkans.worker.js')
