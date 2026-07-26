# Net-Health Architecture

## Overview

Net-Health is a modular front-end web application designed around reusable components, organised folders, and scalable JavaScript modules.

The project separates responsibilities so that each file has a clear purpose.

---

# Project Structure

frontend/

├── auth/
│   Authentication pages

├── calculator/
│   Dose Calculator

├── dashboard/
│   User dashboard

├── drugs/
│   Drug Library and Drug Details

├── css/
│   Shared styling

├── data/
│   Application data

├── js/
│   JavaScript modules

└── index.html
Landing page

---

# Architecture Layers

## 1. Presentation Layer

Responsible for displaying information.

Contains:

- HTML
- CSS

Examples

- Dashboard
- Drug Library
- Dose Calculator

---

## 2. Logic Layer

Responsible for application behaviour.

Contains JavaScript modules such as:

- auth.js
- navigation.js
- dashboard.js
- drug-library.js
- drug-details.js
- dose-calculator.js

Each module performs one responsibility.

---

## 3. Data Layer

Stores application data.

Current:

- drugs.js

Future:

- JSON databases
- API endpoints
- Backend database

---

# Navigation Architecture

All authenticated pages use a shared navigation system.

navigation.js controls:

- Sidebar
- Hamburger menu
- Logout

This avoids repeating the same code on every page.

---

# Styling Architecture

All styling is centralised.

variables.css

Stores:

- Colours
- Shadows
- Border radius
- Typography
- Spacing

style.css

Contains reusable components such as:

- Cards
- Buttons
- Forms
- Dashboard
- Drug Library
- Dose Calculator

responsive.css

Contains responsive layouts for mobile and larger screens.

---

# Data Flow

User Input

↓

JavaScript Validation

↓

Application Logic

↓

Data Lookup

↓

Calculation

↓

Result Display

---

# Design Principles

The project follows these principles:

- Modular code
- Reusable components
- Consistent user interface
- Separation of concerns
- Mobile-first design
- Easy scalability

---

# Future Architecture

As Net-Health grows, the architecture will evolve to include:

- Backend API
- Database
- User accounts
- AI services
- Authentication server
- Clinical decision engine

The current modular structure allows these features to be added with minimal changes to the existing codebase.