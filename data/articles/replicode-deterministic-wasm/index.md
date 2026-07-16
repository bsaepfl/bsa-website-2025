---
title: "RepliCode: Deterministic Replication for WebAssembly Runtimes via Ordered I/O"
date: 2025-06-01
authors: ["Ricardo Perelló Mas"]
categories: ["WebAssembly", "Distributed Systems", "DCL", "Research"]
---

*Semester project report, EPFL Distributed Computing Laboratory, Spring 2025.*

## Abstract

RepliCode introduces a deterministic WebAssembly runtime designed for replicated systems. It enables consistent execution across distributed nodes by enforcing a shared order of external I/O operations through a deterministic consensus mechanism. At the heart of RepliCode is a NAT-inspired network abstraction layer that orchestrates connection lifecycles, port mappings, and I/O buffering in a way that is replayable and consistent across all replicas.

This report presents the design, implementation, and evaluation of RepliCode, showing that it supports elastic scaling, deterministic synchronization of new replicas, and practical performance with minimal overhead.

[Download the paper (PDF)](/papers/replicode-deterministic-wasm.pdf)
