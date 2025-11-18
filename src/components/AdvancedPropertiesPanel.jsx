import { useBuilder } from '../context/BuilderContext';
import { X, ChevronDown, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function AdvancedPropertiesPanel() {
  const { elements, selectedElement, setSelectedElement, updateElementProps } = useBuilder();
  const element = elements.find(el => el.id === selectedElement);

  const [localProps, setLocalProps] = useState({});
  const [activeTab, setActiveTab] = useState('content');
  const [expandedSections, setExpandedSections] = useState({
    layout: true,
    spacing: true,
    typography: true,
    colors: true,
    borders: true,
    effects: true,
    responsive: false,
  });

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

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Tailwind CSS 유틸리티 옵션들
  const spacingOptions = ['0', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16', '20', '24', '32', '40', '48', '56', '64'];
  const fontSizes = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'];
  const fontWeights = ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'];
  const textAligns = ['left', 'center', 'right', 'justify'];
  const roundedOptions = ['none', 'sm', '', 'md', 'lg', 'xl', '2xl', '3xl', 'full'];
  const shadowOptions = ['none', 'sm', '', 'md', 'lg', 'xl', '2xl', 'inner'];

  const addTailwindClass = (category, value) => {
    const currentClasses = localProps.className || '';
    const classArray = currentClasses.split(' ').filter(c => c);

    // Remove existing classes in the same category
    const categoryPrefixes = {
      'padding': 'p-',
      'margin': 'm-',
      'fontSize': 'text-',
      'fontWeight': 'font-',
      'textAlign': 'text-',
      'rounded': 'rounded-',
      'shadow': 'shadow-',
      'bg': 'bg-',
      'text': 'text-',
      'border': 'border-',
    };

    const prefix = categoryPrefixes[category];
    if (prefix) {
      const filtered = classArray.filter(c => !c.startsWith(prefix));
      filtered.push(value);
      handlePropChange('className', filtered.join(' '));
    }
  };

  const Section = ({ title, name, children }) => (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => toggleSection(name)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-700">{title}</span>
        {expandedSections[name] ? (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-500" />
        )}
      </button>
      {expandedSections[name] && (
        <div className="p-4 bg-gray-50 space-y-4">
          {children}
        </div>
      )}
    </div>
  );

  const renderContentTab = () => {
    const { type } = element;

    return (
      <div className="space-y-4 p-4">
        {(type === 'heading' || type === 'paragraph') && (
          <div>
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
        )}

        {type === 'button' && (
          <div>
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
        )}

        {type === 'image' && (
          <>
            <div>
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
            <div>
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
          </>
        )}

        {type === 'section' && (
          <>
            <div>
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
            <div>
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
          </>
        )}

        {type === 'card' && (
          <>
            <div>
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
            <div>
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
          </>
        )}
      </div>
    );
  };

  const renderStyleTab = () => {
    return (
      <div>
        <Section title="📐 레이아웃" name="layout">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Display
            </label>
            <select
              onChange={(e) => addTailwindClass('display', e.target.value)}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            >
              <option value="">선택</option>
              <option value="block">Block</option>
              <option value="inline-block">Inline Block</option>
              <option value="inline">Inline</option>
              <option value="flex">Flex</option>
              <option value="inline-flex">Inline Flex</option>
              <option value="grid">Grid</option>
              <option value="inline-grid">Inline Grid</option>
              <option value="hidden">Hidden</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Position
            </label>
            <select
              onChange={(e) => addTailwindClass('position', e.target.value)}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            >
              <option value="">선택</option>
              <option value="static">Static</option>
              <option value="fixed">Fixed</option>
              <option value="absolute">Absolute</option>
              <option value="relative">Relative</option>
              <option value="sticky">Sticky</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Width
            </label>
            <input
              type="text"
              placeholder="예: w-full, w-1/2, w-64"
              onChange={(e) => addTailwindClass('width', e.target.value)}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Height
            </label>
            <input
              type="text"
              placeholder="예: h-full, h-screen, h-64"
              onChange={(e) => addTailwindClass('height', e.target.value)}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            />
          </div>
        </Section>

        <Section title="📏 Spacing" name="spacing">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Padding
              </label>
              <select
                onChange={(e) => addTailwindClass('padding', `p-${e.target.value}`)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              >
                <option value="">선택</option>
                {spacingOptions.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Margin
              </label>
              <select
                onChange={(e) => addTailwindClass('margin', `m-${e.target.value}`)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              >
                <option value="">선택</option>
                {spacingOptions.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Padding X
              </label>
              <select
                onChange={(e) => addTailwindClass('paddingX', `px-${e.target.value}`)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              >
                <option value="">선택</option>
                {spacingOptions.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Padding Y
              </label>
              <select
                onChange={(e) => addTailwindClass('paddingY', `py-${e.target.value}`)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              >
                <option value="">선택</option>
                {spacingOptions.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Margin X
              </label>
              <select
                onChange={(e) => addTailwindClass('marginX', `mx-${e.target.value}`)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              >
                <option value="">선택</option>
                {spacingOptions.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Margin Y
              </label>
              <select
                onChange={(e) => addTailwindClass('marginY', `my-${e.target.value}`)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              >
                <option value="">선택</option>
                {spacingOptions.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
          </div>
        </Section>

        <Section title="✍️ Typography" name="typography">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Font Size
            </label>
            <select
              onChange={(e) => addTailwindClass('fontSize', `text-${e.target.value}`)}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            >
              <option value="">선택</option>
              {fontSizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Font Weight
            </label>
            <select
              onChange={(e) => addTailwindClass('fontWeight', `font-${e.target.value}`)}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            >
              <option value="">선택</option>
              {fontWeights.map(weight => (
                <option key={weight} value={weight}>{weight}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Text Align
            </label>
            <div className="grid grid-cols-4 gap-2">
              {textAligns.map(align => (
                <button
                  key={align}
                  onClick={() => addTailwindClass('textAlign', `text-${align}`)}
                  className="px-3 py-2 bg-white border-2 border-gray-300 rounded-lg hover:border-blue-500 transition"
                >
                  {align}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Line Height
            </label>
            <select
              onChange={(e) => addTailwindClass('lineHeight', e.target.value)}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            >
              <option value="">선택</option>
              <option value="leading-none">None</option>
              <option value="leading-tight">Tight</option>
              <option value="leading-snug">Snug</option>
              <option value="leading-normal">Normal</option>
              <option value="leading-relaxed">Relaxed</option>
              <option value="leading-loose">Loose</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Letter Spacing
            </label>
            <select
              onChange={(e) => addTailwindClass('letterSpacing', e.target.value)}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            >
              <option value="">선택</option>
              <option value="tracking-tighter">Tighter</option>
              <option value="tracking-tight">Tight</option>
              <option value="tracking-normal">Normal</option>
              <option value="tracking-wide">Wide</option>
              <option value="tracking-wider">Wider</option>
              <option value="tracking-widest">Widest</option>
            </select>
          </div>
        </Section>

        <Section title="🎨 Colors" name="colors">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Background Color
            </label>
            <input
              type="text"
              placeholder="예: bg-blue-500, bg-gradient-to-r from-purple-500 to-pink-500"
              onChange={(e) => handlePropChange('className', (localProps.className || '').replace(/bg-\S+/g, '') + ' ' + e.target.value)}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Text Color
            </label>
            <input
              type="text"
              placeholder="예: text-gray-800, text-white"
              onChange={(e) => {
                const current = localProps.className || '';
                const without = current.split(' ').filter(c => !c.startsWith('text-') || c.includes('text-xs') || c.includes('text-sm') || c.includes('text-lg')).join(' ');
                handlePropChange('className', without + ' ' + e.target.value);
              }}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-5 gap-2">
            {['red', 'blue', 'green', 'yellow', 'purple', 'pink', 'indigo', 'gray', 'black', 'white'].map(color => (
              <button
                key={color}
                onClick={() => {
                  const current = localProps.className || '';
                  const without = current.split(' ').filter(c => !c.startsWith('bg-')).join(' ');
                  handlePropChange('className', without + ` bg-${color}-500`);
                }}
                className={`h-10 rounded border-2 border-gray-300 hover:border-gray-600 ${color === 'white' ? 'bg-white' : color === 'black' ? 'bg-black' : `bg-${color}-500`}`}
                title={color}
              ></button>
            ))}
          </div>
        </Section>

        <Section title="🔲 Borders & Radius" name="borders">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Border Width
            </label>
            <select
              onChange={(e) => addTailwindClass('border', e.target.value)}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            >
              <option value="">선택</option>
              <option value="border">1px</option>
              <option value="border-2">2px</option>
              <option value="border-4">4px</option>
              <option value="border-8">8px</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Border Color
            </label>
            <input
              type="text"
              placeholder="예: border-gray-300"
              onChange={(e) => addTailwindClass('borderColor', e.target.value)}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Border Radius
            </label>
            <div className="grid grid-cols-4 gap-2">
              {roundedOptions.map(size => (
                <button
                  key={size}
                  onClick={() => addTailwindClass('rounded', `rounded-${size}`)}
                  className="px-3 py-2 bg-white border-2 border-gray-300 rounded-lg hover:border-blue-500 transition text-sm"
                >
                  {size || 'default'}
                </button>
              ))}
            </div>
          </div>
        </Section>

        <Section title="✨ Effects" name="effects">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Shadow
            </label>
            <div className="grid grid-cols-4 gap-2">
              {shadowOptions.map(size => (
                <button
                  key={size}
                  onClick={() => addTailwindClass('shadow', size === '' ? 'shadow' : `shadow-${size}`)}
                  className="px-3 py-2 bg-white border-2 border-gray-300 rounded-lg hover:border-blue-500 transition text-sm"
                >
                  {size || 'default'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Opacity
            </label>
            <select
              onChange={(e) => addTailwindClass('opacity', e.target.value)}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            >
              <option value="">선택</option>
              {[0, 5, 10, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90, 95, 100].map(val => (
                <option key={val} value={`opacity-${val}`}>{val}%</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Transition
            </label>
            <select
              onChange={(e) => addTailwindClass('transition', e.target.value)}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            >
              <option value="">선택</option>
              <option value="transition-none">None</option>
              <option value="transition-all">All</option>
              <option value="transition-colors">Colors</option>
              <option value="transition-opacity">Opacity</option>
              <option value="transition-shadow">Shadow</option>
              <option value="transition-transform">Transform</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration
            </label>
            <select
              onChange={(e) => addTailwindClass('duration', e.target.value)}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            >
              <option value="">선택</option>
              <option value="duration-75">75ms</option>
              <option value="duration-100">100ms</option>
              <option value="duration-150">150ms</option>
              <option value="duration-200">200ms</option>
              <option value="duration-300">300ms</option>
              <option value="duration-500">500ms</option>
              <option value="duration-700">700ms</option>
              <option value="duration-1000">1000ms</option>
            </select>
          </div>
        </Section>

        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tailwind CSS Classes (모든 클래스)
            </label>
            <textarea
              value={localProps.className || ''}
              onChange={(e) => handlePropChange('className', e.target.value)}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition resize-none font-mono text-sm"
              rows="4"
              placeholder="hover:bg-blue-600 active:scale-95 sm:text-lg md:text-xl"
            />
            <p className="text-xs text-gray-500 mt-1">
              호버, 포커스, 반응형(sm:, md:, lg:) 등 모든 Tailwind 클래스 사용 가능
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              인라인 스타일 (CSS)
            </label>
            <textarea
              value={localProps.style || ''}
              onChange={(e) => handlePropChange('style', e.target.value)}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition resize-none font-mono text-sm"
              rows="3"
              placeholder="color: red; margin: 10px;"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed right-0 top-0 w-[450px] h-full bg-white shadow-2xl z-50 border-l-4 border-blue-500 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex justify-between items-center sticky top-0 z-10">
        <div>
          <h3 className="text-lg font-bold">⚙️ 고급 속성 편집</h3>
          <p className="text-xs text-blue-100">타입: {element.type}</p>
        </div>
        <button
          onClick={() => setSelectedElement(null)}
          className="p-2 hover:bg-white/20 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-white sticky top-[72px] z-10">
        <button
          onClick={() => setActiveTab('content')}
          className={`flex-1 py-3 px-4 font-semibold transition-colors ${
            activeTab === 'content'
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          📝 내용
        </button>
        <button
          onClick={() => setActiveTab('style')}
          className={`flex-1 py-3 px-4 font-semibold transition-colors ${
            activeTab === 'style'
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          🎨 스타일
        </button>
      </div>

      {/* Content */}
      <div className="pb-20">
        {activeTab === 'content' ? renderContentTab() : renderStyleTab()}
      </div>
    </div>
  );
}
