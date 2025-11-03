# Teaching Assistant WebApp

**Dự án:** AnhHuy EduConnect V1 - Teaching Assistant WebApp  
**Trạng thái:** ✅ Setup Complete - Ready for Development  
**Ngày setup:** 01/11/2025

---

## 🚀 Quick Start

```bash
# Install dependencies (đã cài)
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
ta-webapp/
├── src/
│   ├── assets/           # Images, icons, fonts
│   ├── components/       # React components
│   │   ├── common/       # Reusable components
│   │   ├── layout/       # Layout components
│   │   └── features/     # Feature-specific components
│   ├── pages/            # Page components (routes)
│   ├── services/         # API services
│   ├── stores/           # Zustand stores
│   ├── hooks/            # Custom hooks
│   ├── types/            # TypeScript types
│   ├── utils/            # Utility functions
│   ├── config/           # Configuration files
│   └── styles/           # Global styles
├── docs/                 # Documentation
├── public/               # Static assets
└── dist/                 # Build output
```

---

## 🛠️ Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 7
- **UI Library:** Ant Design 5
- **State Management:** Zustand
- **Routing:** React Router DOM 7
- **HTTP Client:** Axios
- **Charts:** Recharts
- **Forms:** React Hook Form + Zod

---

## 📚 Documentation

- `docs/README.md` - Tổng quan dự án
- `docs/DEV_GETTING_STARTED.md` - Hướng dẫn development

---

## ✅ Setup Completed

- [x] Vite project với React + TypeScript
- [x] Dependencies đã cài đặt
- [x] Folder structure đã tạo
- [x] Path aliases configured (@/...)
- [x] TypeScript config với strict mode
- [x] Vite config với compression & code splitting
- [x] API service layer (Axios với interceptors)
- [x] Auth store (Zustand với persist)
- [x] Routing setup với protected routes
- [x] Placeholder pages đã tạo
- [x] Global styles & Ant Design CSS
- [x] Build successfully tested

---

## 🎯 Next Steps

1. **Build Login Page** - Theo PRD Section 3
2. **Build Layout Components** - Header, Sidebar, Footer
3. **Build Dashboard** - KPIs, charts, priority tasks
4. **Integrate APIs** - Connect với backend

---

## 📝 Notes

- Project location: `C:\Users\abc\Desktop\ta-webapp`
- Dev server: http://localhost:5173
- API Base URL: `http://localhost:3000/api/v1/ta` (config trong .env.development)

---

**Happy Coding! 🎉**
