import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const linkSchema = z.object({
  label: z.string(),
  url: z.string(),
});

const imageSchema = z.object({
  src: z.string(),
  caption: z.string().optional(),
});

const artists = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/artists' }),
  schema: z.object({
    name: z.string(),
    no: z.number(),
    roles: z.array(z.string()).default([]),
    genres: z.array(z.string()).default([]),
    since: z.string().optional(),
    base: z.string().optional(),
    links: z.array(linkSchema).default([]),
    works: z
      .array(
        z.object({
          title: z.string(),
          type: z.string().optional(),
          year: z.string().optional(),
          url: z.string().optional(),
        })
      )
      .default([]),
    images: z.array(imageSchema).default([]),
  }),
});

const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/products' }),
  schema: z.object({
    title: z.string(),
    no: z.number(),
    artist: z.string().optional(),
    price: z.number().optional(),
    status: z
      .enum(['available', 'preorder', 'soldout', 'archived'])
      .default('available'),
    year: z.string().optional(),
    orderUrl: z.string().optional(),
    specs: z
      .array(z.object({ label: z.string(), value: z.string() }))
      .default([]),
    images: z.array(imageSchema).default([]),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/pages' }),
  schema: z.object({
    title: z.string(),
    notice: z.string().optional(),
  }),
});

export const collections = { artists, products, pages };
