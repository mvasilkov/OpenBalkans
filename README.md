OpenBalkans
===

Data structure
---

### Data types

| Node.js | Python 3 | C
| --- | --- | ---
| Buffer | bytes | uint8_t[]

### EncodedPost

EncodedPost :: Buffer  
EncodedPost = bson_encode(Post) ++ bson_encode(Signature)

### EncodedPostRef

EncodedPostRef :: Buffer  
EncodedPostRef = bson_encode(PostRef)

### Post

### Signature

| Field | Type | Required | Što
| --- | --- | --- | ---
| Pk | Buffer | Yes | Public key
| Ed | Buffer | Yes | Ed25519 signature

### PostRef

| Field | Type | Required | Što
| --- | --- | --- | ---
| Pk | Buffer | Yes | Public key
| Id | ObjectId | Yes | [ObjectId][ObjectId]
| Dig | Buffer | Yes | SHA256 digest

[ObjectId]: https://docs.mongodb.com/manual/reference/bson-types/index.html#objectid
