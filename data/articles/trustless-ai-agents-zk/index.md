---
title: "Trustless AI Agents: Verifiable Inference with Zero-Knowledge Proofs"
date: 2026-06-03
authors: ["Youssef Jeddi"]
categories: ["ZK", "AI", "DCL", "Research"]
---

*Master project report, EPFL Distributed Computing Laboratory, June 2026.*

## Abstract

As autonomous AI agents begin to act on behalf of users and to interact directly on chain, a central question is whether the outputs they produce can be trusted without trusting the party that runs the model. This project investigates verifiable inference: using zero-knowledge proofs to let a prover convince anyone that a given model was evaluated correctly on a given input, without revealing the model weights or having to re-run the computation.

The report surveys the tooling for proving neural network inference, including ONNX front ends and the ezkl and halo2 proving stacks, together with zkLLM style approaches for larger models. It analyses their proving cost and practicality, and discusses how such proofs fit into emerging trustless agent standards. The work was carried out at the Distributed Computing Laboratory at EPFL.

[Download the paper (PDF)](/papers/verifiable-inference-zk.pdf)
