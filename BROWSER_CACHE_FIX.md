# Browser Cache Fix - Language Switcher Not Updating

## Problem
Dev server is running on port **5177** but UI changes are not visible after 3 test attempts.

## Current Status
✅ Dev server running: http://localhost:5177
✅ HMR (Hot Module Replacement) is working
✅ LanguageSwitcher component integrated
❌ Browser showing old cached version

## Solution Steps

### 1. Hard Refresh Browser (Try First)
- **Chrome/Edge**: `Ctrl + Shift + R` or `Ctrl + F5`
- **Firefox**: `Ctrl + Shift + R`
- Clear and reload completely

### 2. Clear Browser Cache Completely
**Chrome/Edge:**
1. Press `F12` to open DevTools
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"

**Or manually:**
1. Press `Ctrl + Shift + Delete`
2. Select "Cached images and files"
3. Choose "All time"
4. Click "Clear data"

### 3. Disable Cache in DevTools (Recommended for Development)
1. Open DevTools (`F12`)
2. Go to **Network** tab
3. Check ☑️ **"Disable cache"**
4. Keep DevTools open while developing

### 4. Force Vite to Clear Cache
```bash
# Stop dev server (Ctrl+C)
# Then run:
npm run dev -- --force

# Or clear Vite cache manually:
rm -rf node_modules/.vite
npm run dev
```

### 5. Check Correct Port
⚠️ **IMPORTANT**: Your dev server is on **port 5177**, NOT 5173!

**Correct URL**: http://localhost:5177

Make sure you're not accessing an old tab with port 5173.

### 6. Verify in Browser
After clearing cache, visit: http://localhost:5177

You should see:
- 🌐 Globe icon in header (next to notifications)
- Dropdown with: 🇻🇳 Tiếng Việt | 🇨🇳 中文
- Clicking changes language immediately

### 7. Nuclear Option (If Nothing Works)
```bash
# Kill all Node processes
taskkill /F /IM node.exe

# Clear everything
rm -rf node_modules/.vite
rm -rf dist

# Restart
npm run dev
```

Then open a **NEW** incognito/private window: http://localhost:5177

## Verification Checklist
- [ ] Opened http://localhost:5177 (not 5173!)
- [ ] Hard refresh (Ctrl + Shift + R)
- [ ] See LanguageSwitcher in header
- [ ] Can switch between Vietnamese/Chinese
- [ ] Text changes throughout the app

## Debug in Browser Console
Open DevTools (F12) → Console tab, run:
```javascript
// Check current language
console.log('Current language:', localStorage.getItem('language'));

// Check i18n loaded
console.log('i18n available:', typeof window.i18n);

// Force change language
// This should update the UI immediately
```

## Common Issues
1. **Port confusion**: Make sure you're on 5177, not 5173
2. **Multiple tabs**: Close all tabs, open one new tab
3. **Service Workers**: Clear them in DevTools → Application → Service Workers
4. **Browser extensions**: Disable ad blockers/cache extensions
5. **Browser cache**: Most common issue - do hard refresh!

## Last Resort
1. Close browser completely
2. Kill dev server
3. Restart dev server
4. Open NEW incognito window
5. Go to http://localhost:5177
