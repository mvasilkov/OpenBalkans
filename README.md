OpenBalkans
===

OpenBalkans is a document annotation protocol for web of documents.

Data structure
---

- Container: [BSON][BSON]
- Media Type: application/x.bson

### Data types

| Node.js | Python 3 | C
| --- | --- | ---
| Buffer | bytes | uint8_t[]

### EncodedPost

EncodedPost = concat(bson_encode(Post), bson_encode(Signature))

### EncodedPostRef

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
| Dig | Buffer | Yes | SHA-256 digest (Contents)

#### Post Encoding

| Encoding | Što
| --- | ---
| Bro | [RFC 7932][Brotli] Brotli

Encoding has higher precedence than size and SHA-256.

That is, Sz = length(brotli_compress(Contents))

### Signature

| Field | Type | Required | Što
| --- | --- | --- | ---
| Pk | Buffer | Yes | Public key
| Ed | Buffer | Yes | [Ed25519][Ed25519] signature

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

Don't use [RFC 2397][DataURLs] Data URLs.

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
| Dig | Buffer | Yes | SHA-256 digest (EncodedPost)

[Brotli]: https://tools.ietf.org/html/rfc7932
[BSON]: http://bsonspec.org/
[DataURLs]: https://tools.ietf.org/html/rfc2397
[Ed25519]: https://ed25519.cr.yp.to/
[JSONPointer]: https://tools.ietf.org/html/rfc6901
[MediaType]: https://tools.ietf.org/html/rfc6838
[ObjectId]: https://docs.mongodb.com/manual/reference/bson-types/#objectid
