# Debug Language Switcher - Option "zh" không hiển thị

## Vấn đề báo cáo:
- Chỉ thấy option "vi"
- Không thể chọn "zh"
- Dropdown có vấn đề rendering

---

## Code Analysis:

Component LanguageSwitcher **ĐÚNG**:
```tsx
<Select value={i18n.language} onChange={handleChange}>
  <Option value="vi">🇻🇳 Tiếng Việt</Option>
  <Option value="zh">🇨🇳 中文</Option>          // ✅ CÓ option zh
</Select>
```

---

## Possible Causes:

### 1. Browser Cache (Most Likely)
- Old cached HTML/JS
- Solution: Hard refresh

### 2. i18n Config Issue
- Language not initialized
- Check i18n config

### 3. Ant Design Select Issue
- CSS conflict
- Dropdown render issue

---

## Debug Steps:

### Step 1: Hard Refresh
```
1. Press Ctrl + Shift + R
2. Or Ctrl + F5
3. Or Clear cache + reload
```

### Step 2: Open DevTools Console
```
Press F12 → Console tab
Run these commands:
```

```javascript
// Check i18n loaded
console.log('i18n:', window.i18n);

// Check current language
console.log('Current lang:', localStorage.getItem('language'));

// Check available languages
import('react-i18next').then(m => console.log(m));

// Force change language
localStorage.setItem('language', 'zh');
window.location.reload();
```

### Step 3: Inspect Dropdown
```
1. Click on Language Switcher dropdown
2. Right-click → Inspect Element
3. Check if both <Option> elements render
4. Look for CSS that might hide the option
```

### Step 4: Check Network Tab
```
1. F12 → Network tab
2. Reload page
3. Look for:
   - vi.json (loaded?)
   - zh.json (loaded?)
   - Any 404 errors
```

---

## Quick Fixes to Try:

### Fix 1: Clear All Cache
```
1. Ctrl + Shift + Delete
2. Select "Cached images and files"
3. Time range: "All time"
4. Clear data
5. Close browser completely
6. Reopen: http://localhost:5174
```

### Fix 2: Incognito Mode
```
1. Ctrl + Shift + N (new incognito)
2. Go to: http://localhost:5174
3. Test language switcher
```

### Fix 3: Check i18n Config
File: `src/i18n/config.ts`
Should have:
```typescript
resources: {
  vi: { translation: vi },
  zh: { translation: zh }  // ✅ Must have this
}
```

### Fix 4: Force Language Load
Add to localStorage before loading:
```javascript
// In browser console:
localStorage.clear();
localStorage.setItem('language', 'vi');
location.reload();
```

---

## Testing Language Switcher:

### Manual Test in Browser:
```
1. Open http://localhost:5174
2. Click globe icon 🌐
3. Should see dropdown with 2 options:
   - 🇻🇳 Tiếng Việt
   - 🇨🇳 中文
4. Click 中文
5. Page should update immediately
```

### If Dropdown Opens But Only Shows "vi":

**Check HTML in DevTools:**
```html
<!-- Should see both: -->
<div class="ant-select-item" data-value="vi">🇻🇳 Tiếng Việt</div>
<div class="ant-select-item" data-value="zh">🇨🇳 中文</div>

<!-- If only one, it's a rendering issue -->
```

---

## Alternative: Use Keyboard

If dropdown has issues:
```
1. Click on Select dropdown
2. Press Arrow Down key
3. Should navigate to "zh" option
4. Press Enter to select
```

---

## Code Verification:

### ✅ Component Code is Correct:
```tsx
// src/components/LanguageSwitcher/index.tsx
<Option value="vi">🇻🇳 Tiếng Việt</Option>
<Option value="zh">🇨🇳 中文</Option>
```

### ✅ Translations Exist:
```
src/i18n/locales/vi.json ✅
src/i18n/locales/zh.json ✅
```

### ✅ i18n Config:
```typescript
resources: {
  vi: { translation: vi },
  zh: { translation: zh }
}
```

---

## Nuclear Option: Force Reinstall

If nothing works:
```bash
# Kill server
Ctrl + C

# Clear everything
rm -rf node_modules/.vite
rm -rf node_modules/@vitejs

# Reinstall
npm install

# Restart
npm run dev

# Test in new incognito window
```

---

## Expected Behavior:

### When Working Correctly:
1. Click globe icon 🌐
2. Dropdown opens showing:
   ```
   🇻🇳 Tiếng Việt  ← current (checkmark)
   🇨🇳 中文
   ```
3. Click 中文
4. All text changes:
   - "Tổng học viên" → "学员总数"
   - Activities → Chinese
   - Times → Chinese

---

## Browser Console Commands:

```javascript
// 1. Check what's loaded
console.log('i18n languages:', Object.keys(i18n.store.data));

// 2. Manually change language
i18n.changeLanguage('zh');

// 3. Check current language
console.log('Current:', i18n.language);

// 4. List all translation keys
console.log('Vi keys:', Object.keys(i18n.store.data.vi.translation));
console.log('Zh keys:', Object.keys(i18n.store.data.zh.translation));
```

---

## If STILL Not Working:

### Screenshot Request:
Please provide screenshot of:
1. Language Switcher dropdown (opened)
2. Browser DevTools → Elements tab (Select HTML)
3. Browser DevTools → Console (any errors?)
4. Browser DevTools → Network tab (vi.json, zh.json loaded?)

---

## Workaround (Temporary):

If dropdown is broken, manually force language:
```javascript
// In browser console:
localStorage.setItem('language', 'zh');
window.location.reload();

// Should load in Chinese
// To go back:
localStorage.setItem('language', 'vi');
window.location.reload();
```

---

## Summary:

**Most Likely Cause**: Browser cache

**Quick Fix**:
1. Hard refresh (Ctrl+Shift+R)
2. Incognito mode
3. Clear cache completely

**If that fails**: Check browser console for errors

---

## Contact Me If:
- Hard refresh doesn't work
- Incognito shows same issue
- Console shows errors
- Need more debugging help
