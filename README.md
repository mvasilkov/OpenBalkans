# OpenBalkans

Internet Balkanization Appliance

## Overview

Internet Balkanization Appliance (IBA) is an implementation of the OpenBalkans protocol.

IBA is a collection of personal weblogs. A weblog is a series of posts.

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
| ~init | Initial post (no parent)
| ~upd_pk | Updated public key
| ~collection | Collection of posts

#### Data structure

| Name | Type | Required | Comment
| --- | --- | --- | ---
| pid | [ObjectId][ObjectId] | Yes | Post OID (contains datetime)
| parent | tuple | Other than ~init | Parent OID, and SHA-256(parent JWT)
| type | string | Yes | Media Type(docs contents) or special
| docs | list | Other than ~init and ~upd_pk | One or more hyperlinks
| check | string | Same as docs | SHA-256(docs contents)
| pk | string | ~init and ~upd_pk | Compressed public key

[ObjectId]: https://docs.mongodb.com/manual/reference/method/ObjectId/
