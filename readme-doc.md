# Zach Estimates (2024)

A modern web application for estimates and calculations, built with Astro.js and Cloudflare.

## 🏗️ Project Architecture

This project consists of two main parts:

### Frontend (Root Directory)
- Built with Astro.js and React
- Uses Tailwind CSS for styling
- Implements nanostores for state management
- TypeScript for type safety
- PostHog for analytics

### Backend (be-rpc-estimates/)
- Cloudflare Workers for serverless functions
- RPC-based API architecture
- Drizzle ORM for database operations
- TypeScript for type safety

## 🚀 Development Workflow

### Local Development Setup

1. Clone the repository:
```bash
git clone https://github.com/your-org/zach-estimates.git
cd zach-estimates
```

2. Install dependencies:
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd be-rpc-estimates
npm install
cd ..
```

3. Configure environment:
```bash
# Copy environment templates
cp .env.example .env
cp be-rpc-estimates/.env.example be-rpc-estimates/.env

# Edit .env files with your values
```

4. Start development servers:
```bash
# Terminal 1: Frontend
npm run dev

# Terminal 2: Backend
cd be-rpc-estimates
npm run dev
```

### Development Tools

#### VS Code Extensions
- Astro
- Tailwind CSS IntelliSense
- ESLint
- Prettier
- GitHub Copilot

#### Browser Extensions
- React Developer Tools
- PostHog Toolbar (staging/development only)

### Debugging

#### Frontend Debugging
```typescript
// Debug logging
import { debug } from '@/utils/logger';

debug('estimate:create', { data });
```

#### Backend Debugging
```typescript
// Worker debugging
export const handler = async (request: Request) => {
  console.log('Worker request:', request.url);
  // Enable debug mode in development
  if (process.env.NODE_ENV === 'development') {
    setDebugMode(true);
  }
};
```

## 📋 Frontend Architecture

### Component Patterns

#### Astro Components
```astro
---
// EstimateWrapper.astro
import type { EstimateProps } from '@/typestash';
import { validateEstimate } from '@/utils/validation';

const { estimate } = Astro.props;
const isValid = validateEstimate(estimate);
---

{isValid ? (
  <div class="estimate-wrapper">
    <slot />
  </div>
) : (
  <ErrorComponent message="Invalid estimate data" />
)}
```

#### React Components
```tsx
// EstimateCard.tsx
import { memo } from 'react';
import type { EstimateCardProps } from '@/typestash';

export const EstimateCard = memo(({ estimate }: EstimateCardProps) => {
  return (
    <div className="rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold">{estimate.title}</h3>
      {/* Component content */}
    </div>
  );
});
```

### State Management

#### Store Pattern
```typescript
// stores/estimateStore.ts
import { atom } from 'nanostores';
import type { Estimate } from '@/typestash';

export const $activeEstimate = atom<Estimate | null>(null);

export const setActiveEstimate = (estimate: Estimate) => {
  $activeEstimate.set(estimate);
};
```

#### Store Usage
```typescript
// components/EstimateEditor.tsx
import { useStore } from '@nanostores/react';
import { $activeEstimate } from '@/stores/estimateStore';

export const EstimateEditor = () => {
  const estimate = useStore($activeEstimate);
  // Component logic
};
```

### Type System

#### Type Organization
```typescript
// typestash/estimate.ts
export interface Estimate {
  id: string;
  title: string;
  createdAt: Date;
  status: EstimateStatus;
}

// typestash/shared/rpc.ts
export interface RPCResponse<T> {
  data: T;
  metadata: {
    timestamp: number;
    requestId: string;
  };
}
```

### Performance Optimization

#### Component Optimization
```typescript
// Lazy loading
const EstimateChart = lazy(() => import('./EstimateChart'));

// Memo usage
const EstimateList = memo(({ estimates }: EstimateListProps) => {
  return estimates.map(estimate => (
    <EstimateCard key={estimate.id} estimate={estimate} />
  ));
});
```

#### Image Optimization
```astro
---
import { Image } from 'astro:assets';
import estimateImage from '@/assets/estimate.png';
---

<Image
  src={estimateImage}
  alt="Estimate preview"
  width={800}
  height={600}
  format="webp"
/>
```

## 🛠️ Development Commands

| Command                   | Action                                           |
|:-------------------------|:-------------------------------------------------|
| `npm run dev`            | Start development server at `localhost:4321`     |
| `npm run build`          | Build for production                            |
| `npm run preview`        | Preview production build locally                 |
| `npm run lint`           | Run ESLint                                      |
| `npm run type-check`     | Run TypeScript compiler check                   |
| `npm run test`           | Run tests                                       |
| `npm run test:watch`     | Run tests in watch mode                         |
| `npm run deploy`         | Deploy to Cloudflare Pages                      |
| `npm run cf-typegen`     | Generate Cloudflare Worker types                |

## 📁 Project Structure

```text
/
├── src/
│   ├── actions/          # API actions
│   │   ├── estimate.ts
│   │   └── user.ts
│   ├── assets/          # Static assets
│   │   ├── images/
│   │   └── styles/
│   ├── components/      # UI components
│   │   ├── estimate/
│   │   ├── shared/
│   │   └── user/
│   ├── layouts/         # Page layouts
│   │   ├── Layout.astro
│   │   └── EstimateWrapper.astro
│   ├── pages/          # Route pages
│   │   ├── index.astro
│   │   └── estimate/
│   ├── stores/         # State management
│   │   ├── estimate.ts
│   │   └── user.ts
│   ├── typestash/      # TypeScript types
│   │   ├── shared/
│   │   └── index.ts
│   └── utils/          # Helper functions
│       ├── validation.ts
│       └── formatting.ts
├── be-rpc-estimates/   # Backend service
│   ├── src/           # Backend source code
│   │   ├── handlers/  # RPC handlers
│   │   ├── services/  # Business logic
│   │   └── utils/     # Helper functions
│   ├── drizzle/       # Database operations
│   │   ├── migrations/
│   │   └── schema.ts
│   └── tests/         # Backend tests
└── public/            # Static public assets
    ├── fonts/
    └── images/

## 🔧 Configuration Files

```text
/
├── astro.config.mjs          # Astro configuration
├── tailwind.config.cjs       # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── vitest.config.ts          # Vitest test configuration
├── .eslintrc.js             # ESLint configuration
├── .prettierrc              # Prettier configuration
└── .env.example             # Environment variables template
```

## 🚦 CI/CD Pipeline

### GitHub Actions Workflows

```yaml
# .github/workflows/ci.yml
name: CI
on:
  push:
    branches: [main, staging]
  pull_request:
    branches: [main, staging]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
      - name: Type check
        run: npm run type-check
```

### Deployment Process

1. Staging Deployment:
   - Automatic deployment on merge to staging branch
   - Preview URL generated for each PR
   - Integration tests run automatically

2. Production Deployment:
   - Manual trigger from staging to main
   - Requires approval from team lead
   - Runs full test suite before deployment

## 📚 Additional Resources

### Documentation
- [Astro Documentation](https://docs.astro.build/)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Internal Documentation
- [API Documentation](./docs/api.md)
- [Component Library](./docs/components.md)
- [Database Schema](./docs/schema.md)
- [Testing Guide](./docs/testing.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit your changes
   ```bash
   git commit -m 'feat: add amazing feature'
   ```
4. Push to your branch
   ```bash
   git push origin feature/amazing-feature
   ```
5. Open a Pull Request

### Code Review Process

1. Code Review Requirements:
   - All tests passing
   - TypeScript checks passing
   - ESLint checks passing
   - No merge conflicts
   - Updated documentation

2. Review Checklist:
   - Performance impact considered
   - Security implications reviewed
   - Accessibility requirements met
   - Mobile responsiveness verified

## 📈 Monitoring and Analytics

### Performance Monitoring
- [Cloudflare Analytics Dashboard](https://dash.cloudflare.com)
- [PostHog Analytics](https://app.posthog.com)

### Error Tracking
- Error reporting through PostHog
- Worker errors in Cloudflare Dashboard
- Custom error tracking in application

### Key Metrics
- Page load times
- API response times
- Error rates
- User engagement

## 🔒 Security

### Security Measures
- All API endpoints authenticated
- HTTPS enforced
- Content Security Policy implemented
- Regular security audits

### Data Protection
- User data encrypted at rest
- Secure session management
- Rate limiting implemented
- Input validation on all forms

## 📱 Responsive Design

### Breakpoints
```css
/* Tailwind breakpoints */
sm: 640px   /* @media (min-width: 640px) */
md: 768px   /* @media (min-width: 768px) */
lg: 1024px  /* @media (min-width: 1024px) */
xl: 1280px  /* @media (min-width: 1280px) */
2xl: 1536px /* @media (min-width: 1536px) */
```

### Mobile-First Approach
- Design for mobile first
- Progressive enhancement
- Touch-friendly interfaces
- Responsive images and tables

## 🌐 Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile browsers (iOS 12+, Android 5+)