# CBL:LOL Npay Summer Cup — 이벤트 페이지

순수 HTML / CSS / JavaScript로 만들어진 정적 페이지입니다. 별도 빌드(npm 등) 없이 바로 수정·실행 가능합니다.

## 파일 구조
```
index.html      ← 페이지 본문(구조 + 텍스트). 더블클릭하면 브라우저에서 바로 열림
styles.css      ← 모든 디자인(색상·폰트·레이아웃·반응형)
script.js       ← 카운트다운, 탭 전환, 우측 네비 등 인터랙션
assets/         ← 이미지(키비주얼·경품·로고·스텝 캡처 등)
```

## VS Code에서 수정하기
1. `export` 폴더를 VS Code로 열기 (File → Open Folder)
2. `index.html`을 브라우저로 열어 미리보기 — 또는 "Live Server" 확장 설치 후 우클릭 → "Open with Live Server"
3. 텍스트/문구는 `index.html`, 디자인은 `styles.css`에서 수정

## 자주 바꾸는 항목
- **색상**: `styles.css` 상단 `:root`의 CSS 변수(`--green`, `--bg-0` 등)
- **이벤트 날짜 / 카운트다운**: `script.js`의 start / end 날짜
- **이미지 교체**: `assets/` 안의 파일을 같은 이름으로 덮어쓰기
- **반응형**: `styles.css`의 `@media (max-width: ...)` 블록 (1024px=태블릿, 767px=모바일, 600px=소형폰)

## 폰트
Pretendard / Bebas Neue / JetBrains Mono — `index.html` `<head>`에서 CDN으로 로드합니다(인터넷 연결 필요).
