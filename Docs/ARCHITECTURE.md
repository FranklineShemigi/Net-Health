# Net-Health Architecture
## Project Overview
Net-Health is an AI-powered clinical learning and medication safety platform designed for healthcare students and professionals.
The application is being developed incrementally, with each version introducing a complete, testable feature.

---

# Technology Stack
## Frontend
- HTML5
- CSS3
- JavaScript (ES6)

## Backend (Planned)
- Node.js
- Express.js

## Database (Planned)
- PostgreSQL

## Version Control
- Git
- GitHub

---

# Folder Structure
Net-Health/
├── backend/
│
├── docs/
│
├── frontend/
│   ├── assets/
│   ├── auth/
│   ├── calculator/
│   ├── consultation/
│   ├── css/
│   ├── dashboard/
│   ├── data/
│   ├── drugs/
│   ├── js/
│   ├── pages/
│   ├── profile/
│   ├── simulator/
│   └── index.html
│
├── .gitignore
└── README.md

---

# Frontend Modules

Authentication
- Login
- Register
- Forgot Password

Dashboard
- Welcome
- Quick Actions
- Sidebar Navigation

Drug Library
- Search
- Categories
- Drug Details

Dose Calculator
- Adult Dose
- Pediatric Dose

Clinical Simulator
- Patient Cases
- Scoring
- Feedback

Doctor Consultation
- Doctor Directory
- Booking
- Payments

Profile
- Progress
- Badges
- Settings

---

# Current Authentication Flow

Landing Page

↓

Login / Register

↓

Dashboard

↓

Logout

↓

Landing Page

---

# Planned User Roles

1. Student
2. Healthcare Professional
3. Verified Doctor
4. Administrator

Each role will receive different permissions throughout the platform.

---

# Coding Standards

HTML
- Semantic elements
- Accessible forms

CSS
- Mobile-first
- Modular
- Reusable components

JavaScript
- One responsibility per file
- Clear function names
- Avoid global variables

Git
- Small commits
- Meaningful commit messages
- Version tags for milestones

---

# Documentation

Notes.md
Project overview

CHANGELOG.md
Version history

TODO.md
Current work

DECISIONS.md
Important design decisions

IDEAS.md
Future features

ARCHITECTURE.md
System design

docs/sprints/
Detailed sprint history