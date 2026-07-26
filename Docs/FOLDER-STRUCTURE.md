# Net-Health Folder Structure

## Overview

Net-Health follows a modular folder structure to keep the project organised, maintainable, and easy to expand.

```
frontend/
├── auth/
├── calculator/
├── css/
├── dashboard/
├── data/
├── docs/
├── drugs/
├── js/
└── index.html
```

---

# auth/

Contains all user authentication pages.

Files:

- login.html
- register.html
- forgot-password.html

Purpose:

- User registration
- User login
- Password recovery

---

# calculator/

Contains all medicine dose calculation pages.

Current files:

- dose-calculator.html

Purpose:

- Weight-based dose calculation
- Display dosing recommendations
- Medication safety support

---

# css/

Contains all application styling.

Files:

- variables.css
- style.css
- responsive.css

Purpose:

- Design system
- Shared components
- Responsive layouts

---

# dashboard/

Contains the main application dashboard.

Files:

- dashboard.html

Purpose:

- Central navigation
- Quick access to application features

---

# data/

Stores application data.

Current files:

- drugs.js

Future additions may include:

- drugs.json
- interactions.json
- diseases.json
- guidelines.json

Purpose:

- Drug database
- Clinical reference data
- Application datasets

---

# docs/

Contains project documentation.

Files include:

- CHANGELOG.md
- ROADMAP.md
- FEATURES.md
- ARCHITECTURE.md
- FOLDER-STRUCTURE.md
- SPRINTS.md
- UI-GUIDELINES.md
- KNOWN-ISSUES.md

Purpose:

- Document project progress
- Explain project design
- Guide contributors

---

# drugs/

Contains medicine-related pages.

Files:

- drug-library.html
- drug-details.html

Purpose:

- Browse medicines
- Search medicines
- View detailed drug information

---

# js/

Contains all JavaScript modules.

Current files:

- app.js
- auth.js
- navigation.js
- dashboard.js
- drug-library.js
- drug-details.js
- dose-calculator.js

Purpose:

- Authentication
- Navigation
- Dashboard functionality
- Drug management
- Dose calculations

Each JavaScript file is responsible for one feature to improve maintainability.

---

# index.html

Application landing page.

Purpose:

- Introduce Net-Health
- Display project information
- Direct users to authentication pages

---

# Future Expansion

The folder structure is designed to support future features without major restructuring.

Planned additions include:

```
backend/
api/
database/
ai/
tests/
assets/
```

These directories will support server-side logic, APIs, AI services, testing, and static resources as the project evolves.