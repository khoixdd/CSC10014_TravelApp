import { useState } from 'react';
import { useAuth } from '../../contexts';
import './Header.css';

function Header({ 
  onSearch, 
  isLoading,
  message,
  onLoginClick
}) {
  const [query, setQuery] = useState('');
  const { user, logout, loading } = useAuth();

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header className="app-header">
      <div className="brand-logo">
        <span>Khám phá Việt Nam</span>
      </div>

      <div className="search-section">
        <div className="search-wrapper">
          <i className="fa-solid fa-magnifying-glass search-icon-left"></i>
          <input
            type="text"
            className="search-bar"
            placeholder="Tìm kiếm điểm đến (VD: Đà Nẵng, Sa Pa)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            autoComplete="off"
          />
        </div>
        {message && <span className="search-message">{message}</span>}
      </div>

      <div className="action-group">
        <button 
          className="btn-gradient" 
          onClick={handleSearch}
          disabled={isLoading}
        >
          {isLoading ? (
            <i className="fa-solid fa-circle-notch fa-spin"></i>
          ) : (
            <>
              <span>Khám phá</span>
              <i className="fa-solid fa-arrow-right"></i>
            </>
          )}
        </button>

        {/* Auth buttons */}
        {!loading && (
          user ? (
            <div className="user-menu">
              <div className="user-info">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="Avatar" className="user-avatar" />
                ) : (
                  <div className="user-avatar-placeholder">
                    {user.displayName?.[0] || user.email?.[0] || 'U'}
                  </div>
                )}
                <span className="user-name">{user.displayName || user.email}</span>
              </div>
              <button className="btn-logout" onClick={logout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <span>Đăng xuất</span>
              </button>
            </div>
          ) : (
            <button className="btn-login" onClick={onLoginClick}>
              <i className="fa-solid fa-user"></i>
              <span>Đăng nhập</span>
            </button>
          )
        )}
      </div>
    </header>
  );
}

export default Header;
