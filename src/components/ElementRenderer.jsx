import { useBuilder } from '../context/BuilderContext';

export default function ElementRenderer({ element, isEditable = false }) {
  const { updateElementProps } = useBuilder();
  const { type, props } = element;

  const handleTextEdit = (e, propName) => {
    if (isEditable) {
      updateElementProps(element.id, { [propName]: e.target.innerText });
    }
  };

  const renderElement = () => {
    switch (type) {
      case 'heading':
        return (
          <h1
            className={props.className}
            style={props.style}
            contentEditable={isEditable}
            suppressContentEditableWarning
            onBlur={(e) => handleTextEdit(e, 'text')}
          >
            {props.text}
          </h1>
        );

      case 'paragraph':
        return (
          <p
            className={props.className}
            style={props.style}
            contentEditable={isEditable}
            suppressContentEditableWarning
            onBlur={(e) => handleTextEdit(e, 'text')}
          >
            {props.text}
          </p>
        );

      case 'button':
        return (
          <button
            className={props.className}
            style={props.style}
            contentEditable={isEditable}
            suppressContentEditableWarning
            onBlur={(e) => handleTextEdit(e, 'text')}
          >
            {props.text}
          </button>
        );

      case 'image':
        return (
          <img
            src={props.src}
            alt={props.alt}
            className={props.className}
            style={props.style}
          />
        );

      case 'video':
        return (
          <div className={props.className} style={props.style}>
            {props.src ? (
              <video controls className="w-full rounded-lg">
                <source src={props.src} type="video/mp4" />
                비디오를 지원하지 않는 브라우저입니다.
              </video>
            ) : (
              <div className="bg-gray-700 text-white p-20 text-center rounded-lg">
                <div className="text-4xl mb-2">🎥</div>
                <div>비디오 플레이어</div>
                <div className="text-sm text-gray-300 mt-2">비디오 URL을 설정하세요</div>
              </div>
            )}
          </div>
        );

      case 'container':
        return (
          <div className={props.className} style={props.style}>
            <div
              contentEditable={isEditable}
              suppressContentEditableWarning
              onBlur={(e) => handleTextEdit(e, 'content')}
            >
              {props.content || '컨테이너 영역 - 내용을 편집하세요'}
            </div>
          </div>
        );

      case 'section':
        return (
          <section className={props.className} style={props.style}>
            <h2
              className="text-3xl font-bold mb-4"
              contentEditable={isEditable}
              suppressContentEditableWarning
              onBlur={(e) => handleTextEdit(e, 'title')}
            >
              {props.title}
            </h2>
            <p
              contentEditable={isEditable}
              suppressContentEditableWarning
              onBlur={(e) => handleTextEdit(e, 'content')}
            >
              {props.content}
            </p>
          </section>
        );

      case 'columns':
        return (
          <div className={props.className} style={props.style}>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-gray-100 rounded-lg">
                <div
                  contentEditable={isEditable}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    if (isEditable) {
                      updateElementProps(element.id, {
                        column1: e.target.innerText
                      });
                    }
                  }}
                >
                  {props.column1 || '컬럼 1 - 내용을 편집하세요'}
                </div>
              </div>
              <div className="p-6 bg-gray-100 rounded-lg">
                <div
                  contentEditable={isEditable}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    if (isEditable) {
                      updateElementProps(element.id, {
                        column2: e.target.innerText
                      });
                    }
                  }}
                >
                  {props.column2 || '컬럼 2 - 내용을 편집하세요'}
                </div>
              </div>
            </div>
          </div>
        );

      case 'form':
        return (
          <form className={props.className} style={props.style} onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="이름"
              className="w-full p-3 mb-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            />
            <input
              type="email"
              placeholder="이메일"
              className="w-full p-3 mb-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            />
            <textarea
              placeholder="메시지"
              rows="4"
              className="w-full p-3 mb-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition duration-200"
            >
              제출
            </button>
          </form>
        );

      case 'card':
        return (
          <div className={props.className} style={props.style}>
            <div className="bg-white rounded-xl shadow-xl p-8 max-w-sm">
              <h3
                className="text-2xl font-bold text-gray-800 mb-4"
                contentEditable={isEditable}
                suppressContentEditableWarning
                onBlur={(e) => handleTextEdit(e, 'title')}
              >
                {props.title}
              </h3>
              <p
                className="text-gray-600 leading-relaxed mb-6"
                contentEditable={isEditable}
                suppressContentEditableWarning
                onBlur={(e) => handleTextEdit(e, 'content')}
              >
                {props.content}
              </p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition duration-200">
                자세히 보기
              </button>
            </div>
          </div>
        );

      case 'navbar':
        return (
          <nav className={props.className} style={props.style}>
            <div className="bg-gray-800 text-white p-4 rounded-lg flex justify-between items-center">
              <div
                className="text-2xl font-bold"
                contentEditable={isEditable}
                suppressContentEditableWarning
                onBlur={(e) => handleTextEdit(e, 'logo')}
              >
                {props.logo}
              </div>
              <div className="flex gap-6">
                <a href="#" className="hover:text-blue-400 transition">홈</a>
                <a href="#" className="hover:text-blue-400 transition">소개</a>
                <a href="#" className="hover:text-blue-400 transition">서비스</a>
                <a href="#" className="hover:text-blue-400 transition">연락처</a>
              </div>
            </div>
          </nav>
        );

      case 'footer':
        return (
          <footer className={props.className} style={props.style}>
            <div className="bg-gray-800 text-white p-12 rounded-lg text-center">
              <p
                className="text-xl font-semibold mb-4"
                contentEditable={isEditable}
                suppressContentEditableWarning
                onBlur={(e) => handleTextEdit(e, 'company')}
              >
                {props.company}
              </p>
              <p
                className="text-gray-400 mb-6"
                contentEditable={isEditable}
                suppressContentEditableWarning
                onBlur={(e) => handleTextEdit(e, 'address')}
              >
                {props.address}
              </p>
              <p className="text-gray-500 text-sm">
                &copy; 2024 All rights reserved.
              </p>
            </div>
          </footer>
        );

      case 'threeColumns':
        return (
          <div className={props.className} style={props.style}>
            <div className="grid grid-cols-3 gap-6">
              <div className="p-6 bg-gray-100 rounded-lg">
                <div contentEditable={isEditable} suppressContentEditableWarning onBlur={(e) => { if (isEditable) updateElementProps(element.id, { column1: e.target.innerText }); }}>
                  {props.column1 || '컬럼 1'}
                </div>
              </div>
              <div className="p-6 bg-gray-100 rounded-lg">
                <div contentEditable={isEditable} suppressContentEditableWarning onBlur={(e) => { if (isEditable) updateElementProps(element.id, { column2: e.target.innerText }); }}>
                  {props.column2 || '컬럼 2'}
                </div>
              </div>
              <div className="p-6 bg-gray-100 rounded-lg">
                <div contentEditable={isEditable} suppressContentEditableWarning onBlur={(e) => { if (isEditable) updateElementProps(element.id, { column3: e.target.innerText }); }}>
                  {props.column3 || '컬럼 3'}
                </div>
              </div>
            </div>
          </div>
        );

      case 'hero':
        return (
          <div className={props.className} style={props.style}>
            <h1 className="text-5xl font-bold mb-4" contentEditable={isEditable} suppressContentEditableWarning onBlur={(e) => handleTextEdit(e, 'title')}>
              {props.title}
            </h1>
            <p className="text-xl mb-8 opacity-90" contentEditable={isEditable} suppressContentEditableWarning onBlur={(e) => handleTextEdit(e, 'subtitle')}>
              {props.subtitle}
            </p>
            <button className="bg-white text-blue-600 font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition shadow-lg" contentEditable={isEditable} suppressContentEditableWarning onBlur={(e) => handleTextEdit(e, 'buttonText')}>
              {props.buttonText}
            </button>
          </div>
        );

      case 'quote':
        return (
          <blockquote className={props.className} style={props.style}>
            <p className="text-lg mb-2" contentEditable={isEditable} suppressContentEditableWarning onBlur={(e) => handleTextEdit(e, 'text')}>
              "{props.text}"
            </p>
            <cite className="text-sm text-gray-600" contentEditable={isEditable} suppressContentEditableWarning onBlur={(e) => handleTextEdit(e, 'author')}>
              — {props.author}
            </cite>
          </blockquote>
        );

      case 'gallery':
        return (
          <div className={props.className} style={props.style}>
            <img src="https://via.placeholder.com/300x200/3498db/ffffff?text=1" className="w-full h-48 object-cover rounded-lg" alt="Gallery 1" />
            <img src="https://via.placeholder.com/300x200/e74c3c/ffffff?text=2" className="w-full h-48 object-cover rounded-lg" alt="Gallery 2" />
            <img src="https://via.placeholder.com/300x200/2ecc71/ffffff?text=3" className="w-full h-48 object-cover rounded-lg" alt="Gallery 3" />
          </div>
        );

      case 'pricing':
        return (
          <div className={props.className} style={props.style}>
            <h3 className="text-2xl font-bold mb-4" contentEditable={isEditable} suppressContentEditableWarning onBlur={(e) => handleTextEdit(e, 'title')}>
              {props.title}
            </h3>
            <div className="text-4xl font-bold mb-6" contentEditable={isEditable} suppressContentEditableWarning onBlur={(e) => handleTextEdit(e, 'price')}>
              {props.price}<span className="text-lg text-gray-600">/월</span>
            </div>
            <div className="text-gray-600 mb-6" contentEditable={isEditable} suppressContentEditableWarning onBlur={(e) => handleTextEdit(e, 'features')}>
              {props.features}
            </div>
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition">
              선택하기
            </button>
          </div>
        );

      case 'testimonial':
        return (
          <div className={props.className} style={props.style}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {props.author?.charAt(0) || 'A'}
              </div>
              <div className="flex-1">
                <p className="text-gray-700 mb-3 italic" contentEditable={isEditable} suppressContentEditableWarning onBlur={(e) => handleTextEdit(e, 'text')}>
                  "{props.text}"
                </p>
                <p className="font-semibold" contentEditable={isEditable} suppressContentEditableWarning onBlur={(e) => handleTextEdit(e, 'author')}>
                  {props.author}
                </p>
                <p className="text-sm text-gray-500" contentEditable={isEditable} suppressContentEditableWarning onBlur={(e) => handleTextEdit(e, 'role')}>
                  {props.role}
                </p>
              </div>
            </div>
          </div>
        );

      case 'team':
        return (
          <div className={props.className} style={props.style}>
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-4"></div>
            <h3 className="text-xl font-bold mb-2" contentEditable={isEditable} suppressContentEditableWarning onBlur={(e) => handleTextEdit(e, 'name')}>
              {props.name}
            </h3>
            <p className="text-gray-600" contentEditable={isEditable} suppressContentEditableWarning onBlur={(e) => handleTextEdit(e, 'role')}>
              {props.role}
            </p>
          </div>
        );

      case 'features':
        return (
          <div className={props.className} style={props.style}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white text-2xl flex-shrink-0">
                ✓
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2" contentEditable={isEditable} suppressContentEditableWarning onBlur={(e) => handleTextEdit(e, 'title')}>
                  {props.title}
                </h3>
                <p className="text-gray-600" contentEditable={isEditable} suppressContentEditableWarning onBlur={(e) => handleTextEdit(e, 'description')}>
                  {props.description}
                </p>
              </div>
            </div>
          </div>
        );

      case 'stats':
        return (
          <div className={props.className} style={props.style}>
            <div className="text-5xl font-bold mb-2" contentEditable={isEditable} suppressContentEditableWarning onBlur={(e) => handleTextEdit(e, 'number')}>
              {props.number}
            </div>
            <div className="text-lg opacity-90" contentEditable={isEditable} suppressContentEditableWarning onBlur={(e) => handleTextEdit(e, 'label')}>
              {props.label}
            </div>
          </div>
        );

      case 'cta':
        return (
          <div className={props.className} style={props.style}>
            <h2 className="text-4xl font-bold mb-4" contentEditable={isEditable} suppressContentEditableWarning onBlur={(e) => handleTextEdit(e, 'title')}>
              {props.title}
            </h2>
            <p className="text-xl mb-8 opacity-90" contentEditable={isEditable} suppressContentEditableWarning onBlur={(e) => handleTextEdit(e, 'description')}>
              {props.description}
            </p>
            <button className="bg-white text-orange-600 font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition shadow-lg text-lg" contentEditable={isEditable} suppressContentEditableWarning onBlur={(e) => handleTextEdit(e, 'buttonText')}>
              {props.buttonText}
            </button>
          </div>
        );

      case 'timeline':
        return (
          <div className={props.className} style={props.style}>
            <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0" contentEditable={isEditable} suppressContentEditableWarning onBlur={(e) => handleTextEdit(e, 'year')}>
              {props.year}
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2" contentEditable={isEditable} suppressContentEditableWarning onBlur={(e) => handleTextEdit(e, 'title')}>
                {props.title}
              </h3>
              <p className="text-gray-600" contentEditable={isEditable} suppressContentEditableWarning onBlur={(e) => handleTextEdit(e, 'description')}>
                {props.description}
              </p>
            </div>
          </div>
        );

      default:
        return <div className="p-4 bg-gray-200 rounded">알 수 없는 컴포넌트: {type}</div>;
    }
  };

  return renderElement();
}
