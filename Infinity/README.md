<div align="center">
<img src="public/placeholder-logo.svg" alt="Infinity Dashboard Logo" width="200"/>

# Infinity Dashboard

[![Next.js](https://img.shields.io/badge/Next.js-14.2.16-black.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![Radix UI](https://img.shields.io/badge/Radix_UI-Latest-purple.svg)](https://www.radix-ui.com/)
[![Privy](https://img.shields.io/badge/Privy-Auth-orange.svg)](https://privy.io/)
</div>

## 📑 Table of Contents
- [About the Project](#-about-the-project)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Components](#-components)
- [Available Scripts](#-available-scripts)
- [Contributing](#-contributing)

## 💡 About the Project

Infinity Dashboard is a modern web application built with Next.js and TypeScript, providing a comprehensive platform for managing campaigns, tracking loyalty points, and engaging with users through a chat interface. The application features a responsive design and rich UI components.

### Key Features
- 📊 Campaign Management Dashboard
- 💬 Interactive Chat Interface
- 👤 User Profile Management
- 📱 Responsive Design
- 🌙 Dark/Light Theme Support
- 📈 Analytics and Reports
- 🎯 Loyalty Points Tracking

## 🛠 Tech Stack

### Core
- **Framework**: Next.js 14.2
- **Language**: TypeScript 5
- **Runtime**: React 18

### UI & Styling
- **CSS Framework**: Tailwind CSS 3.4
- **Component Library**: Radix UI
- **Icons**: Lucide React
- **Charts**: Recharts & Chart.js
- **Animations**: Tailwind Animate

### State & Form Management
- **Authentication**: Privy Auth
- **Forms**: React Hook Form
- **Validation**: Zod
- **Notifications**: Sonner

### Development Tools
- **Linting**: ESLint
- **Type Checking**: TypeScript
- **Package Manager**: npm

## 🎯 Features

### Dashboard
- Campaign Overview
- Active Campaigns Tracking
- Completed Campaigns History
- Loyalty Points Summary
- Performance Reports
- Real-time Analytics

### Chat System
- Real-time Messaging
- Message History
- User Interactions
- Chat Interface Components

### Profile Management
- User Profile Customization
- Settings Configuration
- Account Management
- Preferences

## 📁 Project Structure

```plaintext
Infinity/
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard routes
│   ├── globals.css       # Global styles
│   └── layout.tsx        # Root layout
│
├── components/            # React components
│   ├── dashboard/        # Dashboard-specific components
│   │   ├── chat/        # Chat components
│   │   └── profile/     # Profile components
│   └── ui/              # Reusable UI components
│
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and configurations
└── public/              # Static assets
```

## 🚀 Getting Started

### Prerequisites
```bash
node -v  # >= 18
npm -v   # >= 9
```

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-org/infinity-dashboard.git
cd infinity-dashboard
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

4. **Start development server**
```bash
npm run dev
```

## 🧩 Components

### Dashboard Components
- `active-campaigns.tsx`: Active campaign tracking
- `campaign-summary.tsx`: Campaign overview
- `loyalty-points-summary.tsx`: Points tracking
- `reports.tsx`: Analytics and reporting
- `welcome-header.tsx`: Dashboard header

### Chat Components
- `chat-interface.tsx`: Main chat interface
- `message-list.tsx`: Message display

### UI Components
- Comprehensive set of Radix UI based components
- Custom themed components
- Responsive design elements
- Interactive UI elements

## 📜 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## ⚙️ Configuration

### Environment Variables
```env
# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Authentication
NEXT_PUBLIC_PRIVY_APP_ID=your-privy-app-id

# API Configuration
NEXT_PUBLIC_API_URL=your-api-url
```

## 🤝 Contributing

### Development Process

1. Fork the repository
2. Create your feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

### Code Style

- Use TypeScript for all new files
- Follow the existing component structure
- Write meaningful commit messages
- Add appropriate documentation
- Ensure responsive design
- Test across different devices

---

<div align="center">

### Built with 💫 by the Infinity Team

</div>
