import './Toast.css';

function Toast({ toasts }) {
  const getIcon = (type) => {
    switch (type) {
      case 'error': return 'fa-circle-xmark';
      case 'info': return 'fa-circle-info';
      default: return 'fa-circle-check';
    }
  };

  const getTitle = (type) => {
    return type === 'error' ? 'Đã xảy ra lỗi' : 'Thông báo';
  };

  return (
    <div className="toast-wrapper">
      {toasts.map(toast => (
        <div key={toast.id} className={`toast ${toast.type}`}>
          <div className="toast-icon">
            <i className={`fa-solid ${getIcon(toast.type)}`}></i>
          </div>
          <div className="toast-body">
            <h4>{getTitle(toast.type)}</h4>
            <p>{toast.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Toast;
