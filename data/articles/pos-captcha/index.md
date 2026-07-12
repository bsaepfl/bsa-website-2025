---
title: "PoS-Captcha: Proof of Space Authentication"
date: 2026-06-01
authors: ["Hassene Ezzedine"]
categories: ["Proof of Space", "Web Security", "Rust", "Research"]
---

*Master project by Hassene Ezzedine.*

## Abstract

PoS-Captcha replaces traditional image-based CAPTCHA puzzles with a cryptographic Proof of Space. Instead of solving visual challenges, a user's machine proves that it genuinely holds a dedicated 64MB file by reading scattered bytes from disk. The physical seek time needed to reach those random locations demonstrates real hardware possession and defeats bots that would otherwise simulate the data mathematically.

The system is built from five parts: a local Rust daemon (Actix-web) acting as the prover, a TypeScript and Node.js verifier backed by native Rust bindings through NAPI-RS, an embeddable browser widget, and a Manifest V3 browser extension for consent management. Traffic is protected end to end with AES-256-GCM encryption, and verification tokens are signed with EdDSA. The result is a bot-prevention scheme that verifies human authenticity through allocated disk space rather than puzzle solving.

[View on GitHub](https://github.com/Hassene26/PoS-Captcha)
