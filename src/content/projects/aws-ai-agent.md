---
title: 'AWS AI Agent'
description: 'A LangChain agent deployed to AWS as containerized, Terraform-managed infrastructure — built in independently deployable layers toward CI/CD and observability.'
tags: ['Python', 'AWS', 'Terraform', 'Docker', 'LangChain']
featured: true
pubDate: 2026-06-13
---

A four-layer project building toward containerized, Terraform-managed,
CI/CD-deployed, observable AI infrastructure. Each layer is independently
deployable and documented. The guiding idea: a trivial agent on well-built
infrastructure signals more than a clever agent running on a laptop.

## Layer 1 — Manual Deploy ✅

A minimal LangChain agent with a calculator tool, running on an EC2 instance set
up entirely by hand through the AWS Console — the point being to get something
real running in the cloud before abstracting anything away.

- Billing alarm at $5 in AWS Budgets
- `t3.micro` Ubuntu EC2 instance launched via Console
- SSH access via key pair (inbound restricted to my own IP)
- API key set as an environment variable on the instance
- Agent code deployed via `scp` / `git clone`

## Layer 2 — Containerize + Terraform ✅

Nothing manually clicked in the console. Everything Layer 1 did by hand is now
defined as code.

- Dockerfile containerizing the LangChain agent
- Terraform for the VPC, public subnet, internet gateway, and route table
- Terraform for the security group and EC2 instance, with user data bootstrapping
  Docker on boot
- API key passed at `docker run` time via `-e` — never written to disk or baked
  into the image

> **Next hardening step:** replace the env-var API key with AWS Secrets Manager
> or SSM Parameter Store, give the EC2 instance an IAM role, and have the app
> fetch the secret at startup — full audit trail, no keys typed into terminals.

## Layer 3 — CI/CD 🚧

Push to `main`, tests run, the agent redeploys automatically — no more `scp`. A
GitHub Actions pipeline builds the Docker image, pushes it to ECR, and redeploys
on EC2 with no manual steps after `git push`.

**Started:**

- Terraform for a private **ECR** repository to hold the agent image, with a
  lifecycle policy that expires untagged images so the registry doesn't grow
  unbounded.
- **GitHub OIDC** as the auth path into AWS — a federated identity provider and
  a scoped IAM role GitHub Actions assumes per run, so there are no long-lived
  AWS keys stored as repo secrets.
- A first **GitHub Actions workflow** skeleton: checkout → run the agent's test
  suite → on `main`, build and push the image to ECR. Build/push is gated behind
  green tests.

**Still to wire up:**

- The redeploy step on EC2 — pull the new image tag and restart the container
  (SSM `RunCommand` so there's no inbound SSH from CI).
- Immutable image tagging by commit SHA, with `latest` tracking `main`.
- A smoke check after redeploy that fails the pipeline if the agent doesn't come
  back healthy.

## Layer 4 — Observability + Self-Hosted Model 🔲

The capstone: structured logging and cost dashboards, alerting on failures or
spend spikes, and swapping the OpenAI API for a local Ollama model on a larger
instance — closing the loop on a fully self-contained AI agent running on owned
infrastructure.
