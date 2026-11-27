# ARCHYPE

아티스트 인덱스와 아카이브. Astro + Tina CMS, 정적 사이트.

## 조판 원칙

이 사이트는 글자 크기로 위계를 만들지 않습니다. `src/styles/type.css`에 크기가 두 개만 선언되어 있고, 세 번째를 추가하지 않는 것이 이 디자인의 전제입니다.

- `--fs: 12px` — 본문 겸 캡션. 한글 가독 하한을 고려한 값입니다.
- `--fs-sm: 10.5px` — 라틴 전용 라벨·번호·메타데이터. 한글에는 쓰지 않습니다.

위계는 대소문자(`.label`), 자간, 명도(`--ink-60`, `--ink-38`), 이탤릭(`.ital`), 여백으로만 만듭니다. 제목 태그도 본문과 같은 크기이고, 버튼은 `.btn`이 대괄호를 붙여 기능을 알립니다.

한글 조판에서 두 가지를 건드리지 마세요. `word-break: keep-all`은 한글이 단어 중간에서 잘리는 것을 막고, `line-height: 1.65`는 12px에서 읽히게 만드는 최소값입니다.

## 구조

```
content/            Tina가 읽고 쓰는 콘텐츠 (git에 그대로 커밋됨)
  artists/*.md      아티스트 8명
  products/*.md     상품
  pages/*.md        Home 공지, Contact
  settings/*.json   사이트 이름, SNS, 공용 주문 폼 링크
src/
  layouts/Base.astro        좌측 인덱스 + 본문. 모바일 하단 바 포함
  components/
    Sidebar.astro           책의 목차. 아티스트 8명을 상시 노출
    IndexTable.astro        Home · Artist · Shop이 공유하는 단 하나의 목록 조판
    MetaBlock.astro         명도만 낮춘 메타데이터 덩어리
  lib/format.ts             상태 라벨, 가격·번호 포맷
  pages/                    라우트
  styles/type.css           조판 시스템
tina/config.ts              CMS 스키마
```

`IndexTable`을 세 페이지가 공유하는 것이 핵심입니다. 페이지를 옮겨도 같은 문서를 넘기는 감각이 유지되고, 그것이 아카이브처럼 읽히는 실질적인 이유입니다.

## 로컬 개발

```bash
npm install
npm run dev        # Tina 편집기 + Astro, http://localhost:4321/admin/index.html
npm run build:site # Astro만 빌드 (Tina 자격증명 없이도 통과)
npm run build      # Tina 어드민까지 함께 빌드
```

## Tina Cloud 연결

1. [app.tina.io](https://app.tina.io)에서 이 저장소로 프로젝트를 만듭니다.
2. Client ID와 Read-only Token을 받아 환경변수로 넣습니다.

```
TINA_PUBLIC_CLIENT_ID=...
TINA_TOKEN=...
TINA_BRANCH=main
```

무료 플랜은 편집자 2명, 월 대역폭 100GB, 에셋 개당 100MB입니다. 편집자를 더 늘려야 하면 Decap이나 Sveltia 같은 깃 기반 CMS로 교체하는 쪽이 비용이 맞습니다.

## 배포

Cloudflare Pages에 이 저장소를 연결합니다.

- 빌드 명령: `npm run build`
- 출력 디렉터리: `dist`
- 환경변수: 위 세 개

Vercel Hobby는 상업적 사용이 금지되어 있으니 상품을 판매하는 이 사이트에는 쓰지 않습니다.

## 주문

결제 연동 없이 폼으로 주문 정보와 배송지를 받고 계좌이체로 처리합니다. 상품별 `orderUrl`이 비어 있으면 `content/settings/settings.json`의 `orderFormUrl`로 연결됩니다.

품절 상품은 목록에서 내리지 않고 `soldout` 또는 `archived` 상태로 남깁니다. 지난 상품도 아티스트의 활동 기록으로 기능합니다.
