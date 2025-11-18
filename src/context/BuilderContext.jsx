import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const BuilderContext = createContext();

export const useBuilder = () => {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error('useBuilder must be used within BuilderProvider');
  }
  return context;
};

export const BuilderProvider = ({ children }) => {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [previewMode, setPreviewMode] = useState('desktop');
  const [isDragging, setIsDragging] = useState(false);
  const [clipboard, setClipboard] = useState(null);

  // History for undo/redo
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Load project from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('website-builder-project');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setElements(data.elements || []);
        if (data.elements && data.elements.length > 0) {
          setHistory([data.elements]);
          setHistoryIndex(0);
        }
      } catch (error) {
        console.error('Failed to load project:', error);
      }
    }
  }, []);

  // Save project to localStorage whenever elements change
  useEffect(() => {
    if (elements.length > 0) {
      localStorage.setItem('website-builder-project', JSON.stringify({ elements }));
    }
  }, [elements]);

  // Add to history
  const addToHistory = useCallback((newElements) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(JSON.parse(JSON.stringify(newElements)));
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  // Undo
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setElements(JSON.parse(JSON.stringify(history[historyIndex - 1])));
    }
  }, [history, historyIndex]);

  // Redo
  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setElements(JSON.parse(JSON.stringify(history[historyIndex + 1])));
    }
  }, [history, historyIndex]);

  const addElement = (type, position = null, parentId = null) => {
    const newElement = {
      id: `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      props: getDefaultProps(type),
      children: [],
      parentId: parentId,
    };

    let newElements;
    if (position !== null) {
      newElements = [...elements];
      newElements.splice(position, 0, newElement);
    } else {
      newElements = [...elements, newElement];
    }

    setElements(newElements);
    addToHistory(newElements);
    return newElement.id;
  };

  const updateElement = (id, updates) => {
    const newElements = elements.map(el =>
      el.id === id ? { ...el, ...updates } : el
    );
    setElements(newElements);
    addToHistory(newElements);
  };

  const updateElementProps = (id, props) => {
    const newElements = elements.map(el =>
      el.id === id ? { ...el, props: { ...el.props, ...props } } : el
    );
    setElements(newElements);
    addToHistory(newElements);
  };

  const deleteElement = (id) => {
    const newElements = elements.filter(el => el.id !== id);
    setElements(newElements);
    addToHistory(newElements);
    if (selectedElement === id) {
      setSelectedElement(null);
    }
  };

  const duplicateElement = (id) => {
    const element = elements.find(el => el.id === id);
    if (element) {
      const newElement = {
        ...JSON.parse(JSON.stringify(element)),
        id: `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      };
      const index = elements.findIndex(el => el.id === id);
      const newElements = [...elements];
      newElements.splice(index + 1, 0, newElement);
      setElements(newElements);
      addToHistory(newElements);
      return newElement.id;
    }
  };

  const copyElement = (id) => {
    const element = elements.find(el => el.id === id);
    if (element) {
      setClipboard(JSON.parse(JSON.stringify(element)));
    }
  };

  const pasteElement = () => {
    if (clipboard) {
      const newElement = {
        ...JSON.parse(JSON.stringify(clipboard)),
        id: `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      };
      const newElements = [...elements, newElement];
      setElements(newElements);
      addToHistory(newElements);
      setSelectedElement(newElement.id);
    }
  };

  const moveElement = (fromIndex, toIndex) => {
    const newElements = [...elements];
    const [movedElement] = newElements.splice(fromIndex, 1);
    newElements.splice(toIndex, 0, movedElement);
    setElements(newElements);
    addToHistory(newElements);
  };

  const clearAll = () => {
    if (window.confirm('모든 요소를 삭제하시겠습니까?')) {
      setElements([]);
      setSelectedElement(null);
      setHistory([]);
      setHistoryIndex(-1);
      localStorage.removeItem('website-builder-project');
    }
  };

  const exportHTML = () => {
    let html = generateHTML(elements);

    const fullHTML = `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>내 웹사이트</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
            margin: 0;
            padding: 0;
        }
    </style>
</head>
<body>
${html}
</body>
</html>`;

    const blob = new Blob([fullHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-website.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const generateHTML = (elements) => {
    return elements.map(el => {
      const { type, props } = el;
      return generateElementHTML(type, props, el.children);
    }).join('\n');
  };

  const generateElementHTML = (type, props, children) => {
    const templates = {
      heading: `<h1 class="${props.className || ''}" style="${props.style || ''}">${props.text || '제목'}</h1>`,
      paragraph: `<p class="${props.className || ''}" style="${props.style || ''}">${props.text || '본문 텍스트'}</p>`,
      button: `<button class="${props.className || ''}" style="${props.style || ''}">${props.text || '버튼'}</button>`,
      image: `<img src="${props.src || 'https://via.placeholder.com/400x200'}" alt="${props.alt || '이미지'}" class="${props.className || ''}" style="${props.style || ''}" />`,
      video: `<div class="${props.className || ''}" style="${props.style || ''}"><video controls style="width: 100%;"><source src="${props.src || ''}" type="video/mp4">비디오를 지원하지 않는 브라우저입니다.</video></div>`,
      container: `<div class="${props.className || ''}" style="${props.style || ''}">${props.content || '컨테이너 영역'}</div>`,
      section: `<section class="${props.className || ''}" style="${props.style || ''}"><h2>${props.title || '섹션 제목'}</h2><p>${props.content || '섹션 내용'}</p></section>`,
      columns: `<div class="${props.className || ''}" style="${props.style || ''}"><div class="flex gap-4"><div class="flex-1 p-4 bg-gray-100 rounded">${props.column1 || '컬럼 1'}</div><div class="flex-1 p-4 bg-gray-100 rounded">${props.column2 || '컬럼 2'}</div></div></div>`,
      form: `<form class="${props.className || ''}" style="${props.style || ''}"><input type="text" placeholder="이름" class="w-full p-3 mb-3 border-2 border-gray-300 rounded"><input type="email" placeholder="이메일" class="w-full p-3 mb-3 border-2 border-gray-300 rounded"><button type="submit" class="bg-green-500 text-white px-6 py-3 rounded font-semibold">제출</button></form>`,
      card: `<div class="${props.className || ''}" style="${props.style || ''}"><div class="bg-white rounded-lg shadow-lg p-6 max-w-sm"><h3 class="text-xl font-bold mb-3">${props.title || '카드 제목'}</h3><p class="text-gray-600 mb-4">${props.content || '카드 내용'}</p><button class="bg-blue-500 text-white px-6 py-2 rounded">자세히 보기</button></div></div>`,
      navbar: `<nav class="${props.className || ''}" style="${props.style || ''}"><div class="bg-gray-800 text-white p-4 flex justify-between items-center"><div class="text-2xl font-bold">${props.logo || '로고'}</div><div class="flex gap-6"><a href="#" class="hover:text-blue-400">홈</a><a href="#" class="hover:text-blue-400">소개</a><a href="#" class="hover:text-blue-400">서비스</a><a href="#" class="hover:text-blue-400">연락처</a></div></div></nav>`,
      footer: `<footer class="${props.className || ''}" style="${props.style || ''}"><div class="bg-gray-800 text-white p-10 text-center"><p class="text-lg font-semibold mb-3">${props.company || '회사명'}</p><p class="text-gray-400 mb-4">${props.address || '주소 정보'}</p><p class="text-gray-500 text-sm">&copy; 2024 All rights reserved.</p></div></footer>`,
    };

    return templates[type] || `<div>${type}</div>`;
  };

  const value = {
    elements,
    selectedElement,
    previewMode,
    isDragging,
    clipboard,
    canUndo: historyIndex > 0,
    canRedo: historyIndex < history.length - 1,
    setIsDragging,
    setElements,
    setSelectedElement,
    setPreviewMode,
    addElement,
    updateElement,
    updateElementProps,
    deleteElement,
    duplicateElement,
    copyElement,
    pasteElement,
    moveElement,
    clearAll,
    exportHTML,
    undo,
    redo,
  };

  return (
    <BuilderContext.Provider value={value}>
      {children}
    </BuilderContext.Provider>
  );
};

// Default props for each component type
function getDefaultProps(type) {
  const defaults = {
    heading: {
      text: '제목을 입력하세요',
      className: 'text-4xl font-bold text-gray-800 mb-4',
      style: '',
    },
    paragraph: {
      text: '본문 텍스트를 입력하세요. 여기에 내용을 작성할 수 있습니다.',
      className: 'text-gray-700 leading-relaxed',
      style: '',
    },
    button: {
      text: '버튼',
      className: 'bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition duration-200',
      style: '',
    },
    image: {
      src: 'https://via.placeholder.com/800x400/3498db/ffffff?text=이미지',
      alt: '이미지',
      className: 'w-full h-auto rounded-lg shadow-md',
      style: '',
    },
    video: {
      src: '',
      className: 'w-full rounded-lg shadow-md',
      style: '',
    },
    container: {
      content: '컨테이너 영역',
      className: 'container mx-auto p-8 bg-gray-100 rounded-lg',
      style: '',
    },
    section: {
      title: '섹션 제목',
      content: '섹션 내용을 입력하세요',
      className: 'py-16 px-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center rounded-lg',
      style: '',
    },
    columns: {
      column1: '컬럼 1',
      column2: '컬럼 2',
      className: 'grid grid-cols-2 gap-6',
      style: '',
    },
    threeColumns: {
      column1: '컬럼 1',
      column2: '컬럼 2',
      column3: '컬럼 3',
      className: 'grid grid-cols-3 gap-6',
      style: '',
    },
    form: {
      className: 'bg-gray-50 p-6 rounded-lg shadow-md max-w-md',
      style: '',
    },
    card: {
      title: '카드 제목',
      content: '카드 내용을 여기에 작성하세요. 이미지, 텍스트, 버튼 등을 추가할 수 있습니다.',
      className: 'inline-block',
      style: '',
    },
    navbar: {
      logo: '로고',
      className: '',
      style: '',
    },
    footer: {
      company: '회사명',
      address: '주소: 서울시 강남구 | 전화: 02-1234-5678 | 이메일: info@company.com',
      className: '',
      style: '',
    },
    hero: {
      title: '멋진 제목으로 시작하세요',
      subtitle: '여기에 부제목이나 설명을 추가하세요',
      buttonText: '시작하기',
      className: 'py-20 px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center rounded-lg',
      style: '',
    },
    quote: {
      text: '인용문을 여기에 입력하세요',
      author: '작성자',
      className: 'border-l-4 border-blue-500 pl-6 py-4 bg-gray-50 italic text-gray-700',
      style: '',
    },
    gallery: {
      className: 'grid grid-cols-3 gap-4',
      style: '',
    },
    pricing: {
      title: '스타터',
      price: '$29',
      features: '기능 1, 기능 2, 기능 3',
      className: 'bg-white p-8 rounded-xl shadow-lg border-2 border-gray-200 hover:border-blue-500 transition',
      style: '',
    },
    testimonial: {
      text: '정말 훌륭한 서비스입니다!',
      author: '고객 이름',
      role: '직책',
      className: 'bg-white p-6 rounded-lg shadow-md',
      style: '',
    },
    team: {
      name: '팀 멤버',
      role: '직책',
      className: 'text-center p-6 bg-white rounded-lg shadow-md',
      style: '',
    },
    features: {
      title: '주요 기능',
      description: '기능 설명',
      className: 'p-6 bg-white rounded-lg shadow-md',
      style: '',
    },
    stats: {
      number: '1000+',
      label: '만족한 고객',
      className: 'text-center p-6 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-lg',
      style: '',
    },
    cta: {
      title: '지금 바로 시작하세요',
      description: '오늘 가입하고 특별한 혜택을 받으세요',
      buttonText: '무료로 시작하기',
      className: 'py-16 px-8 bg-gradient-to-r from-orange-500 to-red-500 text-white text-center rounded-lg',
      style: '',
    },
    timeline: {
      year: '2024',
      title: '이벤트 제목',
      description: '이벤트 설명',
      className: 'flex gap-6 p-6',
      style: '',
    },
  };

  return defaults[type] || {};
}
