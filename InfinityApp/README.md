<div align="center">
<img src="public/logo.png" alt="Infinity App Logo" width="200"/>

# Infinity App Frontend

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0.5-646CFF.svg)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4.4-38B2AC.svg)](https://tailwindcss.com/)
[![pnpm](https://img.shields.io/badge/pnpm-Latest-orange.svg)](https://pnpm.io/)
[![Radix UI](https://img.shields.io/badge/Radix_UI-Latest-purple.svg)](https://www.radix-ui.com/)
</div>

## 📑 Table of Contents
- [About the Project](#-about-the-project)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Configuration](#️-configuration)
- [Available Scripts](#-available-scripts)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)

## 💡 About the Project

Infinity App is a modern web application built with React and TypeScript, featuring a robust chat interface, authentication system, and responsive design. The application utilizes the latest frontend technologies and best practices to deliver a seamless user experience.

### Key Features
- 🎨 Modern UI with Radix UI components
- 🔐 Authentication with Privy
- 💬 Advanced chat functionality
- 📱 Responsive design
- 🎵 Audio recording capabilities
- 🚀 Optimized performance

## 🛠 Tech Stack

### Core
- **Framework**: React 18.3.1
- **Language**: TypeScript 5.6.3
- **Build Tool**: Vite 6.0.5
- **Package Manager**: pnpm

### UI & Styling
- **CSS Framework**: Tailwind CSS 3.4.4
- **Component Library**: Radix UI
- **Icons**: Lucide React
- **Animations**: React Spring

### State Management & Data Fetching
- **API Client**: TanStack Query 5.63.0
- **Routing**: React Router 7.1.1

### Development Tools
- **Linting**: ESLint
- **Type Checking**: TypeScript
- **Code Formatting**: Prettier
- **Build Optimization**: Vite Plugin Compression

## 🏗 Architecture

### Component Structure

```plaintext
📦 src
├── 🎯 components/
│   ├── ui/           # Reusable UI components
│   │   ├── chat/     # Chat-specific components
│   │   └── ...       # Other UI components
│   └── ...           # App-specific components
├── 📡 routes/        # Application routes
├── 🪝 hooks/         # Custom React hooks
├── 📚 lib/           # Utilities and API
└── 📝 types/         # TypeScript types
```

## 🚀 Getting Started

### Prerequisites
```bash
node -v  # Latest LTS version
pnpm -v  # Latest version
```

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-org/infinity-app.git
cd infinity-app
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
```

4. **Start development server**
```bash
pnpm dev
```

## ⚙️ Configuration

### Environment Variables
```env
# App Configuration
VITE_APP_NAME=InfinityApp
VITE_API_URL=http://localhost:3000/api

# Authentication
VITE_PRIVY_APP_ID=your-privy-app-id

# Feature Flags
VITE_ENABLE_AUDIO=true
VITE_ENABLE_TTS=true
```

## 📜 Available Scripts

```bash
# Development
pnpm dev           # Start development server
pnpm build         # Build for production
pnpm preview       # Preview production build

# Version Management
pnpm extract-version  # Extract version information
```

## 📁 Project Structure

```plaintext
InfinityApp/
├── src/
│   ├── components/     # React components
│   │   ├── ui/        # Shared UI components
│   │   └── ...        # Feature-specific components
│   ├── routes/        # Application routes
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utilities and services
│   └── types/         # TypeScript type definitions
├── public/            # Static assets
├── index.html         # Entry HTML file
├── vite.config.ts     # Vite configuration
├── tailwind.config.ts # Tailwind CSS configuration
└── tsconfig.json      # TypeScript configuration
```

### Key Components

#### UI Components
- `components/ui/`: Reusable UI components built with Radix UI
- `components/chat/`: Specialized chat interface components
- `components/app-sidebar.tsx`: Main application navigation
- `components/header.tsx`: Application header with user controls

#### Routes
- `routes/dashboard.tsx`: Main dashboard view
- `routes/chat.tsx`: Chat interface
- `routes/overview.tsx`: System overview
- `routes/landing.tsx`: Landing page

#### Hooks
- `hooks/use-mobile.tsx`: Mobile device detection
- `hooks/use-toast.ts`: Toast notification system
- `hooks/use-version.tsx`: Version management

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

- Follow the existing code style
- Use TypeScript for all new files
- Write meaningful commit messages
- Add appropriate documentation
- Ensure all tests pass

---

<div align="center">

### Built with ❤️ by the Infinity Team

</div>
