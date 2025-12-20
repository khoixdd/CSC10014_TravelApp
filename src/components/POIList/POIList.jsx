import { useState } from 'react';
import { getPoiStyle } from '../../utils/helpers';
import { generateAI } from '../../services/api';
import './POIList.css';

function POIList({ pois, onPoiClick }) {
  const [aiDescriptions, setAiDescriptions] = useState({});
  const [loadingAI, setLoadingAI] = useState({});

  const handleGenerateAI = async (poi, index) => {
    setLoadingAI(prev => ({ ...prev, [index]: true }));
    try {
      const prompt = `Describe this place in Vietnamese: ${poi.tags.name}. It is a ${getPoiStyle(poi.tags).label}. Provide a brief, interesting description for travelers.`;
      const result = await generateAI(prompt);
      setAiDescriptions(prev => ({ ...prev, [index]: result.generated }));
    } catch (error) {
      setAiDescriptions(prev => ({ ...prev, [index]: 'Lỗi khi tạo mô tả AI' }));
    } finally {
      setLoadingAI(prev => ({ ...prev, [index]: false }));
    }
  };

  if (!pois || pois.length === 0) {
    return (
      <div className="poi-container">
        <div className="sidebar-header">
          Địa điểm nổi bật
        </div>
        <div className="poi-list poi-empty">
          Nhập tên thành phố hoặc địa danh du lịch để bắt đầu.
        </div>
      </div>
    );
  }

  const validPois = pois
    .filter(p => p.lat && p.lon && p.tags?.name)
    .slice(0, 5);

  if (validPois.length === 0) {
    return (
      <div className="poi-container">
        <div className="sidebar-header">
          Địa điểm nổi bật
        </div>
        <div className="poi-list poi-empty">
          Không tìm thấy địa điểm nổi bật nào gần đây.
        </div>
      </div>
    );
  }

  return (
    <div className="poi-container">
      <div className="sidebar-header">
        Địa điểm nổi bật
      </div>
      <div className="poi-list">
        {validPois.map((poi, index) => {
          const style = getPoiStyle(poi.tags);
          return (
            <div key={index} className="poi-item">
              <div
                className="poi-details"
                onClick={() => onPoiClick?.(poi)}
              >
                <div className="poi-name" title={poi.tags.name}>
                  {poi.tags.name}
                </div>
                <div className="poi-tag">{style.label}</div>
              </div>
              <button
                className="ai-generate-btn"
                onClick={() => handleGenerateAI(poi, index)}
                disabled={loadingAI[index]}
              >
                {loadingAI[index] ? 'Đang tạo...' : 'Tạo mô tả AI'}
              </button>
              {aiDescriptions[index] && (
                <div className="ai-description">
                  {aiDescriptions[index]}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default POIList;
