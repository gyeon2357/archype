import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const link = z.object({
  label: z.string(),
  url: z.string(),
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
  }),
});

/* Home과 Contact는 각각 문서 하나짜리 컬렉션이다.
   Tina에서 목록을 거치지 않고 바로 열리도록 폴더를 나눠 두었다. */
const home = defineCollection({
  loader: glob({ pattern: 'index.md', base: './content/home' }),
  schema: z.object({
    title: z.string().optional(),
    notice: z.string().optional(),
    /** Home 우측 하단에 작게 놓이는 이미지 */
    image: z.string().optional(),
    imageCaption: z.string().optional(),
  }),
});

const contact = defineCollection({
  loader: glob({ pattern: 'index.md', base: './content/contact' }),
  schema: z.object({
    title: z.string().optional(),
  }),
});

export const collections = { artists, home, contact };
