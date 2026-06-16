# personal-website

A fast personal site for publishing **articles** and **projects**, built with
[Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com) in a
dark, glassmorphic style. Content is authored as Markdown files — publish by
committing a new file.

Features: switchable accent themes (rose / violet / cyan / amber, saved per
visitor), live article search, an RSS feed at `/rss.xml`, and per-article
reading-time estimates.

## Personalize

Edit `src/config.ts` to set your name, tagline, social links, default accent,
and the hero "status card" details (availability, now-listening, day streak,
toolbox). No need to touch component markup for these.

## Develop

Requires [Node.js](https://nodejs.org) 18.20+ (20+ recommended).

```bash
npm install      # install dependencies
npm run dev      # start the dev server at http://localhost:4321
npm run build    # build the static site into dist/
npm run preview  # preview the production build locally
```

## Project structure

```
src/
├── config.ts          # Site personalization (name, socials, hero status card)
├── components/        # Reusable .astro components (Header, cards, Icon, ...)
├── content/
│   ├── config.ts      # Collection schemas (frontmatter validation)
│   ├── articles/      # Articles — one Markdown file per post
│   └── projects/      # Projects — one Markdown file per project
├── layouts/           # Page shells (Base, Article, Project)
├── pages/             # Routes (index, about, 404, articles/, projects/, rss.xml)
├── styles/            # global.css (Tailwind import + theme tokens)
└── utils/             # Small helpers (reading time)
public/                # Static assets served as-is (favicon, etc.)
```

## Publish a new article

Add a Markdown file to `src/content/articles/`. The file name becomes the URL
slug (e.g. `my-post.md` → `/articles/my-post/`). Start it with frontmatter:

```yaml
---
title: 'My post title'
description: 'A one-line summary used in listings and meta tags.'
pubDate: 2026-06-16
tags: ['tag-one', 'tag-two'] # optional
draft: false                 # optional — set true to hide from the site
---

Write your article body here in **Markdown**.
```

Commit and push — that's it.

## Publish a new project

Add a Markdown file to `src/content/projects/`:

```yaml
---
title: 'Project name'
description: 'What it is, in one line.'
link: 'https://demo.example.com' # optional live/demo URL
repo: 'https://github.com/you/x' # optional source URL
featured: true                   # optional — show first on the home page
tags: ['astro', 'web']           # optional
---

Describe the project in Markdown.
```

## Deploy

The site builds to static files (`dist/`), so it runs anywhere.

- **GitHub Pages:** a workflow is included at `.github/workflows/deploy.yml`.
  Enable it under repo **Settings → Pages → Source: GitHub Actions**, and set
  `site` (and `base` for a project site) in `astro.config.mjs`.
- **Vercel / Netlify:** import the repo — both auto-detect Astro and deploy on
  every push with no configuration. If you go this route, delete the GitHub
  Pages workflow.

Whichever you choose, set the `site` value in `astro.config.mjs` to your final
URL so the sitemap and canonical/social links are correct.
