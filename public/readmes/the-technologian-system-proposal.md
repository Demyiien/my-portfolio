# The Technologian System 📰⚡

> **One Newsroom, One Workflow — Full-Stack Editorial Management & Publication Platform for The Technologian Student Press.**

[![Live Demo](https://img.shields.io/badge/Demo-the--technologian--system.vercel.app-ff2b2b?style=for-the-badge&logo=vercel)](https://the-technologian-system.vercel.app)
[![Platform](https://img.shields.io/badge/Platform-Web%20%2F%20PWA-blue?style=for-the-badge)](#)
[![Backend](https://img.shields.io/badge/Backend-Node.js%20%2F%20Express-green?style=for-the-badge&logo=nodedotjs)](https://expressjs.com/)
[![Database](https://img.shields.io/badge/Database-PostgreSQL-336791?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)

---

## 🏛️ Executive Summary

**The Technologian System** is an integrated workflow automation and digital operations suite engineered specifically for student journalism operations. Built for **The Technologian Student Press (TTSP)**, the system unifies multi-department publication lifecycles—connecting writers, graphic designers, photojournalists, section editors, and senior editorial boards into a streamlined pipeline.

From initial pitch submissions and editorial review cycles to creative asset approvals and multi-platform publishing schedules, the platform replaces disjointed spreadsheets and chat threads with an auditable, real-time command center.

---

## 🌟 Core Modules & Pipelines

* **📰 Newsroom Editorial Desk**: Draft curation, beat assignments, breaking news triage, and editorial review passes.
* **🎨 Creatives & Visual Assets**: Asset request tracking, illustration and photography handover, revision feedback loops, and publication-ready asset packaging.
* **✍️ Writing & Section Workflows**: Structured submission portal with real-time editorial status tagging (`Draft`, `Revision Required`, `Desk Approved`, `Published`).
* **📱 Online & Digital Desk**: Social media copywriting, web post scheduling, and multi-channel publication synchronization.
* **📋 Task Delegation & Kanban**: Section-level task assignment, deadline countdowns, priority flags, and assignment matrices.
* **📅 Publication Calendar**: Master editorial schedule mapping issue deadlines, print dates, coverage calendars, and special supplement releases.
* **🔔 Central Notification Hub**: Activity stream informing staffers of review comments, status changes, and priority updates.

---

## 🛠️ Technology Stack

* **Front End**:
  * Semantic HTML5 & Modular Component Architecture (`css/layout.css`, `css/components.css`, `css/responsive.css`)
  * Modern ES6+ JavaScript (`js/app.js`, `js/navigation.js`, section controllers)
  * Design tokens and typography powered by *Montserrat* and *DM Sans*
* **Back End & API**:
  * **Node.js** & **Express.js** (`server/server.js`)
  * RESTful JSON API with parameterized endpoint controllers (`server/routes/`)
  * Environment configuration via `dotenv` with CORS cross-origin protections
* **Database & Persistence**:
  * **PostgreSQL** relational database (`pg` driver)
  * Declarative relational schema (`server/schema.sql`) and sample datasets (`server/seed.sql`)
* **Infrastructure & Deployment**:
  * **Vercel** serverless routing (`vercel.json` rewrites for `/api/(.*)`)

---

## 📂 System Directory Structure

```text
the-technologian-system/
├── api/
│   └── index.js              # Serverless API gateway for Vercel
├── pages/
│   ├── dashboard.html        # Central operations command center
│   ├── newsroom.html         # Editorial coverage desk
│   ├── writing.html          # Staff writing and draft submission
│   ├── creatives.html        # Visual assets and design tracking
│   ├── online-digital.html   # Social and web distribution
│   ├── tasks.html            # Task board & assignments
│   ├── calendar.html         # Editorial calendar & issue schedule
│   ├── requests.html         # Inter-department service requests
│   └── notifications.html    # Activity center
├── server/
│   ├── server.js             # Express application entry point
│   ├── db.js                 # PostgreSQL connection pool
│   ├── schema.sql            # Core database table definitions
│   ├── seed.sql              # Initial fixtures and dummy data
│   ├── initDb.js             # Automated database initialization script
│   └── routes/               # API route handlers
├── js/                       # Modular frontend controllers
├── css/                      # Responsive CSS stylesheets & design tokens
├── assets/                   # Official TTSP logos, marks, and icons
├── index.html                # Public landing and overview portal
└── vercel.json               # Serverless deployment configuration
```

---

## 🗄️ Database Schema & Entities

The relational database architecture is structured around five primary domain models:

1. **Staff & Roles**: Secure identity records, section credentials, and role permissions (`Admin`, `Editor`, `Writer`, `Artist`).
2. **Articles & Drafts**: Story pitches, manuscripts, section categorization, word counts, and revision histories.
3. **Creative Assets**: Design tickets, image specs, asset URLs, and publication pairings.
4. **Editorial Tasks**: Granular subtasks linked to articles with assigned owners and due dates.
5. **Issue Schedules**: Print and digital publication release milestones.

---

## 🚀 Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) (v18 or higher)
* [PostgreSQL](https://www.postgresql.org/) (v14 or higher)

### Installation & Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Demyiien/the-technologian-system.git
   cd the-technologian-system
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file from `.env.example`:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=technologian_db
   DB_USER=postgres
   DB_PASSWORD=your_password_here
   ```

4. **Initialize the database:**
   ```bash
   # Create schema:
   npm run db:init

   # Seed with sample data:
   npm run db:seed
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` to access the platform.

---

## 🌐 Live Deployment

The system is deployed on Vercel at:
👉 **[https://the-technologian-system.vercel.app](https://the-technologian-system.vercel.app)**
