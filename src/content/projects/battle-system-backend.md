---
title: 'Deterministic Battle Engine'
description: 'A pure, deterministic turn resolver for a Godot 4 RPG — a standalone Python module with a hand-rolled RNG so a GDScript port reproduces results bit-for-bit, designed for server-authoritative PvP.'
tags: ['Python', 'Game Dev', 'Godot', 'Backend']
featured: false
pubDate: 2026-06-21
---

A Gen-3-style RPG with a **Godot 4 (GDScript)** client and a **Python** backend
for online play. Single-player comes first, but PvP multiplayer is planned — which
is why the battle logic is built as a standalone, deterministic module rather than
tangled into the engine.

## The engine (done)

A pure, deterministic battle resolver, implemented and tested in Python.

- **Contract:** `resolve_turn(state, actions, seed) -> (new_state, events)`
- **Guarantees:** no I/O, input state is never mutated (deep-copied), fully
  deterministic.
- **Custom `DeterministicRNG` (xorshift32)** — deliberately hand-rolled so a
  GDScript port can reproduce results bit-for-bit. The exact RNG draw order is
  documented in the file.
- **Data model:** `Move`, `MoveSlot`, `BattleMonster`, `Team`, `BattleState`;
  actions and events all JSON-serializable.
- **Tests:** 7 passing — determinism, input purity, speed ordering,
  switch-before-move, type effectiveness, faint / battle-end.

## Multiplayer (planned)

The core decision: PvP must be **server-authoritative** — the server runs
canonical battle resolution; clients only send intents and render results.

- **Transport:** WebSockets for the live battle session, REST for stateless bits
  (auth, profile, matchmaking enqueue).
- **Services:** auth/identity (short-lived JWTs), server-side team validation,
  matchmaking, an in-memory authoritative battle per match, and persistence
  (SQLite → Postgres).
- **Anti-cheat:** the server owns all RNG, seeds never leave the server
  pre-resolution, each client gets only a filtered view of state, and every
  action and team is validated server-side.

## Parity discipline

The offline (GDScript) and online (Python) engines must produce identical
results, kept honest by a **golden test-vector corpus** — many
`(state, actions, seed) -> expected events` cases as plain JSON, run against both
engines in CI. The same discipline gives battle replays and reconnection for free.

**Stack:** FastAPI · Pydantic · asyncio · SQLite → Postgres · Godot `WebSocketPeer`.
