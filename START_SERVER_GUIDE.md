# Hướng dẫn Start Server và Test Language Switcher

## Tình trạng hiện tại

✅ **Server ĐANG CHẠY** trên port 5177
✅ **HMR đang hoạt động** (Hot Module Replacement)
✅ **Code đã fix xong** (hardcoded text → i18n)

---

## Cách truy cập

### 1. URL chính xác
```
http://localhost:5177
```

⚠️ **KHÔNG PHẢI**:
- ❌ http://localhost:5173
- ❌ http://localhost:5176
- ❌ http://localhost:5174

---

## Nếu không truy cập được

### Phương án 1: Kill tất cả ports và restart

```bash
# Stop dev server hiện tại (trong terminal đang chạy npm run dev)
Ctrl + C

# Kill tất cả Node processes
taskkill /F /IM node.exe

# Restart dev server
npm run dev
```

Server sẽ tự động chọn port available (có thể là 5173 hoặc port khác).

### Phương án 2: Check firewall

```bash
# Check port 5177 có bị block không
netstat -ano | findstr :5177

# Nếu không thấy gì, firewall có thể đang block
# Tạm tắt firewall để test
```

### Phương án 3: Restart với port cụ thể

Tạo/edit file `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,        // Force port 5173
    strictPort: false, // Allow fallback to other port
    open: true,        // Auto open browser
  },
})
```

Sau đó restart:
```bash
npm run dev
```

---

## Test Language Switcher (sau khi server chạy)

### Bước 1: Clear cache
```
Press: Ctrl + Shift + R
Hoặc: Ctrl + Shift + Delete → Clear cache
```

### Bước 2: Truy cập Dashboard
```
http://localhost:[PORT]/
```
(PORT là port mà server đang chạy - xem log output)

### Bước 3: Test chuyển ngôn ngữ

**Mặc định (Tiếng Việt)**:
- Header: Globe icon 🌐
- Dashboard: "Dashboard Trợ giảng"
- Stats: "Tổng lớp học", "Tổng học sinh"
- Activities:
  - "Cô Hoa đã gửi tin nhắn đến lớp 5A"
  - "15 phụ huynh hoàn thành khóa học..."
  - "Giáo án Toán lớp 6 đã được tạo"
- Time: "10 phút trước", "1 giờ trước", "2 giờ trước"

**Chuyển sang 中文**:
1. Click vào globe icon 🌐 ở header
2. Select "中文"
3. ✅ **Tất cả text sẽ đổi ngay lập tức**:
   - Dashboard: "助教仪表板"
   - Stats: "班级总数", "学生总数"
   - Activities:
     - "花老师给5A班发送了消息"
     - "15位家长完成了育儿课程"
     - "六年级数学教案已创建"
   - Time: "10分钟前", "1小时前", "2小时前"

### Bước 4: Reload page
- Language persist (lưu trong localStorage)
- Không cần chọn lại

---

## Troubleshooting

### Lỗi 1: "Port 5177 can't start"

**Nguyên nhân**: Port bị chiếm bởi process khác

**Fix**:
```bash
# Check process nào đang dùng port
netstat -ano | findstr :5177

# Kill process đó (PID ở cột cuối)
taskkill /F /PID [PID_NUMBER]

# Hoặc kill tất cả node
taskkill /F /IM node.exe

# Restart
npm run dev
```

### Lỗi 2: "Cannot access localhost"

**Fix**:
```bash
# Check hosts file
notepad C:\Windows\System32\drivers\etc\hosts

# Đảm bảo có dòng:
127.0.0.1       localhost

# Hoặc thử truy cập bằng IP:
http://127.0.0.1:5177
```

### Lỗi 3: "ERR_CONNECTION_REFUSED"

**Fix**:
1. Check dev server có đang chạy không (xem terminal)
2. Check port đúng không
3. Restart dev server
4. Try incognito window

### Lỗi 4: "Page loads but language doesn't change"

**Fix**:
1. Clear browser cache (Ctrl + Shift + R)
2. Open DevTools (F12) → Console
3. Check for errors
4. Run: `localStorage.getItem('language')`
5. Run: `window.location.reload()`

---

## Debug Commands

### Check server status
```bash
# Check if server is running
netstat -ano | findstr :5177

# Check all Node processes
tasklist | findstr node.exe
```

### Check in browser
```javascript
// Open console (F12)

// Check current language
localStorage.getItem('language')

// Check i18n loaded
console.log(window.i18n)

// Force change language
localStorage.setItem('language', 'zh')
window.location.reload()
```

---

## Nếu vẫn không được

### Nuclear option: Clean restart

```bash
# 1. Kill everything
taskkill /F /IM node.exe

# 2. Clear Vite cache
rmdir /S /Q node_modules\.vite

# 3. Clear browser cache completely
# (Ctrl + Shift + Delete → All time)

# 4. Restart dev server
npm run dev

# 5. Open NEW incognito window
Ctrl + Shift + N

# 6. Go to URL from terminal output
```

---

## Expected Terminal Output

Khi server start thành công, bạn sẽ thấy:

```
> ta-webapp@0.0.0 dev
> vite

  VITE v7.1.12  ready in 366 ms

  ➜  Local:   http://localhost:5177/
  ➜  Network: use --host to expose
```

**Copy URL từ dòng "Local:"** và paste vào browser!

---

## Alternative: Force specific port

Edit `package.json`:

```json
{
  "scripts": {
    "dev": "vite --port 3000 --host"
  }
}
```

Sau đó:
```bash
npm run dev
```

Server sẽ chạy trên: http://localhost:3000

---

## Quick Test Checklist

- [ ] Server running (check terminal)
- [ ] Copy correct URL from terminal
- [ ] Clear browser cache
- [ ] Access URL in browser
- [ ] See globe icon in header
- [ ] Click globe → Select 中文
- [ ] All text changes to Chinese
- [ ] Activities messages change
- [ ] Time stamps change
- [ ] Reload → Language persists

---

## Support

Nếu vẫn gặp lỗi:
1. Screenshot terminal output
2. Screenshot browser console (F12)
3. Check which port is actually running
4. Try different browser
5. Try incognito mode
