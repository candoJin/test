import { useBuilder } from '../context/BuilderContext';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function PropertiesPanel() {
  const { elements, selectedElement, setSelectedElement, updateElementProps } = useBuilder();
  const element = elements.find(el => el.id === selectedElement);

  const [localProps, setLocalProps] = useState({});

  useEffect(() => {
    if (element) {
      setLocalProps(element.props);
    }
  }, [element]);

  if (!selectedElement || !element) {
    return null;
  }

  const handlePropChange = (propName, value) => {
    setLocalProps(prev => ({ ...prev, [propName]: value }));
    updateElementProps(selectedElement, { [propName]: value });
  };

  const renderPropertyFields = () => {
    const { type } = element;

    const commonFields = (
      <>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            CSS 클래스
          </label>
          <input
            type="text"
            value={localProps.className || ''}
            onChange={(e) => handlePropChange('className', e.target.value)}
            className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition"
            placeholder="예: text-center p-4"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            인라인 스타일
          </label>
          <textarea
            value={localProps.style || ''}
            onChange={(e) => handlePropChange('style', e.target.value)}
            className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition resize-none"
            rows="3"
            placeholder="예: color: red; margin: 10px;"
          />
        </div>
      </>
    );

    switch (type) {
      case 'heading':
      case 'paragraph':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                텍스트 내용
              </label>
              <textarea
                value={localProps.text || ''}
                onChange={(e) => handlePropChange('text', e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition resize-none"
                rows="4"
              />
            </div>
            {commonFields}
          </>
        );

      case 'button':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                버튼 텍스트
              </label>
              <input
                type="text"
                value={localProps.text || ''}
                onChange={(e) => handlePropChange('text', e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition"
              />
            </div>
            {commonFields}
          </>
        );

      case 'image':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                이미지 URL
              </label>
              <input
                type="text"
                value={localProps.src || ''}
                onChange={(e) => handlePropChange('src', e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                대체 텍스트 (Alt)
              </label>
              <input
                type="text"
                value={localProps.alt || ''}
                onChange={(e) => handlePropChange('alt', e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition"
              />
            </div>
            {commonFields}
          </>
        );

      case 'video':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                비디오 URL
              </label>
              <input
                type="text"
                value={localProps.src || ''}
                onChange={(e) => handlePropChange('src', e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition"
                placeholder="https://example.com/video.mp4"
              />
            </div>
            {commonFields}
          </>
        );

      case 'section':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                섹션 제목
              </label>
              <input
                type="text"
                value={localProps.title || ''}
                onChange={(e) => handlePropChange('title', e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                섹션 내용
              </label>
              <textarea
                value={localProps.content || ''}
                onChange={(e) => handlePropChange('content', e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition resize-none"
                rows="4"
              />
            </div>
            {commonFields}
          </>
        );

      case 'card':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                카드 제목
              </label>
              <input
                type="text"
                value={localProps.title || ''}
                onChange={(e) => handlePropChange('title', e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                카드 내용
              </label>
              <textarea
                value={localProps.content || ''}
                onChange={(e) => handlePropChange('content', e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition resize-none"
                rows="4"
              />
            </div>
            {commonFields}
          </>
        );

      case 'navbar':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                로고 텍스트
              </label>
              <input
                type="text"
                value={localProps.logo || ''}
                onChange={(e) => handlePropChange('logo', e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition"
              />
            </div>
            {commonFields}
          </>
        );

      case 'footer':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                회사명
              </label>
              <input
                type="text"
                value={localProps.company || ''}
                onChange={(e) => handlePropChange('company', e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                주소 정보
              </label>
              <textarea
                value={localProps.address || ''}
                onChange={(e) => handlePropChange('address', e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition resize-none"
                rows="3"
              />
            </div>
            {commonFields}
          </>
        );

      default:
        return commonFields;
    }
  };

  return (
    <div className="fixed right-0 top-0 w-96 h-full bg-white shadow-2xl z-50 border-l-4 border-blue-500 overflow-y-auto">
      {/* Header */}
      <div className="bg-gray-800 text-white p-4 flex justify-between items-center sticky top-0 z-10">
        <h3 className="text-lg font-bold">⚙️ 속성 편집</h3>
        <button
          onClick={() => setSelectedElement(null)}
          className="p-2 hover:bg-gray-700 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
          <p className="text-sm font-semibold text-gray-700">
            편집 중인 요소: <span className="text-blue-600">{element.type}</span>
          </p>
        </div>

        {renderPropertyFields()}
      </div>
    </div>
  );
}
