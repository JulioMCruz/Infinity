<div align="center">
<img src="https://ethglobal.b-cdn.net/events/agents/logo/default.png" alt="Eth Agentic Logo" width="200"/>

# MicroService Backend Eth Agentic

[![Node](https://img.shields.io/badge/Node-22.11.0-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue.svg)](https://www.typescriptlang.org/)
[![NPM](https://img.shields.io/badge/NPM-8.9.0-red.svg)](https://www.npmjs.com/)
[![Express](https://img.shields.io/badge/Express-4.21.1-orange.svg)](https://expressjs.com/)
[![Clean Architecture](https://img.shields.io/badge/Clean-Architecture-lightgrey.svg)](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
[![Docker](https://img.shields.io/badge/Container-Docker-blue.svg)](http://hub.docker.com/)
[![PM2](https://img.shields.io/badge/PM2-Runtime-blue.svg)](https://pm2.keymetrics.io/)
[![Jest](https://img.shields.io/badge/Testing-Jest-red.svg)](https://jestjs.io/)
[![ESLint](https://img.shields.io/badge/Linting-ESLint-purple.svg)](https://eslint.org/)
[![BitBucket](https://img.shields.io/badge/CI-Bitbucket-blue.svg)](https://bitbucket.org/)
</div>

## 📑 Table of Contents
- [About the Project](#-about-the-project)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Git Flow and CI/CD](#-git-flow-and-cicd)
- [Getting Started](#-getting-started)
- [Configuration](#️-configuration)
- [Available Scripts](#-available-scripts)
- [API Documentation](#-api-documentation)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## 💡 About the Project

Backend microservice developed for Eth Agentic implementing Clean Architecture and SOLID principles in TypeScript. This service is optimized for high availability and scalability.

### Key Features
- 🏗️ Clean and modular architecture
- 🔐 Robust authentication and authorization
- 📦 Multi-database support
- 🚀 Performance optimized
- 📊 Advanced monitoring and logging

## 🛠 Tech Stack

### Core
- **Runtime**: Node.js 22.11.0
- **Language**: TypeScript 5.7.2
- **Framework**: Express 4.21.1

### Databases
- **PostgreSQL**: Main database
- **MongoDB**: For unstructured data
- **Redis**: Cache and session management
- **Firestore**: Real-time storage

### Development Tools
- **Testing**: Jest + Supertest
- **Linting**: ESLint + Prettier
- **Documentation**: Swagger/OpenAPI
- **Version Control**: Git + BitBucket
- **CI/CD**: BitBucket Pipelines

### Infrastructure
- **Containerization**: Docker + Docker Compose
- **Process Manager**: PM2
- **Reverse Proxy**: Nginx
- **SSL**: Let's Encrypt

## 🏗 Architecture

### Clean Architecture

```plaintext
📦 Clean Architecture Layers

🎯 Domain Layer (Core)
├── 📋 Entities
├── 🔄 Use Cases
└── 🔌 Repository Interfaces

🏗️ Infrastructure Layer
├── 🗄️ Database Implementations
├── 🔌 External Services
└── 📡 API Clients

🎨 Presentation Layer
├── 🎮 Controllers
├── 🛣️ Routes
└── 🔒 Middlewares

🛠️ Utils Layer
├── ⚙️ Configurations
├── 🔧 Helpers
└── 📝 Types
```

## 🌳 Git Flow & CI/CD Pipeline

```mermaid
gitGraph
%% Start of repository on main
commit id:"initial-main" msg:"Initial commit on main"
checkout main
%% Local branch from main
branch local
checkout local
commit id:"implement-feature" msg:"Implement feature"
commit id:"local-tests" msg:"Add local tests"
%% Development branch from local
branch development
checkout development
commit id:"development-tests" msg:"Development tests"
commit id:"prepare-for-staging" msg:"Prepare code for staging environment"
%% Staging branch from development
branch staging
checkout staging
commit id:"qa-checks" msg:"QA checks on staging"
commit id:"qa-found-missing-test" msg:"QA found missing test"
%% Bugfix/local branch from staging to fix missing tests
branch bugfix/local
checkout bugfix/local
commit id:"add-missing-test" msg:"Add missing test"
commit id:"implement-fix" msg:"Implement fix for missing test"
%% Merge bugfix/local back into local
checkout local
merge bugfix/local
commit id:"verify-new-tests" msg:"Verify new tests on local"
%% Merge local into development
checkout development
merge local
commit id:"rerun-dev-tests" msg:"Rerun dev tests after fix"
%% Hotfix/staging branch for urgent fix before production
branch hotfix/staging
checkout hotfix/staging
commit id:"urgent-fix" msg:"Urgent fix on staging"
%% Merge hotfix/staging back into staging
checkout staging
merge hotfix/staging
commit id:"qa-revalidation" msg:"QA re-validation after hotfix"
commit id:"all-tests-passed" msg:"All tests passed successfully"
commit id:"prepare-production" msg:"Prepare code for production release"
%% Production branch from staging for stable release
branch production
checkout production
commit id:"stable-release" msg:"Stable production release"
%% Merge production back into main
checkout main
merge production
commit id:"version-1.0.1" msg:"Version 1.0.1 released"
```

### Detailed Workflow

#### 1. Local Development (`local`)
- 💻 Development on MacOS/PC
  - Feature implementation
  - Unit test creation
  - Local code verification
- 🧪 Unit tests with Jest
  - Code coverage
  - Unit tests
  - Local integration tests
- 🚀 CI Runner:
  - Runs complete test suite
  - Builds Docker image
  - Publishes to Docker Hub (tag: `local`)
  - Notifies Slack and Jira

#### 2. Development Environment (`development`)
- 🏢 Dedicated test server
  - Continuous integration
  - Dependency verification
  - Integration tests
- ✅ Business tests
  - Business rule validation
  - Integration tests
  - Performance tests
- 🔍 QA Testing
  - Feature review
  - Acceptance tests
  - Issue documentation
- 🐳 CI Runner:
  - Runs integration tests
  - Updates Docker Hub image (tag: `dev`)
  - Updates Jira status
  - Notifies Slack

#### 3. Staging (`staging`)
- 🔍 QA Validation
  - Acceptance tests
  - Business validation
  - Integration tests
- 🐛 Bug Detection & Fixing
  - Return to local if new tests needed
  - Fix implementation
  - Fix verification
- 🚨 Hotfix Process
  - Urgent fixes
  - Immediate QA
  - Quick deployment

#### 4. Production (`production`)
- ☁️ Deployed on GCP
  - Infrastructure setup
  - Security verification
  - Resource monitoring
- 🔄 CI Runner:
  - Final code validation
  - Push to Docker Hub (tag: `prod`)
  - GCP deployment
  - Jira status update
  - Slack notification
  - Post-deployment monitoring

### CI/CD Pipeline (Bitbucket)

```yaml
pipelines:
  branches:
    local:
      - step:
          name: Test & Build Local
          image: node:22.11.0
          script:
            - yarn install
            - yarn test
            - yarn test:coverage
            - docker build -t ethagentic/backend:local .
            - docker push ethagentic/backend:local
          after-script:
            - notify-slack "Local build completed"
            - update-jira "Local testing done"

    development:
      - step:
          name: QA & Integration Tests
          image: node:22.11.0
          script:
            - yarn install
            - yarn test:integration
            - yarn test:e2e
            - yarn test:performance
            - docker build -t ethagentic/backend:dev .
            - docker push ethagentic/backend:dev
          after-script:
            - notify-slack "Development tests completed"
            - update-jira "Ready for QA review"

    staging:
      - step:
          name: Staging Deployment & QA
          image: node:22.11.0
          script:
            - yarn install
            - yarn test:all
            - yarn test:acceptance
            - docker build -t ethagentic/backend:staging .
            - docker push ethagentic/backend:staging
          after-script:
            - notify-slack "Staging deployment ready"
            - update-jira "In QA validation"

    production:
      - step:
          name: Production Deploy
          deployment: production
          image: node:22.11.0
          script:
            - yarn install
            - yarn test:production
            - docker build -t ethagentic/backend:prod .
            - docker push ethagentic/backend:prod
            - deploy-to-gcp
          after-script:
            - notify-slack "Production deployment completed"
            - update-jira "Released to production"
            - update-release-notes
```

### Service Integration

#### Docker Hub
- `ethagentic/backend:local` - Local development version
- `ethagentic/backend:dev` - Development/QA version
- `ethagentic/backend:prod` - Production version

#### Jira
- Ticket tracking
- Deployment status
- Change history

#### Slack
Automated notifications for:
- 🟢 Successful tests
- 🔴 Test failures
- 📦 New deployments
- 🐛 Detected bugs

## 🚀 Getting Started

### Prerequisites
```bash
node -v # v22.11.0
npm -v  # v8.9.0
```

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ethagentic/backend-service.git
cd backend-service
```

2. **Install dependencies**
```bash
yarn install
```

3. **Configure environment variables**
```bash
cp .env.example .env
```

4. **Start database services**
```bash
docker-compose up -d
```

## ⚙️ Configuration

### Environment Variables
```env
# Server
PORT=3000
NODE_ENV=development
API_PREFIX=/api/v1

# Database URLs
POSTGRES_URL=postgresql://user:password@localhost:5432/dbname
MONGODB_URL=mongodb://localhost:27017/dbname
REDIS_URL=redis://localhost:6379
FIRESTORE_CREDENTIALS=./firebase-credentials.json

# Authentication
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=24h
REFRESH_TOKEN_EXPIRES_IN=7d

# External Services
EXTERNAL_API_KEY=your-api-key
SMTP_CONFIG=smtp://username:password@smtp.service.com

# Monitoring
SENTRY_DSN=your-sentry-dsn
NEW_RELIC_LICENSE_KEY=your-newrelic-key

# CI/CD
DOCKER_HUB_TOKEN=your-docker-hub-token
JIRA_API_TOKEN=your-jira-token
SLACK_WEBHOOK_URL=your-slack-webhook
```

## 📜 Available Scripts

### Development
```bash
# Local development
yarn dev              # Start with hot-reload
yarn build           # Compile TypeScript
yarn start           # Start in production

# Docker
yarn docker:dev      # Development with Docker
yarn docker:build    # Build image
yarn docker:run      # Run container
yarn docker:push     # Publish image
```

### Testing
```bash
# Tests
yarn test             # Run all tests
yarn test:watch       # Tests in watch mode
yarn test:coverage    # Coverage report
yarn test:e2e        # End-to-end tests

# Code quality
yarn lint            # Check code
yarn lint:fix        # Fix issues
yarn format          # Format code
```

## 📚 API Documentation

API documentation is available at:

- **Local**: `http://localhost:3000/api-docs`
- **Development**: `https://dev-api.ethagentic.com/api-docs`
- **Production**: `https://api.ethagentic.com/api-docs`

### Main Endpoints

```plaintext
POST   /api/v1/auth/login        # User authentication
GET    /api/v1/auth/profile      # Get user profile
POST   /api/v1/auth/refresh      # Refresh token
POST   /api/v1/auth/logout       # Logout
```

## 🧪 Testing

### Testing Strategy
- **Unit Tests**: Business logic and use cases
- **Integration Tests**: APIs and databases
- **E2E Tests**: Complete user flows

### Test Examples

```typescript
describe('AuthService', () => {
  it('should authenticate user with valid credentials', async () => {
    // ... test implementation
  });

  it('should refresh token successfully', async () => {
    // ... test implementation
  });
});
```

## 🚀 Deployment

### With Docker
```bash
# Local build and deployment
docker build -t ethagentic/backend-service:local .
docker run -p 3000:3000 --env-file .env ethagentic/backend-service:local

# Development deployment
docker build -t ethagentic/backend-service:dev .
docker push ethagentic/backend-service:dev

# Production deployment
docker build -t ethagentic/backend-service:prod .
docker push ethagentic/backend-service:prod
```

### With PM2
```bash
# Development
pm2 start ecosystem.config.js --env development

# Production
pm2 start ecosystem.config.js --env production

# Monitoring
pm2 monitor
```

## 🤝 Contributing

### Contribution Process

1. Fork the repository
2. Create your feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes
   ```bash
   git commit -m 'feat: Add some AmazingFeature'
   ```
4. Push to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

### Commit Conventions

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Style changes
- `refactor`: Code refactoring
- `test`: Add or modify tests
- `chore`: Maintenance tasks

### Pull Request Process

1. Update README.md with details of changes if applicable
2. Update version numbers in relevant files
3. Ensure all tests pass
4. Get approval from at least one developer
5. Merge only after QA approval

## 📄 License

This project is under OWQLO License - see the [LICENSE.md](LICENSE.md) file for details.

---

<div align="center">

### Developed by the Eth Agentic team

[![Website](https://img.shields.io/badge/Website-ethagentic.com-blue)](https://ethagentic.com)
[![Docs](https://img.shields.io/badge/Docs-docs.ethagentic.com-green)](https://docs.ethagentic.com)
[![Issues](https://img.shields.io/badge/Issues-BitBucket-orange)](https://bitbucket.org/ethagentic/backend-service/issues)

</div>
