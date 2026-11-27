import { defineConfig } from 'tinacms';

const branch =
  process.env.TINA_BRANCH ||
  process.env.GITHUB_BRANCH ||
  process.env.HEAD ||
  'main';

export default defineConfig({
  branch,
  clientId: process.env.TINA_PUBLIC_CLIENT_ID ?? null,
  token: process.env.TINA_TOKEN ?? null,

  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: 'uploads',
      publicFolder: 'public',
    },
  },

  schema: {
    collections: [
      /* 목록으로 다루는 유일한 컬렉션 */
      {
        name: 'artist',
        label: 'Artist',
        path: 'content/artists',
        format: 'md',
        fields: [
          {
            name: 'name',
            label: '이름',
            type: 'string',
            isTitle: true,
            required: true,
          },
          {
            name: 'no',
            label: '인덱스 번호',
            type: 'number',
            required: true,
            description: '메뉴와 표의 정렬 순서입니다.',
          },
          { name: 'roles', label: '역할', type: 'string', list: true },
          { name: 'genres', label: '장르', type: 'string', list: true },
          { name: 'since', label: '활동 시작', type: 'string' },
          { name: 'base', label: '거점', type: 'string' },
          {
            name: 'links',
            label: '외부 링크',
            type: 'object',
            list: true,
            ui: { itemProps: (item) => ({ label: item?.label }) },
            fields: [
              { name: 'label', label: '이름', type: 'string' },
              { name: 'url', label: 'URL', type: 'string' },
            ],
          },
          {
            name: 'profileImage',
            label: '프로필 이미지',
            type: 'image',
          },
          { name: 'profileCaption', label: '프로필 캡션', type: 'string' },
          { name: 'body', label: '소개', type: 'rich-text', isBody: true },
        ],
      },

      /* 작업은 아티스트와 분리해 둔다. 여럿이 함께한 프로젝트를
         한 문서로 관리하기 위해서다 */
      {
        name: 'work',
        label: 'Work',
        path: 'content/works',
        format: 'md',
        fields: [
          {
            name: 'title',
            label: '제목',
            type: 'string',
            isTitle: true,
            required: true,
          },
          {
            name: 'artists',
            label: '참여 아티스트',
            type: 'object',
            list: true,
            description:
              '항목을 추가하고 아티스트를 고르세요. 여럿이면 고른 순서대로 표에 나옵니다.',
            ui: {
              itemProps: (item) => ({
                label: item?.artist
                  ? String(item.artist).replace(/^.*\/artists\//, '').replace(/\.md$/, '')
                  : '아티스트',
              }),
            },
            fields: [
              {
                name: 'artist',
                label: '아티스트',
                type: 'reference',
                collections: ['artist'],
              },
            ],
          },
          { name: 'type', label: '분류', type: 'string' },
          { name: 'year', label: '연도', type: 'string' },
          { name: 'url', label: '링크', type: 'string' },
        ],
      },

      /* 아래 셋은 문서 하나짜리라 사이드바의 Site 아래에서 바로 열린다 */
      {
        name: 'home',
        label: 'Home',
        path: 'content/home',
        format: 'md',
        ui: {
          global: true,
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            name: 'image',
            label: '이미지',
            type: 'image',
          },
          { name: 'imageCaption', label: '이미지 캡션', type: 'string' },
          { name: 'body', label: '본문', type: 'rich-text', isBody: true },
        ],
      },

      {
        name: 'contact',
        label: 'Contact',
        path: 'content/contact',
        format: 'md',
        ui: {
          global: true,
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { name: 'body', label: '본문', type: 'rich-text', isBody: true },
        ],
      },

      {
        name: 'settings',
        label: 'Settings',
        path: 'content/settings',
        format: 'json',
        ui: {
          global: true,
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { name: 'description', label: '사이트 설명', type: 'string' },
          {
            name: 'notice',
            label: '공지 문구',
            type: 'string',
            description:
              '모든 페이지 맨 위 검은 띠에 한 줄로 나옵니다. 비워 두면 띠가 통째로 사라집니다. 방문자가 Close를 누르면 하루 동안 보이지 않고, 문구를 바꾸면 다시 나타납니다.',
          },
          {
            name: 'noticeUrl',
            label: '공지 링크',
            type: 'string',
            description:
              '공지를 눌렀을 때 열릴 주소입니다. https:// 로 시작하면 새 창으로 열리고, 비워 두면 링크 없이 글자만 놓입니다.',
          },
          {
            name: 'shopLabel',
            label: 'Shop 메뉴 이름',
            type: 'string',
            description:
              '메뉴에 표시할 이름입니다. 비워 두면 Shop으로 나옵니다.',
          },
          {
            name: 'shopUrl',
            label: 'Shop 링크',
            type: 'string',
            description:
              '메뉴의 Shop을 누르면 열리는 주소입니다. https:// 로 시작하는 외부 주소를 넣으면 새 창으로 열리고, 비워 두면 홈으로 이동합니다.',
          },
          { name: 'contactEmail', label: '대표 이메일', type: 'string' },
          {
            name: 'copyright',
            label: '푸터 저작권 문구',
            type: 'string',
            description:
              '비워 두면 © 연도 ARCHYPE 으로 자동 생성됩니다.',
          },
          {
            name: 'socials',
            label: '링크',
            type: 'object',
            list: true,
            description: '푸터에 순서대로 노출됩니다.',
            ui: { itemProps: (item) => ({ label: item?.label }) },
            fields: [
              { name: 'label', label: '이름', type: 'string' },
              { name: 'url', label: 'URL', type: 'string' },
            ],
          },
        ],
      },
    ],
  },
});
