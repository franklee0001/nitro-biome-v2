# Product Requirements Document (PRD)

## Product
NitroBiome Website (KR/EN) – Scroll Storytelling Landing

## Version
v1.1 (Lottie 기반 Mechanism + 레이아웃/네비 상세)

---

## 1) 제품 한 줄 정의
NitroBiome 웹사이트는 **“스틱을 물에 타서 마시는 순간 → NO 경로가 활성화되는 흐름”**을  
**Hero 스크롤-컨트롤 영상 + Mechanism Lottie 스크롤 애니메이션**으로 직관적으로 보여주는 **싱글 페이지 스토리텔링 랜딩**이다.

---

## 2) 목표
- **첫 10초:** “스틱 음용 제품” + “NO 활성/혈관 컨셉”을 감으로 이해
- **첫 60초:** 섭취 후 몸 안에서 어떤 일이 일어나는지(기전)를 스크롤로 납득
- **3분 이내:** 핵심 데이터와 사용법으로 신뢰 형성 → 문의/구매 행동
- **KR/EN 토글:** 사이트 전체 문자열이 자연스럽게 전환되고, 재방문에도 선택 언어 유지

---

## 3) 타깃 사용자 (페르소나)

### A. 혈관/혈압/말초순환에 관심 있는 일반 사용자
- 연령: **40–65세**
- 특성: “쉽게 피곤함”, “손발이 차다”, “혈압이 신경 쓰인다”
- 니즈:
  - 빠른 체감
  - 과장 없는 설명
  - 자연 기반/안전성
  - 이해 가능한 기전 설명

### B. 가족/지인 구매자(서포터)
- 연령: **30–55세**
- 특성: 부모/배우자 건강을 챙기며 빠르게 판단
- 니즈: 한 페이지에서 **기전 + 데이터 + 섭취법 + FAQ**를 한 번에 파악

---

## 4) 해결해야 할 Pain Point
- 영양제 시장 전반에 대한 불신
- 기전 설명이 너무 어렵거나 과장되어 보이는 문제
- “언제/어떻게/어느 정도” 체감되는지 불확실
- 구매 직전 안전/복용법/주의사항에 대한 불안

→ 사이트는 **설명은 매우 짧고, 구조는 매우 명확하게** 이 문제를 줄인다.

---

## 5) 사이트 무드 & 디자인 가이드
- 무드: **오프화이트/미색 배경 + 올리브/딥그린 포인트 + 블랙 타이포**
- 컬러 토큰(초기 가이드):
  - Background: 따뜻한 아이보리/미색
  - Primary Green: 올리브 그린 (예: `#3D5C25` 근사)
  - Deep Green: 딥그린 (예: `#283417` 근사)
  - Text: 거의 블랙
- 질감:
  - “건강식품 쇼핑몰” 느낌 X
  - “미니멀 + 과학적 + 정제된 실험실/브랜딩” 느낌 O
- UX 키워드: **Calm / Clean / Confident / Guided**

---

## 6) 레이아웃 & 네비게이션 구조

### 6.1 글로벌 레이아웃 (싱글 페이지)
- 형태: **Single Page Scroll Landing (앵커 네비게이션)**
- 섹션 순서:
  1. Hero (스크롤-컨트롤 영상)
  2. Mechanism (Lottie 스크롤 애니메이션)
  3. Evidence (핵심 데이터 카드)
  4. Product / How to Use
  5. FAQ
  6. Contact / CTA
- 각 섹션은 기본적으로 **뷰포트 1~1.5 화면 높이** 단위로 설계

### 6.2 헤더 / 네비게이션 바
- 위치: 상단 고정(**sticky**)
- 스크롤 시:
  - 최상단: 배경 투명 + 여백 넉넉
  - 스크롤 후: 높이 약간 축소 + 연한 아이보리/화이트 배경 + 살짝 블러
- Desktop 구성:
  - 좌: NitroBiome 로고/워드마크
  - 중앙: Nav 메뉴(앵커 이동)
    - Science (Mechanism)
    - Evidence
    - How to Use
    - FAQ
    - Contact
  - 우: **언어 토글 KR | EN**, (옵션) Ghost 버튼 “Buy / 문의하기”
- Mobile:
  - 좌: 로고
  - 우: 햄버거 메뉴 + 언어 토글(상단 또는 메뉴 내부)
- 네비 동작:
  - Lenis로 부드러운 스크롤
  - 현재 섹션 메뉴 강조(언더라인 또는 색상)

---

## 7) 다국어(i18n) 요구사항
- 경로 기반: **/ko, /en**
- 토글 동작:
  - /ko에서 EN 클릭 → /en 동일 섹션 위치로 이동(가능하면 해시 유지)
  - 선택 언어를 cookie/localStorage 저장 → 재방문 시 유지
- 번역 범위: **Nav/버튼/CTA/FAQ/폼/푸터/고지 포함 전체 문자열**

---

## 8) 페이지 흐름
Hero → Mechanism → Evidence → Product/HowTo → FAQ → Contact/CTA

---

## 9) 섹션별 상세 요구사항

### 9.1 Hero (스크롤-컨트롤 영상)
**목적**  
“스틱을 물에 타서 마시는 제품” 형태 + “정제된 과학/클린 톤”을 3초 안에 각인.

**비주얼**
- 배경: 오프화이트/미색
- 중앙 유리컵 + 오른쪽 손이 등장해 **스틱을 뜯어 액체를 붓고**(커피색), 자연스럽게 확산
- 이후 여성이 컵을 들어 **측면(입/턱 중심)으로 마심**(오른쪽에서)
- 느낌: Apple 광고 감도, 과한 VFX 금지, **거품 X / 네온 X**

**영상 & 스크롤 연동(중요)**
- 포맷: mp4/webm, 16:9, 무음, 자동재생 가능
- Desktop: GSAP로 스크롤 위치 → video `currentTime` 매핑
- Mobile fallback: 자동재생 루프 + “Scroll to see mechanism” 문구

**텍스트 레이아웃(Desktop)**
- 2-Column (비디오 / 텍스트)
- 비디오: rounded, subtle shadow
- 텍스트: 헤드라인/서브/CTA

**카피(초안)**
- KR 헤드라인: **“5분 안에 느껴지는 NO 활성 흐름.”**
- EN 헤드라인: **“A fast NO activation flow you can feel.”**
- KR 서브: “발효 기반 대사물 + 나노버블 전달”
- EN 서브: “Fermentation-based metabolites + nanobubble delivery.”
- CTA:
  - KR: “작동 원리 보기”
  - EN: “See the mechanism”
  → Mechanism 섹션으로 스크롤

---

### 9.2 Mechanism (옵션 A 고정: Lottie + GSAP ScrollTrigger)
**목적**  
“섭취 → 전환(NO₃→NO₂→NO) → 혈관 → 말초 → 리듬”을 **스크롤만으로 자연스럽게 이해**시키기.

**레이아웃**
- 섹션 전체 pin(고정) + 내부 콘텐츠만 변화
- 2분할:
  - 좌(또는 상단): Lottie 캔버스
  - 우(또는 하단): Scene별 한 줄 텍스트

**스타일**
- 벡터 그래픽(심플 선/면)
- 사이트 컬러 토큰 기반
- 의학 디테일 과다 금지(개념 전달 수준)

**5 Scene**
1. Intake  
   - KR: “섭취 직후, NO 경로를 여는 ‘전구물질 흐름’이 시작됩니다.”  
   - EN: “Right after intake, the precursor flow that opens the NO pathway begins.”
2. Conversion (NO₃ → NO₂ → NO)  
   - KR: “NO로 이어지는 전환 단계가 빠르게 이어집니다.”  
   - EN: “The conversion steps toward NO progress quickly.”
3. Vessel Response  
   - KR: “혈관이 이완되며 흐름이 넓어집니다.”  
   - EN: “Vessels relax, allowing flow to widen.”
4. Flow & Warmth  
   - KR: “말초 순환 변화는 ‘따뜻함’으로 체감되기도 합니다.”  
   - EN: “Peripheral circulation changes can be felt as warmth.”
5. Sustain  
   - KR: “몸이 ‘흐름의 리듬’을 되찾는 방향으로 정렬됩니다.”  
   - EN: “Your body aligns toward a steadier flow rhythm.”

**구현 요구**
- GSAP ScrollTrigger: `pin: true`, `scrub: true`
- 스크롤 위치 → Lottie 프레임 인덱스 매핑
- 텍스트는 Scene별 페이드 인/아웃
- 이 영역은 **영상(mp4) 사용 금지** (Lottie 전용)

---

### 9.3 Evidence (핵심 데이터 카드)
**목적**  
“과장 없이 실제 데이터가 있다”를 10초 안에 전달.

**레이아웃**
- 3 카드(Desktop 3열, Mobile 1열)
- 카드: 큰 숫자 + 1줄 의미 + (옵션) 자세히 보기

**콘텐츠 초안**
- 혈압: “15분 후 평균 변화: 수축기 -16 / 이완기 -13 mmHg (n=12)”
- 체표 온도: “말초 피부 온도 평균 +0.52°C”
- 농도: “질산염 188 ppm / 아질산염 4,374 ppm”

---

### 9.4 Product / How to Use
- 좌: 제품 이미지(스틱/컵)
- 우: 짧은 텍스트 블록 2~3개
- “언제/빈도”는 가이드 섹션으로만 두고 추후 확정

---

### 9.5 FAQ
- 아코디언 리스트
- 최소 질문:
  - 언제부터 체감?
  - 어떻게/언제 섭취?
  - 매일 섭취?
  - 공복/식후?
  - 주의 대상?
  - 정상적인 체감은?

---

### 9.6 Contact / CTA
- 목표 행동: 구매 이동 / 문의
- 폼 최소 필드:
  - 이름, 이메일, 목적(개인/B2B/기타), 메시지

---

## 10) 기능 요구사항
- Next.js(App Router) + Tailwind
- GSAP ScrollTrigger + Lenis
- Mechanism: Lottie(JSON) + pin/scrub
- Hero: Desktop 스크롤-컨트롤 비디오 + Mobile fallback
- i18n: /ko /en + 토글 유지
- SEO: 언어별 title/description, OG
- GA4 이벤트:
  - `hero_video_scroll_start`
  - `mechanism_scroll_depth` (25/50/75/100)
  - `evidence_card_click`
  - `cta_click`
  - `form_submit`
- 성능: LCP 2.5s 목표(자산 lazy-load)

---

## 11) 성공 지표
- Hero 스크롤 시작률 ≥ 70%
- Mechanism 50% 도달률 ≥ 50%
- CTA 클릭률
- 폼 제출 전환율

---

## 12) 구현 우선순위 (Antigravity용)

### Phase 1 (뼈대)
- /ko /en 라우팅 + 언어 토글
- 헤더/네비 + 앵커 스크롤
- Hero: 비디오 슬롯 + 카피 + CTA + 스크롤-컨트롤 로직
- Mechanism: pin + 5 Scene 텍스트 + Lottie placeholder(JSON)
- Evidence: 3 카드
- Product/FAQ/Contact UI 골격

### Phase 2 (자산 연동/튜닝)
- Hero 영상 최종본 교체 + 스크롤 매핑 튜닝
- Mechanism Lottie 최종본 교체 + 이징/속도 튜닝
- GA4 이벤트 연결
- 마이크로 인터랙션/반응형 최적화

---

## 13) Engineering Guardrails (Vibe Coding Rules)
본 프로젝트는 빠른 구현보다 “나중에 수정/확장 가능한 구조”를 최우선으로 한다.

### 13.1 구조/재사용성
- 섹션은 `components/sections/*`
- 재사용 UI는 `components/ui/*`로 분리
- 텍스트 하드코딩 금지: 모든 문자열은 `messages/ko.json`, `messages/en.json`에서만 호출

### 13.2 변경 용이성(설정/데이터 분리)
- Magic number 금지 → `config/*`로 분리 (스크롤 구간/threshold/duration 등)
- 섹션 데이터는 `content/*` 또는 `data/*`로 분리하고, UI는 맵핑 렌더링
- GSAP 로직은 `hooks/*`로 분리 (`useScrollVideo`, `useMechanismScroll` 등)

### 13.3 성능/안정성
- `prefers-reduced-motion` 지원 (reduce면 애니메이션 단순화)
- 모바일 heavy animation 자동 fallback
- Lenis + GSAP 결합 시 ticker 중복 실행 금지(단일 루프 유지)
- ScrollTrigger cleanup 필수(언마운트 시 kill)
- 비디오/이미지 lazy-load로 LCP 보호

### 13.4 스타일 시스템(Apple Keynote 톤 유지)
- 컬러/타이포/spacing 토큰화(임의 Tailwind 난사 금지)
- 과한 그림자/글로우/네온/복잡 배경 금지
- 섹션 간 여백/정렬 리듬 최우선

### 13.5 품질 기준(최소 검증)
- `npm run lint` / `npm run build` 에러 0
- 콘솔 경고(특히 hydration) 최소화
- GA4 이벤트는 공통 함수로 분리하여 어디서든 동일 규칙으로 호출 가능하게 구성

### 13.6 접근성(A11y) & UX 디테일
- Nav/버튼/아코디언/모달은 키보드 탭 이동 가능해야 함(포커스 링 유지)
- 언어 토글은 현재 선택 언어가 시각적으로 명확해야 함(aria-pressed 등)
- 대비(텍스트/배경) 최소 기준 만족(오프화이트 배경에서 회색 텍스트 너무 연하게 금지)
- 스크롤-컨트롤 비디오는 “스크롤하면 움직인다”를 즉시 이해하도록 힌트 제공(미세 scroll cue)

### 13.7 테스트/회귀 방지(간단하지만 필수)
- 최소 스모크 테스트 체크리스트:
  1) /ko, /en 전환 시 현재 섹션 유지(가능하면)
  2) Hero 비디오: Desktop 스크롤 매핑 정상 / Mobile fallback 정상
  3) Mechanism: pin 구간에서 스크롤 막힘/튐 없음
  4) Evidence 토글/FAQ 아코디언 동작 정상
  5) 폼 제출 이벤트(최소 console log라도) 정상
- 새 기능 추가 전 위 5개 항목 항상 재검증

### 13.8 SEO/국제화(EN/KR) 기술 가드레일
- 언어별 메타(title/description/og) 분리
- canonical/alternate(hreflang) 고려(가능하면)
- 정적 텍스트는 반드시 i18n 파일에서만 로드(중복/누락 방지)
- URL 구조는 고정: `/ko`, `/en` (추후 `/jp` 확장 가능하게 설계)

### 13.9 분석/이벤트 트래킹 일관성
- GA4 이벤트는 단일 유틸 함수로 통일: `track(eventName, payload)`
- 이벤트 스키마(고정):
  - hero: `hero_video_scroll_start`, `hero_video_progress`
  - mechanism: `mechanism_scene_view` (scene: 1~5)
  - evidence: `evidence_expand` (card_id)
  - cta: `cta_click` (cta_id, section)
  - form: `form_submit` (purpose)
- 이벤트 추가/수정 시 PRD에도 동일하게 업데이트

### 13.10 유지보수/확장 규칙
- 섹션 추가는 “컴포넌트 1개 + i18n 문자열 + nav 앵커” 3종 세트로만 진행
- 애니메이션 추가 시:
  - cleanup/kill 포함
  - reduce-motion 대응 포함
  - 모바일 fallback 정의 포함
- 디자인 토큰 변경 시 전 섹션 파급 검토(부분 수정 금지)
- PRD 변경 로그(Version/Date/What changed)를 유지


### 13.11 브랜치/커밋 규칙 (작업이 꼬이지 않게)
- 한 번에 한 덩어리: “i18n”, “Hero scroll video”, “Mechanism pin”처럼 기능 단위로 커밋
- 커밋 메시지 규칙: `feat:`, `fix:`, `refactor:`, `chore:` 사용
- 큰 수정 전에 반드시 현재 상태가 `npm run build` 통과하는지 확인

### 13.12 의존성/라이브러리 가드레일
- 애니메이션 라이브러리는 **GSAP + Lenis + Lottie**로 고정(중간에 다른 것 추가 금지)
- 유틸/헬퍼는 반드시 `lib/*`로 모으고, 섹션 컴포넌트 안에서 즉흥적으로 함수 만들지 않기
- 스크롤/애니메이션 관련 전역 상태는 만들지 말고 hook 단위로 캡슐화

### 13.13 운영/배포 관점 최소 규칙
- 환경변수는 `.env.local`만 사용하고 코드에 직접 박지 않기(Analytics ID 등)
- 이미지/비디오는 `/public`에 두되, 최종 배포 전 용량 상한 설정(예: hero video <= XXMB)
- 배포 전 체크:
  - 데스크톱(Chrome/Safari) + 모바일(iOS/Android) 1회씩 스크롤/토글/폼 동작 확인