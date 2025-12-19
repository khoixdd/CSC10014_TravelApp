Setup

Cài đặt dependencies:
```bash
npm install
```

**Cấu hình API Key**:
   - Đăng ký tài khoản tại [OpenWeather](https://home.openweathermap.org/users/sign_in)
   - Lấy API key tại [API Keys](https://home.openweathermap.org/api_keys)
   - Mở file `src/config/index.js` và thay `YOUR-API-KEY` bằng API key của bạn

**Cấu hình Firebase**:
   1. Truy cập [Firebase Console](https://console.firebase.google.com/) và đăng nhập bằng tài khoản Google.
   2. Tạo một project mới hoặc chọn project đã có.
   3. Vào phần Project Settings > General, kéo xuống mục "Your apps" và thêm một app Web (biểu tượng </>).
   4. Sau khi tạo app, bạn sẽ nhận được các thông tin cấu hình Firebase.
   5. Tạo file `.env` ở thư mục gốc (hoặc copy từ `.env.example`) và điền các giá trị sau:
      ```env
      VITE_FIREBASE_API_KEY=your_api_key_here
      VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
      VITE_FIREBASE_PROJECT_ID=your_project_id
      VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
      VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
      VITE_FIREBASE_APP_ID=your_app_id
      ```
   6. Lưu file `.env` và khởi động lại server nếu đang chạy.
   
Chạy development server:
```bash
npm run dev
```

Mở trình duyệt tại localhost



# CSC10014_TravelApp
