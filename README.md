# KMRL Decision Support System (DSS)

A production-quality frontend for Kochi Metro's intelligent trainset induction planner with explainable recommendations, live what-if simulation, and audit-ready approvals.

## 🚀 Features

- **Landing Page**: Modern, animated hero showcasing the DSS capabilities
- **Login System**: Demo credentials for 7 different roles
- **Role-Based Dashboards**:
  - Supervisor: Master view with ranked induction planning
  - Rolling Stock Engineer: Maintenance checklists & component tracking
  - Signalling System: Safety verification & compliance reporting
  - Telecom: Communication systems monitoring
  - Cleaning Lead: Interior/exterior cleaning workflows
  - Yard Master: Parking optimization & shunting planning
  - Branding Team: Campaign management & exposure tracking

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui
- **State Management**: React Query (for server state simulation)
- **Routing**: React Router v6
- **Animations**: Framer Motion ready (CSS animations implemented)
- **Data**: Demo JSON files (`demoTrainsets.json`, `demoUsers.json`)

## 🚀 Running the Project

To get the project running locally, you'll need to set up both the backend and the frontend.

### Backend (Python/FastAPI)

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Create and activate a virtual environment:**
    ```bash
    # Create the virtual environment
    python -m venv .venv

    # Activate on Windows
    .venv\Scripts\activate

    # Activate on macOS/Linux
    source .venv/bin/activate
    ```

3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Run the backend server:**
    ```bash
    uvicorn main:app --reload
    ```
    The backend will be running at `http://127.0.0.1:8000`.

### Frontend (React/Vite)

1.  **Navigate to the project root directory.**

2.  **Install dependencies using bun:**
    ```bash
    bun install
    ```

3.  **Run the frontend development server:**
    ```bash
    bun run dev
    ```
    The frontend will be available at `http://localhost:8080`.

## 🔐 Demo Credentials

| Role | Employee ID | Password |
|------|------------|----------|
| Supervisor | EMP1001 | demo-supervisor-2025 |
| Rolling Stock | EMP2001 | demo-maint-2025 |
| Signalling | EMP3001 | demo-signal-2025 |
| Telecom | EMP4001 | demo-telecom-2025 |
| Cleaning | EMP6001 | demo-clean-2025 |
| Yard Master | EMP7001 | demo-yard-2025 |
| Branding | EMP5001 | demo-brand-2025 |

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn components
│   ├── Header.tsx       # Main navigation header
│   ├── StatusBadge.tsx  # Trainset status badges
│   └── TrainsetCard.tsx # Trainset display card
├── data/
│   ├── demoTrainsets.json  # 5 trainset demo dataset
│   └── demoUsers.json      # 7 role demo credentials
├── pages/
│   ├── Landing.tsx      # Hero landing page
│   ├── Login.tsx        # Authentication page
│   └── dashboards/      # 7 role-specific dashboards
└── index.css            # Design system tokens
```

## 🎨 Design System

Metro-themed professional color palette:
- **Primary Blue**: Authority & Trust (HSL 210 90% 45%)
- **Secondary Teal**: Technology & Efficiency (HSL 180 70% 40%)
- **Status Colors**: Success (Green), Warning (Amber), Destructive (Red)
- **Gradients & Shadows**: Custom glow effects for interactive elements

## 🔄 State Management

Currently uses:
- Local state for UI interactions
- localStorage for authentication persistence
- JSON imports for demo data

**Production Ready**: Replace with:
- React Query for API calls
- Zustand for complex client state
- REST/GraphQL backend integration

## ⚠️ Legal Notice

**Landing page and login UI design inspired by reference materials for prototype/demo purposes. Replace all branding/copy with authorized KMRL assets before public release.**

## 🚧 Future Enhancements

- [ ] Storybook component library
- [ ] Jest unit tests
- [ ] Playwright E2E tests
- [ ] Backend API integration
- [ ] Real-time WebSocket updates
- [ ] PWA with offline support
- [ ] Advanced analytics dashboard
- [ ] PDF/Excel export functionality
- [ ] Digital signature capture
- [ ] Mobile-optimized views

## 📱 Accessibility

- WCAG AA compliant
- Keyboard navigation support
- ARIA labels on interactive elements
- High contrast color ratios
- Responsive design (mobile, tablet, desktop)

## 🤝 Contributing

For contributions or questions, please contact the development team.

## 📄 License

MIT License - See LICENSE file for details

## 🙏 Credits

- KMRL (Kochi Metro Rail Limited) for domain requirements
- shadcn/ui for beautiful component primitives
- Lucide React for iconography

---

