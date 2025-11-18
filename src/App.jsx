import { DndContext, DragOverlay, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { BuilderProvider, useBuilder } from './context/BuilderContext';
import ComponentPanel from './components/ComponentPanel';
import Canvas from './components/Canvas';
import Preview from './components/Preview';
import PropertiesPanel from './components/PropertiesPanel';

function BuilderContent() {
  const { elements, addElement, setElements, setIsDragging, selectedElement } = useBuilder();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (event) => {
    setIsDragging(false);
    const { active, over } = event;

    if (!over) return;

    // Dragging from component panel to canvas
    if (active.id.toString().startsWith('draggable-') && over.id === 'canvas') {
      const type = active.data.current.type;
      addElement(type);
      return;
    }

    // Sorting elements in canvas
    if (!active.id.toString().startsWith('draggable-') && !over.id.toString().startsWith('draggable-')) {
      const oldIndex = elements.findIndex(el => el.id === active.id);
      const newIndex = elements.findIndex(el => el.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
        setElements(arrayMove(elements, oldIndex, newIndex));
      }
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex h-screen overflow-hidden">
        <ComponentPanel />
        <Canvas />
        <Preview />
        {selectedElement && <PropertiesPanel />}
      </div>
      <DragOverlay>
        {/* Optional: Add a preview of the dragged item */}
      </DragOverlay>
    </DndContext>
  );
}

function App() {
  return (
    <BuilderProvider>
      <BuilderContent />
    </BuilderProvider>
  );
}

export default App;
