# YÊU CẦU API TỪ BACKEND (Đội A)

**Dự án:** Teaching Assistant Module - Vietnam EduCenter V1
**Người yêu cầu:** Đội B (Frontend Team)
**Ngày:** 15/11/2025

---

## 📋 TỔNG QUAN

### Mục đích
Tài liệu này liệt kê tất cả API endpoints mà Frontend cần từ Backend để hoàn thiện module Trợ Giảng.

### Thông tin chung

**Base URLs:**
- Development: `http://localhost:3000/api/v1/ta` (đề nghị)
- Production: `https://api.educonnect.vn/api/v1/ta` (example)

**Authentication:**
- Type: Bearer Token (JWT)
- Header: `Authorization: Bearer {token}`
- Token expiry: 24h (đề nghị)
- Refresh token expiry: 30 days (đề nghị)

**Response Format:**
```json
{
  "success": true | false,
  "data": {}, // hoặc [],
  "message": "Success message",
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description"
  }
}
```

**Pagination:**
```json
{
  "success": true,
  "data": {
    "items": [],
    "total": 100,
    "page": 1,
    "limit": 20,
    "totalPages": 5
  }
}
```

---

## 🔐 1. AUTHENTICATION ENDPOINTS

### 1.1. Login
```
POST /api/v1/ta/auth/login
```

**Request:**
```json
{
  "email": "trogiảng@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "ta-uuid",
      "email": "trogiảng@example.com",
      "fullName": "Nguyễn Văn A",
      "role": "teaching_assistant",
      "avatarUrl": "https://..."
    }
  }
}
```

**Errors:**
- `401`: Invalid credentials
- `403`: Account suspended
- `429`: Too many login attempts

---

### 1.2. Logout
```
POST /api/v1/ta/auth/logout
```

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Request:** No body

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### 1.3. Refresh Token
```
POST /api/v1/ta/auth/refresh
```

**Request:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "new_access_token",
    "refreshToken": "new_refresh_token"
  }
}
```

---

### 1.4. Get Current User
```
GET /api/v1/ta/auth/me
```

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "ta-uuid",
    "email": "trogiảng@example.com",
    "fullName": "Nguyễn Văn A",
    "phone": "0901234567",
    "avatarUrl": "https://...",
    "assignedProvinceId": "province-uuid",
    "assignedProvinceName": "Hà Nội",
    "totalClassesManaged": 8,
    "status": "active"
  }
}
```

---

### 1.5. Update Password
```
PUT /api/v1/ta/auth/password
```

**Request:**
```json
{
  "oldPassword": "old_password",
  "newPassword": "new_password"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password updated successfully"
}
```

---

## 🏫 2. CLASS MANAGEMENT ENDPOINTS

### 2.1. Get Classes List
```
GET /api/v1/ta/classes
```

**Query Parameters:**
- `page` (number, default: 1)
- `limit` (number, default: 20, max: 100)
- `grade` (string, optional) - Filter by grade
- `subject` (string, optional) - Filter by subject
- `status` (string, optional) - "active" | "inactive" | "completed"
- `search` (string, optional) - Search by class name

**Example:**
```
GET /api/v1/ta/classes?page=1&limit=20&grade=Cơ bản&status=active
```

**Response:**
```json
{
  "success": true,
  "data": {
    "classes": [
      {
        "id": "class-uuid-1",
        "name": "Nuôi dạy con 0-3 tuổi",
        "grade": "Cơ bản",
        "subject": "Nuôi dạy con",
        "schoolName": "Trường Tiểu học ABC",
        "provinceName": "Hà Nội",
        "teacherName": "Cô Nguyễn Thị Hoa",
        "studentCount": 25,
        "parentCount": 25,
        "status": "active",
        "createdAt": "2025-01-15T00:00:00Z"
      }
    ],
    "total": 8,
    "page": 1,
    "limit": 20,
    "totalPages": 1
  }
}
```

---

### 2.2. Get Class Detail
```
GET /api/v1/ta/classes/:classId
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "class-uuid",
    "name": "Nuôi dạy con 0-3 tuổi",
    "grade": "Cơ bản",
    "subject": "Nuôi dạy con",
    "description": "Khóa học về nuôi dạy con...",
    "teacherId": "teacher-uuid",
    "teacherName": "Cô Nguyễn Thị Hoa",
    "taId": "ta-uuid",
    "taName": "Nguyễn Văn A",
    "studentCount": 25,
    "parentCount": 25,
    "status": "active",
    "startDate": "2025-01-15",
    "students": [
      {
        "id": "student-uuid",
        "studentCode": "HS001",
        "fullName": "Trần Văn B",
        "dateOfBirth": "2020-05-10",
        "parents": [
          {
            "id": "parent-uuid",
            "fullName": "Trần Thị C",
            "phone": "0912345678",
            "relationship": "mother",
            "approvalStatus": "approved"
          }
        ]
      }
    ],
    "stats": {
      "totalStudents": 25,
      "totalParents": 25,
      "registeredParents": 20,
      "paidParents": 15,
      "averageParentPoints": 45.5,
      "messagesSentThisMonth": 12
    }
  }
}
```

---

### 2.3. Get Parents in Class
```
GET /api/v1/ta/classes/:classId/parents
```

**Query Parameters:**
- `page`, `limit` (pagination)
- `approvalStatus` (string) - "pending" | "approved" | "rejected"
- `search` (string) - Search by parent name or phone

**Response:**
```json
{
  "success": true,
  "data": {
    "parents": [
      {
        "id": "parent-uuid",
        "fullName": "Trần Thị C",
        "phone": "0912345678",
        "email": "tranthic@email.com",
        "relationship": "mother",
        "studentName": "Trần Văn B",
        "studentId": "student-uuid",
        "approvalStatus": "approved",
        "approvedAt": "2025-01-20T10:00:00Z",
        "isRegistered": true,
        "isPaidLearner": true,
        "totalPoints": 45,
        "lastContactAt": "2025-11-10T15:30:00Z"
      }
    ],
    "total": 25,
    "page": 1,
    "limit": 20,
    "totalPages": 2
  }
}
```

---

### 2.4. Approve/Reject Parent
```
POST /api/v1/ta/parents/:parentId/approve
```

**Request:**
```json
{
  "approve": true,
  "reason": "Thông tin không chính xác" // Chỉ cần khi approve = false
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "parent-uuid",
    "approvalStatus": "approved",
    "approvedAt": "2025-11-15T10:00:00Z"
  },
  "message": "Phụ huynh đã được phê duyệt"
}
```

---

### 2.5. Get Class Statistics
```
GET /api/v1/ta/classes/:classId/stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalStudents": 25,
    "activeStudents": 24,
    "totalParents": 25,
    "registeredParents": 20,
    "paidParents": 15,
    "registrationRate": 80.0,
    "paymentRate": 60.0,
    "averageParentPoints": 45.5,
    "messagesSentThisMonth": 12,
    "messagesReadRate": 85.5
  }
}
```

---

## 💬 3. MESSAGING ENDPOINTS

### 3.1. Send Message
```
POST /api/v1/ta/messages/send
```

**Request:**
```json
{
  "subject": "Thông báo kiểm tra",
  "content": "Kính gửi quý phụ huynh...",
  "type": "text",
  "recipientIds": ["parent-uuid-1", "parent-uuid-2"],
  "attachments": [
    {
      "type": "image",
      "name": "thong-bao.jpg",
      "url": "https://storage.../file.jpg",
      "size": 102400
    }
  ],
  "scheduledAt": "2025-11-20T09:00:00Z" // Optional
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "message-uuid",
    "status": "sent", // hoặc "scheduled"
    "totalRecipients": 2,
    "sentCount": 2,
    "sentAt": "2025-11-15T10:30:00Z"
  },
  "message": "Tin nhắn đã được gửi thành công"
}
```

---

### 3.2. Get Messages List
```
GET /api/v1/ta/messages
```

**Query Parameters:**
- `page`, `limit` (pagination)
- `status` (string) - "draft" | "scheduled" | "sent" | "failed"
- `type` (string) - "text" | "image" | "video" | "file"
- `dateFrom`, `dateTo` (ISO date strings)

**Response:**
```json
{
  "success": true,
  "data": {
    "messages": [
      {
        "id": "message-uuid",
        "subject": "Thông báo kiểm tra",
        "content": "Kính gửi quý phụ huynh...",
        "type": "text",
        "status": "sent",
        "totalRecipients": 25,
        "sentCount": 25,
        "deliveredCount": 23,
        "readCount": 20,
        "sentAt": "2025-11-15T10:30:00Z",
        "createdAt": "2025-11-15T10:00:00Z"
      }
    ],
    "total": 50,
    "page": 1,
    "limit": 20,
    "totalPages": 3
  }
}
```

---

### 3.3. Get Message Detail
```
GET /api/v1/ta/messages/:messageId
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "message-uuid",
    "subject": "Thông báo kiểm tra",
    "content": "Kính gửi quý phụ huynh...",
    "type": "text",
    "status": "sent",
    "recipients": [
      {
        "id": "recipient-uuid",
        "parentId": "parent-uuid",
        "parentName": "Trần Thị C",
        "status": "read",
        "sentAt": "2025-11-15T10:30:00Z",
        "deliveredAt": "2025-11-15T10:31:00Z",
        "readAt": "2025-11-15T11:00:00Z"
      }
    ],
    "totalRecipients": 25,
    "sentCount": 25,
    "deliveredCount": 23,
    "readCount": 20,
    "attachments": [],
    "sentAt": "2025-11-15T10:30:00Z"
  }
}
```

---

### 3.4. Cancel Scheduled Message
```
DELETE /api/v1/ta/messages/:messageId/schedule
```

**Response:**
```json
{
  "success": true,
  "message": "Tin nhắn đã được hủy lên lịch"
}
```

---

### 3.5. Get Message Quota (Anti-spam)
```
GET /api/v1/ta/messages/quota
```

**Response:**
```json
{
  "success": true,
  "data": {
    "dailyLimit": 100,
    "dailyUsed": 25,
    "monthlyLimit": 2000,
    "monthlyUsed": 450,
    "resetAt": "2025-11-16T00:00:00Z",
    "canSend": true,
    "remainingToday": 75,
    "remainingThisMonth": 1550
  }
}
```

---

### 3.6. Get Message Templates
```
GET /api/v1/ta/messages/templates
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "template-uuid",
      "name": "Chào mừng",
      "category": "greeting",
      "content": "Kính gửi quý phụ huynh {parentName}...",
      "variables": ["parentName", "studentName"],
      "usageCount": 15
    }
  ]
}
```

---

### 3.7. Filter Recipients (Preview)
```
POST /api/v1/ta/messages/filter-recipients
```

**Request:**
```json
{
  "filters": [
    {
      "field": "class",
      "operator": "equals",
      "value": "class-uuid"
    },
    {
      "field": "paid_status",
      "operator": "equals",
      "value": "true"
    }
  ],
  "page": 1,
  "limit": 100
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "parents": [...],
    "total": 15,
    "estimatedRecipients": 15
  }
}
```

---

### 3.8. Get Conversations (1-1 Chat)
```
GET /api/v1/ta/conversations
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "conversation-uuid",
      "parentId": "parent-uuid",
      "parentName": "Trần Thị C",
      "studentName": "Trần Văn B",
      "lastMessage": "Cảm ơn cô",
      "lastMessageAt": "2025-11-15T14:30:00Z",
      "unreadCount": 2
    }
  ]
}
```

---

### 3.9. Get Conversation Messages
```
GET /api/v1/ta/conversations/:conversationId/messages
```

**Response:**
```json
{
  "success": true,
  "data": {
    "messages": [
      {
        "id": "msg-uuid",
        "senderId": "parent-uuid",
        "senderType": "parent",
        "senderName": "Trần Thị C",
        "content": "Cô ơi...",
        "type": "text",
        "sentAt": "2025-11-15T14:00:00Z",
        "isRead": true
      }
    ]
  }
}
```

---

### 3.10. Send Conversation Message
```
POST /api/v1/ta/conversations/:conversationId/messages
```

**Request:**
```json
{
  "content": "Dạ, cảm ơn phụ huynh",
  "type": "text"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "msg-uuid",
    "content": "Dạ, cảm ơn phụ huynh",
    "sentAt": "2025-11-15T14:05:00Z"
  }
}
```

---

## 📝 4. CONTENT MANAGEMENT ENDPOINTS

### 4.1. Get Contents List
```
GET /api/v1/ta/contents
```

**Query Parameters:**
- `page`, `limit`
- `type` - "video" | "article" | "micro_course"
- `status` - "draft" | "published" | "archived"
- `categoryId` (string)
- `search` (string)

**Response:**
```json
{
  "success": true,
  "data": {
    "contents": [
      {
        "id": "content-uuid",
        "title": "Video hướng dẫn...",
        "type": "video",
        "status": "published",
        "videoUrl": "https://...",
        "thumbnailUrl": "https://...",
        "duration": 600,
        "views": 1250,
        "categoryName": "Giáo dục",
        "publishedAt": "2025-11-01T00:00:00Z",
        "createdAt": "2025-10-28T00:00:00Z"
      }
    ],
    "total": 15,
    "page": 1,
    "limit": 20,
    "totalPages": 1
  }
}
```

---

### 4.2. Upload Video
```
POST /api/v1/ta/contents/video
Content-Type: multipart/form-data
```

**Request (FormData):**
- `title` (string)
- `description` (string)
- `categoryId` (string)
- `tags` (string, comma-separated)
- `file` (File) - Video file
- `thumbnail` (File, optional) - Thumbnail image
- `scheduledAt` (string, optional) - ISO date

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "video-uuid",
    "title": "Video hướng dẫn...",
    "videoUrl": "https://storage.../video.mp4",
    "thumbnailUrl": "https://storage.../thumb.jpg",
    "duration": 600,
    "status": "draft"
  },
  "message": "Video đã được upload thành công"
}
```

---

### 4.3. Create Article
```
POST /api/v1/ta/contents/article
```

**Request:**
```json
{
  "title": "Bài viết hướng dẫn...",
  "description": "Mô tả ngắn",
  "content": "<h1>Nội dung...</h1>",
  "categoryId": "category-uuid",
  "tags": ["education", "parenting"],
  "thumbnailUrl": "https://...",
  "scheduledAt": "2025-11-20T00:00:00Z"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "article-uuid",
    "title": "Bài viết hướng dẫn...",
    "status": "draft"
  },
  "message": "Bài viết đã được tạo thành công"
}
```

---

### 4.4. Publish Content
```
POST /api/v1/ta/contents/:contentId/publish
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "content-uuid",
    "status": "published",
    "publishedAt": "2025-11-15T10:00:00Z"
  }
}
```

---

### 4.5. Delete Content
```
DELETE /api/v1/ta/contents/:contentId
```

**Response:**
```json
{
  "success": true,
  "message": "Nội dung đã được xóa"
}
```

---

### 4.6. Get Content Analytics
```
GET /api/v1/ta/contents/:contentId/analytics
```

**Response:**
```json
{
  "success": true,
  "data": {
    "contentId": "content-uuid",
    "totalViews": 1250,
    "uniqueViews": 980,
    "viewsByDate": [
      {
        "date": "2025-11-01",
        "views": 50,
        "uniqueViews": 45
      }
    ],
    "averageWatchTime": 480,
    "completionRate": 75.5,
    "viewsByClass": [
      {
        "classId": "class-uuid",
        "className": "Lớp A",
        "views": 150,
        "percentage": 12.0
      }
    ]
  }
}
```

---

### 4.7. Get Categories
```
GET /api/v1/ta/contents/categories
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "category-uuid",
      "name": "Giáo dục",
      "slug": "giao-duc",
      "order": 1
    }
  ]
}
```

---

## 📊 5. ANALYTICS & REPORTS ENDPOINTS

### 5.1. Get TA Dashboard
```
GET /api/v1/ta/dashboard
```

**Response:**
```json
{
  "success": true,
  "data": {
    "kpis": {
      "totalClasses": 8,
      "totalStudents": 68,
      "totalParents": 68,
      "registeredParents": 55,
      "paidParents": 40,
      "unreadMessages": 15,
      "pendingApprovals": 3,
      "averageParentPoints": 42.5,
      "messagesSentThisMonth": 45,
      "messagesReadRate": 82.3
    },
    "parentSegments": {
      "notStarted": 12,
      "slowProgress": 18,
      "onTrack": 20,
      "topPerformers": 15,
      "atRisk": 3
    },
    "recentActivities": [...],
    "classPerformance": [...],
    "upcomingTasks": [...],
    "alerts": [...]
  }
}
```

---

### 5.2. Get Purchase Reports
```
GET /api/v1/ta/analytics/purchases
```

**Query Parameters:**
- `dimension` - "class" | "grade" | "school" | "province"
- `dateFrom`, `dateTo` (ISO dates)
- `page`, `limit`

**Response:**
```json
{
  "success": true,
  "data": {
    "reports": [
      {
        "dimensionValue": "Lớp A",
        "totalPurchases": 15,
        "totalRevenue": 4500000,
        "paidParents": 15,
        "courses": [
          {
            "courseId": "course-uuid",
            "courseName": "Khóa cơ bản",
            "purchases": 10,
            "revenue": 3000000
          }
        ]
      }
    ],
    "summary": {
      "totalPurchases": 40,
      "totalRevenue": 12000000,
      "totalPaidParents": 40
    },
    "total": 8,
    "page": 1,
    "limit": 20
  }
}
```

---

### 5.3. Export Report
```
POST /api/v1/ta/analytics/export
```

**Request:**
```json
{
  "reportType": "purchases",
  "format": "excel",
  "filters": {
    "dimension": "class",
    "dateFrom": "2025-01-01",
    "dateTo": "2025-11-15"
  }
}
```

**Response:**
```
Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
Content-Disposition: attachment; filename="purchase_report_2025-11-15.xlsx"

[Binary file data]
```

---

## 📤 6. FILE UPLOAD ENDPOINTS

### 6.1. Upload Image
```
POST /api/v1/ta/upload/image
Content-Type: multipart/form-data
```

**Request:**
- `file` (File) - Image file

**Validation:**
- Max size: 5MB
- Types: jpg, jpeg, png, gif

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "file-uuid",
    "url": "https://storage.../image.jpg",
    "name": "image.jpg",
    "size": 102400,
    "mimeType": "image/jpeg"
  }
}
```

---

### 6.2. Upload Video
```
POST /api/v1/ta/upload/video
Content-Type: multipart/form-data
```

**Request:**
- `file` (File) - Video file

**Validation:**
- Max size: 500MB
- Types: mp4, avi, mov, wmv

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "file-uuid",
    "url": "https://storage.../video.mp4",
    "name": "video.mp4",
    "size": 52428800,
    "duration": 600,
    "mimeType": "video/mp4"
  }
}
```

---

### 6.3. Upload File (PDF, etc.)
```
POST /api/v1/ta/upload/file
Content-Type: multipart/form-data
```

**Request:**
- `file` (File) - Any file

**Validation:**
- Max size: 10MB
- Types: pdf, doc, docx, ppt, pptx, xls, xlsx

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "file-uuid",
    "url": "https://storage.../document.pdf",
    "name": "document.pdf",
    "size": 1048576,
    "mimeType": "application/pdf"
  }
}
```

---

## 👤 7. PROFILE & SETTINGS ENDPOINTS

### 7.1. Get TA Profile
```
GET /api/v1/ta/profile
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "ta-uuid",
    "email": "trogiảng@example.com",
    "fullName": "Nguyễn Văn A",
    "phone": "0901234567",
    "avatarUrl": "https://...",
    "assignedProvinceName": "Hà Nội",
    "totalClassesManaged": 8,
    "totalParentsManaged": 68,
    "status": "active",
    "joinedAt": "2025-01-01T00:00:00Z"
  }
}
```

---

### 7.2. Update TA Profile
```
PUT /api/v1/ta/profile
```

**Request:**
```json
{
  "fullName": "Nguyễn Văn A",
  "phone": "0901234567",
  "avatarUrl": "https://..."
}
```

**Response:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Cập nhật thông tin thành công"
}
```

---

### 7.3. Get TA Settings
```
GET /api/v1/ta/settings
```

**Response:**
```json
{
  "success": true,
  "data": {
    "taId": "ta-uuid",
    "emailNotifications": true,
    "pushNotifications": true,
    "language": "vi",
    "timezone": "Asia/Ho_Chi_Minh"
  }
}
```

---

### 7.4. Update TA Settings
```
PUT /api/v1/ta/settings
```

**Request:**
```json
{
  "settings": {
    "emailNotifications": true,
    "language": "vi"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Cập nhật cài đặt thành công"
}
```

---

## ❗ ERROR CODES

### Common Error Codes
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description"
  }
}
```

**Error Code List:**

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `UNAUTHORIZED` | 401 | Token invalid or expired |
| `FORBIDDEN` | 403 | No permission |
| `NOT_FOUND` | 404 | Resource not found |
| `VALIDATION_ERROR` | 400 | Input validation failed |
| `QUOTA_EXCEEDED` | 429 | Message quota exceeded |
| `FILE_TOO_LARGE` | 400 | File size exceeds limit |
| `INVALID_FILE_TYPE` | 400 | File type not allowed |
| `SERVER_ERROR` | 500 | Internal server error |

---

## 🔒 SECURITY REQUIREMENTS

### 1. CORS
- Allow origin: Frontend domain
- Allow credentials: true
- Allowed methods: GET, POST, PUT, DELETE
- Allowed headers: Authorization, Content-Type

### 2. Rate Limiting
**Suggested limits:**
- Auth endpoints: 5 requests/minute
- Message send: 10 requests/minute
- File upload: 5 uploads/minute
- Other: 100 requests/minute

### 3. File Upload Security
- Validate file types
- Scan for viruses (recommended)
- Generate unique filenames
- Store in secure storage (S3-compatible)
- CDN for public files

---

## 📞 SUPPORT & QUESTIONS

### Backend Team Contact
**Lead:** [Tên người phụ trách Backend]
**Email:** [Email]
**Slack/Zalo:** [Channel]

### Questions to Clarify
1. ✅ Base URLs đã xác định chưa?
2. ✅ JWT format và expiry time?
3. ✅ File storage solution (S3, local, etc.)?
4. ✅ WebSocket support cho real-time messaging?
5. ✅ Rate limiting policies?
6. ✅ CORS whitelist domains?

---

## ✅ CHECKLIST

**Trước khi bắt đầu frontend development:**
- [ ] Tất cả endpoints đã được implement
- [ ] API documentation (Swagger) sẵn sàng
- [ ] Dev environment URLs đã share
- [ ] Sample requests/responses tested
- [ ] Error handling implemented
- [ ] CORS configured
- [ ] JWT authentication working
- [ ] File upload tested

**Nice to have:**
- [ ] WebSocket for real-time features
- [ ] Rate limiting implemented
- [ ] API versioning strategy
- [ ] Monitoring & logging

---

**Last Updated:** 15/11/2025
**Version:** 1.0
**Status:** 📋 Waiting for Backend Implementation
