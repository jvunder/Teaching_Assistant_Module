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
2. Làm việc
3. git add .
4. git commit -m "Phase X: [Description]"
5. git push
```

---

## 📝 THREAD 2: PHASE 1 - TYPE DEFINITIONS

```
Dự án: Teaching Assistant Module - Vietnam EduCenter V1
Local Folder: C:\Users\abc\OneDrive\TrungTamGiaoDucGiaDinhVN\Teaching_Assistant_Module\
Git Branch: claude/read-documentation-01Np4Xq1d7Tr2gBvj8ozRAoV

Tài liệu tham khảo:
- ROADMAP.md: Phase 1 details
- IMPLEMENTATION_PLAN.md: Phase 1 section (lines 27-147)
- docs/API_REQUIREMENTS.md: API types reference

MỤC TIÊU:
Tạo đầy đủ 8 TypeScript type definition files cho toàn bộ hệ thống.

FILES CẦN TẠO:

1. /src/types/messaging.types.ts (~200 dòng)
   - MessageType, MessageStatus enums
   - Attachment interface
   - MessageTemplate interface
   - MessageRecipient interface
   - MessageFilter interface
   - Message interface (full với tất cả fields)
   - MessageStats interface
   - MessageConversation & ConversationMessage interfaces
   - MessageQuota interface (anti-spam)
   - API Request/Response types (GetMessagesRequest, SendMessageResponse, etc.)

2. /src/types/class.types.ts (~250 dòng)
   - Class interface
   - Student interface
   - Parent interface (basic version)
   - ParentLearningProgress interface
   - ClassDetail interface
   - ClassStats interface
   - ClassPerformance interface
   - ClassAssignment interface
   - API Request/Response types

3. /src/types/parent.types.ts (~200 dòng)
   - ParentSegment enum
   - ParentDetail interface (extended version)
   - ParentStudent interface
   - PaidCourse interface
   - Certificate interface
   - ParentFilterCondition interface
   - ParentSegmentStats interface
   - ParentActivity interface
   - API Request/Response types

4. /src/types/content.types.ts (~300 dòng)
   - ContentType, ContentStatus enums
   - VideoContent interface
   - ArticleContent interface
   - MicroCourseContent interface (TikTok-style)
   - ContentAnalytics interface
   - ViewsByDate, ViewsByClass interfaces
   - Upload/Create request types
   - API Response types

5. /src/types/ta.types.ts (~250 dòng)
   - TAProfile interface
   - TAPermission enum
   - TADashboard interface
   - TAKPIs interface
   - TAActivity, TATask, TAAlert interfaces
   - TAPerformanceMetrics interface
   - TASettings interface
   - API Request/Response types

6. /src/types/learner.types.ts (~250 dòng)
   - CourseType, CourseStatus enums
   - Course, CourseLesson interfaces
   - ParentEnrollment interface
   - ParentLessonProgress interface
   - ParentPoints, PointsTransaction interfaces
   - ParentCertificate interface
   - CourseRecommendation interface
   - API Request/Response types

7. /src/types/analytics.types.ts (~150 dòng) - NEW
   - ReportDimension type ('class' | 'grade' | 'school' | 'province')
   - PurchaseReport interface
   - PurchaseDetail interface
   - ReportFilter interface
   - ExportFormat type ('excel' | 'pdf' | 'csv')
   - API Request/Response types

8. /src/types/survey.types.ts (~150 dòng) - NEW
   - QuestionType enum
   - SurveyQuestion interface
   - Survey interface
   - SurveyResponse interface
   - SurveyAnalytics interface
   - API Request/Response types

9. Update /src/types/index.ts
   - Export tất cả types từ các files trên

CHECKLIST:
- [ ] messaging.types.ts hoàn thành
- [ ] class.types.ts hoàn thành
- [ ] parent.types.ts hoàn thành
- [ ] content.types.ts hoàn thành
- [ ] ta.types.ts hoàn thành
- [ ] learner.types.ts hoàn thành
- [ ] analytics.types.ts hoàn thành
- [ ] survey.types.ts hoàn thành
- [ ] Update index.ts để export tất cả
- [ ] Git commit & push

YÊU CẦU:
- Tất cả interfaces phải có JSDoc comments
- Types phải match với API_REQUIREMENTS.md
- Sử dụng TypeScript best practices
- Export tất cả types để dùng ở các phases sau
```

---

## 📝 THREAD 3: PHASE 2A - CORE SERVICES (AUTH & CLASS)

```
Dự án: Teaching Assistant Module - Vietnam EduCenter V1
Local Folder: C:\Users\abc\OneDrive\TrungTamGiaoDucGiaDinhVN\Teaching_Assistant_Module\
Git Branch: claude/read-documentation-01Np4Xq1d7Tr2gBvj8ozRAoV

Tài liệu tham khảo:
- ROADMAP.md: Phase 2A details
- IMPLEMENTATION_PLAN.md: Phase 2 section (lines 151-225)
- docs/API_REQUIREMENTS.md: Auth & Class endpoints
- Phase 1 types đã tạo

MỤC TIÊU:
Implement Auth và Class services để kết nối với Backend API.

FILES CẦN TẠO:

1. /src/services/auth.service.ts (~150 dòng)
   Functions:
   - login(email: string, password: string): Promise<AuthResponse>
   - logout(): Promise<void>
   - refreshToken(): Promise<TokenResponse>
   - getCurrentUser(): Promise<UserResponse>
   - updatePassword(oldPassword: string, newPassword: string): Promise<void>
   
   Endpoints:
   - POST /api/v1/ta/auth/login
   - POST /api/v1/ta/auth/logout
   - POST /api/v1/ta/auth/refresh
   - GET /api/v1/ta/auth/me
   - PUT /api/v1/ta/auth/password

2. /src/services/class.service.ts (~200 dòng)
   Functions:
   - getClasses(params: GetClassesRequest): Promise<GetClassesResponse>
   - getClassDetail(classId: string): Promise<GetClassDetailResponse>
   - getParents(params: GetParentsRequest): Promise<GetParentsResponse>
   - approveParent(parentId: string, approve: boolean, reason?: string): Promise<ApproveParentResponse>
   - getClassStats(classId: string): Promise<GetClassStatsResponse>
   
   Endpoints:
   - GET /api/v1/ta/classes
   - GET /api/v1/ta/classes/:id
   - GET /api/v1/ta/classes/:id/parents
   - POST /api/v1/ta/parents/:id/approve
   - GET /api/v1/ta/classes/:id/stats

CHECKLIST:
- [ ] auth.service.ts hoàn thành
- [ ] class.service.ts hoàn thành
- [ ] Error handling đầy đủ
- [ ] Test với mock server (nếu có)
- [ ] Git commit & push

YÊU CẦU:
- Sử dụng types từ Phase 1
- Error handling với try-catch
- Return proper types
- JSDoc comments cho mỗi function
```

---

## 📝 THREAD 4: PHASE 2B - MESSAGING SERVICE

```
Dự án: Teaching Assistant Module - Vietnam EduCenter V1
Local Folder: C:\Users\abc\OneDrive\TrungTamGiaoDucGiaDinhVN\Teaching_Assistant_Module\
Git Branch: claude/read-documentation-01Np4Xq1d7Tr2gBvj8ozRAoV

Tài liệu tham khảo:
- ROADMAP.md: Phase 2B details
- IMPLEMENTATION_PLAN.md: Messaging service section (lines 226-282)
- docs/API_REQUIREMENTS.md: Messaging endpoints
- Phase 1 types (messaging.types.ts)

MỤC TIÊU:
Implement Messaging service đầy đủ với tất cả chức năng.

FILES CẦN TẠO:

1. /src/services/messaging.service.ts (~350 dòng)
   Functions:
   - sendMessage(data: MessageData): Promise<SendMessageResponse>
   - getMessages(params: GetMessagesRequest): Promise<GetMessagesResponse>
   - getMessageDetail(messageId: string): Promise<Message>
   - scheduleMessage(data: MessageData): Promise<SendMessageResponse>
   - cancelScheduledMessage(messageId: string): Promise<void>
   - getMessageStats(messageId: string): Promise<MessageStats>
   - getQuota(): Promise<GetQuotaResponse>
   - getTemplates(): Promise<MessageTemplate[]>
   - filterRecipients(filters: MessageFilter[]): Promise<FilterParentsResponse>
   - getConversations(): Promise<MessageConversation[]>
   - getConversationMessages(conversationId: string): Promise<ConversationMessage[]>
   - sendConversationMessage(conversationId: string, content: string): Promise<ConversationMessage>
   
   Endpoints:
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

CHECKLIST:
- [ ] messaging.service.ts hoàn thành
- [ ] Tất cả functions implemented
- [ ] Quota handling
- [ ] Template support
- [ ] Error handling
- [ ] Git commit & push

YÊU CẦU:
- Sử dụng messaging.types.ts
- Handle quota limits
- Support templates
- Error handling đầy đủ
```

---

## 📝 THREAD 5: PHASE 2C - CONTENT & UPLOAD SERVICES

```
Dự án: Teaching Assistant Module - Vietnam EduCenter V1
Local Folder: C:\Users\abc\OneDrive\TrungTamGiaoDucGiaDinhVN\Teaching_Assistant_Module\
Git Branch: claude/read-documentation-01Np4Xq1d7Tr2gBvj8ozRAoV

Tài liệu tham khảo:
- ROADMAP.md: Phase 2C details
- IMPLEMENTATION_PLAN.md: Content & Upload services (lines 284-470)
- docs/API_REQUIREMENTS.md: Content & Upload endpoints
- Phase 1 types (content.types.ts)

MỤC TIÊU:
Implement Content và Upload services.

FILES CẦN TẠO:

1. /src/services/content.service.ts (~250 dòng)
   Functions:
   - getContents(params: GetContentsRequest): Promise<GetContentsResponse>
   - getContentDetail(contentId: string): Promise<GetContentDetailResponse>
   - uploadVideo(data: FormData): Promise<UploadVideoResponse>
   - createArticle(data: CreateArticleRequest): Promise<CreateArticleResponse>
   - updateContent(contentId: string, data: any): Promise<Content>
   - deleteContent(contentId: string): Promise<void>
   - publishContent(contentId: string): Promise<Content>
   - getContentAnalytics(contentId: string): Promise<GetContentAnalyticsResponse>
   - getCategories(): Promise<GetCategoriesResponse>
   
   Endpoints:
   - GET /api/v1/ta/contents
   - GET /api/v1/ta/contents/:id
   - POST /api/v1/ta/contents/video
   - POST /api/v1/ta/contents/article
   - PUT /api/v1/ta/contents/:id
   - DELETE /api/v1/ta/contents/:id
   - POST /api/v1/ta/contents/:id/publish
   - GET /api/v1/ta/contents/:id/analytics
   - GET /api/v1/ta/contents/categories

2. /src/services/upload.service.ts (~150 dòng)
   Functions:
   - uploadImage(file: File): Promise<UploadResponse>
   - uploadVideo(file: File, onProgress?: (progress: number) => void): Promise<UploadResponse>
   - uploadFile(file: File): Promise<UploadResponse>
   - deleteUpload(fileId: string): Promise<void>
   
   Endpoints:
   - POST /api/v1/ta/upload/image
   - POST /api/v1/ta/upload/video
   - POST /api/v1/ta/upload/file
   - DELETE /api/v1/ta/upload/:id

3. Update /src/services/api.ts (~100 dòng)
   - Add upload progress support
   - Add file upload helpers

CHECKLIST:
- [ ] content.service.ts hoàn thành
- [ ] upload.service.ts hoàn thành
- [ ] Update api.ts
- [ ] Upload progress support
- [ ] Error handling
- [ ] Git commit & push

YÊU CẦU:
- Support upload progress callback
- File validation
- Error handling
```

---

## 📝 THREAD 6: PHASE 2D - REMAINING SERVICES

```
Dự án: Teaching Assistant Module - Vietnam EduCenter V1
Local Folder: C:\Users\abc\OneDrive\TrungTamGiaoDucGiaDinhVN\Teaching_Assistant_Module\
Git Branch: claude/read-documentation-01Np4Xq1d7Tr2gBvj8ozRAoV

Tài liệu tham khảo:
- ROADMAP.md: Phase 2D details
- IMPLEMENTATION_PLAN.md: Remaining services (lines 330-444)
- docs/API_REQUIREMENTS.md: Parent, TA, Analytics, Learner endpoints
- Phase 1 types

MỤC TIÊU:
Implement các services còn lại: Parent, TA, Analytics, Learner.

FILES CẦN TẠO:

1. /src/services/parent.service.ts (~150 dòng)
   Functions:
   - getParentDetail(parentId: string): Promise<GetParentDetailResponse>
   - getParentActivities(params: GetParentActivitiesRequest): Promise<GetParentActivitiesResponse>
   - getParentSegmentStats(): Promise<GetParentSegmentStatsResponse>
   - filterParents(params: FilterParentsRequest): Promise<FilterParentsResponse>
   
   Endpoints:
   - GET /api/v1/ta/parents/:id
   - GET /api/v1/ta/parents/:id/activities
   - GET /api/v1/ta/parents/segment-stats
   - POST /api/v1/ta/parents/filter

2. /src/services/ta.service.ts (~200 dòng)
   Functions:
   - getProfile(): Promise<GetTAProfileResponse>
   - updateProfile(data: UpdateTAProfileRequest): Promise<UpdateTAProfileResponse>
   - getDashboard(): Promise<GetTADashboardResponse>
   - getPerformance(params: GetTAPerformanceRequest): Promise<GetTAPerformanceResponse>
   - getSettings(): Promise<GetTASettingsResponse>
   - updateSettings(data: UpdateTASettingsRequest): Promise<UpdateTASettingsResponse>
   - getActivities(page: number, limit: number): Promise<TAActivity[]>
   - markAlertRead(alertId: string): Promise<void>
   
   Endpoints:
   - GET /api/v1/ta/profile
   - PUT /api/v1/ta/profile
   - GET /api/v1/ta/dashboard
   - GET /api/v1/ta/performance
   - GET /api/v1/ta/settings
   - PUT /api/v1/ta/settings
   - GET /api/v1/ta/activities
   - POST /api/v1/ta/alerts/:id/read

3. /src/services/analytics.service.ts (~200 dòng) - NEW
   Functions:
   - getPurchaseReports(params: GetReportsRequest): Promise<GetReportsResponse>
   - getPurchaseDetails(params: GetPurchaseDetailsRequest): Promise<GetPurchaseDetailsResponse>
   - exportReport(params: ExportReportRequest): Promise<Blob>
   - getDashboardAnalytics(params: GetAnalyticsRequest): Promise<DashboardAnalytics>
   
   Endpoints:
   - GET /api/v1/ta/analytics/purchases
   - GET /api/v1/ta/analytics/purchases/details
   - POST /api/v1/ta/analytics/export
   - GET /api/v1/ta/analytics/dashboard

4. /src/services/learner.service.ts (~100 dòng)
   Functions:
   - getCourses(params: GetCoursesRequest): Promise<GetCoursesResponse>
   - getCourseDetail(courseId: string): Promise<GetCourseDetailResponse>
   - getRecommendations(parentId: string): Promise<GetCourseRecommendationsResponse>
   
   Endpoints:
   - GET /api/v1/ta/courses
   - GET /api/v1/ta/courses/:id
   - GET /api/v1/ta/parents/:id/recommendations

CHECKLIST:
- [ ] parent.service.ts hoàn thành
- [ ] ta.service.ts hoàn thành
- [ ] analytics.service.ts hoàn thành
- [ ] learner.service.ts hoàn thành
- [ ] Integration test
- [ ] Git commit & push

YÊU CẦU:
- Tất cả services hoàn chỉnh
- Error handling
- Type safety
```

---

## 📝 THREAD 7: PHASE 3A - DASHBOARD COMPONENTS

```
Dự án: Teaching Assistant Module - Vietnam EduCenter V1
Local Folder: C:\Users\abc\OneDrive\TrungTamGiaoDucGiaDinhVN\Teaching_Assistant_Module\
Git Branch: claude/read-documentation-01Np4Xq1d7Tr2gBvj8ozRAoV

Tài liệu tham khảo:
- ROADMAP.md: Phase 3A details
- IMPLEMENTATION_PLAN.md: Dashboard components (lines 488-771)
- Phase 2 services đã tạo
- Phase 1 types

MỤC TIÊU:
Tạo core dashboard components cho trợ giảng.

FILES CẦN TẠO:

1. /src/components/ta-dashboard/TADashboard.tsx (~300 dòng) + CSS
   Props: { taId: string }
   Features:
   - KPIs display (totalClasses, totalParents, messages, etc.)
   - Parent segmentation chart
   - Recent activities list
   - Class performance table
   - Upcoming tasks
   - Alerts/notifications
   Dependencies: taService.getDashboard(), Recharts

2. /src/components/ta-dashboard/MessageComposer.tsx (~400 dòng) + CSS
   Props: { defaultRecipients?: string[], onSent?: (message: Message) => void }
   Features:
   - Rich text editor (React Quill)
   - Template selector
   - Attachment upload (image, video, file)
   - Recipient filter builder
   - Schedule picker
   - Preview modal
   - Anti-spam warning
   Dependencies: messagingService, uploadService, React Quill

3. /src/components/ta-dashboard/ParentListTable.tsx (~350 dòng) + CSS
   Props: { classId?: string, showFilters?: boolean, onSelectParent?: (parent: Parent) => void }
   Features:
   - Advanced filters (segment, paid status, points)
   - Multi-select for bulk actions
   - Export to Excel
   - Quick actions (send message, view detail)
   - Pagination & search
   Dependencies: parentService.filterParents(), Ant Design Table

4. /src/components/ta-dashboard/PerformanceMetrics.tsx (~250 dòng) + CSS
   Props: { period: 'week' | 'month' | 'quarter' }
   Features:
   - Message delivery/read rates
   - Response time
   - Parent conversion rates
   - Performance score
   - Trend charts
   Dependencies: taService.getPerformance(), Recharts

CHECKLIST:
- [ ] TADashboard.tsx + CSS
- [ ] MessageComposer.tsx + CSS
- [ ] ParentListTable.tsx + CSS
- [ ] PerformanceMetrics.tsx + CSS
- [ ] Responsive design
- [ ] Git commit & push

YÊU CẦU:
- Sử dụng Ant Design components
- Responsive design
- Error handling
- Loading states
```

---

## 📝 THREAD 8: PHASE 3B - COMMUNICATION COMPONENTS

```
Dự án: Teaching Assistant Module - Vietnam EduCenter V1
Local Folder: C:\Users\abc\OneDrive\TrungTamGiaoDucGiaDinhVN\Teaching_Assistant_Module\
Git Branch: claude/read-documentation-01Np4Xq1d7Tr2gBvj8ozRAoV

Tài liệu tham khảo:
- ROADMAP.md: Phase 3B details
- IMPLEMENTATION_PLAN.md: Communication components (lines 643-665)
- Phase 2B (messaging service)
- Phase 3A components

MỤC TIÊU:
Tạo communication components.

FILES CẦN TẠO:

1. /src/components/ta-dashboard/ParentCommunication.tsx (~300 dòng) + CSS
   Props: { conversationId: string, onClose?: () => void }
   Features:
   - Chat interface
   - Message history
   - Send text/image
   - Real-time updates (optional với WebSocket)
   Dependencies: messagingService.getConversationMessages(), sendConversationMessage()

2. /src/components/ta-dashboard/MessagePanel.tsx (~200 dòng) + CSS
   Props: { messages: Message[], onSelectMessage?: (message: Message) => void }
   Features:
   - Message list với preview
   - Status badges
   - Filter by status/type
   - Search
   Dependencies: Ant Design List, Tag, Input

3. /src/components/ta-dashboard/ParentCard.tsx (~150 dòng) + CSS
   Props: { parent: Parent | ParentDetail, onClick?: () => void, showActions?: boolean }
   Features:
   - Avatar, name, contact info
   - Segment badge
   - Learning progress
   - Quick actions
   Dependencies: Ant Design Card, Avatar, Badge

CHECKLIST:
- [ ] ParentCommunication.tsx + CSS
- [ ] MessagePanel.tsx + CSS
- [ ] ParentCard.tsx + CSS
- [ ] Real-time updates (optional)
- [ ] Git commit & push

YÊU CẦU:
- Clean UI/UX
- Responsive
- Error handling
```

---

## 📝 THREAD 9: PHASE 3C - UTILITY COMPONENTS

```
Dự án: Teaching Assistant Module - Vietnam EduCenter V1
Local Folder: C:\Users\abc\OneDrive\TrungTamGiaoDucGiaDinhVN\Teaching_Assistant_Module\
Git Branch: claude/read-documentation-01Np4Xq1d7Tr2gBvj8ozRAoV

Tài liệu tham khảo:
- ROADMAP.md: Phase 3C details
- IMPLEMENTATION_PLAN.md: Utility components (lines 667-754)
- Phase 2B, Phase 3A

MỤC TIÊU:
Tạo utility components.

FILES CẦN TẠO:

1. /src/components/ta-dashboard/QuotaLimitModal.tsx (~100 dòng) + CSS
   Props: { quota: MessageQuota, visible: boolean, onClose: () => void }
   Features:
   - Display quota usage
   - Progress bars
   - Warning messages
   - Suggest splitting messages
   Dependencies: Ant Design Modal, Progress

2. /src/components/ta-dashboard/CircularProgress.tsx (~80 dòng) + CSS
   Props: { percentage: number, size?: number, strokeWidth?: number, color?: string }
   Features:
   - Animated circular progress
   - Custom colors
   - Label inside

3. /src/components/ta-dashboard/TALineChart.tsx (~100 dòng) + CSS
   Props: { data: ChartData[], xKey: string, yKey: string, title?: string }
   Features:
   - Responsive line chart
   - Tooltip
   - Legend
   - Custom colors
   Dependencies: Recharts

4. /src/components/ta-dashboard/TAHeader.tsx (~80 dòng) + CSS
   Props: { title: string, subtitle?: string, actions?: React.ReactNode }
   Features:
   - Page title
   - Breadcrumb
   - Action buttons area
   Dependencies: Ant Design Breadcrumb, Space

CHECKLIST:
- [ ] QuotaLimitModal.tsx + CSS
- [ ] CircularProgress.tsx + CSS
- [ ] TALineChart.tsx + CSS
- [ ] TAHeader.tsx + CSS
- [ ] Git commit & push

YÊU CẦU:
- Reusable components
- Clean code
```

---

## 📝 THREAD 10: PHASE 4 - UPLOAD FEATURES

```
Dự án: Teaching Assistant Module - Vietnam EduCenter V1
Local Folder: C:\Users\abc\OneDrive\TrungTamGiaoDucGiaDinhVN\Teaching_Assistant_Module\
Git Branch: claude/read-documentation-01Np4Xq1d7Tr2gBvj8ozRAoV

Tài liệu tham khảo:
- ROADMAP.md: Phase 4 details
- IMPLEMENTATION_PLAN.md: Upload features (lines 774-801)
- Phase 2C (upload service)
- Phase 3A (MessageComposer)

MỤC TIÊU:
Hoàn thiện upload features.

FILES CẦN UPDATE:

1. Update /src/components/ta-dashboard/MessageComposer.tsx
   - Add image upload button
   - Add video upload button
   - Add file (PDF) upload button
   - Show upload progress
   - Preview uploaded files
   - Delete uploaded files
   - Validate file types & sizes

2. Update /src/pages/ContentPage (hoặc tương ứng)
   - Improve video upload with progress bar
   - Add drag & drop
   - Multiple file upload
   - Thumbnail auto-generation
   - Video compression (optional)

3. Create /src/components/ta-dashboard/UploadManager.tsx (optional)
   - Global upload queue
   - Multiple file upload
   - Pause/Resume upload
   - Retry failed uploads

CHECKLIST:
- [ ] Image upload trong MessageComposer
- [ ] Video upload với progress
- [ ] Drag & drop
- [ ] File validation
- [ ] Upload queue manager (optional)
- [ ] Git commit & push

YÊU CẦU:
- Upload progress display
- File validation
- Error handling
- User-friendly UI
```

---

## 📝 THREAD 11: PHASE 5 - PURCHASE REPORTS

```
Dự án: Teaching Assistant Module - Vietnam EduCenter V1
Local Folder: C:\Users\abc\OneDrive\TrungTamGiaoDucGiaDinhVN\Teaching_Assistant_Module\
Git Branch: claude/read-documentation-01Np4Xq1d7Tr2gBvj8ozRAoV

Tài liệu tham khảo:
- ROADMAP.md: Phase 5 details
- IMPLEMENTATION_PLAN.md: Purchase reports (lines 805-828)
- Phase 2D (analytics service)
- Phase 1 types (analytics.types.ts)

MỤC TIÊU:
Implement báo cáo đặt mua đa chiều.

FILES CẦN TẠO:

1. /src/pages/PurchaseReportPage/index.tsx (~200 dòng) + CSS
   Route: /analytics/purchases
   Features:
   - Report dimension selector (Class, Grade, School, Province)
   - Date range picker
   - Filter by course type
   - Summary statistics
   - Detailed table
   - Chart visualization
   - Export Excel/PDF
   Dependencies: analyticsService.getPurchaseReports()

2. /src/components/analytics/ReportBuilder.tsx (~150 dòng) + CSS
   Features:
   - Dimension selector
   - Filter builder
   - Date range picker
   Dependencies: Ant Design Form, Select, DatePicker

3. /src/components/analytics/ReportTable.tsx (~100 dòng) + CSS
   Features:
   - Data table
   - Sorting
   - Pagination
   Dependencies: Ant Design Table

4. /src/components/analytics/ReportChart.tsx (~100 dòng) + CSS
   Features:
   - Chart visualization
   - Multiple chart types
   Dependencies: Recharts

CHECKLIST:
- [ ] PurchaseReportPage
- [ ] ReportBuilder component
- [ ] ReportTable component
- [ ] ReportChart component
- [ ] Export Excel/PDF
- [ ] Git commit & push

YÊU CẦU:
- Multiple dimensions support
- Export functionality
- Responsive design
```

---

## 📝 THREAD 12: PHASE 6 - INBOX/SUPPORT

```
Dự án: Teaching Assistant Module - Vietnam EduCenter V1
Local Folder: C:\Users\abc\OneDrive\TrungTamGiaoDucGiaDinhVN\Teaching_Assistant_Module\
Git Branch: claude/read-documentation-01Np4Xq1d7Tr2gBvj8ozRAoV

Tài liệu tham khảo:
- ROADMAP.md: Phase 6 details
- IMPLEMENTATION_PLAN.md: Inbox/Support (lines 832-852)
- Phase 2B (messaging service)
- Phase 3B components

MỤC TIÊU:
Hoàn thiện inbox/support system.

FILES CẦN TẠO:

1. Update /src/pages/InboxPage/index.tsx (~200 dòng)
   Features:
   - Ticket list
   - Ticket detail view
   - Reply to ticket
   - Canned responses
   - Assign ticket
   - Close ticket
   - SLA tracking

2. /src/components/inbox/TicketList.tsx (~100 dòng) + CSS
   Features:
   - Ticket list với filters
   - Status badges
   - Search
   Dependencies: Ant Design List, Tag

3. /src/components/inbox/TicketDetail.tsx (~100 dòng) + CSS
   Features:
   - Ticket detail view
   - Reply form
   - Canned responses selector
   - Actions (assign, close)
   Dependencies: Ant Design Form, Select

CHECKLIST:
- [ ] Ticket list
- [ ] Ticket detail
- [ ] Reply functionality
- [ ] Canned responses
- [ ] SLA tracking
- [ ] Git commit & push

YÊU CẦU:
- Clean UI
- Easy to use
- Error handling
```

---

## 📝 THREAD 13: PHASE 7 - PROFILE PAGE

```
Dự án: Teaching Assistant Module - Vietnam EduCenter V1
Local Folder: C:\Users\abc\OneDrive\TrungTamGiaoDucGiaDinhVN\Teaching_Assistant_Module\
Git Branch: claude/read-documentation-01Np4Xq1d7Tr2gBvj8ozRAoV

Tài liệu tham khảo:
- ROADMAP.md: Phase 7 details
- IMPLEMENTATION_PLAN.md: Profile page (lines 856-871)
- Phase 2D (ta service)
- Phase 2C (upload service)

MỤC TIÊU:
Hoàn thiện profile page.

FILES CẦN UPDATE:

1. Update /src/pages/ProfilePage/index.tsx (~300 dòng) + CSS
   Features:
   - View profile info
   - Edit profile
   - Change password
   - Upload avatar
   - View assigned classes
   - View performance metrics
   - Settings (notifications, language, etc.)
   Dependencies: taService, uploadService, authService

CHECKLIST:
- [ ] View profile
- [ ] Edit profile
- [ ] Change password
- [ ] Upload avatar
- [ ] Settings
- [ ] Git commit & push

YÊU CẦU:
- Clean UI
- Form validation
- Error handling
```

---

## 📝 THREAD 14: PHASE 8 - TESTING & FIXES

```
Dự án: Teaching Assistant Module - Vietnam EduCenter V1
Local Folder: C:\Users\abc\OneDrive\TrungTamGiaoDucGiaDinhVN\Teaching_Assistant_Module\
Git Branch: claude/read-documentation-01Np4Xq1d7Tr2gBvj8ozRAoV

Tài liệu tham khảo:
- ROADMAP.md: Phase 8 details
- IMPLEMENTATION_PLAN.md: Testing (lines 875-896)
- Tất cả phases trước

MỤC TIÊU:
Testing và bug fixes.

TASKS:

1. Unit Testing
   - Test all services
   - Test critical components
   - Test utils/helpers

2. Integration Testing
   - Test API integration
   - Test user flows
   - Test edge cases

3. Manual Testing
   - Test all features
   - Cross-browser testing
   - Responsive testing
   - Accessibility testing

4. Bug Fixes
   - Fix critical bugs
   - Fix UI/UX issues
   - Performance optimization

CHECKLIST:
- [ ] Unit tests
- [ ] Integration tests
- [ ] Manual testing
- [ ] Cross-browser testing
- [ ] Bug fixes
- [ ] Performance optimization
- [ ] Git commit & push

YÊU CẦU:
- Comprehensive testing
- Fix all critical bugs
- Performance optimization
```

---

## 📝 THREAD 15: PHASE 9 - DOCUMENTATION

```
Dự án: Teaching Assistant Module - Vietnam EduCenter V1
Local Folder: C:\Users\abc\OneDrive\TrungTamGiaoDucGiaDinhVN\Teaching_Assistant_Module\
Git Branch: claude/read-documentation-01Np4Xq1d7Tr2gBvj8ozRAoV

Tài liệu tham khảo:
- ROADMAP.md: Phase 9 details
- IMPLEMENTATION_PLAN.md: Documentation (lines 900-929)
- Tất cả phases

MỤC TIÊU:
Hoàn thiện documentation.

FILES CẦN TẠO/UPDATE:

1. Update /docs/API_REQUIREMENTS.md
   - Liệt kê tất cả endpoints cần
   - Request/Response examples
   - Error codes
   - Authentication flow
   - Rate limiting requirements

2. Create /docs/DEVELOPER_GUIDE.md (~400 dòng)
   - Setup instructions
   - Project structure
   - Coding conventions
   - Component guide
   - API integration guide

3. Create /docs/USER_GUIDE.md (~400 dòng)
   - Feature descriptions
   - Screenshots
   - Usage instructions
   - FAQs

CHECKLIST:
- [ ] API requirements update
- [ ] Developer guide
- [ ] User guide
- [ ] Code comments
- [ ] Git commit & push

YÊU CẦU:
- Clear and comprehensive
- Examples included
- Easy to follow
```

---

## 📝 THREAD 16: PHASE 10 - DEPLOYMENT

```
Dự án: Teaching Assistant Module - Vietnam EduCenter V1
Local Folder: C:\Users\abc\OneDrive\TrungTamGiaoDucGiaDinhVN\Teaching_Assistant_Module\
Git Branch: claude/read-documentation-01Np4Xq1d7Tr2gBvj8ozRAoV

Tài liệu tham khảo:
- ROADMAP.md: Phase 10 details
- IMPLEMENTATION_PLAN.md: Deployment (lines 933-956)
- Phase 9 (documentation)

MỤC TIÊU:
Deploy lên production.

TASKS:

1. Preparation
   - Environment variables setup
   - Build production bundle
   - Test production build locally

2. Vietnam VPS Setup
   - SSH access confirmed
   - Nginx configured
   - SSL certificate installed
   - Domain pointed

3. Deploy
   - Upload build to VPS
   - Configure Nginx
   - Test production site
   - Setup monitoring (Sentry)

4. CI/CD
   - Setup GitHub Actions
   - Automated build
   - Automated deploy

CHECKLIST:
- [ ] Environment variables
- [ ] Production build
- [ ] VPS setup
- [ ] Nginx config
- [ ] SSL certificate
- [ ] Deploy
- [ ] CI/CD
- [ ] Monitoring
- [ ] Git commit & push

YÊU CẦU:
- Production-ready
- Secure
- Monitored
- Automated deployment
```

---

## 🎯 LƯU Ý CHUNG

1. **Luôn đọc tài liệu tham khảo trước khi bắt đầu**
2. **Sử dụng types từ Phase 1**
3. **Error handling đầy đủ**
4. **Git commit sau mỗi phase**
5. **Test kỹ trước khi commit**
6. **Follow coding conventions**
7. **JSDoc comments cho functions**

---

**Last Updated:** 15/11/2025  
**Status:** ✅ Ready to use

Copy prompt tương ứng vào đầu mỗi thread mới!

