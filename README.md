# EduPortal: Student Course Management Portal

A full-stack web application where students register, log in, and manage course enrollments.

## Problem Statement

Students and institutions rely on scattered spreadsheets and manual communication to manage course registration and enrollment. EduPortal provides one platform where students can create an account, browse available courses, enroll, and track their status.

## Target Users

| User | Requirement |
|------|-------------|
| Students | Register, log in, view profile, browse and enroll in courses |
| Instructors | Publish and update course details |
| Administrators | Manage students, courses, and notifications |

## Features

- Student registration and login with client-side validation
- Dynamic navigation based on login status
- Student dashboard with profile and available courses
- Course browsing and enrollment
- Course management (add, view, update, delete)
- Real-time notifications and chat
- JWT-based authentication
- Responsive UI for desktop, tablet, and mobile

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend (static) | HTML5, CSS3, JavaScript (ES6 modules) |
| Frontend (SPA) | React 18, React Router 6, Vite |
| Backend | Node.js, Express |
| Database | MongoDB |
| Auth | JWT, bcrypt |
| Real-time | Socket.IO |
| Deployment | Vercel / Netlify, Render |


## Setup Instructions

### Clone the repo

```bash
git clone https://github.com/kanmani2610/Course_management_system.git
cd Course_management_system
```

### Static site

```bash
cd static-site
npx serve .
```

### React client

```bash
cd client
npm install
npm run dev
```

## Routes (React)

| Path | Page |
|------|------|
| `/` | Home |
| `/login` | Login |
| `/register` | Register |
| `/dashboard` | Dashboard (protected) |
| `/courses` | Courses |

