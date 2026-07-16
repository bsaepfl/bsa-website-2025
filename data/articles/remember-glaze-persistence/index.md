---
title: "Remember Glaze: A High Throughput Persistence Mechanism"
date: 2025-06-01
authors: ["Paul Quesnot"]
categories: ["Databases", "Distributed Systems", "Research"]
---

## Abstract

Modern ledgers and databases still pair write-ahead logging with periodic snapshots, incurring long pauses, while current chunk-based approaches break down on bulk updates. Remember Glaze removes both limits. It slices the state into fixed-size chunks stored in a circular ring log; each batch appends only the modified chunk plus its transaction list, giving constant-time commits and a strictly bounded disk footprint.

Crash recovery touches at most one snapshot per chunk and replays only the appropriate batches. On a 100M-account benchmark this cuts median per-batch latency by 40 to 70 percent against the previous standard and rebuilds the full state in a couple of minutes. Remember Glaze is therefore a practical drop-in for high-throughput systems that demand predictable latency and rapid restart.

[Download the paper (PDF)](/papers/remember-glaze-persistence.pdf)
