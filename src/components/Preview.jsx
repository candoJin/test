import { useBuilder } from '../context/BuilderContext';
import { Monitor, Tablet, Smartphone } from 'lucide-react';
import ElementRenderer from './ElementRenderer';

export default function Preview() {
  const { elements, previewMode, setPreviewMode } = useBuilder();

  const previewSizes = {
    desktop: 'w-full',
    tablet: 'w-[768px]',
    mobile: 'w-[375px]',
  };

  return (
    <div className="flex-1 bg-white flex flex-col h-full overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="bg-gray-800 text-white p-4 flex justify-between items-center border-b-2 border-gray-700">
        <h2 className="text-xl font-bold">👁️ 실시간 미리보기</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setPreviewMode('desktop')}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200
              ${previewMode === 'desktop'
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}
            `}
            title="데스크톱"
          >
            <Monitor className="w-4 h-4" />
            데스크톱
          </button>
          <button
            onClick={() => setPreviewMode('tablet')}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200
              ${previewMode === 'tablet'
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}
            `}
            title="태블릿"
          >
            <Tablet className="w-4 h-4" />
            태블릿
          </button>
          <button
            onClick={() => setPreviewMode('mobile')}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200
              ${previewMode === 'mobile'
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}
            `}
            title="모바일"
          >
            <Smartphone className="w-4 h-4" />
            모바일
          </button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 p-6 overflow-auto bg-gray-50">
        <div className="flex justify-center">
          <div
            className={`
              ${previewSizes[previewMode]}
              bg-white rounded-lg shadow-2xl overflow-hidden
              transition-all duration-300 ease-in-out
            `}
          >
            {elements.length === 0 ? (
              <div className="p-20 text-center text-gray-400">
                <div className="text-5xl mb-4">👀</div>
                <p className="text-lg">여기에 실시간 미리보기가</p>
                <p className="text-lg">표시됩니다</p>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                {elements.map((element) => (
                  <div key={element.id}>
                    <ElementRenderer element={element} isEditable={false} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
