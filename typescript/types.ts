'use strict'

import { strict as assert } from 'assert'
import nacl from 'tweetnacl'
import { digestLength } from 'fast-sha256'

import bson, { ObjectId, Binary } from '../bson/bson'

interface IEncodable {
    encode(): Buffer
}

interface IPostRefOptions {
    /** Public key */
    Pk: Buffer
    /** ObjectId */
    Id: ObjectId
    /** SHA256 digest */
    Dig: Buffer
}

interface ISignatureOptions {
    /** Public key */
    Pk: Buffer
    /** Ed25519 signature */
    Ed: Buffer
}

export class PostRef implements IEncodable, IPostRefOptions {
    /** Public key */
    readonly Pk: Buffer
    /** ObjectId */
    readonly Id: ObjectId
    /** SHA256 digest */
    readonly Dig: Buffer

    constructor({ Pk, Id, Dig }: IPostRefOptions) {
        Pk = toBuffer(Pk)
        Dig = toBuffer(Dig)

        assert.strictEqual(Pk.length, nacl.sign.publicKeyLength)
        // assert(Id instanceof ObjectId)
        assert.strictEqual(Dig.length, digestLength)

        this.Pk = Pk
        this.Id = Id
        this.Dig = Dig
    }

    encode(): Buffer {
        const { Pk, Id, Dig } = this
        return bson.serialize({ Pk, Id, Dig })
    }

    static decode(buf: Buffer): PostRef {
        const { Pk, Id, Dig } = bson.deserialize(buf)
        return new PostRef({ Pk, Id, Dig })
    }

    equals(other: PostRef): boolean {
        return this.Pk.equals(other.Pk) &&
            this.Id.toString() === other.Id.toString() &&
            this.Dig.equals(other.Dig)
    }
}

export class PostRefCollection implements IEncodable {
    constructor(readonly collection: PostRef[]) {
    }

    encode(): Buffer {
        return Buffer.concat(this.collection.map(a => bson.serialize(a)))
    }

    static decode(buf: Buffer): PostRefCollection {
        const options: IPostRefOptions[] = []

        let p = 0
        while (p < buf.length)
            p = bson.deserializeStream(buf, p, 1, options, options.length)

        return new PostRefCollection(options.map(a => new PostRef(a)))
    }

    equals(other: PostRefCollection): boolean {
        return this.collection.length === other.collection.length &&
            this.collection.every((a, p) => a.equals(other.collection[p]))
    }
}

export class Signature implements IEncodable, ISignatureOptions {
    /** Public key */
    readonly Pk: Buffer
    /** Ed25519 signature */
    readonly Ed: Buffer

    constructor({ Pk, Ed }: ISignatureOptions) {
        Pk = toBuffer(Pk)
        Ed = toBuffer(Ed)

        assert.strictEqual(Pk.length, nacl.sign.publicKeyLength)
        assert.strictEqual(Ed.length, nacl.sign.signatureLength)

        this.Pk = Pk
        this.Ed = Ed
    }

    encode(): Buffer {
        const { Pk, Ed } = this
        return bson.serialize({ Pk, Ed })
    }

    static decode(buf: Buffer): Signature {
        const { Pk, Ed } = bson.deserialize(buf)
        return new Signature({ Pk, Ed })
    }

    equals(other: Signature): boolean {
        return this.Pk.equals(other.Pk) && this.Ed.equals(other.Ed)
    }
}

function toBuffer(a: Buffer | Binary): Buffer {
    if (a instanceof Binary) {
        return a.buffer
    }
    return a
}
