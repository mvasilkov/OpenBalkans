# OpenBalkans

Internet Balkanization Appliance

## Overview

Internet Balkanization Appliance (IBA) is an implementation of the OpenBalkans protocol.

IBA is a collection of personal weblogs. A weblog is a series of posts.

This document describes the OpenBalkans protocol (OpenBP) version 0.

### Posts

Container: JSON Web Token (JWT)

Signing: ECDSA using P-256 curve, and SHA-256 (ES256)

- NIST P-256 ≡ ANSI prime256v1 ≡ [SEC 2](http://www.secg.org/sec2-v2.pdf) secp256r1
    - This is not confusing at all
- Requires [RFC 6979](https://tools.ietf.org/html/rfc6979)
- Upgrade path: see [SafeCurves](https://safecurves.cr.yp.to/)

Key derivation function (KDF): [WarpWallet](https://keybase.io/warp)

#### Post types

Post types are a strict superset of [RFC 2046](https://tools.ietf.org/html/rfc2046) Media Types.

Special post types:

| Type | Comment
| --- | ---
| upd_pk | Updated public key
| collection | Collection of posts

#### Data structure

| Name | Type | Required | Comment
| --- | --- | --- | ---
| openbp | int | Yes | OpenBalkans protocol version
| pk | string | Yes | Post key
| other | string | No | Other post key (In-Reply-To)
| type | string | Yes | Media Type(contents) or special
| docs | list | Other than upd_pk | One or more hyperlinks
| check | string | Same as docs | SHA-256(contents)
| size | int | Same as docs | Size of contents, bytes
| upd_pk | string | upd_pk | Updated public key

Public keys are stored in compressed form.

#### Post key

Post key is a concatenation of the following fields:

* Base58([ObjectId][ObjectId])
* U+002E FULL STOP
* Base58(public key)

We use Satoshi's variant of Base58.

[ObjectId]: https://docs.mongodb.com/manual/reference/method/ObjectId/
