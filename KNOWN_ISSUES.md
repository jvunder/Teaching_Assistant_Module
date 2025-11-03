# KNOWN ISSUES & LIMITATIONS
## Teaching Assistant WebApp

**Version:** 1.0
**Date:** 01/11/2025
**Status:** Pre-UAT Documentation

---

## 📋 OVERVIEW

This document lists all known issues, limitations, and planned improvements for the Teaching Assistant WebApp. These items are documented to set proper expectations during User Acceptance Testing (UAT) and to plan for future development sprints.

---

## 🚫 CURRENT LIMITATIONS

### 1. Mock Data Service (Expected - By Design)

**Status:** ⚠️ **EXPECTED LIMITATION**

**Description:**
The application currently uses a mock data service instead of connecting to a real backend API. All data is generated in-memory and does not persist.

**Impact:**
- ✅ **No Impact on UAT:** This is intentional for frontend-only testing
- ❌ **No Data Persistence:** Changes don't save across page refreshes
- ❌ **No Real Validation:** All submissions return success

**Affected Features:**
- All CRUD operations (Create, Read, Update, Delete)
- Login (accepts any email with password ≥6 chars)
- Messaging (messages not actually sent)
- Content uploads (files not actually uploaded)
- Profile updates (changes not saved)
- Ticket replies (not saved to database)

**Resolution:**
- **Phase 4:** Backend Integration (5-7 days)
- Replace mock service with real API calls
- Expected completion: [TBD]

**Workaround for UAT:**
- Focus on UI/UX testing
- Validate workflows and usability
- Ignore lack of persistence

---

### 2. Surveys Module Not Implemented

**Status:** ⚠️ **KNOWN GAP**

**Description:**
The Surveys module exists as a placeholder page but has no functionality implemented.

**Impact:**
- ❌ Cannot create surveys
- ❌ Cannot view survey responses
- ❌ Page shows "Coming Soon" or placeholder content

**Affected Features:**
- Surveys page (`/surveys`)
- Survey analytics
- Parent survey responses

**Resolution:**
- **Phase 3:** Surveys Module Implementation (3-4 days)
- Full survey creation, distribution, and analytics
- Expected completion: [TBD]

**Workaround for UAT:**
- Skip testing this module
- Focus on other 9 implemented features

---

### 3. No Real-Time Notifications

**Status:** ⚠️ **PLANNED FEATURE**

**Description:**
Real-time notifications (WebSocket) are not implemented. Notification counts and updates require page refresh.

**Impact:**
- ❌ No live updates for new tickets
- ❌ No live updates for new messages
- ❌ No push notifications
- ✅ Can still see notifications after refresh

**Affected Features:**
- Support inbox unread count
- Dashboard unread messages count
- Notification bell in header

**Resolution:**
- **Phase 6:** WebSocket Integration (3-4 days)
- Real-time updates via Socket.io
- Expected completion: [TBD]

**Workaround:**
- Manually refresh page to see updates
- Mock data will show static counts

---

### 4. No Multi-Language Support

**Status:** ⚠️ **OUT OF SCOPE (v1)**

**Description:**
Application is Vietnamese-only. No internationalization (i18n) support.

**Impact:**
- ❌ Cannot switch to English or other languages
- ✅ All Vietnamese text is correct

**Affected Features:**
- All pages and components

**Resolution:**
- **Phase 7 (Future):** i18n Support (5-7 days)
- Add English language option
- Framework: react-i18next
- Expected: V2 release

**Workaround:**
- Use Vietnamese only
- Acceptable for Vietnam market

---

### 5. Mobile Optimization Limited

**Status:** ⚠️ **KNOWN LIMITATION**

**Description:**
Application is optimized for desktop and tablet (≥768px). Mobile phone view (<768px) has limited optimization.

**Impact:**
- ✅ Desktop (≥1366px): Fully optimized
- ✅ Tablet (768-1023px): Good support
- ⚠️ Mobile (<768px): Basic support, may have usability issues

**Affected Features:**
- All pages on mobile phones
- Tables may require horizontal scrolling
- Forms may be cramped
- Charts may be too small

**Resolution:**
- **Phase 8 (Future):** Mobile Optimization (4-5 days)
- Fully responsive design for phones
- Consider native mobile app (React Native)

**Workaround for UAT:**
- Test on desktop or tablet only
- Minimum screen size: 1366x768

---

### 6. No Offline Support

**Status:** ⚠️ **OUT OF SCOPE (v1)**

**Description:**
No Progressive Web App (PWA) features. No offline caching. Requires internet connection.

**Impact:**
- ❌ Cannot use when offline
- ❌ No service worker
- ❌ No app installation

**Affected Features:**
- All features require internet

**Resolution:**
- **Phase 9 (Future):** PWA Implementation (3-4 days)
- Service worker caching
- Offline support for read-only features

**Workaround:**
- Ensure stable internet connection during use

---

### 7. Limited Browser Support

**Status:** ⚠️ **BY DESIGN**

**Description:**
Only modern browsers supported. No IE11 or older browser support.

**Impact:**
- ✅ Chrome 120+: Fully supported
- ✅ Edge 120+: Fully supported
- ✅ Firefox 120+: Fully supported
- ❌ Internet Explorer: Not supported
- ❌ Safari <15: Not tested, may have issues

**Affected Features:**
- All features on unsupported browsers

**Resolution:**
- No plan to support IE11 (deprecated by Microsoft)
- Safari testing in future phases

**Workaround:**
- Use recommended browsers for UAT

---

### 8. No Bulk Operations

**Status:** ⚠️ **PLANNED FEATURE**

**Description:**
Cannot perform bulk actions like multi-select delete, bulk assign, etc.

**Impact:**
- ❌ Cannot select multiple classes to send one message
- ❌ Cannot bulk delete content
- ❌ Cannot bulk close tickets

**Affected Features:**
- Classes list
- Content list
- Inbox tickets

**Resolution:**
- **Phase 10 (Future):** Bulk Operations (2-3 days)
- Multi-select checkboxes
- Bulk action buttons

**Workaround:**
- Perform actions one at a time
- Use filters to narrow scope

---

### 9. Export Functions Are Mocked

**Status:** ⚠️ **MOCK IMPLEMENTATION**

**Description:**
Export to Excel/PDF buttons are present but only show UI feedback. No actual file download.

**Impact:**
- ❌ Clicking "Export Excel" doesn't generate file
- ❌ Clicking "Export PDF" doesn't generate file
- ✅ Buttons are visible and clickable (UI testing OK)

**Affected Features:**
- Analytics page export buttons

**Resolution:**
- **Phase 11:** Real Export Implementation (2-3 days)
- Libraries: xlsx, jspdf
- Backend API may be needed for full data export

**Workaround for UAT:**
- Verify buttons exist and are clickable
- Ignore actual file generation

---

### 10. No Email Integration

**Status:** ⚠️ **BACKEND DEPENDENCY**

**Description:**
Sending messages to parents doesn't actually send emails. This is a backend feature.

**Impact:**
- ❌ No real email sent when "Send Message"
- ❌ No email verification
- ❌ No password reset emails

**Affected Features:**
- Messaging system
- Password reset (if implemented)
- Email notifications

**Resolution:**
- **Phase 4:** Backend Integration includes email service
- Backend team will implement SMTP/SendGrid
- Frontend will just call API

**Workaround for UAT:**
- Verify UI flow only
- Email sending is backend responsibility

---

## 🐛 KNOWN BUGS (Pre-UAT)

### BUG-001: Chart Tooltip May Flash on Fast Hover

**Severity:** Low
**Status:** Open

**Description:**
When hovering quickly over chart data points, tooltips may flash or not appear.

**Steps to Reproduce:**
1. Go to Dashboard or Analytics page
2. Quickly move mouse over chart bars/lines
3. Tooltip may flicker

**Expected:** Smooth tooltip display
**Actual:** Occasional flicker

**Impact:** Minor visual glitch, doesn't affect functionality

**Resolution:** Optimize Recharts tooltip configuration (1 hour)

**Workaround:** Hover slowly over data points

---

### BUG-002: Long Class Names May Overflow in Table

**Severity:** Low
**Status:** Open

**Description:**
Class names longer than ~30 characters may overflow table cells on smaller screens.

**Steps to Reproduce:**
1. Go to Classes page
2. Resize browser to 1024px width
3. Observe long class names

**Expected:** Text wraps or truncates with ellipsis
**Actual:** May overflow cell

**Impact:** Visual issue on smaller screens

**Resolution:** Add CSS text-overflow: ellipsis (30 min)

**Workaround:** Use desktop resolution (≥1366px)

---

### BUG-003: ReactQuill Toolbar May Overlap Content on Small Screens

**Severity:** Low
**Status:** Open

**Description:**
Rich text editor toolbar may overlap content when screen height is small (<768px).

**Steps to Reproduce:**
1. Go to Messaging or Content page
2. Resize browser height to <768px
3. Observe editor toolbar

**Expected:** Toolbar stays within view
**Actual:** May overlap content below

**Impact:** Minor usability issue on small screens

**Resolution:** Adjust editor max-height and toolbar positioning (1 hour)

**Workaround:** Use standard screen size (1080px+ height)

---

### BUG-004: Date Picker May Show Behind Modal on Some Pages

**Severity:** Low
**Status:** Open

**Description:**
Date picker dropdown may render behind modal overlay in rare cases.

**Steps to Reproduce:**
1. Open ticket detail modal
2. (If date picker is in modal - currently not)
3. Date picker may show behind modal

**Expected:** Date picker on top of all elements
**Actual:** May render with wrong z-index

**Impact:** Cannot select date if this occurs

**Resolution:** Adjust z-index values (30 min)

**Workaround:** Close modal, use date picker outside modal

---

### BUG-005: Search Box Doesn't Debounce on Rapid Typing

**Severity:** Low
**Status:** Open

**Description:**
Search boxes trigger filter on every keystroke without debouncing, may cause performance issues with large datasets.

**Steps to Reproduce:**
1. Go to Classes page
2. Type quickly in search box
3. Filter runs on every character

**Expected:** Debounce search (wait 300ms after typing stops)
**Actual:** Instant search on each keystroke

**Impact:** Minor performance impact with mock data (no issue). May cause issues with real API.

**Resolution:** Add debounce to search handlers (1 hour)

**Workaround:** Type slowly or wait until finished before searching

---

## ⚙️ TECHNICAL DEBT

### TECH-001: Some Components Lack Unit Tests

**Priority:** Medium

**Description:**
Unit tests are not implemented for most components. Recommended before production.

**Impact:**
- ❌ No automated test coverage
- ❌ Higher risk of regressions

**Resolution:**
- **Phase 5:** Testing Implementation (5-7 days)
- Add Vitest unit tests
- Target: >80% coverage

**Timeline:** Before production launch

---

### TECH-002: No E2E Tests

**Priority:** Medium

**Description:**
End-to-end tests (Cypress/Playwright) are not implemented.

**Impact:**
- ❌ No automated user flow testing
- ✅ UAT covers this manually

**Resolution:**
- **Phase 5:** Add Cypress E2E tests (5-7 days)
- Automate critical user flows

**Timeline:** Before production launch (recommended)

---

### TECH-003: Bundle Size Could Be Optimized

**Priority:** Low

**Description:**
Current bundle size: 535 KB gzipped. Could be reduced further with lazy loading.

**Impact:**
- ✅ Already under 800 KB target
- ⚠️ Could be better (~400 KB with optimization)

**Resolution:**
- **Phase 7:** Advanced Optimization (2-3 days)
- Lazy load routes
- Dynamic imports for charts
- Tree shaking improvements

**Timeline:** Post-launch optimization

---

### TECH-004: Error Boundary Not Implemented

**Priority:** Medium

**Description:**
No error boundary to catch React errors. App may crash on unhandled errors.

**Impact:**
- ❌ Entire app may crash on component error
- ❌ No graceful error handling

**Resolution:**
- Add React Error Boundary (2 hours)
- Show friendly error page instead of blank screen

**Timeline:** Before production launch

---

### TECH-005: Accessibility (a11y) Not Fully Tested

**Priority:** Medium

**Description:**
ARIA labels, keyboard navigation, and screen reader support not thoroughly tested.

**Impact:**
- ⚠️ May not be usable by people with disabilities
- ❌ May not meet accessibility standards

**Resolution:**
- **Phase 12:** Accessibility Audit (3-4 days)
- Add ARIA labels
- Test with screen readers
- Ensure keyboard navigation

**Timeline:** V2 release

---

## 📝 DOCUMENTATION GAPS

### DOC-001: User Manual Not Available

**Priority:** Medium

**Description:**
End-user documentation/user manual is not yet created.

**Impact:**
- ❌ No help documentation for users
- ❌ No training materials

**Resolution:**
- Create user manual (3-4 days)
- Video tutorials (2-3 days)
- In-app help tooltips (1-2 days)

**Timeline:** Before production launch

---

### DOC-002: API Documentation Incomplete

**Priority:** Low (Frontend-only currently)

**Description:**
API integration documentation is basic. Needs more detail for backend team.

**Impact:**
- ⚠️ Backend team may need clarification on expected API format

**Resolution:**
- Expand API documentation (1-2 days)
- Create OpenAPI/Swagger spec (2-3 days)

**Timeline:** Before backend integration (Phase 4)

---

## 🚀 PLANNED IMPROVEMENTS

### Feature Requests (Future Versions)

#### FEAT-001: Advanced Search/Filtering
**Priority:** Medium
**Description:** Add more filter options (date range, multiple conditions, saved filters)
**Timeline:** V2 release

#### FEAT-002: Dashboard Customization
**Priority:** Low
**Description:** Allow users to customize dashboard widgets and layout
**Timeline:** V2 release

#### FEAT-003: Message Templates Management
**Priority:** Medium
**Description:** Allow users to create and manage their own message templates
**Timeline:** V1.1 release

#### FEAT-004: Class Groups
**Priority:** Medium
**Description:** Group multiple classes for bulk operations
**Timeline:** V1.1 release

#### FEAT-005: Parent Engagement Scoring
**Priority:** High
**Description:** AI-powered engagement scoring and predictions
**Timeline:** V2 release

#### FEAT-006: Automated Reminders
**Priority:** High
**Description:** Schedule automatic reminder messages based on triggers
**Timeline:** V1.1 release

#### FEAT-007: Video Conferencing Integration
**Priority:** Low
**Description:** Integrate Zoom/Google Meet for parent meetings
**Timeline:** V3 release

#### FEAT-008: Mobile App
**Priority:** High
**Description:** Native mobile app (React Native) for iOS and Android
**Timeline:** V2 release

---

## ✅ ACCEPTANCE CRITERIA FOR UAT

### What Should NOT Block UAT Approval

These known issues are acceptable and should NOT prevent UAT sign-off:

✅ Mock data service (expected limitation)
✅ No Surveys module (planned for Phase 3)
✅ No real-time notifications (planned for Phase 6)
✅ Export functions are mocked (planned for Phase 11)
✅ No actual email sending (backend responsibility)
✅ Minor UI glitches on charts (low severity)
✅ Mobile optimization limited (out of scope for V1)
✅ No multi-language support (V2 feature)

### What SHOULD Block UAT Approval

These issues would be blockers:

❌ Cannot login at all
❌ Dashboard doesn't load
❌ Critical features completely broken
❌ App crashes frequently
❌ Data loss or corruption (if using real backend)
❌ Security vulnerabilities
❌ Vietnamese language is incorrect or inappropriate
❌ Major usability problems preventing task completion

---

## 📊 KNOWN ISSUES SUMMARY

| Category | Count | Critical | High | Medium | Low |
|----------|-------|----------|------|--------|-----|
| **Limitations** | 10 | 0 | 0 | 10 | 0 |
| **Bugs** | 5 | 0 | 0 | 0 | 5 |
| **Technical Debt** | 5 | 0 | 2 | 3 | 0 |
| **Doc Gaps** | 2 | 0 | 0 | 2 | 0 |
| **Feature Requests** | 8 | 0 | 3 | 4 | 1 |
| **TOTAL** | **30** | **0** | **5** | **19** | **6** |

---

## 🔄 ISSUE TRACKING

All known issues are tracked in:
- **This Document:** For UAT transparency
- **GitHub Issues:** [Repository URL]
- **Jira/Trello:** [Project Board URL]

---

## 📅 RESOLUTION TIMELINE

### Pre-Production (Before Launch)
- [ ] BUG-002: Long class names overflow (30 min)
- [ ] BUG-003: ReactQuill toolbar overlap (1 hour)
- [ ] BUG-005: Search debouncing (1 hour)
- [ ] TECH-004: Error boundary (2 hours)
- [ ] DOC-001: User manual (3-4 days)

**Total:** ~4 days

### Phase 3: Surveys Module
- [ ] Implement surveys feature (3-4 days)

### Phase 4: Backend Integration
- [ ] Replace mock data service (5-7 days)
- [ ] Real email sending (backend)
- [ ] Real exports (2-3 days)

### Phase 5: Testing
- [ ] Unit tests (5-7 days)
- [ ] E2E tests (5-7 days)

### Post-Launch (V1.1)
- [ ] Message templates management
- [ ] Automated reminders
- [ ] Class groups

### Future (V2)
- [ ] Real-time notifications
- [ ] i18n support
- [ ] Mobile optimization
- [ ] PWA features
- [ ] Mobile app
- [ ] AI engagement scoring

---

## 📞 REPORTING NEW ISSUES

If you find issues NOT listed in this document during UAT:

1. **Check this document first** to avoid duplicates
2. **Log in issue tracker** with full details
3. **Notify UAT Lead** if critical
4. **Update this document** for transparency

**Issue Tracker:** [URL]
**UAT Lead Email:** [Email]

---

**Document Owner:** Development Team
**Last Updated:** 01/11/2025
**Version:** 1.0
**Next Review:** After UAT completion

---

**END OF KNOWN ISSUES DOCUMENT**
