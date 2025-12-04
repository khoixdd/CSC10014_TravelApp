import { useState } from 'react';
import './Translator.css';

function Translator() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      setError('Vui lòng nhập văn bản cần dịch');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Using LibreTranslate API (free, open source)
      const response = await fetch('https://libretranslate.com/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: inputText,
          source: 'en',
          target: 'vi',
          format: 'text'
        }),
      });

      if (!response.ok) {
        // Fallback to Google Translate scraper API
        const fallbackResponse = await fetch(
          `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(inputText)}`
        );
        const fallbackData = await fallbackResponse.json();
        
        if (fallbackData && fallbackData[0]) {
          const translatedParts = fallbackData[0].map(part => part[0]).join('');
          setTranslatedText(translatedParts);
          return;
        }
        throw new Error('Không thể dịch văn bản');
      }

      const data = await response.json();
      setTranslatedText(data.translatedText);
    } catch (err) {
      // Final fallback - try Google direct
      try {
        const googleResponse = await fetch(
          `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(inputText)}`
        );
        const googleData = await googleResponse.json();
        
        if (googleData && googleData[0]) {
          const translatedParts = googleData[0].map(part => part[0]).join('');
          setTranslatedText(translatedParts);
          return;
        }
      } catch {
        // ignore
      }
      setError('Không thể dịch. Vui lòng thử lại sau.');
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
        <span>Dịch Anh - Việt</span>
      </div>

      <div className="translator-content">
        <div className="translator-input-section">
          <div className="lang-label">
            English
          </div>
          <textarea
            className="translator-textarea"
            placeholder="Nhập văn bản tiếng Anh..."
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
              <span>Đang dịch...</span>
            ) : (
              <span>Dịch</span>
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
            Tiếng Việt
          </div>
          <div className="translator-result">
            {error ? (
              <span className="translator-error">
                <i className="fa-solid fa-circle-exclamation"></i> {error}
              </span>
            ) : translatedText ? (
              <span className="translated-text">{translatedText}</span>
            ) : (
              <span className="placeholder-text">Kết quả dịch sẽ hiển thị ở đây...</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Translator;
