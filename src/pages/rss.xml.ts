import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { site } from '../config';

export async function GET(context: APIContext) {
  const articles = await getCollection('articles', ({ data }) => !data.draft);
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return rss({
    title: site.name,
    description: site.tagline,
    site: context.site ?? 'https://acroistrash.github.io',
    items: articles
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .map((article) => ({
        title: article.data.title,
        description: article.data.description,
        pubDate: article.data.pubDate,
        link: `${base}/articles/${article.slug}/`,
      })),
  });
}
