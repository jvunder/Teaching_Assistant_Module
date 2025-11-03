# 📚 TEACHING ASSISTANT MODULE - WEBAPP
# Module Trợ Giảng - Ứng dụng Web

**Dự án:** AnhHuy EduConnect V1 - Teaching Assistant WebApp
**Ngày tạo:** 01/11/2025
**Trạng thái:** ✅ **READY FOR DEVELOPMENT**

---

## 📋 MỤC LỤC

1. [Tổng quan Module](#1-tổng-quan-module)
2. [Danh sách Files](#2-danh-sách-files)
3. [Tech Stack](#3-tech-stack)
4. [Ước tính Development](#4-ước-tính-development)
5. [Yêu cầu Chuẩn bị](#5-yêu-cầu-chuẩn-bị)
6. [Bắt đầu Development](#6-bắt-đầu-development)

---

## 1. TỔNG QUAN MODULE

### 🎯 Mục đích

**Teaching Assistant WebApp** là ứng dụng web độc lập (standalone) cho phép Trợ Giảng quản lý và hỗ trợ nhiều lớp học, tương tác với phụ huynh, tạo nội dung marketing, và theo dõi hiệu suất học tập.

### 📊 Phạm vi

**SCOPE:**
- ✅ **Frontend WebApp Only** - React SPA
- ✅ **Responsive Design** - Desktop first, tablet support
- ✅ **API Integration** - Kết nối backend (do team khác làm)
- ✅ **Deploy Vietnam** - VPS/Cloud tại Việt Nam

**OUT OF SCOPE:**
- ❌ Backend API development
- ❌ Database design
- ❌ Server-side logic
- ❌ Zalo Mini App integration

### 🎨 Features Chính

1. **Dashboard** - Tổng quan KPIs, charts, priority tasks
2. **Class Management** - Quản lý 5-15 lớp, xem danh sách phụ huynh
3. **Targeted Messaging** - Gửi tin nhắn có chọn lọc với anti-spam
4. **Content Management** - Upload video, viết bài, tracking analytics
5. **Survey System** - Tạo khảo sát, xem responses
6. **Analytics Dashboard** - Biểu đồ, báo cáo, export Excel
7. **Support Inbox** - Ticket system, canned responses, SLA tracking
8. **Profile Management** - Edit profile, change password, settings

---

## 2. DANH SÁCH FILES

### 📄 Files trong folder này:

| File | Mô tả | Trạng thái |
|------|-------|-----------|
| **README.md** | File này - Hướng dẫn tổng quan | ✅ |
| **PRD_TRO_GIANG_FRONTEND_ONLY.md** | ⭐ **CHỦ YẾU** - PRD Frontend đầy đủ | ✅ Ready |
| **PRD_TRO_GIANG_CORRECTIONS.md** | Giải đáp thắc mắc & corrections | 📘 Reference |
| **PRD_TRO_GIANG_MASTER_V3_COMPLETE.md** | Version cũ (có backend) | 📦 Archive |
| **DEV_GETTING_STARTED.md** | Hướng dẫn setup project & start dev | ✅ Ready |

---

## 3. TECH STACK

### Frontend

```json
{
  "framework": "React 18+",
  "buildTool": "Vite 5+",
  "language": "TypeScript",
  "uiLibrary": "Ant Design 5+ hoặc Material-UI 5+",
  "stateManagement": "Zustand",
  "httpClient": "Axios",
  "charts": "Recharts",
  "richTextEditor": "Quill",
  "routing": "React Router 6+",
  "testing": {
    "unit": "Vitest + React Testing Library",
    "e2e": "Cypress"
  }
}
```

### Deployment

```json
{
  "hosting": "Vietnam VPS (Viettel IDC / FPT Cloud / VNPT Cloud)",
  "webServer": "Nginx",
  "ssl": "Let's Encrypt (Free)",
  "cicd": "GitHub Actions",
  "monitoring": "Sentry (optional)"
}
```

### Infrastructure

```yaml
100% Vietnam Infrastructure: ✅

Options:
  1. Viettel IDC VPS + Nginx
     - Cost: ~200,000 VND/tháng
     - Location: Hà Nội / TP.HCM
     - Recommended: ⭐

  2. FPT Cloud S3 + CDN
     - Cost: ~100,000 VND/tháng
     - Auto-scaling

  3. VNPT Cloud VPS
     - Cost: ~150,000 VND/tháng
```

---

## 4. ƯỚC TÍNH DEVELOPMENT

### Timeline

```
┌─────────────────────────────────────────────────────────────┐
│  PHASE 1: Setup & Core UI          │ 1 tuần   │ Day 1-7    │
│  PHASE 2: Dashboard & Classes       │ 1 tuần   │ Day 8-14   │
│  PHASE 3: Messaging & Content       │ 1.5 tuần │ Day 15-22  │
│  PHASE 4: Analytics & Inbox         │ 1.5 tuần │ Day 23-30  │
│  PHASE 5: Profile & Final Polish    │ 1 tuần   │ Day 31-37  │
├─────────────────────────────────────────────────────────────┤
│  TOTAL:                             │ 7.5 tuần │ 37 days    │
└─────────────────────────────────────────────────────────────┘
```

### Team

```yaml
Minimum:
  - 2 Frontend Developers (Full-time)
  - 1 UI/UX Designer (Part-time, first 2 weeks)
  - 1 QA Engineer (Part-time, last 2 weeks)

Optimal:
  - 3 Frontend Developers
  - 1 UI/UX Designer (Full-time)
  - 1 QA Engineer (Full-time, from week 3)
  - 1 DevOps Engineer (Part-time, for deployment)
```

### Breakdown

| Phase | Tasks | Days | FE Devs |
|-------|-------|------|---------|
| **Phase 1** | Setup, Design System, Auth | 7 | 2 |
| **Phase 2** | Dashboard, Classes | 7 | 2 |
| **Phase 3** | Messaging, Content | 8 | 2 |
| **Phase 4** | Analytics, Inbox | 8 | 2 |
| **Phase 5** | Profile, Testing, Deploy | 7 | 2 |
| **TOTAL** | | **37** | |

---

## 5. YÊU CẦU CHUẨN BỊ

### A. Từ Backend Team

**Cần trước khi bắt đầu:**

- [ ] **API Documentation** - Swagger/OpenAPI specs
  - Base URL (dev & prod)
  - All endpoints (24 endpoints)
  - Request/Response format
  - Error codes list

- [ ] **Authentication**
  - JWT format & expiration
  - Refresh token flow
  - Login endpoint working

- [ ] **CORS Configuration**
  - Whitelist frontend domain
  - Allow credentials

- [ ] **WebSocket** (optional, for real-time features)
  - WS URL
  - Event list
  - Authentication flow

**Có thể làm sau (không block):**
- Analytics endpoints (có thể dùng mock data)
- Advanced features (có thể phase 2)

---

### B. Từ Design Team

**Cần trước khi bắt đầu:**

- [ ] **Design System**
  - Color palette (primary, secondary, semantic)
  - Typography (font family, sizes, weights)
  - Spacing scale
  - Border radius, shadows

- [ ] **Logo & Assets**
  - Logo SVG (light/dark mode)
  - Favicon
  - Icon set (nếu custom)

- [ ] **Wireframes**
  - High-fidelity mockups (Figma/Adobe XD)
  - 8 main pages (Dashboard, Classes, Messaging, Content, Analytics, Inbox, Profile, Login)
  - Responsive variants (desktop, tablet)

**Có thể làm sau:**
- Detailed component variants
- Animations & transitions
- Illustrations

---

### C. Infrastructure

**Cần trước khi deploy production:**

- [ ] **Domain**
  - Domain đã đăng ký (e.g., ta.educonnect.vn)
  - DNS access

- [ ] **Vietnam VPS/Cloud**
  - Đã thuê VPS (Viettel/FPT/VNPT)
  - SSH access
  - IP address

- [ ] **Environment Variables**
  - API base URL (dev & prod)
  - Any API keys (if needed)

- [ ] **Monitoring** (optional)
  - Sentry account for error tracking
  - Analytics (Google Analytics hoặc Vietnam alternative)

---

## 6. BẮT ĐẦU DEVELOPMENT

### Quick Start Guide

```bash
# 1. Clone hoặc tạo project mới
npx create-vite@latest ta-webapp --template react-ts
cd ta-webapp

# 2. Cài dependencies
npm install

# 3. Cài thêm packages (xem file DEV_GETTING_STARTED.md)
npm install antd zustand axios recharts react-router-dom
npm install -D @types/node

# 4. Setup folder structure (xem PRD_TRO_GIANG_FRONTEND_ONLY.md Section 2)

# 5. Start dev server
npm run dev
```

### Next Steps

1. **Đọc PRD đầy đủ:**
   - File: `PRD_TRO_GIANG_FRONTEND_ONLY.md`
   - Sections quan trọng:
     - Section 2: Folder Structure
     - Section 3: User Stories & UI Flows
     - Section 4: UI/UX Design System
     - Section 5: API Integration
     - Section 7: Components Architecture

2. **Setup project:**
   - File: `DEV_GETTING_STARTED.md`
   - Hướng dẫn từng bước setup

3. **Start coding:**
   - Begin with Phase 1 (Setup & Core UI)
   - Follow timeline trong PRD

---

## 📊 METRICS MỤC TIÊU

### Performance

| Metric | Target | Max |
|--------|--------|-----|
| First Paint | <1.5s | 2s |
| Time to Interactive | <3s | 4s |
| Lighthouse Score | >90 | 85+ |
| Bundle Size (initial) | <500KB | 800KB |

### Quality

- ✅ TypeScript: 100% coverage
- ✅ Test coverage: >80%
- ✅ ESLint: 0 errors
- ✅ Accessibility: WCAG 2.1 AA

---

## 🚀 DEPLOYMENT CHECKLIST

### Before Production Deploy

- [ ] All features tested (8 main features)
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Responsive testing (Desktop, Tablet)
- [ ] Performance audit (Lighthouse >90)
- [ ] Security audit (no sensitive data in localStorage)
- [ ] Accessibility audit (WCAG AA)
- [ ] API endpoints all working
- [ ] Error handling complete
- [ ] Loading states implemented
- [ ] Empty states designed
- [ ] 404 page
- [ ] Maintenance page (optional)

### Production Setup

- [ ] Vietnam VPS ready
- [ ] Nginx configured
- [ ] SSL certificate installed
- [ ] Domain pointed
- [ ] Environment variables set
- [ ] CI/CD pipeline working
- [ ] Monitoring setup (Sentry)
- [ ] Backup strategy

---

## 📞 CONTACT & SUPPORT

### Project Lead
- **Email:** [Your Email]
- **Slack:** [Channel]

### Backend Team
- **API Docs:** [Link to Swagger]
- **Contact:** [Backend Lead Email]

### Design Team
- **Figma:** [Link to designs]
- **Contact:** [Designer Email]

### DevOps
- **VPS Access:** [SSH info]
- **Contact:** [DevOps Email]

---

## 📚 ADDITIONAL RESOURCES

### Documentation

1. **React 18 Docs:** https://react.dev
2. **Vite Guide:** https://vitejs.dev
3. **Ant Design:** https://ant.design
4. **Zustand:** https://zustand-demo.pmnd.rs
5. **Recharts:** https://recharts.org

### Vietnam Cloud Providers

1. **Viettel IDC:** https://cloud.viettel.vn
2. **FPT Cloud:** https://fptcloud.com
3. **VNPT Cloud:** https://cloud.vnpt.vn
4. **CMC Cloud:** https://cmccloud.vn

### Tools

1. **Figma:** https://figma.com
2. **Postman:** https://postman.com (for API testing)
3. **Sentry:** https://sentry.io (error tracking)
4. **Lighthouse:** Chrome DevTools (performance audit)

---

## ⚠️ IMPORTANT NOTES / LƯU Ý QUAN TRỌNG

### 🔴 MUST READ / BẮT BUỘC ĐỌC

1. **100% Vietnam Infrastructure**
   - Frontend PHẢI deploy tại Vietnam
   - Tuân thủ PDPA Vietnam (Nghị định 13/2023/NĐ-CP)
   - KHÔNG sử dụng Vercel/Netlify (US-based)

2. **API Dependencies**
   - Frontend phụ thuộc vào Backend API
   - Cần mock data cho development nếu API chưa sẵn sàng
   - Kiểm tra API status trước khi integrate

3. **Browser Support**
   - Chrome: Last 2 versions ✅
   - Firefox: Last 2 versions ✅
   - Safari: Last 2 versions ✅
   - Edge: Last 2 versions ✅
   - NO IE11 ❌

4. **Mobile Support**
   - Desktop first (primary target)
   - Tablet support (basic)
   - Mobile web (view only, không tối ưu hoàn toàn)
   - Recommend mobile app cho mobile users

---

## 📅 VERSION HISTORY

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 01/11/2025 | Claude AI | Initial version - Full documentation |

---

## ✅ APPROVAL STATUS / TRẠNG THÁI PHÊ DUYỆT

| Role | Name | Status | Date |
|------|------|--------|------|
| Product Manager | [TBD] | ⏳ Pending | |
| Frontend Lead | [TBD] | ⏳ Pending | |
| UX Designer | [TBD] | ⏳ Pending | |
| Backend Lead | [TBD] | ⏳ Pending | |

---

**Last Updated:** 01/11/2025
**Status:** ✅ **READY FOR DEVELOPMENT**

---

# 🎯 BẮT ĐẦU NGAY!

Đọc file tiếp theo: **[DEV_GETTING_STARTED.md](./DEV_GETTING_STARTED.md)**

---
