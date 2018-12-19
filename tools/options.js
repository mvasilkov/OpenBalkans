exports.accept = function accept(yargs, opt) {
    opt.forEach(a => exports[a](yargs))
}

exports.show = yargs => {
    yargs.option('show', {
        alias: 'S',
        describe: 'Show passwords',
        type: 'boolean',
    })
}

exports.sk = yargs => {
    yargs.option('sk', {
        alias: 's',
        describe: 'Secret key',
        type: 'string',
    })
}
