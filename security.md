Security
===

- [Cryptographic Right Answers][LatacoraRight]
	- Use NaCl ¦ Libsodium
	- Use Ed25519

- [Cryptographic Wrong Answers][LatacoraWrong]
	- I don't think you want JWT
	---
	- Algorithmic agility bad
	- Instead: version your protocols, update aggressively
	---
	- Safe specs have 1 authenticator
	- Always of the same type
	- On the *outside* of the thing

- [Cryptographic Key Sizes and Algorithm Recommendations][Paragon2019]

The Cryptographic Doom Principle
---

> If you have to perform *any* cryptographic operation before verifying the MAC
> on a message you've received, it will *somehow* inevitably lead to doom.
>
> *[Moxie Marlinspike][MoxieDoom]*

[LatacoraRight]: https://latacora.micro.blog/2018/04/03/cryptographic-right-answers.html
[LatacoraWrong]: https://www.okta.com/video/oktane19-cryptographic-wrong-answers/
[Paragon2019]: https://paragonie.com/blog/2019/03/definitive-2019-guide-cryptographic-key-sizes-and-algorithm-recommendations
[MoxieDoom]: https://moxie.org/blog/the-cryptographic-doom-principle/
