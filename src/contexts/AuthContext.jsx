import { createContext, useContext, useState, useEffect } from 'react';
import { 
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';

const AuthContext = createContext();

// Hook để sử dụng Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // Đăng ký với email/password
  const register = async (email, password, displayName) => {
    try {
      setError('');
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Cập nhật displayName
      if (displayName) {
        await updateProfile(result.user, { displayName });
      }
      
      return result.user;
    } catch (err) {
      setError(getErrorMessage(err.code));
      throw err;
    }
  };

  // Đăng nhập với email/password
  const login = async (email, password) => {
    try {
      setError('');
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (err) {
      setError(getErrorMessage(err.code));
      throw err;
    }
  };

  // Đăng nhập với Google
  const loginWithGoogle = async () => {
    try {
      setError('');
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (err) {
      console.error('Google Sign-in Error:', err.code, err.message);
      setError(getErrorMessage(err.code));
      throw err;
    }
  };

  // Đăng xuất
  const logout = async () => {
    try {
      setError('');
      await signOut(auth);
    } catch (err) {
      setError(getErrorMessage(err.code));
      throw err;
    }
  };

  // Chuyển đổi mã lỗi Firebase sang thông báo tiếng Việt
  const getErrorMessage = (errorCode) => {
    const errorMessages = {
      'auth/email-already-in-use': 'Email này đã được sử dụng.',
      'auth/invalid-email': 'Email không hợp lệ.',
      'auth/operation-not-allowed': 'Phương thức đăng nhập chưa được bật.',
      'auth/weak-password': 'Mật khẩu quá yếu. Vui lòng chọn mật khẩu mạnh hơn.',
      'auth/user-disabled': 'Tài khoản đã bị vô hiệu hóa.',
      'auth/user-not-found': 'Không tìm thấy tài khoản với email này.',
      'auth/wrong-password': 'Mật khẩu không chính xác.',
      'auth/invalid-credential': 'Thông tin đăng nhập không hợp lệ.',
      'auth/popup-closed-by-user': 'Đăng nhập bị hủy.',
      'auth/cancelled-popup-request': 'Yêu cầu đăng nhập bị hủy.',
      'auth/popup-blocked': 'Popup bị chặn. Vui lòng cho phép popup.',
    };
    return errorMessages[errorCode] || 'Đã xảy ra lỗi. Vui lòng thử lại.';
  };

  const value = {
    user,
    loading,
    error,
    register,
    login,
    loginWithGoogle,
    logout,
    setError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
