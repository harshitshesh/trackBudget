# 💸 FinanceFlow - Personal Finance Dashboard

## 🚀 Live Demo ---    https://vermillion-platypus-8f5811.netlify.app/

---

## 📌 Overview

FinanceFlow is a modern **React-based personal finance dashboard** that allows users to track their income and expenses, visualize spending patterns, and manage transactions efficiently.

The application is designed with a **role-based system**, dynamic UI, and clean architecture for scalability and performance.

---

## ✨ Features

### 🔐 Role-Based Access

* **Admin**

  * Add, edit, delete transactions (CRUD)
  * Full control over data
* **User**

  * View transactions
  * Track income & expenses

---

### 💰 Transaction Management

* Add new transactions
* Edit existing transactions
* Delete transactions
* Search and filter transactions
* Sort by date, amount, and description

---

### 📊 Data Visualization

* Interactive charts for:

  * Balance trends
  * Spending breakdown
* Built using modern charting libraries

---

### 🎯 Filters & Search

* Filter by:

  * Type (Income / Expense)
  * Category
  * Date range
* Real-time search functionality

---

### 🌙 Theme Support

* Light/Dark mode toggle
* Persistent theme using local storage

---

### 📤 Export Functionality

* Export transactions as:

  * CSV
  * JSON

---

## 🛠️ Tech Stack

* **Frontend:** React (Vite)
* **State Management:** Zustand
* **Charts:** Recharts
* **Animations:** Framer Motion
* **Icons:** Lucide React
* **Date Handling:** date-fns

---

## 📁 Project Structure

```bash
src/
│
├── components/
│   ├── layout/
│   ├── dashboard/
│   ├── transactions/
│   ├── insights/
│   └── ui/
│
├── store/
├── utils/
├── data/
└── App.jsx
```

---

## ⚙️ Installation & Setup

```bash
# Clone the repository
git clone <your-repo-link>

# Navigate to project folder
cd your-project-name

# Install dependencies
npm install

# Run development server
npm run dev
```

---

## 🧠 Architecture Highlights

* Global state managed using Zustand
* Clean separation of concerns (UI, logic, state)
* Reusable components (Layout, Button, Card, etc.)
* Optimized rendering using useMemo
* Data-driven UI approach

---
