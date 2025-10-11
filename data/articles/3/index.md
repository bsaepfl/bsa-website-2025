---
title: "Obsuidian: A Fully Decentralized RPC Solution for the Sui Network"
date: 2025-06-01
authors: ["Loris Tran", "Alexandre Mourot"]
sponsor: "EPFL Distributed Computing Lab"
---


Loris Tran and Alexandre Mourot,
Rachid Guerraoui,
Gauthier Voron,

# Abstract
This report examines the challenges of Remote Procedure Call (RPC) access in the Sui blockchain ecosystem and proposes a decentralized solution using the Lava Network. We analyze the current limitations of centralized RPC providers, including reliability issues, centralization risks, and lack of economic incentives for Full Node operators. Our solution leverages Lava's decentralized protocol to create a robust, incentivized network of Sui RPC providers, ensuring high availability, censorship resistance, fault-tolerance and economic sustainability. The implementation details, including specification files, provider configuration, and security mechanisms are thoroughly explored and benchmarked to demonstrate the viability of this approach for large scale blockchain RPC infrastructure for the Sui Network.



# Introduction to the Sui Blockchain

Sui is a high-performance Layer 1 blockchain designed for scalable, decentralized applications. Built by Mysten Labs, Sui introduces a new architecture that departs from traditional blockchain designs by implementing a directed acyclic graph (DAG) structure and parallel transaction execution. This architecture enables Sui to achieve high throughput, low latency, and horizontal scalability. Sui's object-centric data model treats on-chain assets as distinct objects with unique identifiers, enabling parallel execution of transactions that operate on different objects. 

## Object-Centric Architecture in Sui



Sui implements an object-centric data model that differs from other blockchains. In Sui's architecture, the fundamental unit of state is the object, which is a discrete entity with a unique identifier, owner, and data payload. This object-centric approach enables Sui's parallel execution model, which is central to its scalability proposition. 

Objects in Sui are classified into two primary categories with significantly different execution characteristics. First, there are Owned Objects, which are exclusively owned by a single address. These owned objects exhibit several key characteristics that make them particularly efficient to process. Each owned object has exactly one owner (an address) that maintains exclusive control over the object, enabling transactions involving only owned objects from different owners to be processed in parallel without causal ordering constraints. Transactions operating exclusively on owned objects can achieve immediate finality without consensus overhead, requiring only a quorum of validator signatures, which makes these kind of transaction bypass traditional consensus overhead. The execution outcome of transactions on owned objects is also fully deterministic based on the transaction inputs, without dependencies on global state, which will matter latter on for our project. 

Then, we also have Shared objects with fundamentally different properties. Multiple addresses can access and modify shared objects, requiring coordination mechanisms to prevent conflicts. Transactions involving shared objects must go through consensus to establish a canonical ordering, as concurrent modifications could lead to inconsistent states. Operations on the same shared object must be processed sequentially to maintain consistency, introducing a synchronization point in Sui's otherwise parallel execution model. The execution outcome of transactions involving shared objects depends on the current state of those objects.

## Full Node and Validator Node Roles



Sui separates its consensus and its data layer into Full Nodes and Validator Nodes. Validator Nodes are responsible for participating in consensus protocol. These validators execute transactions involving shared objects and collectively maintain the integrity and ordering of such transactions within the system. They act as authoritative sources, issuing certificates for valid transactions, and produce checpoints that represent the resulting state transitions. They are configured to enable quick confirmation of transactions, with a time to finality of arround 300ms.

In contrast, Full Nodes do not participate in consensus but instead focus on maintaining a replica of the global state derived from the checkpoints confirmed by validators. They handle data dissemination and state queries for clients. Full Nodes play a crucial role in enabling scalability and data availability by serving as intermediaries between clients and the consensus layer, caching verified data, and allowing clients to fetch on-chain object states efficiently. Full nodes relay clients transactions requests into Validator Nodes, as can be seen in Figure 1 

![Validators and Full Nodes in Sui](image.png)

The dual object nature of Sui's object model creates specific dependencies on full node state that directly impact scalability. For transactions involving shared objects, full nodes must maintain an accurate and up-to-date view of the object state to support several queries functions. They can return any object stored on the sui blockchain along with its metadata, such as address of the owner, unique ID, etc... Additionally, to provide clients with expected transaction outcomes, full nodes may simulate execution against their current state. For shared objects, full nodes track the state history to ensure correct sequential processing. This state-dependent validation creates a fundamental scalability challenge: as transaction volume increases, the state management burden on full nodes grows correspondingly. 

## Full Node Specialization in Data Access


The complexity of Sui's object model necessitates specialized full node configurations to efficiently serve different user queries. Full nodes must maintain additional historical data to support applications requiring access to historical object states. Furthermore, DApp developers heavily rely on transaction simulation capabilities to predict execution outcomes, requiring full nodes to implement simulation logic. These specialized requirements create significant operational overhead for full node operators, while the full nodes have still no incentives to run natively.

In blockchains, scalability remains one of the three cornerstone challenges, alongside decentralization and security, that directly impacts network performance and user experience. To address this challenge, most blockchain networks implement a multi-tiered architecture that separates validator nodes from full nodes, a pattern seen  in high-throughput blockchains such as Sui, Aptos, and other next-generation networks. This architectural separation enables validators to focus their computational resources on achieving consensus on the canonical state of the blockchain, while full nodes handle data storage and client accessibility through RPC endpoints. Full nodes can be horizontally scaled to accommodate increasing query loads from applications and users, independent of the consensus layer's scaling constraints, while creating a more efficient network topology where relatively few validators maintain consensus as a larger number of full nodes disseminate blockchain data. Additionally, this separation enhances overall network security by isolating query handling from consensus participation, effectively reducing the attack surface of validator nodes.

However, while this architectural pattern effectively addresses scalability concerns, it introduces a critical dependency: client applications must rely on Remote Procedure Call (RPC) endpoints provided by full nodes to interact with the blockchain. This reliance creates single points of failure, as clients must trust their RPC endpoint for their queries, while full node operators also currently lack direct incentives to maintain their infrastructure.



---

# Centralization of the RPC Infrastructure in Sui



The current RPC infrastructure for the Sui blockchain suffers from fundamental structural issues that undermine the network's decentralization principles and create significant operational and security risks. Despite Sui's decentralized architecture, most applications rely on a small number of centralized RPC providers (such as Mysten Labs' official endpoints, Sentio, and Tritton One), creating critical single points of failure that compromise decentralization. This centralization is exacerbated by the absence of economic incentives for Full Node operators, who, unlike validators receiving consensus validation rewards derived from staking rate, have no direct financial motivation to provide reliable RPC services. The lack of economic alignment leads to inconsistent quality of service, with free public RPC endpoints exhibiting variable performance, availability, and data freshness, particularly during periods of high network activity such as token launches and NFT mints. 

Centralized RPC providers also introduce censorship vulnerabilities, as seen with incidents where Infura (Metamask) and Alchemy censored access to Tornado Cash contracts, and Venezuelan users of Infura RPC were blocked in 2022 because of legal compliance issues. There are also security concerns, as the current model of trusting individual RPC providers enables potential "man-in-the-middle" attacks where malicious actors could manipulate transaction data, return falsified state information, front-run transactions, or censor specific users while appearing as legitimate infrastructure providers.

Finally, while decentralized RPC solutions exist for Ethereum Virtual Machine (EVM) chains, these are incompatible with Sui's Move-based architecture. Determinism Challenges further complicate matters, as the verification mechanisms used in decentralized RPC networks often rely on deterministic response validation, which becomes more complex in blockchains with different execution models and state representations. Move-based blockchains like Sui introduce specialized requirements that require specialized handling in RPC infrastructure. 

These issues create significant barriers to Sui's adoption and compromise the network's security and decentralization. Applications built on these platforms must either rely on centralized RPC providers or invest substantial resources in operating their own full nodes, neither of which represents an optimal solution for a decentralized ecosystem. As the ecosystem grows, the demand for reliable RPC access will only increase, potentially increasing centralization pressures and security risks.  A decentralized, economically sustainable, scalable, and security-focused RPC solution specifically designed for Sui's architecture is therefore essential for the network.



---

# Lava Network: A Decentralized RPC Solution


To address all the RPC challenges in the Sui ecosystem, we propose leveraging the Lava Network—a decentralized protocol specifically designed to provide reliable, censorship-resistant, and incentivized access to blockchain data. Lava Network functions as a decentralized marketplace for RPC services, connecting blockchain applications (consumers) with infrastructure providers through a protocol layer that ensures quality, reliability, and fair compensation. This Network is RPC agnostic and consists of several components:

Providers are node operators who run Sui Full Nodes and offer RPC services through the Lava protocol, forming the backbone of the network's infrastructure. 

Consumers represent applications or services that require access to Sui blockchain data, ranging from wallets and dApps to analytics platforms. 

Validators validate transactions on the Lava blockchain and maintain consensus and pairings lists for Providers and Consumers, ensuring the integrity of the network, match them using a pseudo-random algorithm based on stake, geolocation, and quality metrics, optimizing for both performance and decentralization.

Specification Files are governance-approved configurations that define the RPC methods, compute costs, and verification parameters for each supported blockchain, enabling the protocol to adapt to different blockchain architectures.

## Benefits for the Sui Ecosystem


Implementing Lava as the RPC layer for Sui offers several significant advantages: 

Decentralization is achieved by distributing RPC requests across multiple independent providers, eliminating single points of failure that hinders centralized infrastructure.

Economic Incentives allow providers to earn rewards for delivering reliable RPC services, creating sustainable economics for Sui Full Node operators who previously lacked direct compensation for their services. 

Geographic Distribution is enhanced through Lava's geolocation-aware pairing, which ensures consumers can access providers in their region, reducing latency and improving application performance. 

Censorship Resistance is strengthened as the random pairing of consumers with multiple providers makes targeted censorship extremely difficult, protecting the network from regulatory or political interference.

Scalability is inherent to the design as demand increases, economic incentives attract more providers to the network, naturally load-balancing capacity to meet growing ecosystem needs, and also support failover to ensure constant uptime when at least one provider is up.



---

## Benchmarking of the decentralized RPC setup under Lava Network



The benchmarking utilized the k6_test.js script using k6, an open-source load testing tool, which implements a structured testing methodology that defines metrics for tracking performance such as Average, Medium, Min and Max Latency, and executes parallel requests to both Lava and centralized RPC endpoints, measures response times and error rates. Tests were conducted using a controlled environment with one local full node running under Docker (Provider 1) and an external RPC provider (Provider 2) using https://sui-mainnet.nodeinfra.com. The test executed 300 RPC calls at a rate of 10 requests per second over a 30-second period.

Our testing framework was designed to compare Lava's RPC performance against existing RPC providers, and measure Lava Network overhead when redirecting existing RPC. We measured Latency through response time for various RPC methods: multiGetObjects, which fetches multiple objects in a single call, getLatestCheckpoint, which retrieves the latest checkpoint information, and getReferenceGasPrice, which retrieves the current reference gas price. We also benchmarked the Throughput with maximum requests per second without degradation, and the Consistency with the variation in response times across multiple requests.

| Metric                     | Lava   | Others | Diff (%)  |
| :--------------------------- | :----: | :----: | --------: |
| **Overall Latency (ms)**     |        |         |            |
| Average                      | 46.20  | 48.27  | -4.28%    |
| Minimum                      | 20.85  | 24.22  | -13.91%   |
| Maximum                      | 122.38 | 401.86 | -69.55%   |
| Median                       | 42.35  | 35.48  | +19.36%   |
| **Method-Specific Avg. Latency (ms)** | | | |
| multiGetObjects              | 49.35  | 47.60  | +3.67%    |
| getLatestCheckpoint          | 42.50  | 48.49  | -12.35%   |
| getReferenceGasPrice         | 46.77  | 48.73  | -4.03%    |
| **Error Rate (%)**           | 0.00   | 0.00   | 0.00%     |


Across 300 total RPC calls with a 0% error rate, Lava achieved an average latency of 46.20ms compared to 48.27ms for the centralized provider, representing a negligeable 4.28% performance advantage. While the centralized provider showed a slightly better median latency (35.48ms vs 42.35ms), Lava demonstrated significantly better consistency with a maximum latency of 122.38ms compared to the centralized provider's 401.86ms—a 69.55%.

Method-specific analysis revealed varying performance characteristics across different RPC calls. For the multiGetObjects method, Lava was marginally slower with a 3.67% overhead (49.35ms vs 47.60ms). However, Lava demonstrated clear advantages in other methods, with getLatestCheckpoint showing a 12.35% performance improvement (42.50ms vs 48.49ms) and getReferenceGasPrice performing 4.03% faster (46.77ms vs 48.73ms). 

This overall shows there is little to no overhead when running our decentralized RPC setup against a centralized RPC provider.

## Detailed Network Operation Analysis



Examining the consumer docker logs provides details into how Lava's decentralized infrastructure operates during these benchmarks. For the commonly used getReferenceGasPrice method, we observed consistent sub-5ms response times from the best-performing providers. Provider 1 demonstrated great performance with response times averaging 2.77ms (ranging from 2.42ms to 3.56ms). This very low latency is explained by this provider running under a local full node, which makes request not have to call an external RPC provider to answer queries. Provider 2 showed higher but still acceptable latencies averaging 19.76ms, with measurements ranging from 18.67ms to 20.85ms. This is explained by this specific provider running under an external RPC provider, which explains the bigger latency since it calls an external URL.

The logs reveal Lava's  provider selection mechanism in action during the benchmarking process. The system continuously evaluates providers based on three primary metrics: Latency Score (normalized values ranging from approximately 0.0016 to 0.0089 in our dataset, with lower scores indicating better performance), Availability Score (ranging from 0.80 to 1.0, representing the reliability of provider responses), and Sync Score (a measure of how well providers maintain synchronization with the blockchain's latest state, with values ranging from 0.00067 to over 125.0). These metrics are combined to calculate provider selection probabilities, represented as "shiftedChances" in the logs. For example, at one point the selection probability was distributed as map[0:0.8703322792862555 1:0.12966772071374455], indicating an 87% chance of selecting the 1st provider and a 13% chance for the 2nd, based on their respective QoS metrics.

The consumer logs also demonstrate the network's block synchronization mechanism during our benchmarking. Providers maintained close tracking of the Sui blockchain's latest blocks. The system continuously updates a "finalization information" map that tracks the latest confirmed blocks and their cryptographic hashes, ensuring data consistency across the network. For example, at block 149705486, the hash CCTDdiV65gUn was independently confirmed by multiple providers, demonstrating the network's consensus mechanism for validating blockchain data. Block Lag between different providers can vary significantly due to Sui unique Full Node architecture, and this parameter is controlled by the "allowed_block_lag_for_qos_sync": 100000, which we have set at an arbitrary value of 100000 for these tests. The Excellence Quality of Service (QoS) metric combines multiple performance indicators to create a comprehensive provider rating. In our tests, we observed that despite having a slightly lower availability score (approximately 0.80 vs 1.0), Provider 1 was frequently selected due to its superior latency performance (1.67ms vs 8.87ms). 

Each consumer maintains separate sessions with different providers, identified by unique session IDs (e.g., sessionId=6586878964949052114). These sessions persist across multiple requests, allowing for connection reuse and more efficient request handling. Each provider is also assigned a unique identifier (e.g., providerUniqueId=2322231023700234243), which is verified on each request by the consumer to prevent provider impersonation. Additionally, block hashes are recorded and compared across providers to ensure data consistency, with entries like: "Added provider to block hash consensus blockHash=DG58CTFAM1P blockNum=149705487". This ensures no provider can serve a consumer request if it was not paired with its unique corresponding consumer.

---

# Conclusion



The integration of the Sui blockchain with Lava Network represents a significant advancement in decentralized RPC infrastructure. By addressing the multiples challenges of centralization, reliability, and economic sustainability for RPC providers, this solution enables the Sui ecosystem to scale its queries capabilities while maintaining its decentralization principles. 

The technical implementation leverages Lava Network to create a decentralized network of incentivized Sui Full Node operators, ensuring high availability and performance, geographic distribution with load-balancing, redundancy, and fault tolerance.The speed of the RPC calls are unaffected by our solution, and the security mechanisms, including cross-verification with conflict resolution, protect against malicious behavior and ensure data integrity. Our Docker Compose deployment setup reduces the operational complexity of running a Sui RPC provider on the Lava Network, making it accessible to a wider range of operators with a single line of command to orchestrate the whole stack. This composable approach allows for flexible deployment options, from running the complete stack to selecting specific components based on individual requirements. 

Most importantly, the economic model can create sustainable incentives for Sui Full Node operators, solving the fundamental problem of RPC infrastructure funding. As the Sui ecosystem continues to grow, this decentralized RPC layer will become more and more valuable, supporting the next generation of decentralized applications with reliable, fast, redundant, and censorship-resistant blockchain access, and creates a unique economic alignment between RPC consumers and providers.

This approach not only benefits the Sui ecosystem specifically but also demonstrates a viable model for decentralized infrastructure that could give the Sui blockchain a faster, more decentralized access structure from the client perspective.

# Acknowledgments

We would like to express our deepest gratitude to Gauthier Voron for his guidance and support as our supervisor throughout this project. We are also deeply thankful to Professor Rachid Guerraoui for accepting our project within the Distributed Computing Laboratory at EPFL, providing us with the opportunity to develop our work in a stimulating academic environment. We would also like to thank the Mysten Lab Team, especially Ashok for his guidance on the Indexer Framework.

I would also like to thank Alexandre Mourot, whom I worked very hard with to have the best solution we could find for the Sui Ecosystem.

Full Report available at : https://github.com/Project-Magma-Monorepo/Obsuidian/blob/main/Master_Project_Obsidian_Loris___Alexandre.pdf
