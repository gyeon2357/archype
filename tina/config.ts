import { defineConfig } from 'tinacms';

const branch =
  process.env.TINA_BRANCH ||
  process.env.GITHUB_BRANCH ||
  process.env.HEAD ||
  'main';

export default defineConfig({
  branch,
  // Tina Cloud 프로젝트를 만든 뒤 환경변수로 넣습니다.
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
      {
        name: 'artist',
        label: 'Artist',
        path: 'content/artists',
        format: 'md',
        ui: {
          router: ({ document }) => `/artist/${document._sys.filename}`,
        },
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
            description: '사이드바와 표의 정렬 순서입니다.',
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
            name: 'images',
            label: '이미지',
            type: 'object',
            list: true,
            fields: [
              { name: 'src', label: '파일', type: 'image' },
              { name: 'caption', label: '캡션', type: 'string' },
            ],
          },
          {
            name: 'body',
            label: '소개',
            type: 'rich-text',
            isBody: true,
          },
        ],
      },

      {
        name: 'product',
        label: 'Shop',
        path: 'content/products',
        format: 'md',
        ui: {
          router: ({ document }) => `/shop/${document._sys.filename}`,
        },
        fields: [
          {
            name: 'title',
            label: '상품명',
            type: 'string',
            isTitle: true,
            required: true,
          },
          { name: 'no', label: '번호', type: 'number', required: true },
          {
            name: 'artist',
            label: '아티스트',
            type: 'string',
            description: 'Artist의 이름과 똑같이 입력하세요.',
          },
          { name: 'price', label: '가격 (원)', type: 'number' },
          {
            name: 'status',
            label: '상태',
            type: 'string',
            options: [
              { value: 'available', label: 'Available — 판매중' },
              { value: 'preorder', label: 'Pre-order — 예약' },
              { value: 'soldout', label: 'Sold out — 품절' },
              { value: 'archived', label: 'Archived — 아카이브' },
            ],
          },
          { name: 'year', label: '연도', type: 'string' },
          {
            name: 'orderUrl',
            label: '주문 폼 링크',
            type: 'string',
            description: '비워 두면 Settings의 공용 주문 폼으로 연결됩니다.',
          },
          {
            name: 'specs',
            label: '사양',
            type: 'object',
            list: true,
            ui: { itemProps: (item) => ({ label: item?.label }) },
            fields: [
              { name: 'label', label: '항목', type: 'string' },
              { name: 'value', label: '내용', type: 'string' },
            ],
          },
          {
            name: 'images',
            label: '이미지',
            type: 'object',
            list: true,
            fields: [
              { name: 'src', label: '파일', type: 'image' },
              { name: 'caption', label: '캡션', type: 'string' },
            ],
          },
          { name: 'body', label: '설명', type: 'rich-text', isBody: true },
        ],
      },

      {
        name: 'page',
        label: 'Page',
        path: 'content/pages',
        format: 'md',
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { name: 'title', label: '제목', type: 'string', isTitle: true, required: true },
          {
            name: 'notice',
            label: '공지 한 줄',
            type: 'string',
            description: 'Home 상단에 노출됩니다.',
          },
          { name: 'body', label: '본문', type: 'rich-text', isBody: true },
        ],
      },

      {
        name: 'settings',
        label: 'Settings',
        path: 'content/settings',
        format: 'json',
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { name: 'siteName', label: '사이트 이름', type: 'string', isTitle: true, required: true },
          { name: 'description', label: '사이트 설명', type: 'string' },
          { name: 'contactEmail', label: '대표 이메일', type: 'string' },
          {
            name: 'orderFormUrl',
            label: '공용 주문 폼 링크',
            type: 'string',
            description: '상품별 링크가 없을 때 사용됩니다.',
          },
          {
            name: 'socials',
            label: 'SNS',
            type: 'object',
            list: true,
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
