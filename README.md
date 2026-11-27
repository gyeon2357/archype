# ARCHYPE

아티스트 인덱스와 아카이브. Astro + Tina CMS, 정적 사이트.

## 조판 원칙

이 사이트는 글자 크기로 위계를 만들지 않습니다. `src/styles/type.css`에 크기가 두 개만 선언되어 있고, 세 번째를 추가하지 않는 것이 이 디자인의 전제입니다.

- `--fs: 12px` — 본문 겸 캡션. 한글 가독 하한을 고려한 값입니다.
- `--fs-sm: 10.5px` — 라틴 전용 라벨·번호·메타데이터. 한글에는 쓰지 않습니다.

위계는 대소문자(`.label`), 자간, 명도(`--ink-60`, `--ink-38`), 이탤릭(`.ital`), 여백으로만 만듭니다. 제목 태그도 본문과 같은 크기이고, 버튼은 `.btn`이 대괄호를 붙여 기능을 알립니다.

한글 조판에서 두 가지를 건드리지 마세요. `word-break: keep-all`은 한글이 단어 중간에서 잘리는 것을 막고, `line-height: 1.65`는 12px에서 읽히게 만드는 최소값입니다.

### 서체

Pretendard Regular 서브셋 한 종만 씁니다 (`public/fonts/`). 굵기가 하나뿐이라 위계를 굵기로 만들 수 없고, 그 제약이 이 사이트의 전제와 맞습니다.

- 서브셋에 한글 2,780자가 들어 있습니다. 일상적인 범위는 덮지만 희귀 음절(예: `웱`)은 폴백 서체로 넘어가니, 아티스트명이나 상품명에서 어긋나는 글자가 보이면 해당 글자를 포함해 다시 서브셋하세요.
- `font-synthesis: style` — 가짜 볼드는 막고 기울임 합성만 남겼습니다. `.ital`을 분류 표시 채널로 쓰기 때문입니다. 기계적으로 기울인 한글이 거슬리면 `none`으로 바꾸고 `.ital` 대신 자간과 명도로 그 채널을 대체하세요.
- `strong`, `b`도 400으로 눌러 뒀습니다. 마크다운에서 `**강조**`를 써도 본문과 같은 굵기로 나옵니다.

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

## Tina CMS 연결 순서

순서를 지켜야 하는 이유는, Tina Cloud가 저장소를 먼저 보고 Client ID를 발급하고, 그 값이 있어야 빌드가 어드민을 만들 수 있기 때문입니다.

1. **이 PR을 `main`에 머지합니다.** Tina Cloud는 지정한 브랜치의 `tina/config.ts`를 읽으므로 코드가 `main`에 있어야 합니다.
2. **[app.tina.io](https://app.tina.io)에 GitHub 계정으로 로그인**하고 새 프로젝트를 만듭니다. 기존 저장소를 가져오는 쪽을 고르고 `gyeon2357/archype`를 지정합니다.
3. **Tina의 GitHub App 설치를 승인**합니다. 권한은 이 저장소 하나로만 한정하세요. 전체 저장소 접근을 줄 필요가 없습니다.
4. 브랜치를 `main`으로 지정합니다.
5. **Client ID를 복사**합니다. 공개되어도 되는 값입니다.
6. **토큰을 발급**합니다 (Tokens 또는 API Keys 쪽). 이쪽은 비밀값이니 저장소에 커밋하지 마세요. `.env`는 이미 `.gitignore`에 들어 있습니다.
7. 로컬에 `.env`를 만들고 세 값을 넣습니다.

   ```
   TINA_PUBLIC_CLIENT_ID=...
   TINA_TOKEN=...
   TINA_BRANCH=main
   ```

8. `npm run dev` → `http://localhost:4321/admin/index.html`에서 편집기가 뜨는지 확인합니다. 로컬에서는 파일에 직접 저장되므로 커밋은 직접 해야 합니다.
9. **Cloudflare Pages 프로젝트를 만들고** 이 저장소를 연결합니다. 빌드 명령 `npm run build`, 출력 디렉터리 `dist`, 환경변수로 위 세 값을 등록합니다.
10. 배포된 주소의 `/admin/index.html`로 들어가 GitHub 로그인 후 편집합니다. 저장하면 Tina Cloud가 `main`에 커밋하고, Cloudflare가 그 푸시를 받아 재빌드합니다. 즉시 반영이 아니라 빌드 시간만큼 걸립니다.
11. 편집자를 한 명 더 초대합니다. Tina Cloud 프로젝트의 Collaborators에 추가하면 됩니다.

무료 플랜은 편집자 2명, 역할 3개, 월 대역폭 100GB, 에셋 개당 100MB입니다. 편집자를 더 늘려야 하면 Decap이나 Sveltia 같은 깃 기반 CMS로 교체하는 쪽이 비용이 맞습니다.

### 자격증명 없이 빌드하기

`npm run build:site`는 Astro만 돌리므로 Tina 자격증명이 없어도 통과합니다. 레이아웃만 확인할 때 쓰세요.

## 배포 — Vercel

프레임워크 프리셋은 Astro, 빌드 명령 `npm run build`, 출력 디렉터리 `dist`입니다. 어댑터는 필요 없습니다. 정적 출력이라 그대로 올라갑니다.

`npm run build`는 `scripts/build.mjs`를 거칩니다. Tina 환경변수가 없으면 어드민 빌드를 건너뛰고 사이트만 만들기 때문에, Tina Cloud를 연결하기 전에도 배포가 깨지지 않습니다. 환경변수를 넣는 순간 같은 명령이 어드민까지 함께 빌드합니다.

유의할 점 하나. Vercel Hobby 플랜은 비상업적 개인 용도로만 허용되고, 상업적 사용은 Pro 이상이 필요합니다. Shop이 있는 사이트라 Pro(멤버당 월 $20) 기준으로 잡으셔야 합니다.

GitHub Pages는 온라인 비즈니스나 전자상거래 사이트의 무료 호스팅으로 쓰는 것이 금지되어 있어 이 사이트에는 쓸 수 없습니다.

## 파비콘

`public/`에 세 개가 들어 있고 `Base.astro`에서 연결합니다.

- `favicon.svg` — 기본. 다크 모드에서 마크 색이 반전되도록 `prefers-color-scheme`을 넣어 뒀습니다.
- `favicon.ico` — 16·32·48 멀티사이즈. SVG 파비콘을 지원하지 않는 환경용입니다.
- `apple-touch-icon.png` — 180×180. iOS가 투명 배경을 검정으로 채우므로 흰 배경을 깔았습니다.

로고를 교체할 때는 원본을 정사각 캔버스에 여백 8%로 다시 앉히고 같은 세 종을 만드세요. 16px에서 읽히는지 확인하는 게 전부입니다.

## 주문

결제 연동 없이 폼으로 주문 정보와 배송지를 받고 계좌이체로 처리합니다. 상품별 `orderUrl`이 비어 있으면 `content/settings/settings.json`의 `orderFormUrl`로 연결됩니다.

품절 상품은 목록에서 내리지 않고 `soldout` 또는 `archived` 상태로 남깁니다. 지난 상품도 아티스트의 활동 기록으로 기능합니다.
