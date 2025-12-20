import { useState } from 'react';
import { generateAI } from '../../services/api';
import './Translator.css';

function Translator() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      setError('Vui lòng nhập câu hỏi');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await generateAI(inputText);
      setTranslatedText(result.generated);
    } catch (err) {
      setError('Không thể tạo phản hồi AI');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleTranslate();
    }
  };

  const handleClear = () => {
    setInputText('');
    setTranslatedText('');
    setError('');
  };

  return (
    <div className="translator-card">
      <div className="translator-header">
        <span>AI Assistant</span>
      </div>

      <div className="translator-content">
        <div className="translator-input-section">
          <div className="lang-label">
            Question
          </div>
          <textarea
            className="translator-textarea"
            placeholder="Nhập câu hỏi..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            rows={3}
          />
        </div>

        <div className="translator-actions">
          <button 
            className="btn-translate" 
            onClick={handleTranslate}
            disabled={isLoading}
          >
            {isLoading ? (
              <span>Đang tạo...</span>
            ) : (
              <span>Hỏi AI</span>
            )}
          </button>
          {(inputText || translatedText) && (
            <button className="btn-clear" onClick={handleClear}>
              Xóa
            </button>
          )}
        </div>

        <div className="translator-output-section">
          <div className="lang-label">
            Answer
          </div>
          <div className="translator-result">
            {error ? (
              <span className="translator-error">
                <i className="fa-solid fa-circle-exclamation"></i> {error}
              </span>
            ) : translatedText ? (
              <span className="translated-text">{translatedText}</span>
            ) : (
              <span className="placeholder-text">Phản hồi AI sẽ hiển thị ở đây...</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Translator;
