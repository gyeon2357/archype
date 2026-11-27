# ARCHYPE

아티스트 인덱스와 아카이브. Astro + Tina CMS로 만든 정적 사이트이고, Cloudflare Workers에 배포됩니다.

## 조판 원칙

`src/styles/type.css` 한 파일이 사이트 전체의 조판을 쥐고 있습니다. 세 가지 제약이 전제입니다.

**크기는 두 단계뿐입니다.** `--text-size: 12px`가 본문 겸 캡션이고, `--label-size: 10.5px`는 라틴 대문자 라벨과 번호에만 씁니다. 한글에는 작은 쪽을 쓰지 않습니다. 세 번째 크기를 만들지 않는 것이 이 디자인이 성립하는 조건입니다.

**글자 색은 검정 하나입니다.** `--ink: #000`뿐이고 명도로 위계를 만들지 않습니다. 구분이 필요하면 대소문자(`.section-label`), 자간, 기울임(`.classifier`), 여백, 괘선으로 처리합니다.

**굵기도 하나입니다.** Pretendard Regular만 올라가 있어서 `font-synthesis: style`로 가짜 볼드를 막았습니다. `strong`과 `b`도 400으로 눌러 두었으니 마크다운에서 `**강조**`를 써도 본문과 같습니다.

### 서체

라틴은 브라우저가 가진 Helvetica로, 한글은 Pretendard로 떨어집니다. Helvetica에 한글 글리프가 없어서 폴백이 자연스럽게 갈리는 구조입니다.

Pretendard 서브셋에는 한글 2,780자가 들어 있습니다. 희귀 음절(예: `웱`)은 시스템 서체로 넘어가니, 아티스트명이나 상품명에서 글자가 어긋나 보이면 그 글자를 포함해 다시 서브셋하세요.

## 구조

```
content/            Tina가 읽고 쓰는 콘텐츠. git에 그대로 커밋됩니다
  artists/*.md      아티스트 여덟 명
  works/*.md        작업. 참여 아티스트를 참조로 연결합니다
  home/index.md     Home 이미지
  contact/index.md  Contact 본문
  settings/*.json   공지, Shop 링크, SNS 링크, 사이트 설명
src/
  layouts/Base.astro          2열 2행 격자. 1행은 사이트 이름, 2행은 메뉴와 본문
  components/
    SiteIndex.astro           인덱스 메뉴. Artist는 details/summary로 접힙니다
    RecordTable.astro         Home과 Artist 색인이 공유하는 목록 조판
    FactList.astro            아티스트 메타데이터를 dl로 늘어놓습니다
  pages/                      라우트
  styles/type.css             조판 시스템
tina/config.ts                CMS 스키마
tina/tina-lock.json           TinaCloud가 브랜치를 색인하는 데 쓰는 파일
```

### 본문과 메뉴의 정렬

`Base.astro`의 격자는 2열 3행입니다. 1행에 사이트 이름, 2행에 메뉴와 본문, 3행에 푸터를 둡니다. 본문의 첫 줄이 메뉴 첫 항목과 같은 행에서 시작하므로 둘의 윗선이 자동으로 맞고, 푸터는 `align-self: end`로 좌측 최하단에 붙습니다. 사이트 이름 아래 여백은 `--identity-gap`이 정합니다.

### 페이지 상단 구조

모든 페이지가 같은 머리 블록으로 시작합니다.

```html
<header class="page-head">
  <h1>…</h1>
</header>
```

`.page-head`의 줄 높이를 20px로 못 박아 두어서, 안에 들어가는 글자가 작은 라벨(Contact, Recent, Artist Index)이든 본문 크기의 아티스트 이름이든 첫 줄이 같은 자리에 섭니다. 아래 여백도 `.content-block`과 같은 값입니다. 본문이 비어 있으면 빈 블록의 여백이 남으므로 그 섹션은 아예 그리지 않습니다.

### 클래스 이름

역할과 위치가 드러나게 지었습니다. `.site-identity`는 사이트 이름 칸, `.site-index`는 메뉴 칸, `.site-content`는 본문 칸, `.site-footer`는 링크와 저작권 줄입니다. `.index-link`는 메뉴 한 줄, `.item-number`는 그 앞의 번호, `.index-name`은 이름입니다. 번호에는 밑줄이 붙지 않도록 이름 쪽에만 밑줄을 겁니다.

대메뉴에는 번호를 붙이지 않고 아티스트 목록에만 남깁니다. 사이트 이름 ARCHYPE이 홈으로 가는 링크를 겸하므로 메뉴에 Home 항목이 없습니다.

### 모바일

메뉴를 접지 않고 문서 맨 위로 흘려보냅니다. 아티스트 목록은 한 줄로 이어지고 번호는 숨겨서 메뉴가 차지하는 높이를 줄입니다. 푸터는 페이지 맨 아래에 놓이고, 인덱스로 돌아가는 한 줄은 화면 우측 하단에 고정됩니다. 햄버거 아이콘은 쓰지 않습니다.

## CMS 구조

Tina 사이드바에서 Artist와 Work를 목록으로 다루고, Home·Contact·Settings는 문서 하나짜리라 **Site** 아래에 지구본 아이콘으로 놓여 목록을 거치지 않고 바로 열립니다.

### 작업과 아티스트의 관계

작업은 아티스트 문서 안이 아니라 별도 컬렉션에 둡니다. 여럿이 함께한 프로젝트를 문서 하나로 관리하기 위해서입니다. 작업 문서의 `참여 아티스트`에 항목을 추가하고 아티스트를 고르면, Home 표에는 그 작업이 한 줄만 올라가면서 참여자가 모두 링크로 나오고, 각 아티스트 상세의 Works 표에도 함께 나타납니다. 상세의 `With` 열에는 자기를 뺀 나머지 참여자가 놓입니다.

Tina의 `reference` 필드는 `list: true`를 지원하지 않아서, 객체 목록 안에 참조를 하나씩 두는 구조로 만들었습니다. 저장되는 값은 `artists: [{ artist: content/artists/soon.md }]` 형태이고, 사이트 쪽에서는 `src/lib/artists.ts`의 `refToSlug`가 경로를 슬러그로 바꿉니다. `ui.global: true`로 지정한 결과이고 tinacms 3.9.4 이상에서 동작합니다. 문서가 없거나 둘 이상이면 일반 목록으로 되돌아가니, 각 폴더에 파일을 하나만 두세요.

사이트 이름은 CMS에서 빼고 `src/site.ts`의 `SITE_NAME` 상수로 두었습니다.

## Shop

사이트 안에 상품 페이지를 두지 않습니다. 메뉴의 Shop은 Tina의 **Settings → Shop 링크**(`settings.json`의 `shopUrl`)로 연결되고, `https://`로 시작하는 주소를 넣으면 새 창으로 열립니다. 비워 두면 홈으로 이동합니다.

## 이미지

아티스트 상세에는 프로필 한 장, Home에는 우측 하단에 작은 이미지 자리가 있습니다. 비어 있으면 회색 바탕(`--placeholder`)과 라벨이 보이고, Tina에서 이미지를 넣으면 자동으로 사라집니다. Tina의 이미지 필드는 오른쪽 ✕로 지웁니다.

## 로컬 개발

```bash
npm install
npm run dev        # Tina 편집기 + Astro
npm run build:site # Astro만 빌드. Tina 자격증명 없이도 통과합니다
npm run build      # 자격증명이 있으면 어드민까지 함께 빌드합니다
```

`.env`에 세 값이 필요합니다.

```
TINA_PUBLIC_CLIENT_ID=...
TINA_TOKEN=...
TINA_BRANCH=main
```

## 배포

Cloudflare Workers Builds가 저장소를 보고 있습니다. `main`에 커밋이 올라가면 빌드와 배포가 자동으로 돌아갑니다. 직접 누를 필요가 없고, 다른 브랜치에 올리면 미리보기 URL이 따로 생깁니다.

빌드 시점 환경변수는 **Settings → Build → Build variables and secrets**에 넣습니다. 바로 아래 Variables & Secrets는 런타임용이라 빌드에서 보이지 않습니다.

| 이름 | 값 | 유형 |
|---|---|---|
| `TINA_PUBLIC_CLIENT_ID` | TinaCloud Overview에서 복사 | 텍스트 |
| `TINA_TOKEN` | TinaCloud에서 발급한 토큰 | secret |
| `TINA_BRANCH` | `main` | 텍스트 |
| `NODE_VERSION` | `22` | 텍스트 |

`npm run build`는 `scripts/build.mjs`를 거칩니다. Tina 자격증명이 없으면 어드민 빌드를 건너뛰고 사이트만 만들기 때문에, 연결 전에도 배포가 깨지지 않습니다.

GitHub Pages는 쓸 수 없습니다. 온라인 비즈니스나 전자상거래 사이트의 무료 호스팅으로 쓰는 것이 금지되어 있습니다. Vercel Hobby도 비상업적 개인 용도로만 허용됩니다.

## TinaCMS 버전

TinaCloud가 새 로그인 시스템으로 옮겨가면서 3.12 미만에서는 어드민 로그인이 막힙니다. `tinacms`와 `@tinacms/cli`는 항상 함께 올리고, 올린 뒤에는 `npm run dev`를 한 번 돌려 `tina/tina-lock.json`을 갱신한 다음 커밋하세요. TinaCloud가 그 파일로 사이트의 TinaCMS 버전과 스키마를 판단합니다.

## 파비콘

`public/`에 세 개가 있고 `Base.astro`에서 연결합니다. `favicon.svg`가 기본이고 다크 모드에서 마크 색이 반전됩니다. `favicon.ico`는 16·32·48 멀티사이즈, `apple-touch-icon.png`는 180×180에 흰 배경입니다. 로고를 교체할 때는 정사각 캔버스에 여백 8%로 다시 앉히고 16px에서 읽히는지 확인하세요.
