# UAT QUICK REFERENCE CHECKLIST
## Teaching Assistant WebApp - Tester Guide

**Version:** 1.0
**Date:** 01/11/2025
**Total Test Items:** 77 scenarios + general checks

---

## 🚀 GETTING STARTED

### Pre-Testing Setup

- [ ] Received UAT kickoff meeting invitation
- [ ] Reviewed UAT Plan document
- [ ] Reviewed PRD (Product Requirements Document)
- [ ] Have test account credentials (ta1@test.com / Test@123)
- [ ] Application URL accessible: http://localhost:5173
- [ ] Browser installed (Chrome 120+, Edge 120+, or Firefox 120+)
- [ ] Screen resolution at least 1366x768
- [ ] Good internet connection (5 Mbps+)
- [ ] Issue tracker access (Jira/Trello/GitHub)
- [ ] Screenshot/screen recording tool ready

---

## 📋 DAILY TESTING CHECKLIST

### Day 1-2: Core Features (5-6 hours)

#### Authentication (30 min)
- [ ] AUTH-001: Login with valid credentials
- [ ] AUTH-002: Login with invalid password
- [ ] AUTH-003: Login with invalid email format
- [ ] AUTH-004: Logout successfully
- [ ] AUTH-005: Protected routes redirect to login

**Status:** Pass: ___ / 5 | Fail: ___ / 5

---

#### Dashboard (1.5 hours)
- [ ] DASH-001: Dashboard loads successfully
- [ ] DASH-002: KPI cards show correct data
- [ ] DASH-003: Performance chart displays
- [ ] DASH-004: Engagement trend chart displays
- [ ] DASH-005: Recent activities table loads
- [ ] DASH-006: Responsive design works
- [ ] DASH-007: Analytics page loads all charts
- [ ] DASH-008: Export buttons present

**Status:** Pass: ___ / 8 | Fail: ___ / 8

---

#### Classes Management (2 hours)
- [ ] CLASS-001: Classes list loads
- [ ] CLASS-002: Search classes works
- [ ] CLASS-003: Sort table works
- [ ] CLASS-004: Pagination controls work
- [ ] CLASS-005: View class detail
- [ ] CLASS-006: Class detail shows parent list
- [ ] CLASS-007: Search parents in class detail
- [ ] CLASS-008: View parent detail modal
- [ ] CLASS-009: Class stats cards display
- [ ] CLASS-010: Back to classes list

**Status:** Pass: ___ / 10 | Fail: ___ / 10

---

#### Navigation & Layout (30 min)
- [ ] Sidebar menu displays all items
- [ ] Active menu item highlights
- [ ] Header shows user name/avatar
- [ ] User dropdown menu works
- [ ] All menu items navigate correctly
- [ ] Browser back/forward buttons work
- [ ] No broken links

**Status:** Pass: ___ / 7 | Fail: ___ / 7

---

### Day 3: Communication Features (3 hours)

#### Targeted Messaging (2 hours)
- [ ] MSG-001: Messaging page loads
- [ ] MSG-002: Select target classes
- [ ] MSG-003: Filter by condition
- [ ] MSG-004: Select message template
- [ ] MSG-005: Rich text editor works
- [ ] MSG-006: Schedule message
- [ ] MSG-007: Preview message
- [ ] MSG-008: Validation - no class selected
- [ ] MSG-009: Validation - no content
- [ ] MSG-010: Send message successfully
- [ ] MSG-011: Send scheduled message
- [ ] MSG-012: Form reset

**Status:** Pass: ___ / 12 | Fail: ___ / 12

---

#### Support Inbox (1 hour)
- [ ] INBOX-001: Inbox page loads
- [ ] INBOX-002: Switch ticket status tabs
- [ ] INBOX-003: Ticket list displays correctly
- [ ] INBOX-004: Open ticket detail
- [ ] INBOX-005: Select canned response
- [ ] INBOX-006: Reply to ticket
- [ ] INBOX-007: Send reply and close ticket
- [ ] INBOX-008: Send reply and keep open
- [ ] INBOX-009: Transfer ticket to admin
- [ ] INBOX-010: Close ticket detail modal

**Status:** Pass: ___ / 10 | Fail: ___ / 10

---

### Day 4: Content & Analytics (3.5 hours)

#### Content Management (1.5 hours)
- [ ] CONT-001: Content page loads
- [ ] CONT-002: Switch between tabs
- [ ] CONT-003: Upload video form displays
- [ ] CONT-004: Video upload - select file
- [ ] CONT-005: Video upload - form validation
- [ ] CONT-006: Video upload - submit form
- [ ] CONT-007: Create article form displays
- [ ] CONT-008: Create article - submit

**Status:** Pass: ___ / 8 | Fail: ___ / 8

---

#### Analytics (1 hour)
- [ ] Charts load on Analytics page
- [ ] Line chart displays correctly
- [ ] Bar chart displays correctly
- [ ] Pie chart displays correctly
- [ ] Date range picker works
- [ ] Export buttons respond
- [ ] Tooltips work on hover

**Status:** Pass: ___ / 7 | Fail: ___ / 7

---

#### Class Detail & Parents (1 hour)
- [ ] Navigate to class detail
- [ ] Stats cards display
- [ ] Parent list table loads
- [ ] Search parents works
- [ ] View parent detail modal
- [ ] Progress bars display correctly
- [ ] Can navigate back to classes

**Status:** Pass: ___ / 7 | Fail: ___ / 7

---

### Day 5: Profile & End-to-End (3.5 hours)

#### Profile Management (30 min)
- [ ] PROF-001: Profile page loads
- [ ] PROF-002: View current profile info
- [ ] PROF-003: Update profile information
- [ ] PROF-004: Change password - validation
- [ ] PROF-005: Change password - success
- [ ] PROF-006: Notification settings toggles

**Status:** Pass: ___ / 6 | Fail: ___ / 6

---

#### Cross-Feature Workflows (2 hours)
- [ ] WORK-001: Complete login to dashboard flow
- [ ] WORK-002: Class to parent detail workflow
- [ ] WORK-003: Message creation full workflow
- [ ] WORK-004: Content creation and publishing
- [ ] WORK-005: Support ticket full lifecycle
- [ ] WORK-006: Dashboard to analytics workflow
- [ ] WORK-007: Profile update and re-login
- [ ] WORK-008: Multi-page navigation flow

**Status:** Pass: ___ / 8 | Fail: ___ / 8

---

#### Error Handling (30 min)
- [ ] ERR-001: Invalid route handling
- [ ] ERR-002: Network error simulation
- [ ] ERR-003: Session expiration
- [ ] ERR-004: Form submission errors
- [ ] ERR-005: Browser console errors

**Status:** Pass: ___ / 5 | Fail: ___ / 5

---

#### Usability & Performance (30 min)
- [ ] PERF-001: Page load performance (< 3s)
- [ ] PERF-002: Table scrolling performance
- [ ] PERF-003: Chart rendering performance
- [ ] USAB-001: Vietnamese language consistency
- [ ] USAB-002: Responsive design (tablet)

**Status:** Pass: ___ / 5 | Fail: ___ / 5

---

## 🎯 CRITICAL PATH TESTING

### Must-Pass Scenarios (Critical Priority)

These scenarios MUST pass before production sign-off:

- [ ] ✅ AUTH-001: Can login with valid credentials
- [ ] ✅ AUTH-004: Can logout successfully
- [ ] ✅ DASH-001: Dashboard loads
- [ ] ✅ CLASS-001: Classes list loads
- [ ] ✅ CLASS-005: Can view class detail
- [ ] ✅ MSG-001: Messaging page loads
- [ ] ✅ MSG-010: Can send message successfully
- [ ] ✅ CONT-001: Content page loads
- [ ] ✅ INBOX-001: Inbox page loads
- [ ] ✅ PROF-001: Profile page loads
- [ ] ✅ WORK-001: Complete login flow works
- [ ] ✅ WORK-003: Message workflow works end-to-end

**Critical Pass Rate:** ___ / 12 (Must be 12/12 = 100%)

---

## 📝 DAILY REPORTING CHECKLIST

### End of Each Testing Day

- [ ] Log all defects in issue tracker
- [ ] Update test scenario status (Pass/Fail)
- [ ] Take screenshots of all failures
- [ ] Note any usability concerns
- [ ] Fill out daily status summary:

**Daily Status Template:**

```
Date: __________
Tester: __________
Time Spent: ____ hours

Scenarios Executed: ____ / 77
Pass: ____
Fail: ____
Blocked: ____

Critical Issues Found: ____
High Priority Issues: ____
Medium Priority Issues: ____
Low Priority Issues: ____

Blockers: ____________________
Notes: _______________________
```

---

## 🐛 ISSUE LOGGING CHECKLIST

### When You Find a Bug

- [ ] Take screenshot or screen recording
- [ ] Note exact steps to reproduce
- [ ] Note expected vs actual result
- [ ] Note browser and OS version
- [ ] Assign severity level (Critical/High/Medium/Low)
- [ ] Log in issue tracker with all details
- [ ] Link to test scenario ID
- [ ] Notify UAT Lead if critical

---

## ✅ FINAL SIGN-OFF CHECKLIST

### Before Approving for Production

- [ ] All critical scenarios passed (12/12)
- [ ] At least 95% of high priority scenarios passed
- [ ] At least 85% of all scenarios passed
- [ ] No critical bugs open
- [ ] No high priority bugs open (or approved to defer)
- [ ] All medium/low bugs documented for backlog
- [ ] Usability feedback collected
- [ ] Performance acceptable (page load < 3s)
- [ ] Vietnamese language verified
- [ ] Responsive design tested
- [ ] Browser compatibility verified (Chrome, Edge, Firefox)
- [ ] UAT feedback form submitted
- [ ] Final review meeting attended
- [ ] Sign-off document signed

**Overall UAT Status:** ☐ PASS ☐ FAIL ☐ CONDITIONAL PASS

---

## 🎨 USABILITY EVALUATION CHECKLIST

### General Usability

- [ ] Is navigation intuitive?
- [ ] Are labels clear and descriptive?
- [ ] Are buttons easy to find and click?
- [ ] Is form layout logical?
- [ ] Are error messages helpful?
- [ ] Is loading feedback appropriate?
- [ ] Is Vietnamese text natural and correct?
- [ ] Are icons meaningful?
- [ ] Is color coding consistent?
- [ ] Are tables easy to read?
- [ ] Are charts easy to understand?
- [ ] Is overall design professional?

**Usability Score:** ___ / 12

---

## ⚡ PERFORMANCE CHECKLIST

### Speed & Responsiveness

- [ ] Login completes in < 2 seconds
- [ ] Dashboard loads in < 2 seconds
- [ ] Other pages load in < 3 seconds
- [ ] Charts render in < 2 seconds
- [ ] Tables scroll smoothly
- [ ] Search filters update quickly (< 1s)
- [ ] Forms submit without delay
- [ ] No browser freezing
- [ ] No excessive loading spinners
- [ ] Transitions are smooth

**Performance Score:** ___ / 10

---

## 📱 RESPONSIVE DESIGN CHECKLIST

### Tablet Testing (768px - 1024px)

- [ ] Layout adjusts appropriately
- [ ] Sidebar collapses or adapts
- [ ] Tables are scrollable or adjust
- [ ] Charts resize correctly
- [ ] Forms remain usable
- [ ] Buttons are tap-friendly
- [ ] No horizontal scrolling (unless table)
- [ ] All content is accessible
- [ ] Navigation works on smaller screen
- [ ] Text is readable

**Responsive Score:** ___ / 10

---

## 🌐 BROWSER COMPATIBILITY CHECKLIST

### Test on Multiple Browsers

**Chrome:**
- [ ] All features work
- [ ] No console errors
- [ ] Visual layout correct

**Edge:**
- [ ] All features work
- [ ] No console errors
- [ ] Visual layout correct

**Firefox:**
- [ ] All features work
- [ ] No console errors
- [ ] Visual layout correct

**Issues Found:** _________________________

---

## 📊 OVERALL PROGRESS TRACKER

### Total Scenarios by Priority

| Priority | Total | Executed | Pass | Fail | % Pass |
|----------|-------|----------|------|------|--------|
| Critical | 12 | ___ | ___ | ___ | ___% |
| High | 25 | ___ | ___ | ___ | ___% |
| Medium | 30 | ___ | ___ | ___ | ___% |
| Low | 10 | ___ | ___ | ___ | ___% |
| **TOTAL** | **77** | ___ | ___ | ___ | ___% |

---

### Exit Criteria Status

- [ ] ✅ 100% of critical scenarios passed
- [ ] ✅ ≥95% of high priority scenarios passed
- [ ] ✅ ≥85% of all scenarios passed
- [ ] ✅ No critical bugs open
- [ ] ✅ No high priority bugs open
- [ ] ✅ Performance meets targets
- [ ] ✅ Documentation updated
- [ ] ✅ Sign-off obtained

**Exit Criteria Met:** ___ / 8

---

## 🎯 TESTING TIPS

### Best Practices

1. **Test Systematically**
   - Follow scenarios in order
   - Don't skip steps
   - Complete one section before moving to next

2. **Take Good Notes**
   - Document everything
   - Screenshots are your friend
   - Note exact error messages

3. **Think Like a User**
   - What would a teaching assistant do?
   - What's confusing or unclear?
   - What would make work easier?

4. **Report Issues Clearly**
   - Use issue template
   - Provide reproduction steps
   - Include all context

5. **Focus on User Experience**
   - Is it easy to use?
   - Is it efficient?
   - Would you use this daily?

6. **Don't Rush**
   - Quality over speed
   - Better to find issues in UAT than production
   - Take breaks to stay fresh

---

## 📞 QUICK CONTACTS

**Technical Issues:**
- Support Email: [dev-support@educonnect.vn]
- Slack: #ta-webapp-uat

**UAT Lead:**
- Name: [TBD]
- Email: [TBD]
- Phone: [TBD]

**Issue Tracker:**
- URL: [Jira/Trello/GitHub URL]

**Emergency Contact:**
- [Emergency contact for critical blockers]

---

## 📅 IMPORTANT DATES

- **UAT Start Date:** [TBD]
- **UAT End Date:** [TBD]
- **Feedback Due Date:** [TBD]
- **Final Review Meeting:** [TBD]
- **Sign-Off Deadline:** [TBD]
- **Planned Production Launch:** [TBD]

---

## ✍️ TESTER SIGN-OFF

**I confirm that I have:**
- [ ] Executed all assigned test scenarios
- [ ] Logged all defects found
- [ ] Submitted feedback form
- [ ] Provided usability ratings
- [ ] Participated in review meeting
- [ ] Provided honest and thorough feedback

**Tester Name:** _______________________________

**Signature:** _______________________________

**Date:** _______________________________

**Recommendation:** ☐ APPROVE ☐ APPROVE WITH CONDITIONS ☐ REJECT

**Conditions/Comments:**
________________________________________________________________

________________________________________________________________

________________________________________________________________

---

**END OF UAT CHECKLIST**

**Print this checklist and keep it handy during testing!**
