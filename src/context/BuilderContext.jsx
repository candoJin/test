import { createContext, useContext, useState, useEffect } from 'react';

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
  const [previewMode, setPreviewMode] = useState('desktop'); // desktop, tablet, mobile
  const [isDragging, setIsDragging] = useState(false);

  // Load project from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('website-builder-project');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setElements(data.elements || []);
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

  const addElement = (type, position = null) => {
    const newElement = {
      id: `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      props: getDefaultProps(type),
      children: type === 'columns' ? ['', ''] : null,
    };

    if (position !== null) {
      const newElements = [...elements];
      newElements.splice(position, 0, newElement);
      setElements(newElements);
    } else {
      setElements([...elements, newElement]);
    }

    return newElement.id;
  };

  const updateElement = (id, updates) => {
    setElements(elements.map(el =>
      el.id === id ? { ...el, ...updates } : el
    ));
  };

  const updateElementProps = (id, props) => {
    setElements(elements.map(el =>
      el.id === id ? { ...el, props: { ...el.props, ...props } } : el
    ));
  };

  const deleteElement = (id) => {
    setElements(elements.filter(el => el.id !== id));
    if (selectedElement === id) {
      setSelectedElement(null);
    }
  };

  const moveElement = (fromIndex, toIndex) => {
    const newElements = [...elements];
    const [movedElement] = newElements.splice(fromIndex, 1);
    newElements.splice(toIndex, 0, movedElement);
    setElements(newElements);
  };

  const clearAll = () => {
    if (window.confirm('모든 요소를 삭제하시겠습니까?')) {
      setElements([]);
      setSelectedElement(null);
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
      container: `<div class="${props.className || ''}" style="${props.style || ''}">컨테이너 영역</div>`,
      section: `<section class="${props.className || ''}" style="${props.style || ''}"><h2>${props.title || '섹션 제목'}</h2><p>${props.content || '섹션 내용'}</p></section>`,
      columns: `<div class="${props.className || ''}" style="${props.style || ''}"><div class="flex gap-4"><div class="flex-1 p-4 bg-gray-100 rounded">${children?.[0] || '컬럼 1'}</div><div class="flex-1 p-4 bg-gray-100 rounded">${children?.[1] || '컬럼 2'}</div></div></div>`,
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
    setIsDragging,
    setElements,
    setSelectedElement,
    setPreviewMode,
    addElement,
    updateElement,
    updateElementProps,
    deleteElement,
    moveElement,
    clearAll,
    exportHTML,
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
      className: 'grid grid-cols-2 gap-6',
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
  };

  return defaults[type] || {};
}
