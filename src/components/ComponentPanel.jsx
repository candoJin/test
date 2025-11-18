import { useDraggable } from '@dnd-kit/core';
import {
  Box, Type, Image, Video, Layout, FileText,
  Square, Columns, FormInput, CreditCard, Menu, ChevronDown,
  Star, DollarSign, Users, MessageSquare, Grid3x3, Layers,
  Code, Award, BarChart, Calendar, Zap
} from 'lucide-react';

const components = [
  {
    category: '레이아웃',
    items: [
      { type: 'container', icon: Box, label: '컨테이너' },
      { type: 'section', icon: Layout, label: '섹션' },
      { type: 'columns', icon: Columns, label: '컬럼 (2단)' },
      { type: 'threeColumns', icon: Grid3x3, label: '컬럼 (3단)' },
      { type: 'hero', icon: Layers, label: 'Hero 섹션' },
    ]
  },
  {
    category: '텍스트',
    items: [
      { type: 'heading', icon: Type, label: '제목' },
      { type: 'paragraph', icon: FileText, label: '본문' },
      { type: 'quote', icon: MessageSquare, label: '인용구' },
    ]
  },
  {
    category: '미디어',
    items: [
      { type: 'image', icon: Image, label: '이미지' },
      { type: 'video', icon: Video, label: '비디오' },
      { type: 'gallery', icon: Grid3x3, label: '갤러리' },
    ]
  },
  {
    category: 'UI 요소',
    items: [
      { type: 'button', icon: Square, label: '버튼' },
      { type: 'form', icon: FormInput, label: '폼' },
      { type: 'card', icon: CreditCard, label: '카드' },
      { type: 'navbar', icon: Menu, label: '내비게이션바' },
      { type: 'footer', icon: ChevronDown, label: '푸터' },
    ]
  },
  {
    category: '고급 컴포넌트',
    items: [
      { type: 'pricing', icon: DollarSign, label: '가격표' },
      { type: 'testimonial', icon: Star, label: '후기' },
      { type: 'team', icon: Users, label: '팀 멤버' },
      { type: 'features', icon: Award, label: '기능 목록' },
      { type: 'stats', icon: BarChart, label: '통계' },
      { type: 'cta', icon: Zap, label: 'CTA 섹션' },
      { type: 'timeline', icon: Calendar, label: '타임라인' },
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
        flex items-center gap-3 p-3 bg-gray-700 rounded-lg cursor-move
        hover:bg-blue-600 transition-all duration-200
        border-2 border-transparent hover:border-blue-400
        transform hover:translate-x-1
        ${isDragging ? 'opacity-50 scale-95' : 'opacity-100'}
      `}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium text-sm">{label}</span>
    </div>
  );
}

export default function ComponentPanel() {
  return (
    <div className="w-64 bg-gray-800 text-white p-4 overflow-y-auto h-full shadow-2xl border-r border-gray-700">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2 pb-2 border-b-2 border-blue-500">
          📦 컴포넌트
        </h2>
        <p className="text-xs text-gray-400">드래그하여 추가</p>
      </div>

      <div className="space-y-6">
        {components.map((category) => (
          <div key={category.category}>
            <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-3 font-semibold flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
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

      <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="text-xs text-gray-500 space-y-1">
          <p className="font-semibold text-gray-400 mb-2">💡 팁</p>
          <p>• 드래그하여 캔버스에 추가</p>
          <p>• 클릭하여 속성 편집</p>
          <p>• 25+ 컴포넌트 사용 가능</p>
        </div>
      </div>
    </div>
  );
}
