---
title: "Interactive Signature Verification for the Chia Blockchain"
date: 2023-06-01
authors: ["Alberto Centonze", "Aidas Venckunas"]
categories: ["Chia", "Cryptography", "DCL", "Research"]
---

*Bachelor project report, EPFL Distributed Computing Laboratory, June 2023.*

## Abstract

This bachelor project studies how the Chia blockchain can be used to build an interactive signature verification scheme for multi-entity systems. Chia's coin set model and its Chia Lisp virtual machine (CLVM) give every transaction programmable spending conditions, which makes it possible to encode signature checks and multi-party authorization directly on chain.

The report first reviews how Chia represents coins and smart transactions, then shows how these primitives can be adapted so that several entities must jointly verify signatures before a coin is spent. The result is a design in which authorization is enforced by the chain itself rather than by a trusted intermediary. The work was carried out at the Distributed Computing Laboratory at EPFL.

[Download the paper (PDF)](/papers/interactive-signature-verification-chia.pdf)
