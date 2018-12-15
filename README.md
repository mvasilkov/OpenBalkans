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
