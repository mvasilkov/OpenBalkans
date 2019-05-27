# OpenBalkans Reference Implementation

## Installation

    yarn add balkans

## Usage

```javascript
const Balkans = require('balkans')

const privateKey = Balkans.kdf('passphrase', 'optional salt')

const post = Balkans.Post.create(privateKey, { postProps })
```
