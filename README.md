# 🎨 전문가급 웹사이트 빌더 - React + Vite + Tailwind CSS

전문가가 사용하기에도 충분한 완벽한 비주얼 웹사이트 빌더! Tailwind CSS의 모든 기능을 최대한 활용할 수 있습니다.

![React](https://img.shields.io/badge/React-18.3-blue?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=flat&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=flat&logo=tailwind-css)
![dnd-kit](https://img.shields.io/badge/dnd--kit-latest-green?style=flat)

## ✨ 주요 기능

### 🎯 직관적인 드래그 앤 드롭
- **@dnd-kit** 라이브러리를 사용한 프로페셔널 드래그 앤 드롭
- 왼쪽 패널에서 컴포넌트를 드래그하여 캔버스에 배치
- 드래그로 요소 순서 자유롭게 변경
- 코딩 지식 없이 누구나 쉽게 사용 가능

### 👁️ 실시간 라이브 미리보기
- 오른쪽 패널에서 실시간으로 결과 확인
- 데스크톱(전체), 태블릿(768px), 모바일(375px) 모드 전환
- 모든 변경사항이 즉시 반영
- 완전 실사형 렌더링

### 🎨 풍부한 컴포넌트 라이브러리 (15+)

#### 📐 레이아웃
- **컨테이너**: 요소를 그룹화하는 박스
- **섹션**: 독립적인 페이지 영역 (그라디언트 배경 지원)
- **컬럼**: 2단 레이아웃 (Grid 시스템)

#### ✍️ 텍스트
- **제목**: 큰 제목 텍스트 (H1)
- **본문**: 일반 텍스트 단락

#### 🖼️ 미디어
- **이미지**: 사진 및 그림 삽입
- **비디오**: HTML5 비디오 플레이어

#### 🧩 UI 요소
- **버튼**: 클릭 가능한 버튼 (호버 효과 지원)
- **폼**: 입력 양식 (이름, 이메일, 메시지)
- **카드**: 정보를 담는 카드 컴포넌트 (그림자 효과)
- **내비게이션바**: 반응형 상단 메뉴
- **푸터**: 하단 정보 섹션

### ⚙️ 고급 속성 편집 패널

#### 📝 내용 편집
- 각 컴포넌트별 맞춤 속성 편집
- 텍스트, 이미지 URL, 비디오 소스 등 실시간 수정
- contentEditable을 통한 직접 텍스트 편집

#### 🎨 Tailwind CSS 완전 제어

**레이아웃 (Layout)**
- Display: block, flex, grid, inline-block 등
- Position: static, fixed, absolute, relative, sticky
- Width & Height: 모든 Tailwind 단위 지원

**간격 (Spacing)**
- Padding: p-0 ~ p-96 (X, Y 축 개별 설정)
- Margin: m-0 ~ m-96 (X, Y 축 개별 설정)
- Gap: 그리드 및 플렉스 간격

**타이포그래피 (Typography)**
- Font Size: xs, sm, base, lg, xl, 2xl ~ 9xl
- Font Weight: thin, light, normal, bold, black
- Text Align: left, center, right, justify
- Line Height: tight, normal, relaxed, loose
- Letter Spacing: tighter, normal, wider, widest

**색상 (Colors)**
- Background: 모든 Tailwind 색상 + 그라디언트
- Text Color: 전체 팔레트 지원
- Border Color: 테두리 색상 설정
- 10가지 색상 퀵 픽커

**테두리 & 효과 (Borders & Effects)**
- Border Width: 1px, 2px, 4px, 8px
- Border Radius: none, sm, md, lg, xl, full
- Shadow: none, sm, md, lg, xl, 2xl, inner
- Opacity: 0% ~ 100% (5% 단위)

**애니메이션 (Animation)**
- Transition: all, colors, opacity, shadow, transform
- Duration: 75ms ~ 1000ms
- 호버, 포커스 상태 지원

**반응형 디자인 (Responsive)**
- sm:, md:, lg:, xl:, 2xl: 브레이크포인트
- 모든 Tailwind 클래스에 반응형 접두사 사용 가능
- 예: `sm:text-sm md:text-lg lg:text-2xl`

**호버 & 상태 (Hover & States)**
- hover:, focus:, active: 등 모든 상태 지원
- 예: `hover:bg-blue-600 active:scale-95`

### 📚 레이어 패널
- 모든 요소를 계층 구조로 표시
- 클릭하여 빠른 선택
- 숨기기/표시 기능
- 빠른 복제 및 삭제
- 요소 순서 시각화

### ⌨️ 키보드 단축키
- **Ctrl+Z**: 실행 취소
- **Ctrl+Shift+Z** 또는 **Ctrl+Y**: 다시 실행
- **Ctrl+C**: 선택한 요소 복사
- **Ctrl+V**: 복사한 요소 붙여넣기
- **Ctrl+D**: 선택한 요소 복제
- **Ctrl+S**: 프로젝트 저장
- **Delete** 또는 **Backspace**: 선택한 요소 삭제

### 🔄 실행 취소/다시 실행
- 무제한 히스토리 관리
- 모든 작업 추적 (추가, 수정, 삭제, 이동)
- 안정적인 상태 관리

### 📋 복사/붙여넣기/복제
- 요소 복사 및 붙여넣기
- 한 번에 요소 복제
- 클립보드 상태 표시

### 💾 저장 및 내보내기
- **자동 저장**: LocalStorage에 프로젝트 자동 저장
- **수동 저장**: Ctrl+S 또는 저장 버튼
- **코드 내보내기**: 완성된 웹사이트를 HTML 파일로 다운로드
- **Tailwind CDN 포함**: 내보낸 파일에 Tailwind CSS 자동 포함
- **초기화**: 모든 요소를 삭제하고 새로 시작

## 🚀 시작하기

### 설치

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프로덕션 미리보기
npm run preview
```

### 사용 방법

1. **개발 서버 실행**
   ```bash
   npm run dev
   ```
   브라우저에서 `http://localhost:5173` 접속

2. **컴포넌트 추가**
   - 왼쪽 컴포넌트 패널에서 원하는 컴포넌트 선택
   - 마우스로 드래그하여 중앙 캔버스에 드롭

3. **내용 편집**
   - 텍스트를 직접 클릭하여 수정
   - ✏️ 버튼을 클릭하여 고급 속성 편집
   - 오른쪽 속성 패널에서 Tailwind CSS 설정

4. **스타일 적용**
   - 고급 속성 패널에서 Tailwind CSS 클래스 추가
   - 레이아웃, 간격, 색상, 타이포그래피 등 모든 속성 제어
   - 호버, 포커스 등 상태 스타일 적용
   - 반응형 디자인 설정 (sm:, md:, lg:)

5. **순서 변경**
   - 🔀 드래그 핸들을 사용하여 요소 순서 변경
   - 또는 레이어 패널에서 관리

6. **실시간 확인**
   - 오른쪽 미리보기 패널에서 실시간 결과 확인
   - 💻 데스크톱 / 📱 태블릿 / 📱 모바일 버튼으로 화면 크기 전환

7. **저장 및 내보내기**
   - 💾 저장: LocalStorage에 프로젝트 저장 (Ctrl+S)
   - 💾 코드 내보내기: HTML 파일로 다운로드
   - 🗑️ 초기화: 모든 요소 삭제

## 🛠️ 기술 스택

- **React 18.3**: 최신 React 훅과 Context API
- **Vite 6.0**: 초고속 개발 서버 및 빌드
- **Tailwind CSS 4.0**: 최신 유틸리티 기반 CSS 프레임워크
- **@dnd-kit**: 프로페셔널 드래그 앤 드롭 라이브러리
- **lucide-react**: 아름다운 SVG 아이콘 라이브러리
- **Context API**: React 전역 상태 관리

## 📁 프로젝트 구조

```
src/
├── components/
│   ├── Canvas.jsx                    # 중앙 캔버스 (드롭 영역)
│   ├── ComponentPanel.jsx            # 왼쪽 컴포넌트 패널
│   ├── Preview.jsx                   # 오른쪽 라이브 미리보기
│   ├── AdvancedPropertiesPanel.jsx   # 고급 속성 편집 패널
│   ├── LayersPanel.jsx               # 레이어 관리 패널
│   ├── SortableElement.jsx           # 정렬 가능한 요소
│   └── ElementRenderer.jsx           # 요소 렌더러
├── context/
│   └── BuilderContext.jsx            # Context API 상태 관리
├── App.jsx                           # 메인 앱 컴포넌트
├── main.jsx                          # 엔트리 포인트
└── index.css                         # Tailwind CSS 설정
```

## 🎯 전문가급 기능

### Tailwind CSS 완전 제어
- **모든 유틸리티 클래스**: 16,000+ Tailwind 클래스 사용 가능
- **커스텀 클래스**: 직접 입력으로 무한한 가능성
- **상태 관리**: hover:, focus:, active:, disabled: 등
- **반응형 접두사**: sm:, md:, lg:, xl:, 2xl:
- **다크 모드**: dark: 접두사 지원
- **그라디언트**: bg-gradient-to-r from-X to-Y
- **애니메이션**: animate-spin, animate-pulse 등

### 히스토리 관리
- 무제한 실행 취소/다시 실행
- 모든 작업 자동 추적
- 안정적인 상태 복원

### 생산성 도구
- 키보드 단축키로 빠른 작업
- 복사/붙여넣기로 요소 재사용
- 복제로 빠른 복사본 생성
- 레이어 패널에서 한눈에 구조 파악

### 프로페셔널 워크플로우
1. 컴포넌트 라이브러리에서 기본 구조 생성
2. 직접 편집으로 내용 수정
3. 고급 속성 패널에서 Tailwind CSS로 디테일 조정
4. 반응형 디자인 테스트
5. 코드 내보내기로 완성

## 💡 활용 예시

- 개인 포트폴리오 웹사이트
- 스타트업 랜딩 페이지
- 회사 소개 페이지
- 이벤트 프로모션 페이지
- 제품 소개 페이지
- 블로그 레이아웃
- 디자인 프로토타입
- UI/UX 목업
- 빠른 프론트엔드 개발

## 🔧 고급 사용법

### Tailwind CSS 팁

**그라디언트 배경**
```
bg-gradient-to-r from-purple-500 via-pink-500 to-red-500
```

**호버 효과**
```
hover:bg-blue-600 hover:scale-105 hover:shadow-xl transition-all duration-300
```

**반응형 텍스트**
```
text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl
```

**다크 모드**
```
bg-white dark:bg-gray-800 text-gray-900 dark:text-white
```

**플렉스박스 레이아웃**
```
flex flex-col md:flex-row items-center justify-between gap-4
```

**그리드 레이아웃**
```
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
```

**애니메이션**
```
animate-bounce hover:animate-spin transition-transform duration-500
```

### 키보드 워크플로우

1. `Ctrl+D`로 요소 빠르게 복제
2. `Ctrl+C`/`Ctrl+V`로 다른 위치에 붙여넣기
3. `Ctrl+Z`로 실수 되돌리기
4. `Ctrl+S`로 수시로 저장
5. `Delete`로 불필요한 요소 제거

## 📱 반응형 디자인

- **데스크톱**: 전체 너비 (기본)
- **태블릿**: 768px (sm: 브레이크포인트)
- **모바일**: 375px (기본 스마트폰 크기)

미리보기에서 각 화면 크기를 실시간으로 테스트할 수 있습니다.

## 🎓 학습 리소스

- [Tailwind CSS 공식 문서](https://tailwindcss.com/docs)
- [React 공식 문서](https://react.dev)
- [dnd-kit 문서](https://docs.dndkit.com)
- [Vite 가이드](https://vitejs.dev/guide)

## 🐛 알려진 이슈

- 일부 브라우저에서 contentEditable 동작이 다를 수 있습니다
- LocalStorage에는 용량 제한(~5MB)이 있습니다
- 매우 복잡한 레이아웃은 성능에 영향을 줄 수 있습니다

## 🤝 기여

버그 리포트, 기능 제안, Pull Request 모두 환영합니다!

## 📄 라이센스

MIT License

---

## 🎉 완벽에 가까운 기능

✅ 드래그 앤 드롭 시스템
✅ 실시간 라이브 미리보기
✅ 15+ 프로페셔널 컴포넌트
✅ Tailwind CSS 완전 제어
✅ 고급 속성 편집 패널
✅ 레이어 관리 시스템
✅ 실행 취소/다시 실행
✅ 복사/붙여넣기/복제
✅ 키보드 단축키
✅ 반응형 디자인 모드
✅ 코드 내보내기
✅ 자동 저장

전문가도 만족할 완벽한 웹사이트 빌더! 🚀

Made with ❤️ using React, Vite, and Tailwind CSS
