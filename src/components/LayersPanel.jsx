import { useBuilder } from '../context/BuilderContext';
import { Eye, EyeOff, Copy, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function LayersPanel() {
  const { elements, selectedElement, setSelectedElement, deleteElement, duplicateElement } = useBuilder();
  const [hiddenElements, setHiddenElements] = useState(new Set());

  const toggleVisibility = (id) => {
    setHiddenElements(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const getElementLabel = (element) => {
    const labels = {
      heading: '제목',
      paragraph: '본문',
      button: '버튼',
      image: '이미지',
      video: '비디오',
      container: '컨테이너',
      section: '섹션',
      columns: '컬럼',
      form: '폼',
      card: '카드',
      navbar: '내비게이션',
      footer: '푸터',
    };
    return labels[element.type] || element.type;
  };

  const getElementIcon = (type) => {
    const icons = {
      heading: '📝',
      paragraph: '📄',
      button: '🔘',
      image: '🖼️',
      video: '🎥',
      container: '📦',
      section: '📐',
      columns: '⚡',
      form: '📋',
      card: '🎴',
      navbar: '🧭',
      footer: '⬇️',
    };
    return icons[type] || '📌';
  };

  return (
    <div className="w-64 bg-gray-800 text-white p-4 overflow-y-auto h-full border-l border-gray-700">
      <h3 className="text-lg font-bold mb-4 pb-2 border-b border-gray-600">
        📚 레이어
      </h3>

      {elements.length === 0 ? (
        <div className="text-center text-gray-400 py-8">
          <p className="text-sm">레이어가 없습니다</p>
          <p className="text-xs mt-2">컴포넌트를 추가해보세요</p>
        </div>
      ) : (
        <div className="space-y-1">
          {elements.map((element, index) => (
            <div
              key={element.id}
              className={`
                group flex items-center justify-between p-3 rounded-lg cursor-pointer
                transition-all duration-200
                ${selectedElement === element.id
                  ? 'bg-blue-600 ring-2 ring-blue-400'
                  : 'bg-gray-700 hover:bg-gray-600'
                }
                ${hiddenElements.has(element.id) ? 'opacity-50' : ''}
              `}
              onClick={() => setSelectedElement(element.id)}
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="text-lg flex-shrink-0">{getElementIcon(element.type)}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {getElementLabel(element)}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    #{index + 1}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleVisibility(element.id);
                  }}
                  className="p-1 hover:bg-gray-800 rounded transition-colors"
                  title={hiddenElements.has(element.id) ? '표시' : '숨기기'}
                >
                  {hiddenElements.has(element.id) ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    duplicateElement(element.id);
                  }}
                  className="p-1 hover:bg-gray-800 rounded transition-colors"
                  title="복제"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm('이 요소를 삭제하시겠습니까?')) {
                      deleteElement(element.id);
                    }
                  }}
                  className="p-1 hover:bg-red-600 rounded transition-colors"
                  title="삭제"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-gray-600">
        <p className="text-xs text-gray-400 mb-2">총 {elements.length}개 레이어</p>
        <div className="text-xs text-gray-500 space-y-1">
          <p>• 클릭하여 선택</p>
          <p>• 드래그하여 순서 변경</p>
          <p>• 아이콘으로 빠른 작업</p>
        </div>
      </div>
    </div>
  );
}
