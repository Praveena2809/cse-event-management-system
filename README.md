# CSE Department Event Management System (MERN)

Full-stack MERN application for a Computer Science & Engineering Department Event Management System (Anna University affiliated college).

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS + React Router
- **Backend**: Node.js + Express
- **Database**: MongoDB + Mongoose
- **Auth**: JWT + Role-based access
- **Uploads**: Multer (local) + optional Cloudinary
- **QR**: `qrcode` (generate) + `html5-qrcode` (scan)
- **Payments**: Razorpay
- **Emails**: Nodemailer (SMTP)
- **Charts**: Chart.js
- **Calendar**: FullCalendar

## Roles

- `participant`
- `coordinator`
- `hod`
- `admin`

Each role has a separate dashboard and protected routes in the frontend.

---

## 1) Setup (Local Development)

### Prerequisites

- Node.js 18+ recommended
- MongoDB running locally (or MongoDB Atlas)

### Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Backend runs at: `http://localhost:5000`

### Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## 2) Environment Variables

### Backend (`backend/.env`)

See: `backend/.env.example`

Minimum required:

- `MONGO_URI`
- `JWT_SECRET`

For full features:

- SMTP (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`)
- Razorpay (`RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`)
- Cloudinary (optional)

### Frontend (`frontend/.env`)

See: `frontend/.env.example`

- `VITE_API_BASE_URL=http://localhost:5000`

---

## 3) Project Structure

```
frontend/
  src/
    components/
    context/
    dashboards/
    layouts/
    pages/
    services/
backend/
  src/
    config/
    controllers/
    middleware/
    models/
    routes/
    utils/
```

---

## 4) Key Flows

### Participant

- Register/Login
- Browse events & subevents
- Register for subevents (QR generated)
- Pay via Razorpay if entry fee > 0
- Coordinator scans QR to mark attendance
- Download certificate (workshop: attendee only, competitive: winner/runner only)
- Apply to become coordinator

### Coordinator

- Create main events + subevents (pending approval)
- Venue availability check (conflict detection + suggestions)
- QR attendance scanning
- Set winners/runner for competitive subevents

### HOD

- Approve/reject events and subevents (with reason)
- Approve/reject coordinator applications
- Basic analytics dashboard (extendable)

### Admin

- Create users (hod/admin/coordinator) and email temporary credentials (SMTP required)
- Manage users and roles
- Manage venues

---

## 5) Deployment (Beginner-Friendly)

### Backend (Render / Railway / VPS)

1. Create a MongoDB Atlas database (or use a managed MongoDB)
2. Set environment variables from `backend/.env.example`
3. Deploy backend with start command:
   ```bash
   npm install
   npm run start
   ```
4. Ensure CORS `CLIENT_URL` matches your deployed frontend URL

### Frontend (Vercel / Netlify)

1. Set `VITE_API_BASE_URL` to your deployed backend URL
2. Build:
   ```bash
   npm install
   npm run build
   ```
3. Deploy `dist/`

---

## Notes / Extensions

- Support tickets, backups, and detailed PDF reports can be added as additional modules.
- For production, consider using password reset links instead of emailing passwords.

## Team Members
- Praveena Raju
- Sharal Arasu Maniyarasu
- Nivedha Sri 

## Feature added by kar