# OpenBalkans

Internet Balkanization Appliance Creation Kit

## Overview

Internet Balkanization Appliance (IBA) is an implementation of the OpenBalkans protocol,
which can manifest as a website, a standalone application, or an actual physical appliance
(although there are no known instances of this yet).

From the user's perspective, an IBA is a collection of weblogs. A weblog is a series of posts.
Conceptually this is similar to Mastodon, but decentralized (as opposed to federated).

This document describes the OpenBalkans protocol (OpenBP) version 0.

[API documentation](https://github.com/mvasilkov/OpenBalkans/tree/master/docs)

## Posts

Container: JSON Web Token (JWT)

Signing: ECDSA using P-256 curve, and SHA-256 (ES256)

- NIST P-256 ≡ ANSI prime256v1 ≡ [SEC 2](http://www.secg.org/sec2-v2.pdf) secp256r1
    - This is not confusing at all
- Requires [RFC 6979](https://tools.ietf.org/html/rfc6979)
- Upgrade path: see [SafeCurves](https://safecurves.cr.yp.to/)

Key derivation function (KDF): [WarpWallet](https://keybase.io/warp)

**ASCII Armor**

- Post key: Base58
- Other binary data: [RFC 4648](https://tools.ietf.org/html/rfc4648) base64url with no padding

**Post types**

Post types are a strict superset of [RFC 2046](https://tools.ietf.org/html/rfc2046) Media Types.

### Data structure

| Name | Type | Required | Comment
| --- | --- | --- | ---
| **openbp** | int | Yes | OpenBalkans protocol version, 0
| **pk** | string | Yes | Post key
| **docs** | list | Yes | One or more hyperlinks to contents
| **size** | int | Yes | Size of contents, bytes
| **type** | string | Yes | Content-Type, Media Type(contents)
| **chk** | string | Yes | Checksum, SHA-256(contents), base64url encoded
| **rel** | set | No | Relational tags
| **other** | object | No | Reply to other post
| other.**pk** | string | Yes | Other post key (In-Reply-To)
| other.**chk** | string | Yes | Checksum, SHA-256(other post's JWT), base64url encoded

### Post key

Post key is a concatenation of the following fields:

* Base58([ObjectId][ObjectId])
* U+002E FULL STOP
* Base58(public key)

We use Satoshi's variant of [Base58][Base58].

Post keys are considered to be globally unique. Any collisions should be treated as a flood attack.

[ObjectId]: https://docs.mongodb.com/manual/reference/method/ObjectId/
[Base58]: https://github.com/bitcoin/bitcoin/blob/master/src/base58.cpp

### Hyperlinks

Links in the **docs** field can be the following:

- HTTP(S) URL
- [RFC 2397](https://tools.ietf.org/html/rfc2397) Data URL
- [RFC 6901](https://tools.ietf.org/html/rfc6901) JSON Pointer
  ```
  "": "jsonpointer",
  "url": "https://httpbin.org/headers",
  "pointer": "/headers/User-Agent"
  ```

### Relational tags

| Rel | Type | Comment
| --- | --- | ---
| collection | application/json | Collection of posts
| self | application/ld+json | User profile
| self, userpic | image/jpeg, image/png | User profile picture
| upd_pk | application/octet-stream | Updated public key

### User Profiles

Posts with 'self' in the **rel** field are associated with the user account, and aren't a part of any content feed.

A user profile is a [JSON-LD](https://json-ld.org/) post of @type [Person](https://schema.org/Person).
