import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useBuilder } from '../context/BuilderContext';
import { Edit2, Trash2, GripVertical } from 'lucide-react';
import ElementRenderer from './ElementRenderer';

export default function SortableElement({ element }) {
  const { selectedElement, setSelectedElement, deleteElement } = useBuilder();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: element.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isSelected = selectedElement === element.id;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        relative group
        ${isDragging ? 'opacity-50 z-50' : 'opacity-100'}
        ${isSelected ? 'ring-4 ring-green-400 ring-offset-2' : 'ring-2 ring-transparent'}
        hover:ring-2 hover:ring-blue-300
        rounded-lg transition-all duration-200
      `}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement(element.id);
      }}
    >
      {/* Drag Handle and Controls */}
      <div className="absolute -top-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
        <button
          {...attributes}
          {...listeners}
          className="p-2 bg-gray-700 text-white rounded-full hover:bg-gray-800 transition-colors shadow-lg cursor-grab active:cursor-grabbing"
          title="드래그하여 이동"
        >
          <GripVertical className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedElement(element.id);
          }}
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors shadow-lg"
          title="편집"
        >
          <Edit2 className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (window.confirm('이 요소를 삭제하시겠습니까?')) {
              deleteElement(element.id);
            }
          }}
          className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
          title="삭제"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Element Content */}
      <div className="p-4">
        <ElementRenderer element={element} isEditable={true} />
      </div>
    </div>
  );
}
