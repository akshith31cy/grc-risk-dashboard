# grc-risk-dashboard

# GRC Risk Visibility Dashboard

A modern, full-stack Governance, Risk & Compliance (GRC) platform for enterprise cyber risk management. Built with React, TypeScript, Node.js, and SQLite.

![Dashboard Preview](./docs/dashboard-preview.png)

## 🎯 Features

- **Risk Register Management**: CRUD operations for enterprise cyber risks
- **Automated Risk Scoring**: Real-time calculation using Impact × Probability matrix
- **Interactive Risk Heatmap**: 5×5 visualization with drill-down capability
- **Framework Alignment**: Mapped to NIST CSF and ISO 27001:2022 Annex A
- **Dashboard Analytics**: Executive-level risk visibility and metrics
- **RESTful API**: Clean, documented API endpoints

## 🛠️ Tech Stack

**Frontend:**
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Recharts for data visualization
- React Router for navigation
- Axios for API communication

**Backend:**
- Node.js with Express
- TypeScript
- SQLite3 (better-sqlite3)
- RESTful API architecture

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

## 🚀 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/grc-risk-dashboard.git
cd grc-risk-dashboard
```

### 2. Backend Setup
```bash
cd server
npm install
npm run seed    # Initialize database and seed data
npm run dev     # Start backend server on port 3001
```

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev     # Start frontend on port 5173
```

### 4. Access the Application
Open browser: http://localhost:5173

## 📊 Database Schema

- **risks**: Core risk register with impact/probability scoring
- **controls**: Control library with framework mappings
- **risk_control_mapping**: Many-to-many relationship
- **framework_references**: NIST CSF and ISO 27001 mappings

## 🔌 API Endpoints

### Risks
- `GET /api/risks` - Get all risks (with filters)
- `GET /api/risks/:id` - Get single risk
- `POST /api/risks` - Create new risk
- `PUT /api/risks/:id` - Update risk
- `DELETE /api/risks/:id` - Delete risk

### Dashboard
- `GET /api/dashboard/stats` - Overall statistics
- `GET /api/dashboard/heatmap` - Heatmap matrix data
- `GET /api/dashboard/top-risks` - Top 10 risks
- `GET /api/dashboard/category-breakdown` - Risk distribution

## 📁 Project Structure
```
grc-risk-dashboard/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service layer
│   │   ├── types/         # TypeScript interfaces
│   │   └── utils/         # Utility functions
├── server/                # Node.js backend
│   ├── src/
│   │   ├── config/        # Database configuration
│   │   ├── controllers/   # Request handlers
│   │   ├── models/        # Data models
│   │   ├── routes/        # API routes
│   │   └── utils/         # Seed data
└── README.md
```

## 🎓 Learning Outcomes

This project demonstrates:
- Full-stack TypeScript development
- RESTful API design
- React hooks and state management
- Database schema design
- Data visualization with charts
- Responsive UI design with Tailwind
- Risk management methodologies (ISO 31000)
- Compliance framework mapping (NIST CSF, ISO 27001)

## 📝 Future Enhancements

- [ ] Control library management UI
- [ ] Risk-control mapping interface
- [ ] User authentication & authorization
- [ ] Advanced filtering and search
- [ ] Export to PDF/CSV
- [ ] Risk treatment workflow
- [ ] Audit logging
- [ ] Multi-tenant support

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Profile](https://linkedin.com/in/yourprofile)
- Portfolio: [yourportfolio.com](https://yourportfolio.com)

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- Inspired by enterprise GRC platforms (Eramba, ServiceNow GRC)
- NIST Cybersecurity Framework
- ISO/IEC 27001:2022 standard
```

---

### **Step 39: Create .gitignore**

Create `.gitignore` in project root:
```
# Dependencies
node_modules/
*/node_modules/

# Build output
dist/
build/
*.tsbuildinfo

# Database
*.db
*.db-journal

# Environment variables
.env
.env.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Logs
logs/
*.log
npm-debug.log*

# Testing
coverage/
.nyc_output/

# Temporary files
tmp/
temp/
