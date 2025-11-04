# Bug Report - Cache & Hardcoded Text Issues

## Ngày: 2025-11-04
## Người báo: User
## Mức độ: HIGH (Ảnh hưởng đến Language Switcher)

---

## Tóm tắt vấn đề

1. **Server đang chạy port 5177** (KHÔNG phải 5176 như user nghĩ)
2. **Browser cache code cũ** → Không thấy thay đổi UI
3. **Hardcoded Vietnamese text** trong DashboardPage → Language Switcher không hoạt động đúng
4. **Logic "Phụ huynh" vs "Học sinh"** bị nhầm lẫn trong một số chỗ

---

## Chi tiết các lỗi tìm thấy

### ❌ Lỗi 1: Server Port Confusion
**File**: Dev Server Output
**Vị trí**: Vite dev server
**Hiện trạng**:
- User nghĩ server chạy port 5176
- Thực tế server chạy port **5177**

**Log từ server**:
```
Port 5173 is in use, trying another one...
Port 5174 is in use, trying another one...
Port 5175 is in use, trying another one...
Port 5176 is in use, trying another one...

➜  Local:   http://localhost:5177/
```

**Tác động**: User truy cập sai URL → Thấy code cũ cached

---

### ❌ Lỗi 2: Hardcoded Text trong DashboardPage
**File**: `src/pages/DashboardPage/index.tsx`
**Lines**: 85-104

**Code hiện tại (SAI)**:
```typescript
const recentActivities: Activity[] = [
  {
    id: '1',
    icon: '✉️',
    message: 'Cô Hoa đã gửi tin nhắn đến lớp 5A',  // ❌ HARDCODED
    time: '10 phút trước',                          // ❌ HARDCODED
  },
  {
    id: '2',
    icon: '📚',
    message: '15 phụ huynh hoàn thành khóa học "Nuôi dạy con"',  // ❌ HARDCODED
    time: '1 giờ trước',                                          // ❌ HARDCODED
  },
  {
    id: '3',
    icon: '📝',
    message: 'Giáo án Toán lớp 6 đã được tạo',    // ❌ HARDCODED
    time: '2 giờ trước',                            // ❌ HARDCODED
  },
];
```

**Tác động**:
- Language Switcher chuyển sang 中文 nhưng activities vẫn hiển thị Tiếng Việt
- User thấy giao diện không thay đổi → Nghĩ là lỗi cache

**Cần fix thành**:
```typescript
const recentActivities: Activity[] = [
  {
    id: '1',
    icon: '✉️',
    message: t('dashboard.activities.message1'),  // ✅ USE i18n
    time: t('dashboard.time.minutes_ago', { count: 10 }),
  },
  {
    id: '2',
    icon: '📚',
    message: t('dashboard.activities.message2'),  // ✅ USE i18n
    time: t('dashboard.time.hours_ago', { count: 1 }),
  },
  {
    id: '3',
    icon: '📝',
    message: t('dashboard.activities.message3'),  // ✅ USE i18n
    time: t('dashboard.time.hours_ago', { count: 2 }),
  },
];
```

---

### ❌ Lỗi 3: Các hardcoded text khác
**File**: `src/pages/DashboardPage/index.tsx`

| Line | Code | Issue |
|------|------|-------|
| 58 | `"Đang tải dữ liệu..."` | Hardcoded, cần `t('common.loading')` |
| 67 | `"Lỗi tải dữ liệu"` | Hardcoded, cần i18n key |
| 79 | `"Không có dữ liệu"` | Hardcoded, cần `t('common.noData')` |

---

### ⚠️ Lỗi 4: Logic "Phụ huynh" vs "Học viên"
**Context**: User đề cập "phụ huynh chính là học viên thì không thấy đổi"

**Phân tích**:
1. **Trong code**:
   - `studentCount` = Số học sinh
   - `parentCount` = Số phụ huynh
   - Đây là 2 entities riêng biệt (đúng)

2. **Trong mockData.service.ts**:
   ```typescript
   kpis: {
     totalStudents: 356,   // Học sinh
     totalParents: 385,    // Phụ huynh
   }
   ```

3. **Trong i18n**:
   - vi.json: `"totalStudents": "Tổng học sinh"` ✅
   - zh.json: `"totalStudents": "学生总数"` ✅

**Kết luận**: Logic đúng, KHÔNG có vấn đề về "phụ huynh = học viên"

---

### ❌ Lỗi 5: Browser Cache
**Nguyên nhân**:
- User đã test 3 lần nhưng không clear cache
- Có thể truy cập sai port (5173 thay vì 5177)
- HMR đang hoạt động NHƯNG hardcoded text không thay đổi vì nó không dùng i18n

**Cách fix**:
1. Đảm bảo truy cập đúng URL: http://localhost:5177
2. Hard refresh: `Ctrl + Shift + R`
3. Clear cache: DevTools → Network → Disable cache

---

## Root Cause Analysis

### Nguyên nhân gốc
1. **Hardcoded text** trong DashboardPage → Language Switcher không hoạt động
2. **Confusion về port** → User truy cập sai URL
3. **Browser cache** → Không thấy updates

### Tại sao xảy ra
- Developer quên sử dụng `t()` function cho activities
- Port bị xung đột → Vite tự động chọn port khác
- User không clear cache browser

---

## Impact Assessment

### Tính năng bị ảnh hưởng
1. ✅ Language Switcher (component works)
2. ❌ Dashboard Activities (không chuyển ngôn ngữ)
3. ❌ Dashboard loading/error messages (không chuyển ngôn ngữ)

### User Experience
- User chuyển ngôn ngữ → Một số text vẫn giữ nguyên
- User nghĩ feature bị lỗi
- Tạo ấn tượng xấu về quality

---

## Fix Plan

### Priority 1 (Critical - Fix ngay)
- [ ] Fix hardcoded `recentActivities` array (lines 85-104)
- [ ] Fix hardcoded loading/error messages
- [ ] Test Language Switcher hoạt động 100%

### Priority 2 (Important)
- [ ] Scan toàn bộ codebase tìm hardcoded text
- [ ] Document port handling cho team
- [ ] Add browser cache clear guide cho users

### Priority 3 (Good to have)
- [ ] Add ESLint rule để detect hardcoded text
- [ ] Setup CI check cho i18n completeness

---

## Files cần fix

1. **src/pages/DashboardPage/index.tsx** (CRITICAL)
   - Lines 85-104: recentActivities
   - Line 58: Loading message
   - Line 67: Error message
   - Line 79: No data message

2. **Các files khác** (cần scan):
   - Check all pages có hardcoded text không
   - Đặc biệt các error messages, tooltips

---

## Testing Checklist

Sau khi fix, test:
- [ ] Access http://localhost:5177 (đúng port)
- [ ] Hard refresh browser (Ctrl+Shift+R)
- [ ] Switch to 中文 → All text changes
- [ ] Switch back to Tiếng Việt → All text changes back
- [ ] Reload page → Language persists (localStorage)
- [ ] All dashboard stats use i18n
- [ ] All error messages use i18n

---

## Prevention

Để tránh lỗi tương tự:
1. **Code Review**: Check mọi hardcoded string
2. **ESLint Rule**: Warn khi có Vietnamese/Chinese characters trong code
3. **CI/CD**: Automated i18n completeness check
4. **Documentation**: Port handling guide

---

## Estimated Fix Time
- Fix hardcoded text: **15 minutes**
- Full codebase scan: **30 minutes**
- Testing: **15 minutes**
- **Total: ~1 hour**

---

## Notes
- HMR đang hoạt động tốt (Vite logs show updates)
- i18n translations đã complete cho vi & zh
- LanguageSwitcher component không có vấn đề
- Root cause là **hardcoded text**, không phải cache
