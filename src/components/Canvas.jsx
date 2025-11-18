import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useBuilder } from '../context/BuilderContext';
import SortableElement from './SortableElement';
import { Save, Download, Trash2 } from 'lucide-react';

export default function Canvas() {
  const { elements, clearAll, exportHTML, isDragging } = useBuilder();
  const { setNodeRef } = useDroppable({ id: 'canvas' });

  return (
    <div className="flex-1 bg-gray-100 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="bg-white shadow-md p-4 flex justify-between items-center border-b-2 border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">✨ 웹사이트 빌더</h1>
        <div className="flex gap-3">
          <button
            onClick={clearAll}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 font-semibold shadow-md hover:shadow-lg"
          >
            <Trash2 className="w-4 h-4" />
            초기화
          </button>
          <button
            onClick={() => {
              localStorage.setItem('website-builder-project', JSON.stringify({ elements }));
              alert('프로젝트가 저장되었습니다!');
            }}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 font-semibold shadow-md hover:shadow-lg"
          >
            <Save className="w-4 h-4" />
            저장
          </button>
          <button
            onClick={exportHTML}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-semibold shadow-md hover:shadow-lg"
          >
            <Download className="w-4 h-4" />
            코드 내보내기
          </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div
          ref={setNodeRef}
          className={`
            min-h-[600px] bg-white rounded-lg shadow-lg p-6
            ${isDragging ? 'border-4 border-dashed border-green-400 bg-green-50' : 'border-2 border-gray-200'}
            transition-all duration-200
          `}
        >
          {elements.length === 0 ? (
            <div className="flex items-center justify-center h-full min-h-[400px]">
              <div className="text-center text-gray-400">
                <div className="text-6xl mb-4">👈</div>
                <p className="text-xl">왼쪽에서 컴포넌트를 드래그하여</p>
                <p className="text-xl">여기에 놓으세요</p>
              </div>
            </div>
          ) : (
            <SortableContext
              items={elements.map(el => el.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-4">
                {elements.map((element) => (
                  <SortableElement key={element.id} element={element} />
                ))}
              </div>
            </SortableContext>
          )}
        </div>
      </div>
    </div>
  );
}
