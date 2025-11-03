# 🧪 UAT TESTING SESSION
# Teaching Assistant WebApp - Active Testing

**Session Started:** [Auto-generated on access]  
**Status:** 🟢 **ACTIVE**

---

## 🚀 QUICK START

### 1. Access Application
👉 **Open:** http://localhost:5173

### 2. Test Login
**Mock Credentials (Any will work):**
```
Email: test@example.com
Password: password123
```

### 3. Start Testing
👉 **Open:** `UAT_TEST_SCENARIOS.md`  
👉 **Begin with:** TC-001 (Critical scenarios first)

---

## 📋 CRITICAL SCENARIOS (Must Pass 100%)

### ✅ TC-001: Login with Valid Credentials
**Steps:**
1. Navigate to http://localhost:5173
2. Should redirect to /login
3. Enter email: `test@example.com`
4. Enter password: `anypassword`
5. Click "Đăng nhập"
6. Should redirect to /dashboard

**Expected:** ✅ Login successful, redirects to dashboard  
**Actual:** [Fill during testing]  
**Result:** [ ] ✅ PASS | [ ] ❌ FAIL

---

### ✅ TC-002: Login with Invalid Credentials
**Steps:**
1. Navigate to /login
2. Enter invalid email or password
3. Click "Đăng nhập"

**Expected:** ❌ Error message shown, stays on login page  
**Actual:** [Fill during testing]  
**Result:** [ ] ✅ PASS | [ ] ❌ FAIL

---

### ✅ TC-003: Access Protected Route Without Auth
**Steps:**
1. Clear localStorage/sessionStorage
2. Navigate directly to http://localhost:5173/dashboard
3. Should redirect to /login

**Expected:** ✅ Redirects to login page  
**Actual:** [Fill during testing]  
**Result:** [ ] ✅ PASS | [ ] ❌ FAIL

---

### ✅ TC-004: Dashboard Loads with KPIs
**Steps:**
1. Login successfully
2. Should see Dashboard page
3. Verify 4 KPI cards display:
   - Total Classes
   - Total Students
   - Total Parents
   - Unread Messages

**Expected:** ✅ All 4 KPI cards visible with numbers  
**Actual:** [Fill during testing]  
**Result:** [ ] ✅ PASS | [ ] ❌ FAIL

---

### ✅ TC-005: Send Message to Class
**Steps:**
1. Navigate to /messaging
2. Fill message content
3. Add filter condition (select class)
4. Click "Gửi ngay"

**Expected:** ✅ Message sent successfully, confirmation shown  
**Actual:** [Fill during testing]  
**Result:** [ ] ✅ PASS | [ ] ❌ FAIL

---

### ✅ TC-006: Upload Video Content
**Steps:**
1. Navigate to /content
2. Click "Upload Video"
3. Fill form (title, description, file)
4. Click "Upload"

**Expected:** ✅ Upload successful, video appears in list  
**Actual:** [Fill during testing]  
**Result:** [ ] ✅ PASS | [ ] ❌ FAIL

---

### ✅ TC-007: View Class Detail
**Steps:**
1. Navigate to /classes
2. Click "Xem chi tiết" on any class
3. Should see class detail page with:
   - Stats cards
   - Parent list
   - Progress tab

**Expected:** ✅ Class detail page loads correctly  
**Actual:** [Fill during testing]  
**Result:** [ ] ✅ PASS | [ ] ❌ FAIL

---

### ✅ TC-008: Reply to Support Ticket
**Steps:**
1. Navigate to /inbox
2. Click on a ticket
3. Click "Phản hồi"
4. Fill reply content
5. Click "Gửi phản hồi"

**Expected:** ✅ Reply sent successfully  
**Actual:** [Fill during testing]  
**Result:** [ ] ✅ PASS | [ ] ❌ FAIL

---

### ✅ TC-009: View Analytics Charts
**Steps:**
1. Navigate to /analytics
2. Verify charts display:
   - Line chart (engagement)
   - Bar chart (performance)
   - Pie chart (message stats)

**Expected:** ✅ All 3 charts render correctly  
**Actual:** [Fill during testing]  
**Result:** [ ] ✅ PASS | [ ] ❌ FAIL

---

### ✅ TC-010: Update Profile Information
**Steps:**
1. Navigate to /profile
2. Edit full name
3. Click "Lưu thay đổi"

**Expected:** ✅ Profile updated successfully  
**Actual:** [Fill during testing]  
**Result:** [ ] ✅ PASS | [ ] ❌ FAIL

---

### ✅ TC-011: Change Password
**Steps:**
1. Navigate to /profile
2. Go to "Đổi mật khẩu" tab
3. Fill current password
4. Fill new password
5. Fill confirm password
6. Click "Đổi mật khẩu"

**Expected:** ✅ Password changed successfully  
**Actual:** [Fill during testing]  
**Result:** [ ] ✅ PASS | [ ] ❌ FAIL

---

### ✅ TC-012: Logout Functionality
**Steps:**
1. Click user menu in header
2. Click "Đăng xuất"
3. Should redirect to /login
4. Try accessing /dashboard

**Expected:** ✅ Logged out, redirected to login, protected routes blocked  
**Actual:** [Fill during testing]  
**Result:** [ ] ✅ PASS | [ ] ❌ FAIL

---

## 📊 CRITICAL SCENARIOS SUMMARY

**Total Critical:** 12  
**Completed:** ___/12  
**Passed:** ___/12  
**Failed:** ___/12  
**Pass Rate:** ___%

**Status:** [ ] ✅ 100% Pass | [ ] ❌ Needs Fix

---

## 🎯 NEXT STEPS

After completing critical scenarios:

1. ✅ Report any failures immediately
2. ✅ Continue with High Priority scenarios
3. ✅ Update `UAT_CHECKLIST.md`
4. ✅ Submit daily status report

---

## 📝 ISSUE REPORTING

**Found a bug?** Report immediately:

1. **Critical Bug:** Report right away
2. **Use Template:** See `UAT_DAY1_START.md`
3. **Include:** Steps, Expected, Actual, Screenshot
4. **Update:** Issue tracker

---

## ✅ END OF CRITICAL TESTING

**Critical Scenarios Status:**
- [ ] All 12 passed ✅
- [ ] Issues documented
- [ ] Ready for High Priority scenarios

---

**Continue with:** High Priority Scenarios (25 scenarios)

**See:** `UAT_TEST_SCENARIOS.md` for full list

---

*Session Active - Continue Testing*



