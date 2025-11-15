# 📝 PROMPT TEMPLATES CHO TỪNG THREAD

**Hướng dẫn:** Copy prompt tương ứng vào đầu mỗi thread mới

---

## 🔖 TEMPLATE CHUNG (Dùng cho tất cả threads)

```
Dự án: Teaching Assistant Module - Vietnam EduCenter V1
Local Folder: C:\Users\abc\OneDrive\TrungTamGiaoDucGiaDinhVN\Teaching_Assistant_Module\
Git Branch: claude/read-documentation-01Np4Xq1d7Tr2gBvj8ozRAoV

Tài liệu tham khảo:
- ROADMAP.md: Tổng quan các phases
- IMPLEMENTATION_PLAN.md: Kế hoạch chi tiết
- docs/API_REQUIREMENTS.md: API specs

Git workflow:
1. git checkout claude/read-documentation-01Np4Xq1d7Tr2gBvj8ozRAoV
2. git pull
3. [Làm việc...]
4. git add .
5. git commit -m "Complete Phase [X]: [description]"
6. git push

Lưu ý: Commit thường xuyên, mỗi file hoàn thành nên commit riêng.
```

---

## 📝 THREAD 2: PHASE 1 - TYPE DEFINITIONS

### Copy prompt này:

```
# PHASE 1: TYPE DEFINITIONS

Dự án: Teaching Assistant Module - Vietnam EduCenter V1
Folder: C:\Users\abc\OneDrive\TrungTamGiaoDucGiaDinhVN\Teaching_Assistant_Module\
Branch: claude/read-documentation-01Np4Xq1d7Tr2gBvj8ozRAoV

## Mục tiêu
Tạo đầy đủ 8 TypeScript type definition files cho toàn bộ hệ thống.

## Files cần tạo (8 files, ~1,750 dòng)

1. src/types/messaging.types.ts (~200 dòng)
   - MessageType, MessageStatus enums
   - Attachment, MessageTemplate interfaces
   - Message, MessageRecipient interfaces
   - MessageFilter, MessageStats interfaces
   - Conversation, ConversationMessage interfaces
   - MessageQuota interface
   - API Request/Response types

2. src/types/class.types.ts (~250 dòng)
   - Class, Student, Parent interfaces
   - ClassDetail, ClassStats interfaces
   - ClassPerformance, ClassAssignment interfaces
   - API Request/Response types

3. src/types/parent.types.ts (~200 dòng)
   - ParentSegment enum
   - ParentDetail, ParentStudent interfaces
   - PaidCourse, Certificate interfaces
   - ParentFilterCondition interface
   - ParentActivity interface
   - API Request/Response types

4. src/types/content.types.ts (~300 dòng)
   - ContentType, ContentStatus enums
   - VideoContent, ArticleContent interfaces
   - MicroCourseContent interface (TikTok-style)
   - ContentAnalytics interface
   - Upload/Create request types
   - API Response types

5. src/types/ta.types.ts (~250 dòng)
   - TAProfile, TAPermission interfaces
   - TADashboard, TAKPIs interfaces
   - TAActivity, TATask, TAAlert interfaces
   - TAPerformanceMetrics interface
   - TASettings interface
   - API Request/Response types

6. src/types/learner.types.ts (~250 dòng)
   - CourseType, CourseStatus enums
   - Course, CourseLesson interfaces
   - ParentEnrollment interface
   - ParentPoints, PointsTransaction interfaces
   - ParentCertificate interface
   - API Request/Response types

7. src/types/analytics.types.ts (~150 dòng)
   - ReportDimension type
   - PurchaseReport, PurchaseDetail interfaces
   - ReportFilter interface
   - ExportFormat type
   - API Request/Response types

8. src/types/survey.types.ts (~150 dòng)
   - QuestionType enum
   - SurveyQuestion, Survey interfaces
   - SurveyResponse, SurveyAnalytics interfaces
   - API Request/Response types

9. Update src/types/index.ts
   - Export tất cả types từ 8 files trên

## Tài liệu tham khảo
- docs/API_REQUIREMENTS.md (section types cho từng endpoint)
- IMPLEMENTATION_PLAN.md (Phase 1)

## Yêu cầu
- Tất cả interfaces phải có đầy đủ JSDoc comments
- Sử dụng strict TypeScript types
- Export đầy đủ trong index.ts
- Commit mỗi file sau khi hoàn thành

## Checklist
- [ ] messaging.types.ts hoàn thành
- [ ] class.types.ts hoàn thành
- [ ] parent.types.ts hoàn thành
- [ ] content.types.ts hoàn thành
- [ ] ta.types.ts hoàn thành
- [ ] learner.types.ts hoàn thành
- [ ] analytics.types.ts hoàn thành
- [ ] survey.types.ts hoàn thành
- [ ] index.ts updated
- [ ] Test imports
- [ ] Git commit & push

Hãy bắt đầu từ file messaging.types.ts, tạo từng file một và commit sau mỗi file.
```

---

## 🔌 THREAD 3: PHASE 2A - CORE SERVICES

### Copy prompt này:

```
# PHASE 2A: CORE SERVICES (Auth & Class)

Dự án: Teaching Assistant Module
Folder: C:\Users\abc\OneDrive\TrungTamGiaoDucGiaDinhVN\Teaching_Assistant_Module\
Branch: claude/read-documentation-01Np4Xq1d7Tr2gBvj8ozRAoV

## Context
Phase 1 (Type Definitions) đã hoàn thành. Giờ implement services để kết nối Backend API.

## Mục tiêu
Implement Auth service và Class service - 2 services cơ bản nhất.

## Files cần tạo (2 files, ~350 dòng)

1. src/services/auth.service.ts (~150 dòng)
   Methods:
   - login(email, password): Promise<AuthResponse>
   - logout(): Promise<void>
   - refreshToken(): Promise<TokenResponse>
   - getCurrentUser(): Promise<UserResponse>
   - updatePassword(old, new): Promise<void>

   Endpoints:
   - POST /api/v1/ta/auth/login
   - POST /api/v1/ta/auth/logout
   - POST /api/v1/ta/auth/refresh
   - GET /api/v1/ta/auth/me
   - PUT /api/v1/ta/auth/password

2. src/services/class.service.ts (~200 dòng)
   Methods:
   - getClasses(params): Promise<GetClassesResponse>
   - getClassDetail(id): Promise<GetClassDetailResponse>
   - getParents(classId, params): Promise<GetParentsResponse>
   - approveParent(parentId, approve, reason?): Promise<ApproveParentResponse>
   - getClassStats(classId): Promise<GetClassStatsResponse>

   Endpoints:
   - GET /api/v1/ta/classes
   - GET /api/v1/ta/classes/:id
   - GET /api/v1/ta/classes/:id/parents
   - POST /api/v1/ta/parents/:id/approve
   - GET /api/v1/ta/classes/:id/stats

## Tài liệu tham khảo
- docs/API_REQUIREMENTS.md (section 1 & 2)
- src/services/api.ts (Axios instance đã setup)
- src/services/mockData.service.ts (tham khảo mock format)

## Yêu cầu
- Sử dụng api instance từ src/services/api.ts
- Import types từ src/types/
- Handle errors với try/catch
- Nếu Backend chưa sẵn sàng, return mock data (tham khảo mockData.service.ts)
- JSDoc comments cho tất cả functions
- Commit mỗi file sau khi hoàn thành

## Checklist
- [ ] auth.service.ts hoàn thành
  - [ ] login() với JWT handling
  - [ ] logout() clear tokens
  - [ ] refreshToken() logic
  - [ ] getCurrentUser()
  - [ ] updatePassword()
  - [ ] Error handling
- [ ] class.service.ts hoàn thành
  - [ ] getClasses() với pagination
  - [ ] getClassDetail()
  - [ ] getParents() với filters
  - [ ] approveParent()
  - [ ] getClassStats()
  - [ ] Error handling
- [ ] Test với mock data
- [ ] Git commit & push

Bắt đầu từ auth.service.ts, sau đó class.service.ts
```

---

## 🔌 THREAD 4: PHASE 2B - MESSAGING SERVICE

### Copy prompt này:

```
# PHASE 2B: MESSAGING SERVICE

Dự án: Teaching Assistant Module
Folder: C:\Users\abc\OneDrive\TrungTamGiaoDucGiaDinhVN\Teaching_Assistant_Module\
Branch: claude/read-documentation-01Np4Xq1d7Tr2gBvj8ozRAoV

## Context
Phase 1 (Types) và Phase 2A (Auth, Class services) đã hoàn thành.

## Mục tiêu
Implement Messaging service - service phức tạp nhất với 12 methods.

## File cần tạo (1 file, ~350 dòng)

src/services/messaging.service.ts (~350 dòng)

Methods cần implement:
1. sendMessage(data): Promise<SendMessageResponse>
2. getMessages(params): Promise<GetMessagesResponse>
3. getMessageDetail(id): Promise<Message>
4. scheduleMessage(data): Promise<SendMessageResponse>
5. cancelScheduledMessage(id): Promise<void>
6. getMessageStats(id): Promise<MessageStats>
7. getQuota(): Promise<GetQuotaResponse>
8. getTemplates(): Promise<MessageTemplate[]>
9. filterRecipients(filters): Promise<FilterParentsResponse>
10. getConversations(): Promise<MessageConversation[]>
11. getConversationMessages(id): Promise<ConversationMessage[]>
12. sendConversationMessage(id, content): Promise<ConversationMessage>

Endpoints (xem docs/API_REQUIREMENTS.md section 3):
- POST /api/v1/ta/messages/send
- GET /api/v1/ta/messages
- GET /api/v1/ta/messages/:id
- POST /api/v1/ta/messages/schedule
- DELETE /api/v1/ta/messages/:id/schedule
- GET /api/v1/ta/messages/:id/stats
- GET /api/v1/ta/messages/quota
- GET /api/v1/ta/messages/templates
- POST /api/v1/ta/messages/filter-recipients
- GET /api/v1/ta/conversations
- GET /api/v1/ta/conversations/:id/messages
- POST /api/v1/ta/conversations/:id/messages

## Tài liệu tham khảo
- docs/API_REQUIREMENTS.md (section 3 - Messaging)
- src/types/messaging.types.ts
- src/services/api.ts

## Yêu cầu
- Anti-spam logic trong sendMessage() (check quota)
- Handle scheduled messages
- Support filter recipients preview
- WebSocket support (optional, để sau)
- Mock data nếu Backend chưa sẵn sàng

## Checklist
- [ ] sendMessage() với validation
- [ ] getMessages() với pagination & filters
- [ ] getMessageDetail()
- [ ] scheduleMessage()
- [ ] cancelScheduledMessage()
- [ ] getMessageStats()
- [ ] getQuota() - anti-spam
- [ ] getTemplates()
- [ ] filterRecipients() - preview
- [ ] getConversations()
- [ ] getConversationMessages()
- [ ] sendConversationMessage()
- [ ] Error handling tất cả methods
- [ ] Test với mock data
- [ ] Git commit & push

Bắt đầu implement từng method theo thứ tự.
```

---

## 🔌 THREAD 5: PHASE 2C - CONTENT & UPLOAD

### Copy prompt này:

```
# PHASE 2C: CONTENT & UPLOAD SERVICES

Dự án: Teaching Assistant Module
Folder: C:\Users\abc\OneDrive\TrungTamGiaoDucGiaDinhVN\Teaching_Assistant_Module\
Branch: claude/read-documentation-01Np4Xq1d7Tr2gBvj8ozRAoV

## Context
Phase 1, 2A, 2B đã hoàn thành.

## Mục tiêu
Implement Content, Upload, và Learner services.

## Files cần tạo (3 files, ~500 dòng)

1. src/services/content.service.ts (~250 dòng)
   - getContents()
   - getContentDetail()
   - uploadVideo()
   - createArticle()
   - updateContent()
   - deleteContent()
   - publishContent()
   - getContentAnalytics()
   - getCategories()

2. src/services/upload.service.ts (~150 dòng)
   - uploadImage()
   - uploadVideo() với progress callback
   - uploadFile()
   - deleteUpload()

3. src/services/learner.service.ts (~100 dòng)
   - getCourses()
   - getCourseDetail()
   - getRecommendations()

## Tài liệu tham khảo
- docs/API_REQUIREMENTS.md (sections 4, 6)
- src/types/content.types.ts
- src/types/learner.types.ts

## Yêu cầu
- Upload service phải có progress callback
- Validate file types & sizes
- Handle FormData cho file upload
- Content service support video & article

## Checklist
- [ ] content.service.ts hoàn thành
- [ ] upload.service.ts với progress
- [ ] learner.service.ts hoàn thành
- [ ] Test upload flow
- [ ] Git commit & push

Bắt đầu từ content.service.ts
```

---

## 🔌 THREAD 6: PHASE 2D - REMAINING SERVICES

### Copy prompt này:

```
# PHASE 2D: REMAINING SERVICES

Dự án: Teaching Assistant Module
Folder: C:\Users\abc\OneDrive\TrungTamGiaoDucGiaDinhVN\Teaching_Assistant_Module\
Branch: claude/read-documentation-01Np4Xq1d7Tr2gBvj8ozRAoV

## Context
Phase 1, 2A, 2B, 2C đã hoàn thành. Đây là phase cuối của Services.

## Mục tiêu
Hoàn tất 3 services còn lại: Parent, TA, Analytics.

## Files cần tạo (3 files, ~450 dòng)

1. src/services/parent.service.ts (~150 dòng)
   - getParentDetail()
   - getParentActivities()
   - getParentSegmentStats()
   - filterParents()

2. src/services/ta.service.ts (~200 dòng)
   - getProfile()
   - updateProfile()
   - getDashboard()
   - getPerformance()
   - getSettings()
   - updateSettings()
   - getActivities()
   - markAlertRead()

3. src/services/analytics.service.ts (~100 dòng)
   - getPurchaseReports()
   - getPurchaseDetails()
   - exportReport() - return Blob
   - getDashboardAnalytics()

## Tài liệu tham khảo
- docs/API_REQUIREMENTS.md (sections 5, 7)
- src/types/parent.types.ts
- src/types/ta.types.ts
- src/types/analytics.types.ts

## Yêu cầu
- TA Dashboard service phải return đầy đủ KPIs
- Analytics export phải return Blob
- Parent segment stats với charts data

## Checklist
- [ ] parent.service.ts hoàn thành
- [ ] ta.service.ts hoàn thành
- [ ] analytics.service.ts hoàn thành
- [ ] Integration test TẤT CẢ services (1-9)
- [ ] Update src/services/index.ts export all
- [ ] Git commit & push

DELIVERABLE: Tất cả 9 services hoàn thành!
```

---

## 🎨 THREAD 7: PHASE 3A - DASHBOARD COMPONENTS

### Copy prompt này:

```
# PHASE 3A: DASHBOARD COMPONENTS

Dự án: Teaching Assistant Module
Folder: C:\Users\abc\OneDrive\TrungTamGiaoDucGiaDinhVN\Teaching_Assistant_Module\
Branch: claude/read-documentation-01Np4Xq1d7Tr2gBvj8ozRAoV

## Context
Phase 1 (Types) và Phase 2 (Services) đã hoàn thành. Giờ tạo UI Components.

## Mục tiêu
Tạo 4 core dashboard components.

## Files cần tạo (4 files + CSS, ~1,100 dòng)

1. src/components/ta-dashboard/TADashboard.tsx (~300 dòng)
   Features:
   - KPIs display (totalClasses, totalParents, etc.)
   - Parent segmentation chart
   - Recent activities list
   - Class performance table
   - Upcoming tasks
   - Alerts/notifications
   Dependencies:
   - taService.getDashboard()
   - Ant Design: Card, Statistic, Table
   - Recharts: PieChart

2. src/components/ta-dashboard/MessageComposer.tsx (~400 dòng)
   Features:
   - Rich text editor (React Quill)
   - Template selector
   - Attachment upload (image, video, file)
   - Recipient filter builder
   - Schedule picker
   - Preview modal
   - Anti-spam warning
   Dependencies:
   - messagingService.sendMessage()
   - uploadService.uploadFile()
   - Ant Design: Form, Upload, Modal

3. src/components/ta-dashboard/ParentListTable.tsx (~350 dòng)
   Features:
   - Advanced filters (segment, paid, points)
   - Multi-select for bulk actions
   - Export to Excel
   - Quick actions (message, view)
   - Pagination & search
   Dependencies:
   - parentService.filterParents()
   - Ant Design: Table, Select

4. src/components/ta-dashboard/PerformanceMetrics.tsx (~250 dòng)
   Features:
   - Message delivery/read rates
   - Response time
   - Parent conversion rates
   - Performance score
   - Trend charts
   Dependencies:
   - taService.getPerformance()
   - Recharts: LineChart, BarChart

## Tài liệu tham khảo
- IMPLEMENTATION_PLAN.md (Phase 3A)
- src/types/ta.types.ts
- src/services/ta.service.ts

## Yêu cầu
- Sử dụng Ant Design components
- Responsive design (desktop first)
- Loading states
- Error handling
- Tạo CSS file riêng cho mỗi component

## Checklist
- [ ] TADashboard.tsx + CSS
- [ ] MessageComposer.tsx + CSS
- [ ] ParentListTable.tsx + CSS
- [ ] PerformanceMetrics.tsx + CSS
- [ ] Test tất cả components
- [ ] Git commit mỗi component
- [ ] Final push

Bắt đầu từ TADashboard.tsx
```

---

## 🎨 THREAD 8: PHASE 3B - COMMUNICATION COMPONENTS

### Copy prompt này:

```
# PHASE 3B: COMMUNICATION COMPONENTS

Dự án: Teaching Assistant Module
Folder: C:\Users\abc\OneDrive\TrungTamGiaoDucGiaDinhVN\Teaching_Assistant_Module\
Branch: claude/read-documentation-01Np4Xq1d7Tr2gBvj8ozRAoV

## Context
Phase 1, 2, 3A đã hoàn thành.

## Mục tiêu
Tạo messaging & communication components.

## Files cần tạo (4 files + CSS, ~900 dòng)

1. src/components/ta-dashboard/ParentCard.tsx (~150 dòng)
2. src/components/ta-dashboard/MessagePanel.tsx (~200 dòng)
3. src/components/ta-dashboard/ParentCommunication.tsx (~300 dòng)
4. src/components/ta-dashboard/QuotaLimitModal.tsx (~100 dòng)

## Tài liệu tham khảo
- IMPLEMENTATION_PLAN.md (Phase 3B)
- src/types/messaging.types.ts
- src/services/messaging.service.ts

## Checklist
- [ ] ParentCard.tsx + CSS
- [ ] MessagePanel.tsx + CSS
- [ ] ParentCommunication.tsx + CSS (chat UI)
- [ ] QuotaLimitModal.tsx + CSS
- [ ] Test components
- [ ] Git commit & push
```

---

## 🎨 THREAD 9: PHASE 3C - UTILITY COMPONENTS

### Copy prompt này:

```
# PHASE 3C: UTILITY COMPONENTS

Dự án: Teaching Assistant Module
Folder: C:\Users\abc\OneDrive\TrungTamGiaoDucGiaDinhVN\Teaching_Assistant_Module\
Branch: claude/read-documentation-01Np4Xq1d7Tr2gBvj8ozRAoV

## Mục tiêu
Tạo các utility components nhỏ.

## Files cần tạo (3 files, ~280 dòng)

1. src/components/ta-dashboard/CircularProgress.tsx (~80 dòng)
2. src/components/ta-dashboard/TALineChart.tsx (~100 dòng)
3. src/components/ta-dashboard/TAHeader.tsx (~80 dòng)

## Checklist
- [ ] CircularProgress.tsx (animated)
- [ ] TALineChart.tsx (Recharts wrapper)
- [ ] TAHeader.tsx (page header)
- [ ] Test all
- [ ] Git commit & push

DELIVERABLE: Tất cả 11 TA components hoàn thành!
```

---

## 📤 THREAD 10: PHASE 4 - UPLOAD FEATURES

### Copy prompt này:

```
# PHASE 4: UPLOAD FEATURES

Dự án: Teaching Assistant Module
Folder: C:\Users\abc\OneDrive\TrungTamGiaoDucGiaDinhVN\Teaching_Assistant_Module\
Branch: claude/read-documentation-01Np4Xq1d7Tr2gBvj8ozRAoV

## Context
All services và components đã có. Giờ tích hợp upload.

## Mục tiêu
Tích hợp file upload vào MessageComposer và ContentPage.

## Files cần update/create
- MessageComposer.tsx (update - add upload)
- ContentPage/index.tsx (update - improve upload)
- UploadManager.tsx (new - ~150 dòng)

## Checklist
- [ ] Update MessageComposer: image/video/file upload
- [ ] Update ContentPage: drag & drop, multiple files
- [ ] Create UploadManager: queue, progress, retry
- [ ] Test upload flow
- [ ] Git commit & push
```

---

## 📊 THREAD 11: PHASE 5 - PURCHASE REPORTS

### Copy prompt này:

```
# PHASE 5: PURCHASE REPORTS

Dự án: Teaching Assistant Module
Folder: C:\Users\abc\OneDrive\TrungTamGiaoDucGiaDinhVN\Teaching_Assistant_Module\
Branch: claude/read-documentation-01Np4Xq1d7Tr2gBvj8ozRAoV

## Mục tiêu
Implement báo cáo đặt mua đa chiều.

## Files cần tạo (4 files, ~600 dòng)
- src/pages/PurchaseReportPage/index.tsx (~200 dòng)
- src/components/analytics/ReportBuilder.tsx (~150 dòng)
- src/components/analytics/ReportTable.tsx (~150 dòng)
- src/components/analytics/ReportChart.tsx (~100 dòng)

## Features
- Dimension selector (Class, Grade, School, Province)
- Date range picker
- Summary stats
- Export Excel/PDF

## Checklist
- [ ] PurchaseReportPage
- [ ] ReportBuilder
- [ ] ReportTable
- [ ] ReportChart
- [ ] Add route /analytics/purchases
- [ ] Git commit & push
```

---

## 📨 THREAD 12: PHASE 6 - INBOX/SUPPORT

### Copy prompt này:

```
# PHASE 6: INBOX/SUPPORT SYSTEM

Dự án: Teaching Assistant Module
Folder: C:\Users\abc\OneDrive\TrungTamGiaoDucGiaDinhVN\Teaching_Assistant_Module\
Branch: claude/read-documentation-01Np4Xq1d7Tr2gBvj8ozRAoV

## Mục tiêu
Hoàn thiện InboxPage và support components.

## Files cần update/create (4 files, ~500 dòng)
- src/pages/InboxPage/index.tsx (update ~200 dòng)
- src/components/inbox/TicketList.tsx (~150 dòng)
- src/components/inbox/TicketDetail.tsx (~150 dòng)
- src/components/inbox/CannedResponseSelector.tsx (~100 dòng)

## Features
- Ticket list & detail
- Reply to tickets
- Canned responses
- Status management

## Checklist
- [ ] Update InboxPage
- [ ] TicketList
- [ ] TicketDetail
- [ ] CannedResponseSelector
- [ ] Git commit & push
```

---

## 👤 THREAD 13: PHASE 7 - PROFILE PAGE

### Copy prompt này:

```
# PHASE 7: PROFILE PAGE

Dự án: Teaching Assistant Module
Folder: C:\Users\abc\OneDrive\TrungTamGiaoDucGiaDinhVN\Teaching_Assistant_Module\
Branch: claude/read-documentation-01Np4Xq1d7Tr2gBvj8ozRAoV

## Mục tiêu
Hoàn thiện ProfilePage.

## File cần update (1 file, ~300 dòng)
- src/pages/ProfilePage/index.tsx

## Features
- View/Edit profile
- Change password
- Upload avatar
- View assigned classes
- Performance metrics
- Settings (notifications, language)

## Checklist
- [ ] Profile view/edit form
- [ ] Password change
- [ ] Avatar upload
- [ ] Settings panel
- [ ] Git commit & push
```

---

## 🧪 THREAD 14: PHASE 8 - TESTING & BUG FIXES

### Copy prompt này:

```
# PHASE 8: TESTING & BUG FIXES

Dự án: Teaching Assistant Module
Folder: C:\Users\abc\OneDrive\TrungTamGiaoDucGiaDinhVN\Teaching_Assistant_Module\
Branch: claude/read-documentation-01Np4Xq1d7Tr2gBvj8ozRAoV

## Mục tiêu
Test toàn bộ hệ thống và fix bugs.

## Testing Checklist
- [ ] Unit tests cho services
- [ ] Integration tests
- [ ] Manual testing all features
- [ ] Cross-browser (Chrome, Firefox, Edge)
- [ ] Responsive (Desktop, Tablet)
- [ ] Accessibility (keyboard, screen reader)
- [ ] Performance optimization
- [ ] Fix all critical bugs
- [ ] Git commit fixes

Liệt kê bugs tìm được và fix từng cái.
```

---

## 📚 THREAD 15: PHASE 9 - DOCUMENTATION

### Copy prompt này:

```
# PHASE 9: DOCUMENTATION

Dự án: Teaching Assistant Module
Folder: C:\Users\abc\OneDrive\TrungTamGiaoDucGiaDinhVN\Teaching_Assistant_Module\
Branch: claude/read-documentation-01Np4Xq1d7Tr2gBvj8ozRAoV

## Mục tiêu
Viết documentation đầy đủ.

## Files cần tạo (3 files, ~800 dòng)
- docs/DEVELOPER_GUIDE.md (~300 dòng)
- docs/USER_GUIDE.md (~300 dòng)
- docs/DEPLOYMENT_GUIDE.md (~200 dòng)

## Nội dung
- Setup instructions
- Project structure
- API integration
- Features & usage
- Deployment guide
- Troubleshooting

## Checklist
- [ ] DEVELOPER_GUIDE.md
- [ ] USER_GUIDE.md
- [ ] DEPLOYMENT_GUIDE.md
- [ ] Update README.md
- [ ] Git commit & push
```

---

## 🚀 THREAD 16: PHASE 10 - DEPLOYMENT

### Copy prompt này:

```
# PHASE 10: DEPLOYMENT

Dự án: Teaching Assistant Module
Folder: C:\Users\abc\OneDrive\TrungTamGiaoDucGiaDinhVN\Teaching_Assistant_Module\
Branch: claude/read-documentation-01Np4Xq1d7Tr2gBvj8ozRAoV

## Mục tiêu
Deploy lên production (Vietnam VPS).

## Tasks
1. Build production
2. Setup VPS (SSH, Node, Nginx)
3. SSL certificate
4. Deploy
5. CI/CD setup
6. Monitoring

## Checklist
- [ ] Production build test
- [ ] VPS setup
- [ ] Nginx config
- [ ] SSL setup
- [ ] Deploy
- [ ] GitHub Actions CI/CD
- [ ] Monitoring (Sentry)
- [ ] Handover docs

🎉 HOÀN THÀNH DỰ ÁN!
```

---

## 📋 CÁCH SỬ DỤNG

### Cho mỗi thread mới:

1. **Copy prompt tương ứng** từ file này
2. **Paste vào đầu thread mới** trong Claude
3. **Git pull** để lấy code mới nhất:
   ```bash
   cd C:\Users\abc\OneDrive\TrungTamGiaoDucGiaDinhVN\Teaching_Assistant_Module
   git pull
   ```
4. **Bắt đầu làm việc** theo checklist
5. **Commit thường xuyên**:
   ```bash
   git add .
   git commit -m "Complete [feature name]"
   git push
   ```
6. **Update ROADMAP.md** khi hoàn thành phase

---

## 📊 TRACKING PROGRESS

Update progress trong ROADMAP.md sau mỗi phase:
```
Phase 1:  ✅ 100% (DONE)
Phase 2A: ✅ 100% (DONE)
...
```

---

**Last Updated:** 15/11/2025
**Total Threads:** 16
**Total Phases:** 10 (chia thành 16 sub-phases)
