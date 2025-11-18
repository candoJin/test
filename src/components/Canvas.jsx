import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useBuilder } from '../context/BuilderContext';
import SortableElement from './SortableElement';
import { Save, Download, Trash2, Undo, Redo, Copy, Clipboard, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { useEffect } from 'react';

export default function Canvas() {
  const {
    elements,
    clearAll,
    exportHTML,
    exportReact,
    isDragging,
    undo,
    redo,
    canUndo,
    canRedo,
    selectedElement,
    copyElement,
    pasteElement,
    clipboard,
    deleteElement,
    duplicateElement,
    alignElement,
    loadTemplate
  } = useBuilder();

  const { setNodeRef } = useDroppable({ id: 'canvas' });

  // 키보드 단축키
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl/Cmd + Z: 실행 취소
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      }

      // Ctrl/Cmd + Shift + Z 또는 Ctrl/Cmd + Y: 다시 실행
      if ((e.ctrlKey || e.metaKey) && (e.shiftKey && e.key === 'z' || e.key === 'y')) {
        e.preventDefault();
        redo();
      }

      // Ctrl/Cmd + C: 복사
      if ((e.ctrlKey || e.metaKey) && e.key === 'c' && selectedElement) {
        e.preventDefault();
        copyElement(selectedElement);
      }

      // Ctrl/Cmd + V: 붙여넣기
      if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
        e.preventDefault();
        pasteElement();
      }

      // Ctrl/Cmd + D: 복제
      if ((e.ctrlKey || e.metaKey) && e.key === 'd' && selectedElement) {
        e.preventDefault();
        duplicateElement(selectedElement);
      }

      // Delete 또는 Backspace: 삭제
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedElement) {
        const target = e.target;
        // contentEditable 요소에서는 삭제 방지
        if (target.isContentEditable || target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
          return;
        }
        e.preventDefault();
        if (window.confirm('선택한 요소를 삭제하시겠습니까?')) {
          deleteElement(selectedElement);
        }
      }

      // Ctrl/Cmd + S: 저장
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        localStorage.setItem('website-builder-project', JSON.stringify({ elements }));
        showNotification('프로젝트가 저장되었습니다!');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, selectedElement, copyElement, pasteElement, duplicateElement, deleteElement, elements]);

  const showNotification = (message) => {
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2000);
  };

  return (
    <div className="flex-1 bg-gray-100 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="bg-white shadow-md p-4 flex justify-between items-center border-b-2 border-gray-200">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">✨ 웹사이트 빌더</h1>
            <p className="text-xs text-gray-500 mt-1">전문가급 비주얼 에디터</p>
          </div>
          <div>
            <select
              onChange={(e) => {
                if (e.target.value && window.confirm('현재 작업이 사라집니다. 템플릿을 불러오시겠습니까?')) {
                  loadTemplate(e.target.value);
                }
                e.target.value = '';
              }}
              className="px-4 py-2 border-2 border-blue-500 rounded-lg focus:outline-none focus:border-purple-500 bg-gradient-to-r from-blue-50 to-purple-50 font-semibold text-sm"
            >
              <option value="">📋 템플릿 선택</option>
              <option value="landing">🚀 랜딩 페이지</option>
              <option value="portfolio">💼 포트폴리오</option>
              <option value="pricing">💰 가격 안내</option>
              <option value="blog">📝 블로그</option>
            </select>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={undo}
            disabled={!canUndo}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 font-semibold shadow-md ${
              canUndo
                ? 'bg-gray-600 text-white hover:bg-gray-700 hover:shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            title="실행 취소 (Ctrl+Z)"
          >
            <Undo className="w-4 h-4" />
            <span className="hidden lg:inline">실행 취소</span>
          </button>
          <button
            onClick={redo}
            disabled={!canRedo}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 font-semibold shadow-md ${
              canRedo
                ? 'bg-gray-600 text-white hover:bg-gray-700 hover:shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            title="다시 실행 (Ctrl+Shift+Z)"
          >
            <Redo className="w-4 h-4" />
            <span className="hidden lg:inline">다시 실행</span>
          </button>

          <div className="w-px bg-gray-300 mx-2"></div>

          {selectedElement && (
            <>
              <button
                onClick={() => alignElement(selectedElement, 'left')}
                className="flex items-center gap-2 px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 font-semibold shadow-md hover:shadow-lg"
                title="왼쪽 정렬"
              >
                <AlignLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => alignElement(selectedElement, 'center')}
                className="flex items-center gap-2 px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 font-semibold shadow-md hover:shadow-lg"
                title="가운데 정렬"
              >
                <AlignCenter className="w-4 h-4" />
              </button>
              <button
                onClick={() => alignElement(selectedElement, 'right')}
                className="flex items-center gap-2 px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 font-semibold shadow-md hover:shadow-lg"
                title="오른쪽 정렬"
              >
                <AlignRight className="w-4 h-4" />
              </button>

              <div className="w-px bg-gray-300 mx-2"></div>

              <button
                onClick={() => copyElement(selectedElement)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-200 font-semibold shadow-md hover:shadow-lg"
                title="복사 (Ctrl+C)"
              >
                <Copy className="w-4 h-4" />
                <span className="hidden lg:inline">복사</span>
              </button>
              <button
                onClick={() => duplicateElement(selectedElement)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-200 font-semibold shadow-md hover:shadow-lg"
                title="복제 (Ctrl+D)"
              >
                <Copy className="w-4 h-4" />
                <span className="hidden lg:inline">복제</span>
              </button>
            </>
          )}

          {clipboard && (
            <button
              onClick={pasteElement}
              className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors duration-200 font-semibold shadow-md hover:shadow-lg"
              title="붙여넣기 (Ctrl+V)"
            >
              <Clipboard className="w-4 h-4" />
              <span className="hidden lg:inline">붙여넣기</span>
            </button>
          )}

          <div className="w-px bg-gray-300 mx-2"></div>

          <button
            onClick={clearAll}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 font-semibold shadow-md hover:shadow-lg"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden lg:inline">초기화</span>
          </button>
          <button
            onClick={() => {
              localStorage.setItem('website-builder-project', JSON.stringify({ elements }));
              showNotification('프로젝트가 저장되었습니다!');
            }}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 font-semibold shadow-md hover:shadow-lg"
            title="저장 (Ctrl+S)"
          >
            <Save className="w-4 h-4" />
            <span className="hidden lg:inline">저장</span>
          </button>
          <button
            onClick={exportHTML}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-semibold shadow-md hover:shadow-lg"
            title="HTML로 내보내기"
          >
            <Download className="w-4 h-4" />
            <span className="hidden lg:inline">HTML</span>
          </button>
          <button
            onClick={exportReact}
            className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-200 font-semibold shadow-md hover:shadow-lg"
            title="React 컴포넌트로 내보내기"
          >
            <Download className="w-4 h-4" />
            <span className="hidden lg:inline">React</span>
          </button>
        </div>
      </div>

      {/* 단축키 안내 */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 text-xs text-gray-600 flex items-center justify-center gap-6 border-b border-gray-200">
        <span><kbd className="px-2 py-1 bg-white rounded border border-gray-300 shadow-sm">Ctrl+Z</kbd> 실행 취소</span>
        <span><kbd className="px-2 py-1 bg-white rounded border border-gray-300 shadow-sm">Ctrl+Shift+Z</kbd> 다시 실행</span>
        <span><kbd className="px-2 py-1 bg-white rounded border border-gray-300 shadow-sm">Ctrl+C</kbd> 복사</span>
        <span><kbd className="px-2 py-1 bg-white rounded border border-gray-300 shadow-sm">Ctrl+V</kbd> 붙여넣기</span>
        <span><kbd className="px-2 py-1 bg-white rounded border border-gray-300 shadow-sm">Ctrl+D</kbd> 복제</span>
        <span><kbd className="px-2 py-1 bg-white rounded border border-gray-300 shadow-sm">Del</kbd> 삭제</span>
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
                <p className="text-xl font-semibold">왼쪽에서 컴포넌트를 드래그하여</p>
                <p className="text-xl">여기에 놓으세요</p>
                <p className="text-sm mt-4 text-gray-500">또는 키보드 단축키를 사용하세요</p>
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
