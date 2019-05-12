const { assertEqual } = require('./util')

const sk = Buffer.from('abad85e1858e6aeab1179a4408b6dc1e77bd17f15233dd3fbaaa7e3338ff346a', 'hex')
const pk = Buffer.from('04f6c1193d85a7074c832c9f8ee8262c2b56ad5c23274e5f14b66064063c8d848802c50f6f062d1ded72e8f01bfeca182a30b57264a2a72342c1e641876feca2cb', 'hex')
const pkShort = Buffer.from('03f6c1193d85a7074c832c9f8ee8262c2b56ad5c23274e5f14b66064063c8d8488', 'hex')

exports.testGetPublicKey = function testGetPublicKey({ getPublicKey }) {
    assertEqual(getPublicKey(sk), pk)
    assertEqual(getPublicKey(sk, true), pkShort)
}
