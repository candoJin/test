import { useDraggable } from '@dnd-kit/core';
import {
  Box, Type, Image, Video, Layout, FileText,
  Square, Columns, FormInput, CreditCard, Menu, ChevronDown
} from 'lucide-react';

const components = [
  {
    category: '레이아웃',
    items: [
      { type: 'container', icon: Box, label: '컨테이너' },
      { type: 'section', icon: Layout, label: '섹션' },
      { type: 'columns', icon: Columns, label: '컬럼 (2단)' },
    ]
  },
  {
    category: '텍스트',
    items: [
      { type: 'heading', icon: Type, label: '제목' },
      { type: 'paragraph', icon: FileText, label: '본문' },
    ]
  },
  {
    category: '미디어',
    items: [
      { type: 'image', icon: Image, label: '이미지' },
      { type: 'video', icon: Video, label: '비디오' },
    ]
  },
  {
    category: '요소',
    items: [
      { type: 'button', icon: Square, label: '버튼' },
      { type: 'form', icon: FormInput, label: '폼' },
      { type: 'card', icon: CreditCard, label: '카드' },
      { type: 'navbar', icon: Menu, label: '내비게이션바' },
      { type: 'footer', icon: ChevronDown, label: '푸터' },
    ]
  },
];

function DraggableComponent({ type, icon: Icon, label }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `draggable-${type}`,
    data: { type },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`
        flex items-center gap-3 p-4 bg-gray-700 rounded-lg cursor-move
        hover:bg-blue-600 transition-all duration-200
        border-2 border-transparent hover:border-blue-400
        transform hover:translate-x-1
        ${isDragging ? 'opacity-50' : 'opacity-100'}
      `}
    >
      <Icon className="w-6 h-6" />
      <span className="font-medium">{label}</span>
    </div>
  );
}

export default function ComponentPanel() {
  return (
    <div className="w-64 bg-gray-800 text-white p-6 overflow-y-auto h-full shadow-2xl">
      <h2 className="text-2xl font-bold mb-6 pb-3 border-b-2 border-blue-500">
        📦 컴포넌트
      </h2>

      <div className="space-y-6">
        {components.map((category) => (
          <div key={category.category}>
            <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-3 font-semibold">
              {category.category}
            </h3>
            <div className="space-y-2">
              {category.items.map((item) => (
                <DraggableComponent
                  key={item.type}
                  type={item.type}
                  icon={item.icon}
                  label={item.label}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
