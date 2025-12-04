import { getPoiStyle } from '../../utils/helpers';
import './POIList.css';

function POIList({ pois, onPoiClick }) {
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
            <div
              key={index}
              className="poi-item"
              onClick={() => onPoiClick?.(poi)}
            >
              <div className="poi-details">
                <div className="poi-name" title={poi.tags.name}>
                  {poi.tags.name}
                </div>
                <div className="poi-tag">{style.label}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default POIList;
