# KẾ HOẠCH TRIỂN KHAI HOÀN CHỈNH FRONTEND TRỢ GIẢNG

**Dự án:** Teaching Assistant Module - Vietnam EduCenter V1
**Ngày bắt đầu:** 15/11/2025
**Người thực hiện:** Đội B (Frontend + API Integration)

---

## 📋 TỔNG QUAN

### Mục tiêu
Hoàn thiện 100% frontend trợ giảng với đầy đủ chức năng theo tài liệu đã được sếp duyệt.

### Phạm vi công việc
1. ✅ Xóa code cũ/rỗng
2. ⏳ Tạo đầy đủ Type Definitions
3. ⏳ Implement Services kết nối Backend API
4. ⏳ Tạo Components chuyên dụng
5. ⏳ Tích hợp tính năng Upload File
6. ⏳ Implement Báo cáo đa chiều
7. ⏳ Hoàn thiện Inbox/Support
8. ⏳ Hoàn thiện Profile
9. ⏳ Testing & Documentation

---

## 🎯 PHASE 1: TYPE DEFINITIONS (1-2 ngày)

### Mục tiêu
Định nghĩa đầy đủ TypeScript types cho toàn bộ hệ thống

### Danh sách files cần tạo

#### 1.1. `/src/types/messaging.types.ts`
**Nội dung:**
- MessageType, MessageStatus
- Attachment interface
- MessageTemplate interface
- MessageRecipient interface
- MessageFilter interface
- Message interface (full)
- MessageStats interface
- MessageConversation & ConversationMessage
- MessageQuota (anti-spam)
- API Request/Response types

**Ước tính:** ~200 dòng code

#### 1.2. `/src/types/class.types.ts`
**Nội dung:**
- Class interface
- Student interface
- Parent interface (basic)
- ParentLearningProgress interface
- ClassDetail interface
- ClassStats interface
- ClassPerformance interface
- ClassAssignment interface
- API Request/Response types

**Ước tính:** ~250 dòng code

#### 1.3. `/src/types/parent.types.ts`
**Nội dung:**
- ParentSegment enum
- ParentDetail interface (extended)
- ParentStudent interface
- PaidCourse interface
- Certificate interface
- ParentFilterCondition interface
- ParentSegmentStats interface
- ParentActivity interface
- API Request/Response types

**Ước tính:** ~200 dòng code

#### 1.4. `/src/types/content.types.ts`
**Nội dung:**
- ContentType, ContentStatus enums
- VideoContent interface
- ArticleContent interface
- MicroCourseContent interface (TikTok-style)
- ContentAnalytics interface
- ViewsByDate, ViewsByClass interfaces
- Upload/Create request types
- API Response types

**Ước tính:** ~300 dòng code

#### 1.5. `/src/types/ta.types.ts`
**Nội dung:**
- TAProfile interface
- TAPermission enum
- TADashboard interface
- TAKPIs interface
- TAActivity, TATask, TAAlert interfaces
- TAPerformanceMetrics interface
- TASettings interface
- API Request/Response types

**Ước tính:** ~250 dòng code

#### 1.6. `/src/types/learner.types.ts`
**Nội dung:**
- CourseType, CourseStatus enums
- Course, CourseLesson interfaces
- ParentEnrollment interface
- ParentLessonProgress interface
- ParentPoints, PointsTransaction interfaces
- ParentCertificate interface
- CourseRecommendation interface
- API Request/Response types

**Ước tính:** ~250 dòng code

#### 1.7. `/src/types/analytics.types.ts` (NEW)
**Nội dung:**
- ReportDimension type ('class' | 'grade' | 'school' | 'province')
- PurchaseReport interface
- PurchaseDetail interface
- ReportFilter interface
- ExportFormat type ('excel' | 'pdf' | 'csv')
- API Request/Response types

**Ước tính:** ~150 dòng code

#### 1.8. `/src/types/survey.types.ts` (NEW)
**Nội dung:**
- QuestionType enum
- SurveyQuestion interface
- Survey interface
- SurveyResponse interface
- SurveyAnalytics interface
- API Request/Response types

**Ước tính:** ~150 dòng code

### Checklist Phase 1
- [ ] messaging.types.ts hoàn thành
- [ ] class.types.ts hoàn thành
- [ ] parent.types.ts hoàn thành
- [ ] content.types.ts hoàn thành
- [ ] ta.types.ts hoàn thành
- [ ] learner.types.ts hoàn thành
- [ ] analytics.types.ts hoàn thành (NEW)
- [ ] survey.types.ts hoàn thành (NEW)
- [ ] Update `/src/types/index.ts` để export tất cả

---

## 🔌 PHASE 2: SERVICES - KẾT NỐI BACKEND API (3-4 ngày)

### Mục tiêu
Implement các service files để kết nối với Backend API của Đội A

### Yêu cầu từ Đội A
**QUAN TRỌNG:** Trước khi bắt đầu phase này, cần có:
- ✅ API Documentation (Swagger/OpenAPI)
- ✅ Base URL (dev và production)
- ✅ Authentication flow (JWT format)
- ✅ Sample Request/Response
- ✅ Error codes list

### Danh sách services cần implement

#### 2.1. `/src/services/auth.service.ts`
**Chức năng:**
```typescript
export const authService = {
  // Login
  login(email: string, password: string): Promise<AuthResponse>

  // Logout
  logout(): Promise<void>

  // Refresh token
  refreshToken(): Promise<TokenResponse>

  // Get current user
  getCurrentUser(): Promise<UserResponse>

  // Update password
  updatePassword(oldPassword: string, newPassword: string): Promise<void>
}
```

**Endpoints cần:**
- POST /api/v1/ta/auth/login
- POST /api/v1/ta/auth/logout
- POST /api/v1/ta/auth/refresh
- GET /api/v1/ta/auth/me
- PUT /api/v1/ta/auth/password

**Ước tính:** ~150 dòng code

#### 2.2. `/src/services/class.service.ts`
**Chức năng:**
```typescript
export const classService = {
  // Get classes
  getClasses(params: GetClassesRequest): Promise<GetClassesResponse>

  // Get class detail
  getClassDetail(classId: string): Promise<GetClassDetailResponse>

  // Get parents in class
  getParents(params: GetParentsRequest): Promise<GetParentsResponse>

  // Approve parent
  approveParent(parentId: string, approve: boolean, reason?: string): Promise<ApproveParentResponse>

  // Get class stats
  getClassStats(classId: string): Promise<GetClassStatsResponse>
}
```

**Endpoints cần:**
- GET /api/v1/ta/classes
- GET /api/v1/ta/classes/:id
- GET /api/v1/ta/classes/:id/parents
- POST /api/v1/ta/parents/:id/approve
- GET /api/v1/ta/classes/:id/stats

**Ước tính:** ~200 dòng code

#### 2.3. `/src/services/messaging.service.ts`
**Chức năng:**
```typescript
export const messagingService = {
  // Send message
  sendMessage(data: MessageData): Promise<SendMessageResponse>

  // Get messages
  getMessages(params: GetMessagesRequest): Promise<GetMessagesResponse>

  // Get message detail
  getMessageDetail(messageId: string): Promise<Message>

  // Schedule message
  scheduleMessage(data: MessageData): Promise<SendMessageResponse>

  // Cancel scheduled message
  cancelScheduledMessage(messageId: string): Promise<void>

  // Get message stats
  getMessageStats(messageId: string): Promise<MessageStats>

  // Get quota
  getQuota(): Promise<GetQuotaResponse>

  // Get templates
  getTemplates(): Promise<MessageTemplate[]>

  // Filter recipients
  filterRecipients(filters: MessageFilter[]): Promise<FilterParentsResponse>

  // Get conversations
  getConversations(): Promise<MessageConversation[]>

  // Get conversation messages
  getConversationMessages(conversationId: string): Promise<ConversationMessage[]>

  // Send conversation message
  sendConversationMessage(conversationId: string, content: string): Promise<ConversationMessage>
}
```

**Endpoints cần:**
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

**Ước tính:** ~350 dòng code

#### 2.4. `/src/services/content.service.ts`
**Chức năng:**
```typescript
export const contentService = {
  // Get contents
  getContents(params: GetContentsRequest): Promise<GetContentsResponse>

  // Get content detail
  getContentDetail(contentId: string): Promise<GetContentDetailResponse>

  // Upload video
  uploadVideo(data: FormData): Promise<UploadVideoResponse>

  // Create article
  createArticle(data: CreateArticleRequest): Promise<CreateArticleResponse>

  // Update content
  updateContent(contentId: string, data: any): Promise<Content>

  // Delete content
  deleteContent(contentId: string): Promise<void>

  // Publish content
  publishContent(contentId: string): Promise<Content>

  // Get content analytics
  getContentAnalytics(contentId: string): Promise<GetContentAnalyticsResponse>

  // Get categories
  getCategories(): Promise<GetCategoriesResponse>
}
```

**Endpoints cần:**
- GET /api/v1/ta/contents
- GET /api/v1/ta/contents/:id
- POST /api/v1/ta/contents/video
- POST /api/v1/ta/contents/article
- PUT /api/v1/ta/contents/:id
- DELETE /api/v1/ta/contents/:id
- POST /api/v1/ta/contents/:id/publish
- GET /api/v1/ta/contents/:id/analytics
- GET /api/v1/ta/contents/categories

**Ước tính:** ~250 dòng code

#### 2.5. `/src/services/parent.service.ts`
**Chức năng:**
```typescript
export const parentService = {
  // Get parent detail
  getParentDetail(parentId: string): Promise<GetParentDetailResponse>

  // Get parent activities
  getParentActivities(params: GetParentActivitiesRequest): Promise<GetParentActivitiesResponse>

  // Get parent segment stats
  getParentSegmentStats(): Promise<GetParentSegmentStatsResponse>

  // Filter parents
  filterParents(params: FilterParentsRequest): Promise<FilterParentsResponse>
}
```

**Endpoints cần:**
- GET /api/v1/ta/parents/:id
- GET /api/v1/ta/parents/:id/activities
- GET /api/v1/ta/parents/segment-stats
- POST /api/v1/ta/parents/filter

**Ước tính:** ~150 dòng code

#### 2.6. `/src/services/ta.service.ts`
**Chức năng:**
```typescript
export const taService = {
  // Get profile
  getProfile(): Promise<GetTAProfileResponse>

  // Update profile
  updateProfile(data: UpdateTAProfileRequest): Promise<UpdateTAProfileResponse>

  // Get dashboard
  getDashboard(): Promise<GetTADashboardResponse>

  // Get performance
  getPerformance(params: GetTAPerformanceRequest): Promise<GetTAPerformanceResponse>

  // Get settings
  getSettings(): Promise<GetTASettingsResponse>

  // Update settings
  updateSettings(data: UpdateTASettingsRequest): Promise<UpdateTASettingsResponse>

  // Get activities
  getActivities(page: number, limit: number): Promise<TAActivity[]>

  // Mark alert as read
  markAlertRead(alertId: string): Promise<void>
}
```

**Endpoints cần:**
- GET /api/v1/ta/profile
- PUT /api/v1/ta/profile
- GET /api/v1/ta/dashboard
- GET /api/v1/ta/performance
- GET /api/v1/ta/settings
- PUT /api/v1/ta/settings
- GET /api/v1/ta/activities
- POST /api/v1/ta/alerts/:id/read

**Ước tính:** ~200 dòng code

#### 2.7. `/src/services/analytics.service.ts` (NEW)
**Chức năng:**
```typescript
export const analyticsService = {
  // Get purchase reports
  getPurchaseReports(params: GetReportsRequest): Promise<GetReportsResponse>

  // Get purchase details
  getPurchaseDetails(params: GetPurchaseDetailsRequest): Promise<GetPurchaseDetailsResponse>

  // Export report
  exportReport(params: ExportReportRequest): Promise<Blob>

  // Get dashboard analytics
  getDashboardAnalytics(params: GetAnalyticsRequest): Promise<DashboardAnalytics>
}
```

**Endpoints cần:**
- GET /api/v1/ta/analytics/purchases
- GET /api/v1/ta/analytics/purchases/details
- POST /api/v1/ta/analytics/export
- GET /api/v1/ta/analytics/dashboard

**Ước tính:** ~200 dòng code

#### 2.8. `/src/services/learner.service.ts`
**Chức năng:**
```typescript
export const learnerService = {
  // Get courses
  getCourses(params: GetCoursesRequest): Promise<GetCoursesResponse>

  // Get course detail
  getCourseDetail(courseId: string): Promise<GetCourseDetailResponse>

  // Get recommendations
  getRecommendations(parentId: string): Promise<GetCourseRecommendationsResponse>
}
```

**Endpoints cần:**
- GET /api/v1/ta/courses
- GET /api/v1/ta/courses/:id
- GET /api/v1/ta/parents/:id/recommendations

**Ước tính:** ~100 dòng code

#### 2.9. `/src/services/upload.service.ts` (NEW)
**Chức năng:**
```typescript
export const uploadService = {
  // Upload image
  uploadImage(file: File): Promise<UploadResponse>

  // Upload video
  uploadVideo(file: File, onProgress?: (progress: number) => void): Promise<UploadResponse>

  // Upload file (PDF, etc.)
  uploadFile(file: File): Promise<UploadResponse>

  // Delete upload
  deleteUpload(fileId: string): Promise<void>
}
```

**Endpoints cần:**
- POST /api/v1/ta/upload/image
- POST /api/v1/ta/upload/video
- POST /api/v1/ta/upload/file
- DELETE /api/v1/ta/upload/:id

**Ước tính:** ~150 dòng code

### Checklist Phase 2
- [ ] auth.service.ts hoàn thành
- [ ] class.service.ts hoàn thành
- [ ] messaging.service.ts hoàn thành
- [ ] content.service.ts hoàn thành
- [ ] parent.service.ts hoàn thành
- [ ] ta.service.ts hoàn thành
- [ ] analytics.service.ts hoàn thành (NEW)
- [ ] learner.service.ts hoàn thành
- [ ] upload.service.ts hoàn thành (NEW)
- [ ] Test tất cả services với Mock Server
- [ ] Handle errors gracefully
- [ ] Add retry logic where needed

---

## 🎨 PHASE 3: COMPONENTS TA-DASHBOARD (2-3 ngày)

### Mục tiêu
Tạo các components chuyên dụng cho trợ giảng

### Danh sách components

#### 3.1. `/src/components/ta-dashboard/TADashboard.tsx`
**Mô tả:** Component dashboard tổng hợp cho trợ giảng

**Props:**
```typescript
interface TADashboardProps {
  taId: string;
}
```

**Features:**
- Hiển thị KPIs (totalClasses, totalParents, messages, etc.)
- Parent segmentation chart
- Recent activities list
- Class performance table
- Upcoming tasks
- Alerts/notifications

**Dependencies:**
- taService.getDashboard()
- Recharts for charts
- Ant Design Table, Card, Statistic

**Ước tính:** ~300 dòng code

#### 3.2. `/src/components/ta-dashboard/MessageComposer.tsx`
**Mô tả:** Component soạn tin nhắn nâng cao

**Props:**
```typescript
interface MessageComposerProps {
  defaultRecipients?: string[];
  onSent?: (message: Message) => void;
}
```

**Features:**
- Rich text editor (Quill)
- Template selector
- Attachment upload (image, video, file)
- Recipient filter builder
- Schedule picker
- Preview modal
- Anti-spam warning

**Dependencies:**
- messagingService.sendMessage()
- uploadService.uploadFile()
- React Quill
- Ant Design Form, Upload, DatePicker

**Ước tính:** ~400 dòng code

#### 3.3. `/src/components/ta-dashboard/ParentListTable.tsx`
**Mô tả:** Bảng danh sách phụ huynh với filter/sort nâng cao

**Props:**
```typescript
interface ParentListTableProps {
  classId?: string;
  showFilters?: boolean;
  onSelectParent?: (parent: Parent) => void;
}
```

**Features:**
- Advanced filters (segment, paid status, points)
- Multi-select for bulk actions
- Export to Excel
- Quick actions (send message, view detail)
- Pagination & search

**Dependencies:**
- parentService.filterParents()
- Ant Design Table, Select, Input
- ExcelJS for export

**Ước tính:** ~350 dòng code

#### 3.4. `/src/components/ta-dashboard/PerformanceMetrics.tsx`
**Mô tả:** Hiển thị metrics hiệu suất trợ giảng

**Props:**
```typescript
interface PerformanceMetricsProps {
  period: 'week' | 'month' | 'quarter';
}
```

**Features:**
- Message delivery/read rates
- Response time
- Parent conversion rates
- Performance score
- Trend charts

**Dependencies:**
- taService.getPerformance()
- Recharts
- Ant Design Progress, Statistic

**Ước tính:** ~250 dòng code

#### 3.5. `/src/components/ta-dashboard/ParentCard.tsx`
**Mô tả:** Card hiển thị thông tin phụ huynh

**Props:**
```typescript
interface ParentCardProps {
  parent: Parent | ParentDetail;
  onClick?: () => void;
  showActions?: boolean;
}
```

**Features:**
- Avatar, name, contact info
- Segment badge
- Learning progress
- Quick actions

**Dependencies:**
- Ant Design Card, Avatar, Badge

**Ước tính:** ~150 dòng code

#### 3.6. `/src/components/ta-dashboard/MessagePanel.tsx`
**Mô tả:** Panel hiển thị danh sách tin nhắn

**Props:**
```typescript
interface MessagePanelProps {
  messages: Message[];
  onSelectMessage?: (message: Message) => void;
}
```

**Features:**
- Message list với preview
- Status badges
- Filter by status/type
- Search

**Dependencies:**
- Ant Design List, Tag, Input

**Ước tính:** ~200 dòng code

#### 3.7. `/src/components/ta-dashboard/ParentCommunication.tsx`
**Mô tả:** Component chat 1-1 với phụ huynh

**Props:**
```typescript
interface ParentCommunicationProps {
  conversationId: string;
  onClose?: () => void;
}
```

**Features:**
- Chat interface
- Message history
- Send text/image
- Real-time updates (optional với WebSocket)

**Dependencies:**
- messagingService.getConversationMessages()
- messagingService.sendConversationMessage()
- Ant Design Input, Button, List

**Ước tính:** ~300 dòng code

#### 3.8. `/src/components/ta-dashboard/QuotaLimitModal.tsx`
**Mô tả:** Modal cảnh báo quota (anti-spam)

**Props:**
```typescript
interface QuotaLimitModalProps {
  quota: MessageQuota;
  visible: boolean;
  onClose: () => void;
}
```

**Features:**
- Display quota usage
- Progress bars
- Warning messages
- Suggest splitting messages

**Dependencies:**
- Ant Design Modal, Progress

**Ước tính:** ~100 dòng code

#### 3.9. `/src/components/ta-dashboard/CircularProgress.tsx`
**Mô tả:** Circular progress indicator custom

**Props:**
```typescript
interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}
```

**Features:**
- Animated circular progress
- Custom colors
- Label inside

**Ước tính:** ~80 dòng code

#### 3.10. `/src/components/ta-dashboard/TALineChart.tsx`
**Mô tả:** Line chart component cho TA

**Props:**
```typescript
interface TALineChartProps {
  data: ChartData[];
  xKey: string;
  yKey: string;
  title?: string;
}
```

**Features:**
- Responsive line chart
- Tooltip
- Legend
- Custom colors

**Dependencies:**
- Recharts

**Ước tính:** ~100 dòng code

#### 3.11. `/src/components/ta-dashboard/TAHeader.tsx`
**Mô tả:** Header component cho TA pages

**Props:**
```typescript
interface TAHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}
```

**Features:**
- Page title
- Breadcrumb
- Action buttons area

**Dependencies:**
- Ant Design Breadcrumb, Space

**Ước tính:** ~80 dòng code

### Checklist Phase 3
- [ ] TADashboard.tsx hoàn thành
- [ ] MessageComposer.tsx hoàn thành
- [ ] ParentListTable.tsx hoàn thành
- [ ] PerformanceMetrics.tsx hoàn thành
- [ ] ParentCard.tsx hoàn thành
- [ ] MessagePanel.tsx hoàn thành
- [ ] ParentCommunication.tsx hoàn thành
- [ ] QuotaLimitModal.tsx hoàn thành
- [ ] CircularProgress.tsx hoàn thành
- [ ] TALineChart.tsx hoàn thành
- [ ] TAHeader.tsx hoàn thành
- [ ] Tạo CSS files tương ứng
- [ ] Test tất cả components
- [ ] Responsive design

---

## 📤 PHASE 4: UPLOAD FILE FEATURES (2 ngày)

### Mục tiêu
Tích hợp chức năng upload file (hình ảnh, video, PDF)

### 4.1. Update MessageComposer
- [ ] Add image upload button
- [ ] Add video upload button
- [ ] Add file (PDF) upload button
- [ ] Show upload progress
- [ ] Preview uploaded files
- [ ] Delete uploaded files
- [ ] Validate file types & sizes

### 4.2. Update ContentPage
- [ ] Improve video upload with progress bar
- [ ] Add drag & drop
- [ ] Multiple file upload
- [ ] Thumbnail auto-generation
- [ ] Video compression (optional)

### 4.3. Create UploadManager Component
- [ ] Global upload queue
- [ ] Multiple file upload
- [ ] Pause/Resume upload
- [ ] Retry failed uploads

**Ước tính:** 2 ngày

---

## 📊 PHASE 5: BÁO CÁO ĐẶT MUA ĐA CHIỀU (2 ngày)

### Mục tiêu
Implement báo cáo đặt mua theo nhiều góc độ

### 5.1. Create PurchaseReportPage
**Route:** `/analytics/purchases`

**Features:**
- [ ] Report dimension selector (Class, Grade, School, Province)
- [ ] Date range picker
- [ ] Filter by course type
- [ ] Summary statistics
- [ ] Detailed table
- [ ] Chart visualization
- [ ] Export Excel/PDF

**Components cần:**
- `/src/pages/PurchaseReportPage/index.tsx`
- `/src/components/analytics/ReportBuilder.tsx`
- `/src/components/analytics/ReportTable.tsx`
- `/src/components/analytics/ReportChart.tsx`

**Ước tính:** ~500 dòng code

---

## 📨 PHASE 6: INBOX/SUPPORT SYSTEM (2 ngày)

### Mục tiêu
Hoàn thiện hệ thống hỗ trợ

### 6.1. Update InboxPage
**Features:**
- [ ] Ticket list
- [ ] Ticket detail view
- [ ] Reply to ticket
- [ ] Canned responses
- [ ] Assign ticket
- [ ] Close ticket
- [ ] SLA tracking

### 6.2. Create Components
- [ ] `/src/components/inbox/TicketList.tsx`
- [ ] `/src/components/inbox/TicketDetail.tsx`
- [ ] `/src/components/inbox/CannedResponseSelector.tsx`

**Ước tính:** ~400 dòng code

---

## 👤 PHASE 7: PROFILE PAGE (1 ngày)

### Mục tiêu
Hoàn thiện trang profile

### 7.1. Update ProfilePage
**Features:**
- [ ] View profile info
- [ ] Edit profile
- [ ] Change password
- [ ] Upload avatar
- [ ] View assigned classes
- [ ] View performance metrics
- [ ] Settings (notifications, language, etc.)

**Ước tính:** ~300 dòng code

---

## 🧪 PHASE 8: TESTING & BUG FIXES (2-3 ngày)

### 8.1. Unit Testing
- [ ] Test all services
- [ ] Test critical components
- [ ] Test utils/helpers

### 8.2. Integration Testing
- [ ] Test API integration
- [ ] Test user flows
- [ ] Test edge cases

### 8.3. Manual Testing
- [ ] Test all features
- [ ] Cross-browser testing
- [ ] Responsive testing
- [ ] Accessibility testing

### 8.4. Bug Fixes
- [ ] Fix critical bugs
- [ ] Fix UI/UX issues
- [ ] Performance optimization

---

## 📚 PHASE 9: DOCUMENTATION (1 ngày)

### 9.1. API Documentation cho Đội A
**File:** `/docs/API_REQUIREMENTS.md`

**Nội dung:**
- [ ] Liệt kê tất cả endpoints cần
- [ ] Request/Response examples
- [ ] Error codes
- [ ] Authentication flow
- [ ] Rate limiting requirements

### 9.2. Developer Documentation
**File:** `/docs/DEVELOPER_GUIDE.md`

**Nội dung:**
- [ ] Setup instructions
- [ ] Project structure
- [ ] Coding conventions
- [ ] Component guide
- [ ] API integration guide

### 9.3. User Documentation
**File:** `/docs/USER_GUIDE.md`

**Nội dung:**
- [ ] Feature descriptions
- [ ] Screenshots
- [ ] Usage instructions
- [ ] FAQs

---

## 🚀 PHASE 10: DEPLOYMENT (1 ngày)

### 10.1. Preparation
- [ ] Environment variables setup
- [ ] Build production bundle
- [ ] Test production build locally

### 10.2. Vietnam VPS Setup
- [ ] SSH access confirmed
- [ ] Nginx configured
- [ ] SSL certificate installed
- [ ] Domain pointed

### 10.3. Deploy
- [ ] Upload build to VPS
- [ ] Configure Nginx
- [ ] Test production site
- [ ] Setup monitoring (Sentry)

### 10.4. CI/CD
- [ ] Setup GitHub Actions
- [ ] Automated build
- [ ] Automated deploy

---

## 📅 TIMELINE TỔNG HỢP

| Phase | Tasks | Days | Start | End |
|-------|-------|------|-------|-----|
| 1 | Type Definitions | 1-2 | Day 1 | Day 2 |
| 2 | Services API | 3-4 | Day 3 | Day 6 |
| 3 | Components | 2-3 | Day 7 | Day 9 |
| 4 | Upload Files | 2 | Day 10 | Day 11 |
| 5 | Purchase Reports | 2 | Day 12 | Day 13 |
| 6 | Inbox/Support | 2 | Day 14 | Day 15 |
| 7 | Profile | 1 | Day 16 | Day 16 |
| 8 | Testing & Fixes | 2-3 | Day 17 | Day 19 |
| 9 | Documentation | 1 | Day 20 | Day 20 |
| 10 | Deployment | 1 | Day 21 | Day 21 |

**TỔNG:** 17-21 ngày làm việc (~3-4 tuần)

---

## 🎯 CHI TIẾT TỪNG NGÀY

### WEEK 1: Foundation

#### Day 1-2: Type Definitions
**Công việc:**
1. Tạo messaging.types.ts
2. Tạo class.types.ts
3. Tạo parent.types.ts
4. Tạo content.types.ts
5. Tạo ta.types.ts
6. Tạo learner.types.ts
7. Tạo analytics.types.ts
8. Tạo survey.types.ts
9. Update index.ts

**Deliverable:** Tất cả types đã được định nghĩa đầy đủ

#### Day 3-4: Auth & Class Services
**Công việc:**
1. Implement auth.service.ts
2. Implement class.service.ts
3. Test với mock server
4. Update mockData.service.ts

**Deliverable:** Auth và Class services hoạt động

#### Day 5-6: Messaging & Content Services
**Công việc:**
1. Implement messaging.service.ts
2. Implement content.service.ts
3. Implement upload.service.ts
4. Test với mock server

**Deliverable:** Messaging, Content, Upload services hoạt động

### WEEK 2: Services & Components

#### Day 7-8: Remaining Services
**Công việc:**
1. Implement parent.service.ts
2. Implement ta.service.ts
3. Implement analytics.service.ts
4. Implement learner.service.ts
5. Integration test tất cả services

**Deliverable:** Tất cả services hoàn thành

#### Day 9-11: TA Dashboard Components
**Công việc:**
1. TADashboard.tsx
2. MessageComposer.tsx
3. ParentListTable.tsx
4. PerformanceMetrics.tsx
5. ParentCard.tsx
6. MessagePanel.tsx
7. CSS styling

**Deliverable:** Core TA components hoàn thành

### WEEK 3: Features & Integration

#### Day 12-13: Upload & Reports
**Công việc:**
1. Hoàn thiện upload features
2. Tạo PurchaseReportPage
3. Implement export Excel/PDF
4. Testing

**Deliverable:** Upload và Reports hoàn thành

#### Day 14-15: Inbox & Profile
**Công việc:**
1. Hoàn thiện InboxPage
2. Hoàn thiện ProfilePage
3. Testing

**Deliverable:** Inbox và Profile hoàn thành

#### Day 16-17: Integration Testing
**Công việc:**
1. Test tất cả user flows
2. Fix bugs
3. Performance optimization
4. Accessibility check

**Deliverable:** Ứng dụng ổn định, không bugs critical

### WEEK 4: Polish & Deploy

#### Day 18-19: Final Polish
**Công việc:**
1. UI/UX improvements
2. Final bug fixes
3. Code review
4. Documentation update

**Deliverable:** Ứng dụng production-ready

#### Day 20-21: Documentation & Deploy
**Công việc:**
1. Viết documentation
2. Setup VPS
3. Deploy production
4. Test production
5. Handover

**Deliverable:** Ứng dụng đã deploy và hoạt động

---

## 🚦 DEPENDENCIES & BLOCKERS

### Critical Dependencies
1. **Backend API từ Đội A**
   - Status: ⏳ Chờ
   - Impact: Blocker cho Phase 2
   - Mitigation: Dùng mock data để develop

2. **Design System**
   - Status: ⏳ Cần confirm
   - Impact: Affects Phase 3
   - Mitigation: Dùng Ant Design default

3. **Vietnam VPS**
   - Status: ⏳ Cần thuê
   - Impact: Blocker cho Phase 10
   - Mitigation: Deploy local test trước

### Risks
1. API không sẵn sàng đúng timeline → Delay Phase 2
2. Design changes → Rework Phase 3
3. Performance issues → Extra time Phase 8

---

## 📞 CONTACTS

### Đội A (Backend)
- **Lead:** [TBD]
- **API Docs:** [URL]
- **Base URL Dev:** [URL]
- **Base URL Prod:** [URL]

### Design Team
- **Designer:** [TBD]
- **Figma:** [URL]

### DevOps
- **Contact:** [TBD]
- **VPS Info:** [SSH details]

---

## ✅ DEFINITION OF DONE

### Cho mỗi Phase
- [ ] Code complete và tested
- [ ] No critical bugs
- [ ] Code reviewed
- [ ] Documentation updated
- [ ] Committed to git

### Cho toàn bộ dự án
- [ ] Tất cả features hoạt động
- [ ] API integration hoàn thành
- [ ] All tests passing
- [ ] Performance optimized
- [ ] Accessibility compliant
- [ ] Documentation complete
- [ ] Deployed to production
- [ ] Handover complete

---

**Last Updated:** 15/11/2025
**Status:** 🚀 READY TO START

Bắt đầu từ Phase 1 ngay!
