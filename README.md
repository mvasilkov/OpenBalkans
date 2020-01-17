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

| Field | Type | Required | Što
| --- | --- | --- | ---
| Pv | number | Yes | Protocol version
| Id | ObjectId | Yes | [ObjectId][ObjectId]
| Con | Document[] | Yes | Contents
| Sz | number | Yes | Size, octets (Content-Length)
| Typ | string | Yes | [RFC 6838][MediaType] Media Type (Content-Type)
| Enc | string | No | Encoding (Content-Encoding)
| Dig | Buffer | Yes | SHA256 digest
| Wha | string | No | What is this post
| Ref | PostRef | No | Other post

### Signature

| Field | Type | Required | Što
| --- | --- | --- | ---
| Pk | Buffer | Yes | Public key
| Ed | Buffer | Yes | Ed25519 signature

### Document

| Field | Type | Required | Što
| --- | --- | --- | ---
| Ld | string | Yes | Loader

#### Document [Ld=Buf]

| Field | Type | Required | Što
| --- | --- | --- | ---
| Buf | Buffer | Yes | Contents

#### Document [Ld=Web]

| Field | Type | Required | Što
| --- | --- | --- | ---
| Web | string | Yes | Web address (http¦https)

#### Document [Ld=JSON]

| Field | Type | Required | Što
| --- | --- | --- | ---
| Web | string | Yes | Web address (http¦https)
| Ref | string[] | Yes | Reference tokens

Ref is a [RFC 6901][JSONPointer] JSON Pointer sequence with no ~encoding.

### PostRef

| Field | Type | Required | Što
| --- | --- | --- | ---
| Pk | Buffer | Yes | Public key
| Id | ObjectId | Yes | [ObjectId][ObjectId]
| Dig | Buffer | Yes | SHA256 digest

[ObjectId]: https://docs.mongodb.com/manual/reference/bson-types/index.html#objectid
[MediaType]: https://tools.ietf.org/html/rfc6838
[JSONPointer]: https://tools.ietf.org/html/rfc6901
