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
    /** 장르·직무 외에 덧붙일 정보를 자유롭게 넣는 자리 */
    extra: z
      .array(z.object({ label: z.string().optional(), value: z.string().optional() }))
      .default([]),
    links: z.array(link).default([]),
    /** 인물 사진 한 장 */
    profileImage: z.string().optional(),
    profileCaption: z.string().optional(),
  }),
});

/* 작업은 아티스트와 분리해 둔다. 여럿이 함께한 프로젝트를 한 문서로
   관리하기 위해서다. Tina의 reference는 목록을 지원하지 않아 객체
   목록 안에 참조를 하나씩 둔다. 값은 파일 경로다
   (예: content/artists/soon.md). */
const works = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/works' }),
  schema: z.object({
    title: z.string(),
    artists: z
      .array(z.object({ artist: z.string().optional() }))
      .default([]),
    type: z.string().optional(),
    year: z.string().optional(),
    url: z.string().optional(),
  }),
});

/* Home과 Contact는 각각 문서 하나짜리 컬렉션이다.
   Tina에서 목록을 거치지 않고 바로 열리도록 폴더를 나눠 두었다. */
const home = defineCollection({
  loader: glob({ pattern: 'index.md', base: './content/home' }),
  schema: z.object({
    title: z.string().optional(),
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

export const collections = { artists, works, home, contact };
