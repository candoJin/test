# 🎨 웹사이트 빌더 - React + Vite + Tailwind CSS

블록 코딩처럼 쉽게 웹사이트를 만들 수 있는 프로페셔널 비주얼 웹사이트 빌더입니다!

![React](https://img.shields.io/badge/React-18.3-blue?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=flat&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat&logo=tailwind-css)
![dnd-kit](https://img.shields.io/badge/dnd--kit-latest-green?style=flat)

## ✨ 주요 기능

### 🎯 직관적인 드래그 앤 드롭
- **@dnd-kit** 라이브러리를 사용한 부드러운 드래그 앤 드롭
- 왼쪽 패널에서 컴포넌트를 드래그하여 캔버스에 배치
- 드래그로 요소 순서 변경 가능
- 코딩 지식 없이 누구나 쉽게 사용 가능

### 👁️ 실시간 라이브 미리보기
- 오른쪽 패널에서 실시간으로 결과 확인
- 데스크톱, 태블릿, 모바일 화면 크기 전환
- 모든 변경사항이 즉시 반영
- 반응형 디자인 테스트 가능

### 🎨 풍부한 컴포넌트 라이브러리 (15+)

#### 📐 레이아웃
- **컨테이너**: 요소를 그룹화하는 박스
- **섹션**: 독립적인 페이지 영역
- **컬럼**: 2단 레이아웃

#### ✍️ 텍스트
- **제목**: 큰 제목 텍스트 (H1)
- **본문**: 일반 텍스트 단락

#### 🖼️ 미디어
- **이미지**: 사진 및 그림 삽입
- **비디오**: 동영상 플레이어

#### 🧩 UI 요소
- **버튼**: 클릭 가능한 버튼
- **폼**: 입력 양식 (이름, 이메일, 메시지)
- **카드**: 정보를 담는 카드 컴포넌트
- **내비게이션바**: 상단 메뉴
- **푸터**: 하단 정보

### ⚙️ 강력한 속성 편집
- 각 요소를 선택하여 상세 속성 편집
- 텍스트 내용 실시간 수정
- Tailwind CSS 클래스 추가
- 인라인 스타일 적용
- 직접 클릭하여 텍스트 편집 가능 (contentEditable)

### 💾 저장 및 내보내기
- **자동 저장**: LocalStorage에 프로젝트 자동 저장
- **코드 내보내기**: 완성된 웹사이트를 HTML 파일로 다운로드
- **Tailwind CSS 포함**: 내보낸 파일에 Tailwind CDN 자동 포함
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
   - 왼쪽 패널에서 원하는 컴포넌트 선택
   - 마우스로 드래그하여 중앙 캔버스에 드롭

3. **내용 편집**
   - 텍스트는 직접 클릭하여 수정 가능
   - ✏️ 버튼을 클릭하여 상세 속성 편집
   - 오른쪽 속성 패널에서 고급 설정

4. **순서 변경**
   - 🔀 드래그 핸들을 사용하여 요소 순서 변경

5. **실시간 확인**
   - 오른쪽 미리보기 패널에서 실시간 결과 확인
   - 💻 데스크톱 / 📱 태블릿 / 📱 모바일 버튼으로 화면 크기 전환

6. **저장 및 내보내기**
   - 💾 저장: LocalStorage에 프로젝트 저장
   - 💾 코드 내보내기: HTML 파일로 다운로드
   - 🗑️ 초기화: 모든 요소 삭제

## 🛠️ 기술 스택

- **React 18.3**: UI 라이브러리
- **Vite 6.0**: 빠른 빌드 도구
- **Tailwind CSS 3.4**: 유틸리티 기반 CSS 프레임워크
- **@dnd-kit**: 현대적인 드래그 앤 드롭 라이브러리
- **lucide-react**: 아름다운 아이콘 라이브러리
- **Context API**: React 상태 관리

## 📁 프로젝트 구조

```
src/
├── components/
│   ├── Canvas.jsx              # 중앙 캔버스 (드롭 영역)
│   ├── ComponentPanel.jsx      # 왼쪽 컴포넌트 패널
│   ├── Preview.jsx             # 오른쪽 라이브 미리보기
│   ├── PropertiesPanel.jsx     # 속성 편집 패널
│   ├── SortableElement.jsx     # 정렬 가능한 요소
│   └── ElementRenderer.jsx     # 요소 렌더러
├── context/
│   └── BuilderContext.jsx      # 전역 상태 관리
├── App.jsx                     # 메인 앱 컴포넌트
├── main.jsx                    # 엔트리 포인트
└── index.css                   # Tailwind CSS 설정
```

## 🎯 주요 특징

### Context API 기반 상태 관리
- 모든 컴포넌트가 전역 상태 공유
- 효율적인 상태 업데이트
- 코드 재사용성 향상

### dnd-kit 드래그 앤 드롭
- 터치 스크린 지원
- 접근성 향상 (키보드 네비게이션)
- 부드러운 애니메이션
- 정렬 가능한 리스트

### Tailwind CSS
- 유틸리티 기반 스타일링
- 빠른 개발 속도
- 일관된 디자인 시스템
- 반응형 디자인 간편 구현

### 실시간 편집
- contentEditable을 활용한 즉시 편집
- 자동 저장 기능
- 실시간 미리보기 동기화

## 💡 활용 예시

- 개인 포트폴리오 웹사이트
- 랜딩 페이지
- 회사 소개 페이지
- 이벤트 페이지
- 제품 소개 페이지
- 블로그 레이아웃
- 프로토타입 제작

## 🔧 커스터마이징

### 새로운 컴포넌트 추가

1. `src/components/ComponentPanel.jsx`에 컴포넌트 정의 추가
2. `src/components/ElementRenderer.jsx`에 렌더링 로직 추가
3. `src/context/BuilderContext.jsx`에 기본 속성 추가

### Tailwind 설정 변경

`tailwind.config.js` 파일에서 테마, 색상, 폰트 등을 커스터마이징할 수 있습니다.

## 📱 반응형 디자인

- 데스크톱: 전체 너비
- 태블릿: 768px
- 모바일: 375px

미리보기에서 각 화면 크기를 실시간으로 테스트할 수 있습니다.

## 🐛 알려진 이슈

- 일부 브라우저에서 contentEditable 동작이 다를 수 있습니다
- LocalStorage에는 용량 제한(~5MB)이 있습니다

## 🤝 기여

버그 리포트, 기능 제안, Pull Request 모두 환영합니다!

## 📄 라이센스

MIT License

---

즐거운 웹사이트 제작 되세요! 🎉

Made with ❤️ using React, Vite, and Tailwind CSS
