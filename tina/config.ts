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
            description: '대소문자를 본인 표기 그대로 입력하세요 (ARCHYPE, wnsday, SOON).',
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
            name: 'works',
            label: '작업',
            type: 'object',
            list: true,
            ui: { itemProps: (item) => ({ label: item?.title }) },
            fields: [
              { name: 'title', label: '제목', type: 'string' },
              { name: 'type', label: '분류', type: 'string' },
              { name: 'year', label: '연도', type: 'string' },
              { name: 'url', label: '링크', type: 'string' },
            ],
          },
          {
            name: 'profileImage',
            label: '프로필 이미지',
            type: 'image',
            description:
              '인물 사진 한 장. 비워 두면 회색 자리가 보입니다. 지우려면 이미지 옆의 ✕를 누르세요.',
          },
          { name: 'profileCaption', label: '프로필 캡션', type: 'string' },
          { name: 'body', label: '소개', type: 'rich-text', isBody: true },
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
            name: 'notice',
            label: '공지 한 줄',
            type: 'string',
            description: 'Home 맨 위에 노출됩니다. 비우면 그 줄이 사라집니다.',
          },
          {
            name: 'image',
            label: '이미지',
            type: 'image',
            description:
              'Home 우측 하단에 작게 놓입니다. 비워 두면 회색 자리가 보이고, 지우려면 이미지 옆의 ✕를 누르세요.',
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
            name: 'shopUrl',
            label: 'Shop 링크',
            type: 'string',
            description:
              '메뉴의 Shop을 누르면 열리는 주소입니다. https:// 로 시작하는 외부 주소를 넣으면 새 창으로 열리고, 비워 두면 홈으로 이동합니다.',
          },
          { name: 'contactEmail', label: '대표 이메일', type: 'string' },
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
