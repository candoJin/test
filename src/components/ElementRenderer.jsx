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

      default:
        return <div className="p-4 bg-gray-200 rounded">알 수 없는 컴포넌트: {type}</div>;
    }
  };

  return renderElement();
}
