# 🔐 HƯỚNG DẪN ĐĂNG NHẬP
# Teaching Assistant WebApp

---

## 📝 CÁCH ĐĂNG NHẬP

### Bước 1: Mở ứng dụng
1. Mở trình duyệt (Chrome, Firefox, Safari, hoặc Edge)
2. Truy cập: **http://localhost:5173**
3. Ứng dụng sẽ tự động chuyển đến trang **Đăng nhập**

### Bước 2: Nhập thông tin đăng nhập

**Trong môi trường Development (Mock Authentication):**

✅ **Email:** Bất kỳ email nào (ví dụ: `test@example.com`)  
✅ **Password:** Bất kỳ password nào **≥6 ký tự** (ví dụ: `password123`)

**Lưu ý:** 
- Mock authentication chấp nhận **BẤT KỲ** email và password nào (≥6 ký tự)
- Trong production, sẽ cần email và password thật từ backend

### Bước 3: Chọn tùy chọn
- ☐ **Ghi nhớ đăng nhập** (Remember Me) - Tùy chọn
  - Nếu tích: Token lưu trong localStorage
  - Nếu không tích: Token lưu trong sessionStorage

### Bước 4: Nhấn nút "Đăng nhập"
- Sau khi nhập đúng email format và password ≥6 ký tự
- Nhấn nút **"Đăng nhập"** (màu xanh)
- Hệ thống sẽ xử lý và chuyển đến **Dashboard** nếu thành công

---

## ✅ VÍ DỤ ĐĂNG NHẬP

### Test Account 1 (Khuyến nghị)
```
Email:    ta1@test.com
Password: Test@123
```

### Test Account 2 (Khuyến nghị)
```
Email:    ta2@test.com
Password: Test@123
```

### Hoặc bất kỳ email/password nào
```
Email:    test@example.com
Password: password123

Email:    myemail@gmail.com
Password: mypassword
```

**Miễn là:**
- Email có format hợp lệ (có @ và domain)
- Password có ít nhất 6 ký tự

---

## ❌ CÁC TRƯỜNG HỢP LỖI

### Lỗi Validation
1. **Email trống** → Hiển thị: "Email là bắt buộc"
2. **Email không hợp lệ** → Hiển thị: "Email không hợp lệ"
   - Ví dụ: `invalid-email` (thiếu @)
3. **Password trống** → Hiển thị: "Mật khẩu là bắt buộc"
4. **Password < 6 ký tự** → Hiển thị: "Mật khẩu phải có ít nhất 6 ký tự"

### Lỗi Authentication (khi có backend thật)
- Email/password sai → Hiển thị: "Đăng nhập thất bại. Vui lòng thử lại."
- Tài khoản bị khóa → Hiển thị thông báo tương ứng

---

## 🎯 SAU KHI ĐĂNG NHẬP THÀNH CÔNG

1. ✅ **Redirect** đến trang Dashboard (`/dashboard`)
2. ✅ **Token** được lưu (localStorage hoặc sessionStorage)
3. ✅ **User info** được lưu trong Zustand store
4. ✅ **Header** hiển thị tên user và avatar
5. ✅ Có thể truy cập tất cả các trang (Classes, Messaging, Content, v.v.)

---

## 🔄 ĐĂNG XUẤT

### Cách đăng xuất:
1. Click vào **tên user** hoặc **avatar** ở header (góc trên bên phải)
2. Click **"Đăng xuất"** (màu đỏ)
3. Hệ thống sẽ:
   - Xóa token
   - Xóa user info
   - Redirect về trang **Login** (`/login`)

---

## 💡 LƯU Ý QUAN TRỌNG

### Trong Development (Hiện tại)
- ✅ Mock authentication - chấp nhận bất kỳ credentials nào
- ✅ Không cần tài khoản thật
- ✅ Chỉ cần email format hợp lệ và password ≥6 ký tự

### Trong Production (Sau này)
- ⚠️ Sẽ cần email và password thật từ backend
- ⚠️ Sẽ có validation thật
- ⚠️ Sẽ có password recovery
- ⚠️ Sẽ có OTP verification (nếu có)

---

## 🧪 TESTING ĐĂNG NHẬP

### Test Case 1: Đăng nhập thành công
```
1. Mở http://localhost:5173
2. Nhập: test@example.com / password123
3. Click "Đăng nhập"
✅ Expected: Redirect to /dashboard
```

### Test Case 2: Email không hợp lệ
```
1. Nhập: invalid-email (không có @)
2. Click "Đăng nhập"
✅ Expected: Hiển thị "Email không hợp lệ"
```

### Test Case 3: Password quá ngắn
```
1. Nhập: test@example.com / 123 (chỉ 3 ký tự)
2. Click "Đăng nhập"
✅ Expected: Hiển thị "Mật khẩu phải có ít nhất 6 ký tự"
```

### Test Case 4: Truy cập trang bảo vệ khi chưa đăng nhập
```
1. Xóa localStorage/sessionStorage
2. Truy cập trực tiếp: http://localhost:5173/dashboard
✅ Expected: Tự động redirect về /login
```

---

## 📱 GIAO DIỆN ĐĂNG NHẬP

```
┌─────────────────────────────────┐
│     Đăng nhập                   │
│  Teaching Assistant WebApp       │
├─────────────────────────────────┤
│  📧 Email                        │
│  [________________________]      │
│                                  │
│  🔒 Mật khẩu                     │
│  [________________________]      │
│                                  │
│  ☐ Ghi nhớ đăng nhập             │
│                                  │
│  [     Đăng nhập      ]          │
│                                  │
│  Chưa có tài khoản?              │
│  Liên hệ quản trị viên           │
└─────────────────────────────────┘
```

---

## 🎯 QUICK REFERENCE

| Item | Value |
|------|-------|
| **URL Login** | http://localhost:5173 |
| **Email (Mock)** | Bất kỳ email nào |
| **Password (Mock)** | Bất kỳ ≥6 ký tự |
| **After Login** | Redirect to /dashboard |
| **Logout** | User menu → Đăng xuất |

---

## ✅ CHECKLIST ĐĂNG NHẬP

- [ ] Trang login hiển thị đúng
- [ ] Form validation hoạt động
- [ ] Đăng nhập thành công với credentials hợp lệ
- [ ] Redirect đến dashboard sau khi đăng nhập
- [ ] User info hiển thị ở header
- [ ] Token được lưu đúng
- [ ] Protected routes hoạt động
- [ ] Đăng xuất hoạt động

---

**Bây giờ bạn có thể đăng nhập và bắt đầu test ứng dụng!**

**Email:** `test@example.com`  
**Password:** `password123`  
**Hoặc bất kỳ email/password nào khác ≥6 ký tự**



