# 🗺️ ROADMAP HOÀN CHỈNH - TEACHING ASSISTANT MODULE

**Dự án:** Vietnam EduCenter V1 - Teaching Assistant Frontend

**Timeline:** 3-4 tuần (17-21 ngày)

**Local Folder:** `C:\Users\abc\OneDrive\TrungTamGiaoDucGiaDinhVN\Teaching_Assistant_Module\`

**Git Branch:** `claude/read-documentation-01Np4Xq1d7Tr2gBvj8ozRAoV`

---

## 📊 TỔNG QUAN PHASES

| Phase | Tên | Files | Dòng code | Thời gian | Thread |
|-------|-----|-------|-----------|-----------|--------|
| **0** | Planning & Documentation | 3 | 2,831 | 1 ngày | ✅ Thread 1 |
| **1** | Type Definitions | 8 | ~1,750 | 1-2 ngày | Thread 2 |
| **2A** | Core Services (Auth, Class) | 2 | ~350 | 1 ngày | Thread 3 |
| **2B** | Messaging Service | 1 | ~350 | 1 ngày | Thread 4 |
| **2C** | Content & Upload Services | 3 | ~500 | 1 ngày | Thread 5 |
| **2D** | Remaining Services | 3 | ~450 | 1 ngày | Thread 6 |
| **3A** | Dashboard Components | 4 | ~1,100 | 1 ngày | Thread 7 |
| **3B** | Communication Components | 3 | ~600 | 1 ngày | Thread 8 |
| **3C** | Utility Components | 4 | ~380 | 1 ngày | Thread 9 |
| **4** | Upload Features | - | ~400 | 1 ngày | Thread 10 |
| **5** | Purchase Reports | 4 | ~500 | 1 ngày | Thread 11 |
| **6** | Inbox/Support | 3 | ~400 | 1 ngày | Thread 12 |
| **7** | Profile Page | 1 | ~300 | 1 ngày | Thread 13 |
| **8** | Testing & Fixes | - | - | 2-3 ngày | Thread 14 |
| **9** | Documentation | 3 | ~800 | 1 ngày | Thread 15 |
| **10** | Deployment | - | - | 1 ngày | Thread 16 |

**TỔNG:** 16 threads, ~10,700 dòng code, 17-21 ngày

---

## 📋 CHI TIẾT TỪNG PHASE

### ✅ PHASE 0: PLANNING & DOCUMENTATION (Thread 1) - DONE

**Mục tiêu:** Chuẩn bị tài liệu và kế hoạch chi tiết

**Files đã tạo:**
- ✅ `IMPLEMENTATION_PLAN.md` (1,156 dòng)
- ✅ `docs/API_REQUIREMENTS.md` (1,500+ dòng)
- ✅ `SUMMARY_PHASE_0.md` (381 dòng)
- ✅ `ROADMAP.md` (file này)
- ✅ `PROMPTS.md` (862 dòng)
- ✅ `QUICK_START.md` (345 dòng)

**Deliverables:**
- ✅ Kế hoạch 10 phases chi tiết
- ✅ API requirements cho Đội A
- ✅ 16 prompt templates sẵn
- ✅ Roadmap tổng quan

---

### 📝 PHASE 1: TYPE DEFINITIONS (Thread 2)

**Mục tiêu:** Định nghĩa đầy đủ TypeScript types

**Files cần tạo:**
1. `/src/types/messaging.types.ts` (~200 dòng)
2. `/src/types/class.types.ts` (~250 dòng)
3. `/src/types/parent.types.ts` (~200 dòng)
4. `/src/types/content.types.ts` (~300 dòng)
5. `/src/types/ta.types.ts` (~250 dòng)
6. `/src/types/learner.types.ts` (~250 dòng)
7. `/src/types/analytics.types.ts` (~150 dòng) - NEW
8. `/src/types/survey.types.ts` (~150 dòng) - NEW

**Tổng:** 8 files, ~1,750 dòng

**Dependencies:** Không có

**Checklist:**
- [ ] messaging.types.ts
- [ ] class.types.ts
- [ ] parent.types.ts
- [ ] content.types.ts
- [ ] ta.types.ts
- [ ] learner.types.ts
- [ ] analytics.types.ts
- [ ] survey.types.ts
- [ ] Update `/src/types/index.ts`

---

### 🔌 PHASE 2A: CORE SERVICES (Thread 3)

**Mục tiêu:** Auth và Class services

**Files cần tạo:**
1. `/src/services/auth.service.ts` (~150 dòng)
2. `/src/services/class.service.ts` (~200 dòng)

**Tổng:** 2 files, ~350 dòng

**Dependencies:** Phase 1 (types)

**Checklist:**
- [ ] auth.service.ts
- [ ] class.service.ts
- [ ] Test với mock server
- [ ] Error handling

---

### 🔌 PHASE 2B: MESSAGING SERVICE (Thread 4)

**Mục tiêu:** Messaging service đầy đủ

**Files cần tạo:**
1. `/src/services/messaging.service.ts` (~350 dòng)

**Tổng:** 1 file, ~350 dòng

**Dependencies:** Phase 1 (types), Phase 2A

**Checklist:**
- [ ] messaging.service.ts
- [ ] Test tất cả endpoints
- [ ] Quota handling
- [ ] Template support

---

### 🔌 PHASE 2C: CONTENT & UPLOAD SERVICES (Thread 5)

**Mục tiêu:** Content và Upload services

**Files cần tạo:**
1. `/src/services/content.service.ts` (~250 dòng)
2. `/src/services/upload.service.ts` (~150 dòng)
3. Update `/src/services/api.ts` (~100 dòng)

**Tổng:** 3 files, ~500 dòng

**Dependencies:** Phase 1 (types), Phase 2A

**Checklist:**
- [ ] content.service.ts
- [ ] upload.service.ts
- [ ] Update api.ts
- [ ] Test upload progress

---

### 🔌 PHASE 2D: REMAINING SERVICES (Thread 6)

**Mục tiêu:** Các services còn lại

**Files cần tạo:**
1. `/src/services/parent.service.ts` (~150 dòng)
2. `/src/services/ta.service.ts` (~200 dòng)
3. `/src/services/analytics.service.ts` (~200 dòng) - NEW
4. `/src/services/learner.service.ts` (~100 dòng)

**Tổng:** 4 files, ~650 dòng

**Dependencies:** Phase 1 (types), Phase 2A

**Checklist:**
- [ ] parent.service.ts
- [ ] ta.service.ts
- [ ] analytics.service.ts
- [ ] learner.service.ts
- [ ] Integration test

---

### 🎨 PHASE 3A: DASHBOARD COMPONENTS (Thread 7)

**Mục tiêu:** Core dashboard components

**Files cần tạo:**
1. `/src/components/ta-dashboard/TADashboard.tsx` (~300 dòng)
2. `/src/components/ta-dashboard/MessageComposer.tsx` (~400 dòng)
3. `/src/components/ta-dashboard/ParentListTable.tsx` (~350 dòng)
4. `/src/components/ta-dashboard/PerformanceMetrics.tsx` (~250 dòng)

**Tổng:** 4 files, ~1,300 dòng

**Dependencies:** Phase 2 (services), Phase 1 (types)

**Checklist:**
- [ ] TADashboard.tsx + CSS
- [ ] MessageComposer.tsx + CSS
- [ ] ParentListTable.tsx + CSS
- [ ] PerformanceMetrics.tsx + CSS
- [ ] Responsive design

---

### 🎨 PHASE 3B: COMMUNICATION COMPONENTS (Thread 8)

**Mục tiêu:** Communication components

**Files cần tạo:**
1. `/src/components/ta-dashboard/ParentCommunication.tsx` (~300 dòng)
2. `/src/components/ta-dashboard/MessagePanel.tsx` (~200 dòng)
3. `/src/components/ta-dashboard/ParentCard.tsx` (~150 dòng)

**Tổng:** 3 files, ~650 dòng

**Dependencies:** Phase 2B (messaging), Phase 3A

**Checklist:**
- [ ] ParentCommunication.tsx + CSS
- [ ] MessagePanel.tsx + CSS
- [ ] ParentCard.tsx + CSS
- [ ] Real-time updates (optional)

---

### 🎨 PHASE 3C: UTILITY COMPONENTS (Thread 9)

**Mục tiêu:** Utility components

**Files cần tạo:**
1. `/src/components/ta-dashboard/QuotaLimitModal.tsx` (~100 dòng)
2. `/src/components/ta-dashboard/CircularProgress.tsx` (~80 dòng)
3. `/src/components/ta-dashboard/TALineChart.tsx` (~100 dòng)
4. `/src/components/ta-dashboard/TAHeader.tsx` (~80 dòng)

**Tổng:** 4 files, ~360 dòng

**Dependencies:** Phase 2B, Phase 3A

**Checklist:**
- [ ] QuotaLimitModal.tsx + CSS
- [ ] CircularProgress.tsx + CSS
- [ ] TALineChart.tsx + CSS
- [ ] TAHeader.tsx + CSS

---

### 📤 PHASE 4: UPLOAD FEATURES (Thread 10)

**Mục tiêu:** Hoàn thiện upload features

**Files cần update:**
- Update `MessageComposer.tsx`
- Update `ContentPage`
- Create `UploadManager.tsx` (optional)

**Tổng:** ~400 dòng code

**Dependencies:** Phase 2C, Phase 3A

**Checklist:**
- [ ] Image upload trong MessageComposer
- [ ] Video upload với progress
- [ ] Drag & drop
- [ ] File validation
- [ ] Upload queue manager

---

### 📊 PHASE 5: PURCHASE REPORTS (Thread 11)

**Mục tiêu:** Báo cáo đặt mua đa chiều

**Files cần tạo:**
1. `/src/pages/PurchaseReportPage/index.tsx` (~200 dòng)
2. `/src/components/analytics/ReportBuilder.tsx` (~150 dòng)
3. `/src/components/analytics/ReportTable.tsx` (~100 dòng)
4. `/src/components/analytics/ReportChart.tsx` (~100 dòng)

**Tổng:** 4 files, ~550 dòng

**Dependencies:** Phase 2D (analytics service), Phase 1 (types)

**Checklist:**
- [ ] PurchaseReportPage
- [ ] ReportBuilder component
- [ ] ReportTable component
- [ ] ReportChart component
- [ ] Export Excel/PDF

---

### 📨 PHASE 6: INBOX/SUPPORT (Thread 12)

**Mục tiêu:** Hoàn thiện inbox/support system

**Files cần tạo:**
1. Update `/src/pages/InboxPage/index.tsx` (~200 dòng)
2. `/src/components/inbox/TicketList.tsx` (~100 dòng)
3. `/src/components/inbox/TicketDetail.tsx` (~100 dòng)

**Tổng:** 3 files, ~400 dòng

**Dependencies:** Phase 2B, Phase 3B

**Checklist:**
- [ ] Ticket list
- [ ] Ticket detail
- [ ] Reply functionality
- [ ] Canned responses
- [ ] SLA tracking

---

### 👤 PHASE 7: PROFILE PAGE (Thread 13)

**Mục tiêu:** Hoàn thiện profile page

**Files cần tạo:**
1. Update `/src/pages/ProfilePage/index.tsx` (~300 dòng)

**Tổng:** 1 file, ~300 dòng

**Dependencies:** Phase 2D (ta service), Phase 2C (upload)

**Checklist:**
- [ ] View profile
- [ ] Edit profile
- [ ] Change password
- [ ] Upload avatar
- [ ] Settings

---

### 🧪 PHASE 8: TESTING & FIXES (Thread 14)

**Mục tiêu:** Testing và bug fixes

**Tasks:**
- Unit testing
- Integration testing
- Manual testing
- Bug fixes
- Performance optimization

**Dependencies:** Tất cả phases trước

**Checklist:**
- [ ] Unit tests
- [ ] Integration tests
- [ ] Manual testing
- [ ] Cross-browser testing
- [ ] Bug fixes
- [ ] Performance optimization

---

### 📚 PHASE 9: DOCUMENTATION (Thread 15)

**Mục tiêu:** Hoàn thiện documentation

**Files cần tạo:**
1. Update `/docs/API_REQUIREMENTS.md`
2. `/docs/DEVELOPER_GUIDE.md` (~400 dòng)
3. `/docs/USER_GUIDE.md` (~400 dòng)

**Tổng:** 3 files, ~800 dòng

**Dependencies:** Tất cả phases

**Checklist:**
- [ ] API requirements update
- [ ] Developer guide
- [ ] User guide
- [ ] Code comments

---

### 🚀 PHASE 10: DEPLOYMENT (Thread 16)

**Mục tiêu:** Deploy lên production

**Tasks:**
- Environment setup
- Build production
- VPS configuration
- Deploy
- CI/CD setup

**Dependencies:** Phase 9

**Checklist:**
- [ ] Environment variables
- [ ] Production build
- [ ] VPS setup
- [ ] Nginx config
- [ ] SSL certificate
- [ ] Deploy
- [ ] CI/CD
- [ ] Monitoring

---

## 📅 TIMELINE TỔNG HỢP

| Week | Days | Phases | Threads |
|------|------|--------|---------|
| **Week 1** | 1-6 | Phase 1-2 | Threads 2-6 |
| **Week 2** | 7-11 | Phase 3 | Threads 7-9 |
| **Week 3** | 12-16 | Phase 4-7 | Threads 10-13 |
| **Week 4** | 17-21 | Phase 8-10 | Threads 14-16 |

**Tổng:** 17-21 ngày làm việc

---

## 🚦 DEPENDENCIES

### Critical Dependencies
1. **Backend API từ Đội A**
   - Status: ⏳ Chờ
   - Impact: Blocker cho Phase 2
   - Mitigation: Dùng mock data

2. **Design System**
   - Status: ✅ Ant Design
   - Impact: None

3. **Vietnam VPS**
   - Status: ⏳ Cần thuê
   - Impact: Blocker cho Phase 10
   - Mitigation: Deploy local test trước

---

## 📊 PROGRESS TRACKING

### Template cho mỗi Thread:

```markdown
## Thread X: [Phase Name]

**Status:** ⏳ In Progress / ✅ Complete / ❌ Blocked

**Started:** [Date]
**Completed:** [Date]
**Time spent:** [Hours]

**Files created:**
- [ ] file1.ts
- [ ] file2.ts

**Issues:**
- Issue 1
- Issue 2

**Notes:**
- Note 1
- Note 2
```

---

## ✅ DEFINITION OF DONE

### Cho mỗi Thread:
- [ ] Code complete
- [ ] Tested
- [ ] No critical bugs
- [ ] Committed to git
- [ ] Documentation updated

### Cho toàn bộ dự án:
- [ ] Tất cả features hoạt động
- [ ] API integration hoàn thành
- [ ] All tests passing
- [ ] Performance optimized
- [ ] Documentation complete
- [ ] Deployed to production

---

**Last Updated:** 15/11/2025  
**Status:** 🚀 READY FOR PHASE 1

