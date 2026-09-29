# Job Portal Backend

A RESTful backend API for a Job Portal application built with Node.js, Express.js, and MySQL.

The backend supports candidate and employer workflows including authentication, job management, job applications, employer application management, and application status updates.

---

## Features

### Authentication & Authorization
- User registration
- User login
- JWT authentication
- Role-based authorization
- Candidate and Employer roles
- Protected API routes

### Candidate Features
- Browse jobs
- View job details
- Apply for jobs
- View submitted applications
- Filter applications by status
- View individual application details
- Delete applications
- View application statistics

### Employer Features
- Create jobs
- Manage employer jobs
- View applications received for employer-owned jobs
- Filter applications by status
- View application information
- Update application status
- 
### Application Status

Supported application statuses include:

- `APPLIED`
- `SHORTLISTED`
- `INTERVIEW`
- `REJECTED`
- `HIRED`

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MySQL
- JWT
- bcrypt
- dotenv
- REST API
- Git & GitHub 
--
## Project Structure

```text
job-portal-backend/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── applicationController.js
│   ├── jobController.js
│   └── userController.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
│
├── models/
│   ├── applicationModel.js
│   ├── jobModel.js
│   └── userModel.js
│
├── routes/
│   ├── applicationRoutes.js
│   ├── jobRoutes.js
│   └── userRoutes.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── server.js



# LYAPUNOV

<p align="center">
  <img src="docs/assets/lyapunov-banner.png" alt="LYAPUNOV Banner" width="100%">
</p>

<p align="center">
  <strong>A distributed event reliability and fault-verification platform.</strong>
</p>

<p align="center">
  <em>Designed to observe, verify and recover failures across distributed systems.</em>
</p>

<p align="center">

[![Java](https://img.shields.io/badge/Java-26-ED8B00?style=flat-square\&logo=openjdk\&logoColor=white)](https://www.java.com/)
[![Maven](https://img.shields.io/badge/Maven-Build-C71A36?style=flat-square\&logo=apachemaven\&logoColor=white)](https://maven.apache.org/)
[![Architecture](https://img.shields.io/badge/Architecture-Distributed-1F6FEB?style=flat-square)](#architecture)
[![Status](https://img.shields.io/badge/Status-In%20Development-F59E0B?style=flat-square)](#roadmap)
[![License](https://img.shields.io/badge/License-MIT-2EA043?style=flat-square)](LICENSE)

</p>

---

## Overview

Modern applications rarely run as a single process.

A production system may contain multiple services communicating through APIs, queues, databases and event streams. When one component becomes slow, unavailable or inconsistent, failures can propagate through the system.

**LYAPUNOV** is being developed as an engineering platform for studying and handling this problem.

The project focuses on:

* distributed event processing
* service-to-service communication
* failure detection
* fault verification
* retries and recovery
* event consistency
* observability
* system resilience

The goal is not simply to detect that something failed.

The goal is to understand **what failed, verify the failure, determine its impact and recover safely.**

---

# Why LYAPUNOV?

Distributed systems introduce failure modes that are difficult to reproduce and reason about.

For example:

```text
Service A
   |
   v
Service B
   |
   v
Service C
   |
   X
Failure
```

A single failure can create:

* duplicate events
* lost events
* delayed processing
* inconsistent state
* retry storms
* cascading failures

LYAPUNOV explores mechanisms that allow a system to reason about these situations instead of treating every error as an isolated exception.

---

# Core Idea

LYAPUNOV follows a simple reliability loop:

```text
        ┌───────────────┐
        │     EVENT     │
        └───────┬───────┘
                │
                ▼
        ┌───────────────┐
        │    PROCESS    │
        └───────┬───────┘
                │
                ▼
        ┌───────────────┐
        │    VERIFY     │
        └───────┬───────┘
                │
        ┌───────┴────────┐
        │                │
        ▼                ▼
     SUCCESS           FAILURE
        │                │
        │                ▼
        │          ┌─────────────┐
        │          │   RECOVER   │
        │          └──────┬──────┘
        │                 │
        └────────┬────────┘
                 ▼
          ┌──────────────┐
          │   OBSERVE    │
          └──────────────┘
```

This creates a closed reliability cycle rather than a simple request-response workflow.

---

# System Architecture

<p align="center">
  <img src="docs/assets/architecture.png" alt="LYAPUNOV System Architecture" width="95%">
</p>

### High-Level Components

```text
                    ┌─────────────────────┐
                    │       CLIENT        │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │     API GATEWAY     │
                    └──────────┬──────────┘
                               │
             ┌─────────────────┼─────────────────┐
             │                 │                 │
             ▼                 ▼                 ▼
      ┌────────────┐    ┌────────────┐    ┌────────────┐
      │ Event      │    │ Reliability│    │ Monitoring │
      │ Processor  │    │ Engine     │    │ Service    │
      └─────┬──────┘    └─────┬──────┘    └─────┬──────┘
            │                 │                  │
            └─────────────────┼──────────────────┘
                              │
                              ▼
                    ┌─────────────────────┐
                    │    EVENT STORE      │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   RECOVERY ENGINE   │
                    └─────────────────────┘
```

---

# Engineering Principles

LYAPUNOV is built around several distributed-system concepts.

### 1. Event Reliability

Every important event should have a traceable lifecycle.

```text
CREATED
   ↓
RECEIVED
   ↓
PROCESSING
   ↓
VERIFIED
   ↓
COMPLETED
```

---

### 2. Idempotency

Repeated delivery of the same event should not unintentionally produce repeated side effects.

```text
Event ID: EVT-10482

First attempt
      ↓
Processed
      ↓
State updated

Second attempt
      ↓
Duplicate detected
      ↓
Safe acknowledgement
```

---

### 3. Failure Detection

The system should distinguish between different types of failures instead of treating everything as a generic error.

Examples:

```text
TIMEOUT
SERVICE_UNAVAILABLE
PROCESSING_FAILURE
DUPLICATE_EVENT
INVALID_EVENT
DEPENDENCY_FAILURE
```

---

### 4. Recovery

A detected failure should have a controlled recovery path.

```text
Failure
   ↓
Classify
   ↓
Retry?
 ┌─┴─┐
Yes  No
 │    │
 ▼    ▼
Retry  Dead Letter
 │
 ▼
Verify
```

---

### 5. Observability

Every important operation should be observable.

The system is intended to track:

* event IDs
* timestamps
* processing states
* retry counts
* failure types
* service responses
* recovery attempts
* execution latency

---

# Event Lifecycle

<p align="center">
  <img src="docs/assets/event-lifecycle.png" alt="Event Lifecycle" width="90%">
</p>

A typical event moves through the following lifecycle:

```text
             ┌───────────┐
             │  CREATED  │
             └─────┬─────┘
                   ↓
             ┌───────────┐
             │  QUEUED   │
             └─────┬─────┘
                   ↓
             ┌───────────┐
             │PROCESSING │
             └─────┬─────┘
                   ↓
            ┌──────┴──────┐
            │             │
            ▼             ▼
        SUCCESS         FAILURE
            │             │
            │             ▼
            │          RETRY
            │             │
            │        ┌────┴────┐
            │        │         │
            │        ▼         ▼
            │     SUCCESS    EXHAUSTED
            │        │         │
            └────────┴─────────┘
                     ↓
                 COMPLETED
```

---

# Failure Verification

One of the central ideas behind LYAPUNOV is separating:

> **Failure detection**

from

> **Failure verification**

A temporary network delay should not automatically be treated as permanent service failure.

The system can evaluate signals such as:

```text
Request
   │
   ├── Response received
   │
   ├── Timeout
   │
   ├── Retry result
   │
   ├── Service health
   │
   └── Event state
           │
           ▼
      Verification
           │
           ▼
      Failure State
```

This provides a foundation for more reliable recovery decisions.

---

# Project Screenshots

## Dashboard

<p align="center">
  <img src="docs/assets/dashboard.png" alt="LYAPUNOV Dashboard" width="90%">
</p>

> Real-time view of event processing, system state and reliability metrics.

---

## Event Monitor

<p align="center">
  <img src="docs/assets/event-monitor.png" alt="Event Monitor" width="90%">
</p>

> Track individual events through their processing lifecycle.

---

## Failure Analysis

<p align="center">
  <img src="docs/assets/failure-analysis.png" alt="Failure Analysis" width="90%">
</p>

> Visualize failures, retries and recovery attempts.

---

# Technology Stack

| Layer           | Technology                |
| --------------- | ------------------------- |
| Language        | Java                      |
| Build           | Maven                     |
| Architecture    | Distributed Services      |
| API             | REST                      |
| Data            | Persistent Event Store    |
| Messaging       | Event-based communication |
| Testing         | JUnit                     |
| Version Control | Git                       |
| Documentation   | Markdown                  |

---

# Project Structure

```text
LYAPUNOV/
│
├── src/
│   ├── main/
│   │   └── java/
│   │       └── ...
│   │
│   └── test/
│       └── java/
│           └── ...
│
├── docs/
│   └── assets/
│       ├── lyapunov-banner.png
│       ├── architecture.png
│       ├── event-lifecycle.png
│       ├── dashboard.png
│       ├── event-monitor.png
│       └── failure-analysis.png
│
├── .gitignore
├── pom.xml
├── LICENSE
└── README.md
```

---

# Getting Started

## Prerequisites

Make sure the following are installed:

* Java 26+
* Maven 3.9+
* Git

Verify the installation:

```bash
java -version
mvn -version
git --version
```

---

## Clone the Repository

```bash
git clone https://github.com/bagichethan-decode/LYAPUNOV.git
cd LYAPUNOV
```

---

## Build

```bash
mvn clean install
```

---

## Run Tests

```bash
mvn test
```

---

## Run the Application

```bash
mvn spring-boot:run
```

> The exact command may change as the project architecture evolves.

---

# Example Event

A LYAPUNOV event could look conceptually like:

```json
{
  "eventId": "EVT-10482",
  "source": "order-service",
  "type": "ORDER_CREATED",
  "timestamp": "2026-09-29T18:30:00Z",
  "status": "PROCESSING"
}
```

The system can then track the event:

```text
EVT-10482

CREATED
   ↓
QUEUED
   ↓
PROCESSING
   ↓
VERIFICATION
   ↓
COMPLETED
```

---

# Reliability Metrics

Future versions are intended to expose metrics such as:

```text
┌──────────────────────────────────────────┐
│           RELIABILITY OVERVIEW           │
├──────────────────────────────────────────┤
│                                          │
│  Events Processed        12,842          │
│  Successful              12,391          │
│  Retried                    327          │
│  Failed                     124          │
│  Recovery Rate             96.8%         │
│                                          │
│  Avg Processing Time       142 ms        │
│                                          │
└──────────────────────────────────────────┘
```

These numbers are illustrative and should be replaced with real measurements once the system is implemented.

---

# Testing Strategy

LYAPUNOV is intended to test not only normal execution but also failure scenarios.

### Unit Testing

Test individual components independently.

```text
EventValidator
RetryManager
FailureDetector
RecoveryManager
```

### Integration Testing

Verify communication between services.

```text
Service A
   ↓
Event Layer
   ↓
Service B
```

### Failure Testing

Simulate:

* service downtime
* request timeout
* duplicate events
* delayed responses
* invalid messages
* repeated failures

---

# Example Failure Scenario

Consider an event sent from one service to another.

```text
Service A
   │
   │ Event
   ▼
Service B
   │
   X
Network Failure
```

Instead of immediately abandoning the event:

```text
Failure
   ↓
Record failure
   ↓
Check event state
   ↓
Retry
   ↓
Verify result
   ↓
Complete / Escalate
```

This allows the system to maintain a traceable record of what happened.

---

# Observability

The long-term objective is to provide a clear view of system health.

```text
                 LYAPUNOV
                     │
       ┌─────────────┼─────────────┐
       │             │             │
       ▼             ▼             ▼
     Events       Failures       Recovery
       │             │             │
       ▼             ▼             ▼
    Metrics        Logs          Traces
       │             │             │
       └─────────────┼─────────────┘
                     ▼
                Dashboard
```

---

# Roadmap

### Phase 1 — Foundation

* [x] Repository initialization
* [ ] Maven project setup
* [ ] Core domain model
* [ ] Event representation
* [ ] Basic service structure

### Phase 2 — Event Engine

* [ ] Event creation
* [ ] Event processing
* [ ] Event state tracking
* [ ] Idempotency mechanism
* [ ] Persistent event storage

### Phase 3 — Reliability Engine

* [ ] Failure detection
* [ ] Retry mechanism
* [ ] Backoff strategy
* [ ] Failure classification
* [ ] Dead-letter handling

### Phase 4 — Verification

* [ ] Failure verification
* [ ] Event consistency checks
* [ ] Recovery validation
* [ ] Failure simulation

### Phase 5 — Observability

* [ ] Structured logging
* [ ] Metrics
* [ ] Distributed tracing
* [ ] Monitoring dashboard

### Phase 6 — Production Engineering

* [ ] Containerization
* [ ] CI/CD
* [ ] Load testing
* [ ] Stress testing
* [ ] Documentation
* [ ] Deployment

---

# What I Am Learning Through LYAPUNOV

This project is being developed as a practical exploration of software engineering concepts that are difficult to understand through isolated coding exercises.

The project provides hands-on experience with:

* Java application architecture
* distributed systems
* event-driven design
* fault tolerance
* concurrency
* API design
* testing
* observability
* reliability engineering
* Git-based development

---

# Engineering Challenges

Some of the problems LYAPUNOV is intended to explore include:

### How do you know an event was actually processed?

A successful network response does not necessarily mean that the downstream operation completed correctly.

### What happens when a request succeeds but the response is lost?

The sender may retry and accidentally create duplicate work.

### When should a failed request be retried?

Retrying everything can create additional load and potentially make an outage worse.

### How do you distinguish temporary failure from persistent failure?

A timeout alone may not provide enough information.

These problems form the engineering foundation of LYAPUNOV.

---

# Future Direction

LYAPUNOV is intended to evolve from a local engineering project into a controlled environment for experimenting with distributed reliability patterns.

Potential future additions include:

```text
Distributed Event Processing
            │
            ├── Fault Injection
            │
            ├── Retry Policies
            │
            ├── Failure Verification
            │
            ├── Event Replay
            │
            ├── Distributed Tracing
            │
            ├── Load Testing
            │
            └── Reliability Analytics
```

---

# Project Status

**LYAPUNOV is currently under active development.**

The architecture and implementation will evolve as individual reliability mechanisms are implemented and tested.

---

# Author

**Chethan Lakshman Bagi**

Information Science & Engineering
East West Institute of Technology, Bengaluru

Interested in:

* Software Engineering
* Java
* Data Structures & Algorithms
* Distributed Systems
* System Design
* Reliability Engineering

---

# License

This project is licensed under the MIT License.

See [`LICENSE`](LICENSE) for more information.

---

<p align="center">

**LYAPUNOV**

<em>Observe. Verify. Recover.</em>

</p>
