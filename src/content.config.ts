import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const link = z.object({
  label: z.string(),
  url: z.string(),
});

const captionedImage = z.object({
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
    links: z.array(link).default([]),
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
    /** 인물 사진 한 장 */
    profileImage: z.string().optional(),
    profileCaption: z.string().optional(),
    /** 분위기를 보여주는 이미지들 */
    moodImages: z.array(captionedImage).default([]),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/pages' }),
  schema: z.object({
    title: z.string(),
    notice: z.string().optional(),
    /** Home 우측 하단에 작게 놓이는 이미지 */
    image: z.string().optional(),
    imageCaption: z.string().optional(),
  }),
});

export const collections = { artists, pages };
