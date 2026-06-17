---
title: 'Ditching the Webpack bloat'
description: 'A deep-dive into configuring ultra-lightweight asset pipelines and why I moved to a leaner build.'
pubDate: 2026-05-28
tags: ['tooling', 'web']
---

For years my projects accumulated build config like barnacles. Every new
feature meant another loader, another plugin, another few hundred milliseconds
of cold-start time. Eventually I stopped and asked: what do I actually need?

## Start from zero

The exercise that helped most was deleting the config entirely and adding back
only what broke. Most of it never came back.

- No custom loaders for things the platform now handles natively.
- No polyfills for browsers I don't support.
- No "just in case" plugins.

## What replaced it

A modern bundler with sane defaults (and native ESM in dev) got me a faster,
smaller pipeline with a fraction of the config:

```bash
npm create astro@latest
```

The lesson generalizes: tooling should earn its place. If you can't explain
what a dependency does for you, that's a strong signal to remove it.
