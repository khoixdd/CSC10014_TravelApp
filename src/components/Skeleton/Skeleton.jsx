import './Skeleton.css';

function Skeleton() {
  return (
    <div className="skeleton-container">
      <div className="skeleton-box sk-weather"></div>
      <div className="skeleton-box sk-item"></div>
      <div className="skeleton-box sk-item"></div>
      <div className="skeleton-box sk-item"></div>
    </div>
  );
}

export default Skeleton;
