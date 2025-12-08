import { useState } from 'react';
import { useAuth } from '../../contexts';
import './Auth.css';

function Auth({ onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, register, loginWithGoogle, error, setError } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    if (!isLogin) {
      if (password !== confirmPassword) {
        setError('Mật khẩu xác nhận không khớp.');
        return;
      }
      if (password.length < 6) {
        setError('Mật khẩu phải có ít nhất 6 ký tự.');
        return;
      }
    }

    setIsSubmitting(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password, displayName);
      }
      onClose?.();
    } catch (err) {
      // Error đã được xử lý trong AuthContext
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsSubmitting(true);
    try {
      await loginWithGoogle();
      onClose?.();
    } catch (err) {
      // Error đã được xử lý trong AuthContext
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setDisplayName('');
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className="auth-header">
          <h2>{isLogin ? 'Đăng nhập' : 'Đăng ký'}</h2>
          <p>
            {isLogin 
              ? 'Chào mừng bạn quay trở lại!' 
              : 'Tạo tài khoản để khám phá Việt Nam'}
          </p>
        </div>

        {error && (
          <div className="auth-error">
            <i className="fa-solid fa-circle-exclamation"></i>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="displayName">
                <i className="fa-solid fa-user"></i>
                Tên hiển thị
              </label>
              <input
                type="text"
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Nhập tên của bạn"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">
              <i className="fa-solid fa-envelope"></i>
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <i className="fa-solid fa-lock"></i>
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
              required
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">
                <i className="fa-solid fa-lock"></i>
                Xác nhận mật khẩu
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Nhập lại mật khẩu"
                required
              />
            </div>
          )}

          <button 
            type="submit" 
            className="auth-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <i className="fa-solid fa-circle-notch fa-spin"></i>
            ) : (
              isLogin ? 'Đăng nhập' : 'Đăng ký'
            )}
          </button>
        </form>

        <div className="auth-divider">
          <span>hoặc</span>
        </div>

        <button 
          className="auth-google"
          onClick={handleGoogleLogin}
          disabled={isSubmitting}
        >
          <i className="fa-brands fa-google"></i>
          Tiếp tục với Google
        </button>

        <div className="auth-footer">
          <span>
            {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
          </span>
          <button type="button" onClick={toggleMode}>
            {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;
