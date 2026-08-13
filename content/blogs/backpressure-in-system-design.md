---
title: "Backpressure in System Design"
slug: "backpressure-in-system-design"
summary: "Backpressure in System Design"
category: "System Design"
tags: ["system design"]
publishedAt: "Aug 13, 2026"
readTime: "21 min read"
coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"
authorName: "Harsh Vardhan Prasad"
authorAvatar: "https://github.com/harsh7274v.png"
authorRole: "Fullstack & AI Engineer"
authorGithub: "https://github.com/harsh7274v"
likesCount: 15
---

# Backpressure in System Design

Modern applications rarely process every request at the same speed at which requests arrive.

A service might receive **10,000 requests/second**, while the downstream database can process only **5,000 requests/second**. If the system continues accepting work without controlling the flow, queues grow, memory gets exhausted, latency increases, and eventually the entire system can become unstable.

This problem is where **backpressure** becomes important.

Backpressure is a mechanism that allows a slower component to communicate its processing capacity to a faster component, so the system can regulate how much work is accepted, buffered, delayed, or rejected.

---

# 1. What Is Backpressure?

In simple terms:

> **Backpressure means slowing down or controlling incoming work when a downstream component cannot keep up.**

Consider this pipeline:

```text
Client
   ↓
API Server
   ↓
Service A
   ↓
Service B
   ↓
Database
```

Suppose:

```text
Incoming traffic = 10,000 requests/sec
Service B capacity = 6,000 requests/sec
Database capacity = 5,000 operations/sec
```

The system has a bottleneck.

If Service A continues sending 10,000 requests/sec to Service B, but Service B can process only 6,000, the remaining requests have to go somewhere.

They may:

* wait in memory
* enter a queue
* be rejected
* time out
* be dropped
* be processed later

If there is no strategy for dealing with this excess work, the system can experience **cascading failures**.

---

# 2. Why Do We Need Backpressure?

Without backpressure, a system can behave like this:

```text
10,000 req/s
      ↓
   API Server
      ↓
10,000 req/s
      ↓
   Service B
      ↓
Can process only 6,000 req/s
      ↓
4,000 requests start accumulating
      ↓
Queue keeps growing
      ↓
Memory increases
      ↓
Latency increases
      ↓
Timeouts
      ↓
Retries
      ↓
Even more traffic
      ↓
System failure
```

This is especially dangerous because retries can create a **positive feedback loop**.

For example:

```text
Request fails
     ↓
Client retries
     ↓
More requests
     ↓
Service becomes more overloaded
     ↓
More failures
     ↓
More retries
```

Backpressure helps break this cycle.

---

# 3. The Core Idea

Every component has a certain processing capacity.

Suppose:

```text
Producer:
10,000 messages/sec

Consumer:
5,000 messages/sec
```

The consumer is slower.

Therefore:

```text
Producer rate > Consumer rate
```

If this continues indefinitely:

```text
Backlog = Incoming rate - Processing rate
```

In this example:

```text
Backlog growth = 10,000 - 5,000
               = 5,000 messages/sec
```

After one minute:

```text
5,000 × 60
= 300,000 messages
```

The system now has a massive backlog.

Backpressure is about preventing uncontrolled backlog growth.

---

# 4. Where Can Backpressure Occur?

Backpressure can happen at multiple layers.

### Client → API

Too many users send requests to the API.

```text
Clients
   ↓
API Gateway
```

Possible solutions:

* Rate limiting
* Request throttling
* HTTP 429 responses
* Client-side retry with exponential backoff

---

### API → Service

One microservice generates work faster than another can process it.

```text
Service A
    ↓
Service B
```

Possible solutions:

* Queue
* Bounded buffer
* Rate limiting
* Concurrency limits

---

### Service → Database

The application sends queries faster than the database can execute them.

```text
Application
     ↓
Database
```

Possible solutions:

* Connection pool limits
* Query throttling
* Batching
* Caching
* Queueing
* Load shedding

---

### Producer → Consumer

A producer generates events faster than consumers process them.

```text
Producer
   ↓
Message Queue
   ↓
Consumer
```

Possible solutions:

* Queue buffering
* Consumer scaling
* Batch processing
* Visibility timeout / retry policies
* Dead-letter queues

---

# 5. Main Approaches to Handle Backpressure

There is no single backpressure strategy.

The correct approach depends on whether the workload can be delayed, dropped, retried, or must be processed immediately.

The major approaches are:

1. Blocking
2. Buffering
3. Queue-based backpressure
4. Rate limiting
5. Concurrency limiting
6. Load shedding
7. Batching
8. Scaling consumers
9. Retry with exponential backoff
10. Reactive-stream backpressure

---

# 6. Approach 1 — Blocking

The simplest strategy is to make the producer wait when the consumer cannot accept more work.

For example:

```text
Producer
   ↓
Buffer Full
   ↓
WAIT
   ↓
Consumer processes existing work
   ↓
Producer continues
```

Suppose a worker has a buffer size of 100.

```text
Buffer:
[100/100]
```

The producer cannot add another task until space becomes available.

### Advantages

* Simple
* Prevents unlimited memory growth
* Naturally slows producers

### Disadvantages

* Threads may remain blocked
* Can increase latency
* Poorly designed blocking can cause deadlocks
* Not ideal for high-throughput distributed systems

Blocking is more common in local producer-consumer systems than in large distributed architectures.

---

# 7. Approach 2 — Bounded Buffer

Instead of allowing unlimited buffering, define a maximum capacity.

Example:

```text
Queue capacity = 1,000

Current queue:
800 / 1,000
```

The producer can continue.

But:

```text
Queue:
1,000 / 1,000
```

Now the system needs a policy.

Possible policies:

```text
Queue Full
   ↓
 ┌───────────────┐
 │               │
Reject        Block
 │               │
HTTP 429       Wait
```

Another option is to drop old or low-priority messages.

The important principle is:

> **Never allow an internal queue to grow indefinitely.**

An unbounded queue simply moves the failure from the downstream service to memory.

---

# 8. Approach 3 — Queue-Based Backpressure

Message queues are one of the most common approaches in distributed systems.

Architecture:

```text
Producer
   ↓
Message Queue
   ↓
Consumer
   ↓
Database
```

Suppose:

```text
Producer = 10,000 msg/s
Consumer = 5,000 msg/s
```

The queue absorbs temporary traffic spikes.

```text
Incoming traffic
      ↓
┌───────────────┐
│ Message Queue │
│  █████████    │
└───────────────┘
      ↓
Consumer
5,000 msg/s
```

The consumer can process messages at its own speed.

### Important distinction

A queue does **not eliminate backpressure**.

It primarily **absorbs bursts and decouples producers from consumers**.

If:

```text
Producer = 10,000 msg/s
Consumer = 5,000 msg/s
```

for a long period, the queue will continue growing.

Therefore, queues work best when traffic is bursty or consumers can eventually catch up.

---

# 9. Example: Amazon SQS

A useful architecture is:

```text
Client
   ↓
API
   ↓
Amazon SQS
   ↓
Workers
   ↓
Database
```

Suppose an application receives:

```text
20,000 jobs/sec
```

while workers collectively process:

```text
15,000 jobs/sec
```

SQS can temporarily hold the backlog.

Workers consume messages at a controlled rate.

If the workload later falls to:

```text
5,000 jobs/sec
```

the consumers can catch up with the backlog.

This is especially useful for asynchronous workloads such as:

* Email processing
* Image processing
* Video processing
* Report generation
* Order processing
* Notifications
* Background jobs

---

# 10. Approach 4 — Rate Limiting

Rate limiting controls how much traffic a client or service can send within a period.

For example:

```text
Maximum:
100 requests/sec per user
```

If the user sends:

```text
150 requests/sec
```

the system can reject or delay the additional requests.

Common algorithms include:

### Token Bucket

```text
        Tokens
       ↓ ↓ ↓ ↓
Client → Bucket → API
```

Tokens are generated at a fixed rate.

Each request consumes one token.

If no token is available, the request can be:

* rejected
* delayed

Token Bucket allows controlled bursts.

---

### Leaky Bucket

The system processes requests at a relatively fixed rate.

```text
Requests
   ↓
┌─────────────┐
│   Bucket    │
└──────┬──────┘
       ↓
 Fixed output rate
```

This smooths traffic.

---

### Fixed Window

Example:

```text
100 requests / minute
```

The counter resets every minute.

Simple, but traffic can spike around window boundaries.

---

### Sliding Window

Instead of treating each minute independently, the system considers a rolling time window.

This provides smoother control than a basic fixed window.

---

# 11. Rate Limiting vs Backpressure

These concepts are related but not identical.

### Rate Limiting

Controls **how much traffic is allowed to enter**.

```text
Client
  ↓
Rate Limiter
  ↓
Service
```

### Backpressure

Controls **how much work the system can safely accept or propagate based on downstream capacity**.

```text
Service A
    ↓
Service B
    ↓
Database
```

A rate limiter may protect the system from excessive incoming traffic, while backpressure handles overload between internal components.

---

# 12. Approach 5 — Concurrency Limiting

Sometimes the problem is not requests per second but the number of operations executing simultaneously.

Suppose a database can safely handle:

```text
100 concurrent queries
```

but the application creates:

```text
1,000 concurrent queries
```

The database may become overloaded.

Instead, limit concurrency:

```text
Incoming requests
       ↓
Concurrency Limiter
       ↓
Maximum 100 active operations
       ↓
Database
```

The remaining requests wait or are rejected.

This is particularly useful for:

* Database calls
* External APIs
* CPU-heavy operations
* File processing
* Thread pools

---

# 13. Approach 6 — Load Shedding

Sometimes the system cannot process all incoming requests.

In that situation, it is better to **reject some work quickly** than allow everything to become slow.

This is called load shedding.

Example:

```text
10,000 requests/sec
        ↓
System capacity = 6,000/sec
        ↓
Accept 6,000
Reject 4,000
```

The rejected requests may receive:

```text
HTTP 429 Too Many Requests
```

or:

```text
HTTP 503 Service Unavailable
```

depending on the situation.

### Why is rejection sometimes better?

Consider:

```text
Option A:
All 10,000 requests take 30 seconds

Option B:
6,000 requests complete in 1 second
4,000 are rejected immediately
```

For many systems, Option B provides a much better user experience and protects system stability.

---

# 14. Priority-Based Load Shedding

Not every request has equal importance.

Suppose an e-commerce system receives:

```text
Payment
Order creation
Product search
Recommendation
Analytics
```

During overload, we should not necessarily treat them equally.

For example:

```text
Highest priority:
Payment
Order creation

Medium:
Product search

Low:
Recommendations
Analytics
```

During overload:

```text
Keep:
Payments
Orders

Reduce:
Recommendations

Drop:
Non-critical analytics
```

This is called **priority-aware load shedding**.

---

# 15. Approach 7 — Batching

Another way to handle overload is to process multiple items together.

Instead of:

```text
1 request → 1 database operation
```

process:

```text
100 requests → 1 batch operation
```

Example:

```text
Individual writes:

Write 1
Write 2
Write 3
...
Write 100
```

can become:

```text
Batch Write
   ↓
100 records
```

Batching can reduce:

* Network overhead
* Database round trips
* CPU overhead
* Transaction overhead

But batching introduces additional latency because the system may wait until enough items accumulate.

Therefore:

> **Batch size and maximum waiting time should both be bounded.**

For example:

```text
Batch size = 100
OR
Maximum wait = 50 ms
```

Whichever happens first triggers processing.

---

# 16. Approach 8 — Horizontal Scaling

If consumers cannot keep up, add more consumers.

Suppose:

```text
1 consumer = 1,000 msg/sec
```

Traffic:

```text
10,000 msg/sec
```

We can deploy:

```text
10 consumers
```

giving approximately:

```text
10 × 1,000
= 10,000 msg/sec
```

Architecture:

```text
              ┌── Consumer 1
              │
Producer → Queue ── Consumer 2
              │
              ├── Consumer 3
              │
              └── Consumer N
```

This is often combined with queue depth monitoring.

For example:

```text
Queue depth increases
        ↓
Autoscaling triggered
        ↓
More consumers
        ↓
Processing capacity increases
        ↓
Queue drains
```

---

# 17. Queue Depth as an Autoscaling Signal

CPU utilization alone is not always the best metric for worker-based systems.

Suppose:

```text
CPU = 40%
Queue depth = 500,000
```

CPU may look healthy, but the system is clearly falling behind.

Useful metrics include:

* Queue depth
* Messages waiting
* Message age
* Processing latency
* Consumer throughput
* Error rate

For example:

```text
Queue depth > 100,000
        ↓
Increase workers

Queue depth < 10,000
        ↓
Reduce workers
```

This creates a feedback control loop.

---

# 18. Approach 9 — Retry with Exponential Backoff

Retries can make overload significantly worse if implemented incorrectly.

Bad approach:

```text
Request fails
   ↓
Retry immediately
   ↓
Fails
   ↓
Retry immediately
   ↓
Fails
   ↓
Retry immediately
```

Thousands of clients may retry simultaneously.

This can create a **retry storm**.

Instead, use exponential backoff.

Example:

```text
Attempt 1 → wait 100 ms
Attempt 2 → wait 200 ms
Attempt 3 → wait 400 ms
Attempt 4 → wait 800 ms
```

Usually, add **jitter** so clients do not retry at exactly the same time.

```text
Retry delay =
Exponential backoff + Random jitter
```

This spreads retries over time.

---

# 19. Approach 10 — Reactive Streams

Reactive systems treat data flow as something that should be controlled between producers and consumers.

Instead of:

```text
Producer:
"Here are 1 million events."
```

the consumer can communicate:

```text
"I can process only 100 events right now."
```

The producer sends only the requested amount.

Conceptually:

```text
Producer
   │
   │ 100 items
   ↓
Consumer
   │
   │ "Give me 100 more"
   ↓
Producer
```

This is known as **demand-driven backpressure**.

It is common in reactive programming frameworks and streaming systems.

---

# 20. Pull vs Push

This distinction is extremely important.

### Push Model

Producer decides when to send data.

```text
Producer
   ↓
   ↓
   ↓
Consumer
```

Problem:

The producer may overwhelm the consumer.

---

### Pull Model

Consumer asks for work when it is ready.

```text
Consumer
   ↑
 "Give me work"
   ↑
Producer
```

This naturally creates backpressure.

A queue-based worker architecture often behaves closer to this model:

```text
Worker → receive/pull message
Queue → returns available message
Worker → processes it
```

---

# 21. Backpressure in Microservices

Consider:

```text
API Gateway
      ↓
Order Service
      ↓
Payment Service
      ↓
Database
```

Suppose Payment Service becomes slow.

Without backpressure:

```text
Order Service
     ↓
10,000 req/s
     ↓
Payment Service
     ↓
Only 2,000 req/s capacity
```

Requests accumulate.

A better architecture could be:

```text
API Gateway
     ↓
Order Service
     ↓
Message Queue
     ↓
Payment Workers
     ↓
Payment Provider
```

Now the payment workers can process at a controlled rate.

However, payment processing requires special consideration around **idempotency**, because retrying a payment operation must not accidentally charge the customer twice.

---

# 22. Backpressure and Circuit Breakers

Backpressure and circuit breakers solve related but different problems.

### Backpressure

Controls the amount of work entering or moving through the system.

### Circuit Breaker

Stops calling a failing downstream service temporarily.

Example:

```text
Service A
   ↓
Circuit Breaker
   ↓
Service B
```

If Service B repeatedly fails:

```text
CLOSED
  ↓
Failures increase
  ↓
OPEN
  ↓
Requests rejected immediately
  ↓
Wait
  ↓
HALF-OPEN
  ↓
Test request
  ↓
Success → CLOSED
```

Circuit breakers prevent a failing dependency from consuming all resources in the caller.

---

# 23. Backpressure + Circuit Breaker + Rate Limiting

In production systems, these techniques often work together.

```text
                ┌───────────────┐
Client ───────→ │ Rate Limiter  │
                └───────┬───────┘
                        ↓
                ┌───────────────┐
                │ API Service   │
                └───────┬───────┘
                        ↓
                ┌───────────────┐
                │ Queue/Buffer  │
                └───────┬───────┘
                        ↓
                ┌───────────────┐
                │ Worker Pool   │
                └───────┬───────┘
                        ↓
                ┌───────────────┐
                │Circuit Breaker│
                └───────┬───────┘
                        ↓
                   Database/API
```

Each mechanism protects a different part of the system.

---

# 24. A Real-World Example: Video Processing

Imagine a video processing platform.

Users upload videos:

```text
10,000 uploads/minute
```

Each video requires CPU/GPU processing.

Processing capacity:

```text
3,000 videos/minute
```

If the API directly processes every upload:

```text
Client
 ↓
API
 ↓
Video Processing
 ↓
GPU
```

the GPU becomes overloaded.

Instead:

```text
Client
 ↓
Upload Service
 ↓
Queue
 ↓
Worker Pool
 ↓
GPU Processing
 ↓
Object Storage
```

Now:

* Uploads can be accepted quickly.
* Queue absorbs bursts.
* Workers process at controlled concurrency.
* Workers can scale horizontally.
* Queue depth indicates whether the system is falling behind.

This is a classic use case for asynchronous backpressure.

---

# 25. What Happens When the Queue Is Full?

This is an important system-design interview question.

Suppose:

```text
Queue capacity = 1 million
```

and it becomes full.

You need a policy.

### Option 1: Reject new requests

```text
HTTP 429
```

Appropriate when clients can retry later.

### Option 2: Block producers

Useful when the producer can safely wait.

### Option 3: Drop low-priority work

Useful when some events are not critical.

### Option 4: Apply priority queues

Process critical work first.

### Option 5: Increase consumers

Scale workers if downstream capacity allows it.

### Option 6: Store overflow elsewhere

For workloads where durable storage is required, overflow can sometimes be persisted for later processing.

The correct choice depends on business requirements.

---

# 26. Backpressure for Different Workloads

Not every workload should use the same strategy.

| Workload           | Suitable Strategy                    |
| ------------------ | ------------------------------------ |
| API requests       | Rate limiting + concurrency limiting |
| Background jobs    | Queue + worker scaling               |
| Image processing   | Queue + bounded workers              |
| Video processing   | Queue + GPU workers                  |
| Notifications      | Queue + batching                     |
| Analytics          | Buffering + batching                 |
| Payments           | Queue carefully + idempotency        |
| Real-time requests | Load shedding + timeouts             |
| Streaming          | Reactive backpressure                |
| Database writes    | Batching + connection limits         |

---

# 27. Backpressure Is Not the Same as Caching

Caching and backpressure solve different problems.

### Caching

Reduces work by avoiding repeated computation or database access.

```text
Request
 ↓
Cache hit
 ↓
Response
```

### Backpressure

Controls work when demand exceeds processing capacity.

```text
Too much traffic
 ↓
Control incoming work
```

They can be used together.

For example:

```text
Client
 ↓
Rate Limiter
 ↓
Cache
 ↓
API
 ↓
Queue
 ↓
Workers
 ↓
Database
```

Caching reduces downstream load, while backpressure protects the system when demand still exceeds capacity.

---

# 28. Backpressure and Kafka

Kafka provides durable event streaming and allows consumers to process records at their own pace.

Conceptually:

```text
Producer
   ↓
Kafka Topic
   ↓
Consumer Group
   ↓
Consumers
```

If consumers are slower than producers, the consumer lag increases.

For example:

```text
Producer = 50,000 events/sec
Consumer = 30,000 events/sec
```

Then:

```text
Consumer lag increases
```

The solution may involve:

* Increasing consumer instances
* Increasing partitions where appropriate
* Optimizing consumer processing
* Batching
* Controlling producer rate
* Applying business-level load shedding

Kafka's consumer lag is therefore an important signal for detecting that downstream processing is falling behind.

---

# 29. Backpressure in RabbitMQ

RabbitMQ can also be used for producer-consumer workloads.

A common architecture is:

```text
Producer
   ↓
RabbitMQ
   ↓
Consumers
```

Consumers can control how many messages they receive at a time using mechanisms such as prefetch limits.

This prevents a single consumer from being flooded with too many unprocessed messages.

---

# 30. Backpressure in Amazon SQS

SQS provides a durable buffer between producers and consumers.

Example:

```text
                 ┌──────────────┐
                 │   Producer   │
                 └──────┬───────┘
                        ↓
                 ┌──────────────┐
                 │    SQS       │
                 │   Queue      │
                 └──────┬───────┘
                        ↓
             ┌──────────┼──────────┐
             ↓          ↓          ↓
          Worker 1   Worker 2   Worker 3
             │          │          │
             └──────────┼──────────┘
                        ↓
                     Database
```

If traffic increases temporarily, SQS absorbs the spike.

If the backlog remains high, scale workers.

Important metrics include:

* Approximate number of messages visible
* Message age
* Processing failures
* Number of consumers
* Processing latency

---

# 31. Backpressure and the Database

One of the most common mistakes is allowing application servers to overwhelm the database.

Suppose:

```text
100 API servers
```

Each can create:

```text
100 database connections
```

Potentially:

```text
100 × 100 = 10,000 connections
```

The database may not support that load.

A better architecture uses controlled connection pools:

```text
100 API servers
       ↓
Connection pools
       ↓
Controlled DB concurrency
       ↓
Database
```

Other techniques include:

* Query optimization
* Batching
* Caching
* Read replicas
* Connection limits
* Queue-based writes
* Timeouts

---

# 32. The Four Important Signals

When designing backpressure, monitor at least four things.

### 1. Queue Depth

How much work is waiting?

```text
Queue depth ↑
```

may indicate consumers are falling behind.

### 2. Queue Age

How long has the oldest item been waiting?

This is often more meaningful than queue size.

A queue with:

```text
10,000 messages
```

might be healthy if each message is only 1 second old.

But:

```text
500 messages
```

with the oldest message being 30 minutes old indicates a serious problem.

### 3. Processing Latency

How long does each task take?

### 4. Error Rate

Are tasks failing and being retried?

Retries can amplify the original overload.

---

# 33. The Backpressure Feedback Loop

A robust architecture can use feedback:

```text
             ┌─────────────────────┐
             │                     │
             ↓                     │
Producer → Queue → Consumer → DB   │
             │          │          │
             │          └──────────┘
             │          Metrics
             │
             └── Queue depth
```

The system observes:

```text
Queue depth
Latency
Throughput
Errors
Consumer capacity
```

and adjusts:

```text
Producer rate
Worker count
Concurrency
Batch size
Retry rate
```

This creates a feedback-controlled system.

---

# 34. How to Choose the Right Approach?

Ask these questions during system design.

### Question 1: Can the work be delayed?

If yes:

```text
Queue / asynchronous processing
```

If no:

```text
Rate limiting / load shedding
```

---

### Question 2: Can the work be dropped?

If yes:

```text
Load shedding
```

If no:

```text
Durable queue / persistent storage
```

---

### Question 3: Is the workload bursty?

If yes:

```text
Buffer / queue
```

If traffic is continuously higher than capacity:

```text
Scaling or capacity redesign
```

A queue cannot solve an infinite capacity mismatch.

---

### Question 4: Is the downstream dependency failing?

Use:

```text
Circuit breaker
+
Timeout
+
Backpressure
```

---

### Question 5: Can processing be parallelized?

If yes:

```text
Horizontal worker scaling
```

---

### Question 6: Can requests be combined?

If yes:

```text
Batching
```

---

# 35. A Production-Grade Backpressure Architecture

A strong architecture could look like this:

```text
                         ┌───────────────┐
Clients ───────────────→ │ API Gateway   │
                         └───────┬───────┘
                                 ↓
                         ┌───────────────┐
                         │ Rate Limiter  │
                         └───────┬───────┘
                                 ↓
                         ┌───────────────┐
                         │ API Service   │
                         └───────┬───────┘
                                 ↓
                         ┌───────────────┐
                         │ Queue         │
                         └───────┬───────┘
                                 ↓
                    ┌────────────┼────────────┐
                    ↓            ↓            ↓
                 Worker 1     Worker 2     Worker N
                    │            │            │
                    └────────────┼────────────┘
                                 ↓
                         ┌───────────────┐
                         │ Circuit       │
                         │ Breaker       │
                         └───────┬───────┘
                                 ↓
                         ┌───────────────┐
                         │ Database/API  │
                         └───────────────┘
```

Monitoring:

```text
Queue Depth
Queue Age
Latency
Throughput
Error Rate
Consumer Lag
CPU
Memory
Database Connections
```

Autoscaling:

```text
Queue depth ↑
      ↓
More workers
      ↓
Throughput ↑
      ↓
Queue depth ↓
```

---

# 36. Common Mistakes

### Mistake 1 — Using an unbounded queue

```text
Queue = ∞
```

This eventually becomes a memory problem.

Use bounded queues or durable external queues with clear retention policies.

---

### Mistake 2 — Retrying immediately

This can create retry storms.

Use:

```text
Exponential Backoff
+
Jitter
+
Maximum Retry Count
```

---

### Mistake 3 — Relying only on CPU

A worker can have low CPU utilization while queue latency is increasing.

Monitor workload-specific metrics.

---

### Mistake 4 — Assuming a queue solves everything

A queue handles bursts.

It does not magically increase processing capacity.

If:

```text
Producer = 10,000/sec
Consumer = 5,000/sec
```

forever, the queue eventually fills.

---

### Mistake 5 — Ignoring downstream dependencies

Your service may be healthy, but the database or external API may be overloaded.

Backpressure must propagate through the system.

---

# 37. Interview Answer: "What Is Backpressure?"

A concise system-design interview answer would be:

> **Backpressure is a mechanism used to prevent a faster component from overwhelming a slower downstream component. When the consumer cannot keep up, the system can slow producers, buffer work, reject requests, limit concurrency, shed load, or scale consumers. Common implementations include bounded queues, rate limiting, concurrency limits, message queues such as SQS/Kafka/RabbitMQ, batching, and reactive-stream demand control. The goal is not simply to process more traffic, but to keep the system stable under overload.**

---

# 38. The Most Important Mental Model

Remember this:

```text
                 SYSTEM CAPACITY
                       │
                       ↓
Traffic ───────→ [ Backpressure ] ───────→ Processing
                       │
                       ├── Buffer
                       ├── Slow down
                       ├── Reject
                       ├── Drop
                       ├── Batch
                       └── Scale
```

Backpressure is fundamentally a **capacity-control problem**.

The key question is:

> **"What should the system do when incoming work is greater than downstream processing capacity?"**

There are only a few fundamental choices:

```text
1. Wait
2. Buffer
3. Slow down
4. Scale
5. Reject
6. Drop
7. Process later
```

A good system-design solution combines these according to the business requirements.

---

# 39. Final Takeaway

Backpressure is one of the most important concepts for designing reliable distributed systems.

A production system should not assume that every component can process unlimited traffic.

Instead, it should explicitly define:

```text
Maximum capacity
       ↓
Buffer capacity
       ↓
Concurrency limit
       ↓
Retry policy
       ↓
Load-shedding policy
       ↓
Scaling strategy
       ↓
Monitoring
```

The strongest architecture is therefore not the one that accepts every request.

It is the one that **degrades gracefully when demand exceeds capacity**.

When traffic suddenly increases, a resilient system should be able to say:

```text
"Process what I can,
buffer what I can process later,
slow down what can wait,
reject what cannot be accepted,
and protect critical operations."
```

That is the essence of **backpressure in system design**.
