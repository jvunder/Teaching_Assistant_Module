# UAT TEST DATA REFERENCE
## Teaching Assistant WebApp - Mock Data Guide

**Version:** 1.0
**Date:** 01/11/2025

---

## 📋 OVERVIEW

This document describes the test data available in the Teaching Assistant WebApp for User Acceptance Testing. Currently, the application uses a **Mock Data Service** that simulates backend API responses, allowing frontend testing without requiring a real backend.

---

## 🔐 TEST ACCOUNTS

### Authentication

**Current Implementation:** Mock authentication accepts any email with password ≥6 characters.

**Recommended Test Accounts:**

| Email | Password | Role | Purpose |
|-------|----------|------|---------|
| ta1@test.com | Test@123 | Teaching Assistant | Primary testing account |
| ta2@test.com | Test@123 | Teaching Assistant | Secondary testing account |
| admin@test.com | Admin@123 | Administrator | Admin features (if applicable) |

**Login Behavior:**
- Any valid email format with password ≥6 chars will succeed
- Returns mock JWT token
- User object includes: `id`, `email`, `fullName`, `role`, `avatarUrl`

---

## 📊 DASHBOARD DATA

### KPI Metrics

Mock data returns the following KPIs:

| Metric | Value | Description |
|--------|-------|-------------|
| **Total Classes** | 12 | Number of classes assigned to TA |
| **Total Students** | 456 | Total students across all classes |
| **Total Parents** | 892 | Total parents (most students have 2 parents) |
| **Unread Messages** | 23 | Number of unread support messages |

### Performance Data (Bar Chart)

Mock data includes ~12 classes with completion rates:

```javascript
[
  { name: 'Class 10A1', completion: 92 },
  { name: 'Class 9B2', completion: 88 },
  { name: 'Class 10A2', completion: 85 },
  { name: 'Class 9B1', completion: 82 },
  { name: 'Class 8A1', completion: 78 },
  { name: 'Class 8A2', completion: 75 },
  { name: 'Class 7B1', completion: 72 },
  { name: 'Class 7B2', completion: 68 },
  { name: 'Class 10A3', completion: 65 },
  { name: 'Class 9B3', completion: 62 },
  { name: 'Class 8A3', completion: 58 },
  { name: 'Class 7B3', completion: 55 }
]
```

**Completion Rate:** Percentage of students who completed course materials (0-100%)

### Trend Data (Line Chart)

Mock data shows 30 days of engagement data:

```javascript
[
  { date: '2025-01-01', engagement: 65 },
  { date: '2025-01-02', engagement: 72 },
  { date: '2025-01-03', engagement: 68 },
  // ... 30 days total
  { date: '2025-01-30', engagement: 78 }
]
```

**Engagement:** Daily active parent participation rate (0-100%)

### Recent Activities

Mock data includes ~10 recent activities:

```javascript
[
  {
    id: '1',
    action: 'Gửi tin nhắn',
    description: 'Gửi tin nhắn nhắc nhở cho Class 10A1',
    timestamp: '2025-01-15 10:30:00',
    user: 'Teaching Assistant'
  },
  {
    id: '2',
    action: 'Tạo nội dung',
    description: 'Upload video "Bài 5: Toán học cơ bản"',
    timestamp: '2025-01-15 09:15:00',
    user: 'Teaching Assistant'
  },
  // ... more activities
]
```

---

## 📚 CLASSES DATA

### Class List

Mock data includes 12 classes:

| Class ID | Name | Students | Status | Created Date |
|----------|------|----------|--------|--------------|
| class-1 | Class 10A1 | 38 | Active | 2024-09-01 |
| class-2 | Class 9B2 | 36 | Active | 2024-09-01 |
| class-3 | Class 10A2 | 40 | Active | 2024-09-01 |
| class-4 | Class 9B1 | 35 | Active | 2024-09-01 |
| class-5 | Class 8A1 | 32 | Active | 2024-09-01 |
| class-6 | Class 8A2 | 34 | Inactive | 2024-09-01 |
| class-7 | Class 7B1 | 30 | Active | 2024-09-01 |
| class-8 | Class 7B2 | 31 | Active | 2024-09-01 |
| class-9 | Class 10A3 | 42 | Active | 2024-09-01 |
| class-10 | Class 9B3 | 37 | Active | 2024-09-01 |
| class-11 | Class 8A3 | 33 | Inactive | 2024-09-01 |
| class-12 | Class 7B3 | 28 | Active | 2024-09-01 |

**Total Students:** 456
**Active Classes:** 10
**Inactive Classes:** 2

### Class Detail Data

For each class, mock data provides:

**Stats:**
- Total Parents: ~38 per class (varies)
- Average Completion: 65-92% (varies by class)
- Top Performers: ~10 students

**Parent List (per class):**

Example for Class 10A1:

| Parent ID | Parent Name | Student Name | Progress | Points | Last Active |
|-----------|-------------|--------------|----------|--------|-------------|
| p1 | Nguyễn Văn A | Nguyễn Minh An | 95% | 450 | 2025-01-15 |
| p2 | Trần Thị B | Nguyễn Minh An | 95% | 450 | 2025-01-15 |
| p3 | Lê Văn C | Trần Thu Hà | 88% | 420 | 2025-01-14 |
| p4 | Phạm Thị D | Trần Thu Hà | 88% | 420 | 2025-01-14 |
| ... | ... | ... | ... | ... | ... |

**Note:** Each student typically has 2 parents (mother & father) with same progress/points.

---

## 💬 MESSAGING DATA

### Message Templates

Mock data includes pre-defined templates:

```javascript
[
  {
    id: 'template-1',
    name: 'Nhắc nhở học bài',
    content: 'Kính gửi quý phụ huynh,\n\nChúng tôi nhận thấy con em chưa hoàn thành bài học tuần này...'
  },
  {
    id: 'template-2',
    name: 'Chúc mừng',
    content: 'Kính gửi quý phụ huynh,\n\nChúc mừng con em đã hoàn thành xuất sắc...'
  },
  {
    id: 'template-3',
    name: 'Thông báo sự kiện',
    content: 'Kính gửi quý phụ huynh,\n\nTrường thông báo về sự kiện...'
  }
]
```

### Filter Conditions

```javascript
[
  { value: 'incomplete', label: 'Chưa hoàn thành', description: 'Học sinh chưa hoàn thành bài học' },
  { value: 'inactive', label: 'Không hoạt động 7 ngày', description: 'Không đăng nhập 7 ngày' },
  { value: 'top', label: 'TOP 10%', description: 'Học sinh xuất sắc nhất lớp' },
  { value: 'low', label: 'Dưới 50%', description: 'Tiến độ dưới 50%' }
]
```

### Expected Recipients

Based on filter selection:

| Classes Selected | Condition | Expected Recipients |
|------------------|-----------|---------------------|
| Class 10A1 | All | 76 parents (38 students × 2) |
| Class 10A1 | Chưa hoàn thành | ~15 parents |
| Class 10A1 | TOP 10% | ~8 parents |
| All classes (12) | All | 892 parents |
| All classes | Chưa hoàn thành | ~180 parents |

---

## 📝 CONTENT DATA

### Content List

Mock data includes sample content items:

```javascript
[
  {
    id: 'content-1',
    type: 'video',
    title: 'Bài 1: Giới thiệu môn Toán',
    description: 'Video giới thiệu chương trình học',
    duration: '15:30',
    views: 1250,
    createdAt: '2025-01-10',
    status: 'published'
  },
  {
    id: 'content-2',
    type: 'video',
    title: 'Bài 2: Phương trình bậc nhất',
    description: 'Hướng dẫn giải phương trình',
    duration: '12:45',
    views: 980,
    createdAt: '2025-01-12',
    status: 'published'
  },
  {
    id: 'content-3',
    type: 'article',
    title: 'Tips học tốt môn Toán',
    description: 'Bài viết chia sẻ kinh nghiệm',
    views: 560,
    createdAt: '2025-01-13',
    status: 'published'
  },
  // ... more content items
]
```

**Total Content:** ~20 items (mix of videos and articles)
**Total Views:** ~15,000 views across all content

### Video Upload Constraints

Mock validation (UI only):
- **Max File Size:** 500 MB
- **Max Duration:** 15 minutes
- **Allowed Formats:** MP4, AVI, MOV, WebM
- **Required Fields:** File, Title

### Article Constraints

- **Required Fields:** Title, Content
- **Content Editor:** Rich text (HTML)
- **Max Title Length:** 200 characters

---

## 📬 SUPPORT INBOX DATA

### Ticket Counts

| Status | Count | Description |
|--------|-------|-------------|
| New | 5 | Unassigned or newly created tickets |
| In Progress | 3 | Currently being handled |
| Resolved | 45 | Completed tickets |

**Total Tickets:** 53

### Sample Tickets

**New Tickets:**

```javascript
[
  {
    id: 'ticket-1',
    ticketNumber: '1001',
    subject: 'Không thể đăng nhập',
    from: 'Nguyễn Văn A (phuhuynh@example.com)',
    content: 'Tôi không thể đăng nhập vào tài khoản. Xin hỗ trợ.',
    date: '2025-01-15 10:30',
    status: 'new',
    priority: 'high'
  },
  {
    id: 'ticket-2',
    ticketNumber: '1002',
    subject: 'Video không phát được',
    from: 'Trần Thị B (parent2@example.com)',
    content: 'Video bài 5 không phát được. Luôn bị lỗi loading.',
    date: '2025-01-15 09:15',
    status: 'new',
    priority: 'medium'
  },
  // ... 3 more new tickets
]
```

**In Progress Tickets:**

```javascript
[
  {
    id: 'ticket-6',
    ticketNumber: '1006',
    subject: 'Cần hướng dẫn thanh toán',
    from: 'Lê Văn C (parent3@example.com)',
    content: 'Tôi cần hướng dẫn cách thanh toán học phí online.',
    date: '2025-01-14 16:20',
    status: 'in-progress',
    assignedTo: 'Teaching Assistant',
    priority: 'medium'
  },
  // ... 2 more in-progress tickets
]
```

### Canned Responses

```javascript
[
  {
    id: 'canned-1',
    title: 'Hướng dẫn đăng nhập',
    content: `
      Kính gửi quý phụ huynh,

      Để đăng nhập vào hệ thống, quý phụ huynh vui lòng:
      1. Truy cập: https://educonnect.vn
      2. Nhập email đã đăng ký
      3. Nhập mật khẩu
      4. Nhấn "Đăng nhập"

      Nếu quên mật khẩu, vui lòng nhấn "Quên mật khẩu" và làm theo hướng dẫn.

      Trân trọng,
      Đội ngũ hỗ trợ
    `
  },
  {
    id: 'canned-2',
    title: 'Hướng dẫn xem video',
    content: `
      Kính gửi quý phụ huynh,

      Để xem video bài giảng:
      1. Đăng nhập vào hệ thống
      2. Vào mục "Nội dung"
      3. Chọn video muốn xem
      4. Nhấn nút phát

      Lưu ý: Cần kết nối internet ổn định để xem video.

      Trân trọng,
      Đội ngũ hỗ trợ
    `
  },
  {
    id: 'canned-3',
    title: 'Hướng dẫn thanh toán',
    content: `
      Kính gửi quý phụ huynh,

      Các phương thức thanh toán:
      1. Chuyển khoản ngân hàng
      2. Ví điện tử (MoMo, ZaloPay)
      3. Thẻ tín dụng/ghi nợ

      Vui lòng liên hệ phòng kế toán để được hỗ trợ chi tiết.

      Trân trọng,
      Đội ngũ hỗ trợ
    `
  }
]
```

---

## 📊 ANALYTICS DATA

### Engagement Trend (30 days)

Line chart showing daily engagement:

```javascript
// Sample data for last 30 days
[
  { date: '2025-01-01', engagement: 65 },
  { date: '2025-01-02', engagement: 72 },
  { date: '2025-01-03', engagement: 68 },
  { date: '2025-01-04', engagement: 75 },
  { date: '2025-01-05', engagement: 70 },
  // ... continues for 30 days
  { date: '2025-01-30', engagement: 78 }
]
```

**Engagement Metric:** % of parents who logged in and interacted with content

### Class Performance Comparison

Bar chart data (same as Dashboard):

- Class 10A1: 92%
- Class 9B2: 88%
- Class 10A2: 85%
- ... (12 classes total)

### Message Statistics

Pie chart showing message delivery funnel:

```javascript
[
  { name: 'Sent', value: 150, color: '#1890ff' },
  { name: 'Delivered', value: 145, color: '#52c41a' },
  { name: 'Read', value: 120, color: '#faad14' },
  { name: 'Replied', value: 45, color: '#f5222d' }
]
```

**Interpretation:**
- **Sent:** 150 messages sent to parents
- **Delivered:** 145 successfully delivered (96.7%)
- **Read:** 120 read by parents (82.8% of delivered)
- **Replied:** 45 parents replied (37.5% of read)

---

## 👤 PROFILE DATA

### Default User Profile

After login, mock data returns:

```javascript
{
  id: '1',
  email: 'ta1@test.com', // or whatever email was used to login
  fullName: 'Teaching Assistant',
  role: 'TEACHING_ASSISTANT',
  phone: '0901234567',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TA',
  createdAt: '2024-09-01',

  // Notification preferences
  notifications: {
    email: true,
    push: true,
    sms: false
  }
}
```

**Editable Fields:**
- Full Name
- Phone Number
- Avatar (upload new image)
- Password (with validation)
- Notification preferences

**Read-Only Fields:**
- Email (cannot be changed)
- Role
- Created Date

---

## 🔄 DATA REFRESH & PERSISTENCE

### Current Behavior

**Mock Data Service Characteristics:**

1. **No Persistence:** Data does NOT persist across page refreshes
2. **No Backend:** All data is generated in-memory
3. **Simulated Delays:** 300-800ms delay to mimic API calls
4. **Success Responses:** All operations return success (no real validation)

### What Persists

**LocalStorage/SessionStorage:**
- ✅ JWT tokens (if "Remember Me" checked)
- ✅ User object
- ✅ Auth state (via Zustand persist)

**What Does NOT Persist:**
- ❌ New messages sent
- ❌ Content uploaded
- ❌ Profile changes
- ❌ Ticket replies
- ❌ Any CRUD operations

### Refreshing Page

When you refresh the page:
1. Auth state is restored from localStorage (if logged in with "Remember Me")
2. All data is re-fetched from mock service with default values
3. No user-created data will appear

---

## 🧪 TEST DATA SCENARIOS

### Scenario 1: High Engagement Class
**Use:** Class 10A1
- **Completion:** 92%
- **Students:** 38
- **Parents:** 76
- **Status:** Active
- **Top Performers:** ~10 students

**Test Cases:**
- Send congratulations message to top performers
- View parent details with high progress
- Analyze class performance

### Scenario 2: Low Engagement Class
**Use:** Class 7B3
- **Completion:** 55%
- **Students:** 28
- **Parents:** 56
- **Status:** Active

**Test Cases:**
- Send reminder message to incomplete students
- Identify struggling students
- Create support content

### Scenario 3: Inactive Class
**Use:** Class 8A2 or Class 8A3
- **Status:** Inactive
- **Reason:** Class ended or archived

**Test Cases:**
- Verify inactive classes are visible but marked
- Check if can send messages to inactive class
- Review historical data

### Scenario 4: Bulk Messaging
**Use:** All 12 classes
- **Total Parents:** 892

**Test Cases:**
- Send announcement to all parents
- Filter by condition (incomplete, inactive, top)
- Preview recipient count before sending

### Scenario 5: Support Ticket Handling
**Use:** Ticket #1001 (Không thể đăng nhập)

**Test Cases:**
- Open new ticket
- Use canned response "Hướng dẫn đăng nhập"
- Reply and close ticket
- Transfer to admin (if needed)

---

## 📝 DATA GENERATION LOGIC

### How Mock Data is Generated

**File:** `src/services/mockData.service.ts`

**Key Functions:**

```typescript
// Login - accepts any email with password ≥6 chars
async login(email: string, password: string) {
  if (password.length >= 6) {
    return { success: true, data: { accessToken, user } };
  }
  throw new Error('Invalid credentials');
}

// Dashboard - returns fixed KPIs and generated charts
async getDashboard() {
  return {
    kpis: { totalClasses: 12, totalStudents: 456, ... },
    performanceData: [...], // 12 classes
    trendData: [...], // 30 days
    recentActivities: [...] // 10 items
  };
}

// Classes - returns 12 classes
async getClasses(params) {
  const classes = generateMockClasses(12);
  // Apply search, pagination
  return { classes, pagination };
}

// Class Detail - returns parents for specific class
async getClassDetail(classId) {
  const parents = generateMockParents(38); // ~38 per class
  return { parents, stats };
}
```

---

## 🔧 CUSTOMIZING TEST DATA

### For Developers

If you need to customize mock data for specific test scenarios:

**Location:** `src/services/mockData.service.ts`

**Example: Change number of classes**

```typescript
// Change from 12 to 20 classes
async getClasses() {
  const classes = generateMockClasses(20); // Change here
  return { success: true, data: { classes } };
}
```

**Example: Change KPI values**

```typescript
async getDashboard() {
  return {
    success: true,
    data: {
      kpis: {
        totalClasses: 20, // Change here
        totalStudents: 800, // Change here
        totalParents: 1600,
        unreadMessages: 50
      },
      // ...
    }
  };
}
```

**Example: Add more test tickets**

```typescript
const tickets = [
  {
    id: 'ticket-new-1',
    ticketNumber: '1010',
    subject: 'Custom test ticket',
    from: 'Test Parent',
    content: 'This is a custom test ticket',
    date: '2025-01-15 14:00',
    status: 'new',
    priority: 'high'
  },
  // ... more tickets
];
```

---

## 🎯 TESTING RECOMMENDATIONS

### For UAT Testers

1. **Use Recommended Test Accounts**
   - Start with `ta1@test.com` / `Test@123`
   - Try `ta2@test.com` for multi-user scenarios

2. **Focus on User Workflows**
   - Don't worry about data persistence
   - Focus on UI/UX, navigation, usability
   - Test form validations and error messages

3. **Expected Behavior**
   - All data is read-only
   - Submissions show success messages but don't save
   - Refreshing page resets to default mock data

4. **What to Test**
   - Can you complete the workflow?
   - Are forms intuitive?
   - Are error messages clear?
   - Is Vietnamese language correct?
   - Do charts display properly?
   - Is navigation smooth?

5. **What NOT to Test**
   - Data persistence (won't work)
   - Real API errors (won't happen)
   - Backend performance (no backend)
   - Data consistency across sessions (not applicable)

---

## 📞 SUPPORT

If you need specific test data that's not available in mock service:

**Contact:**
- Development Team: [dev-team@educonnect.vn]
- UAT Lead: [uat-lead@educonnect.vn]

**Request Format:**
- Feature needing data
- Specific data requirements
- Test scenario description

---

**Document Owner:** Development Team
**Last Updated:** 01/11/2025
**Version:** 1.0

---

**END OF TEST DATA REFERENCE**
