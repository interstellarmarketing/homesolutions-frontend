# Technical Documentation

This document outlines the technical architecture, integration patterns, and critical aspects of the Zach Estimates application that should be maintained.

## 🤖 AI Development Guidelines

### Pattern Recognition
- Component Patterns
  - Use `EstimateWrapper.astro` as template for new feature wrappers
  - Follow established prop structure for consistency
  - Maintain clear separation between Astro and React components
  - Document component decisions in comments

### Common Pitfalls
- Avoid mixing client/server state management
- Don't bypass TypeScript checks with any/unknown
- Ensure proper error boundary implementation
- Maintain consistent store update patterns

### Decision Trees
1. Component Choice:
   ```
   Is it purely presentational?
   ├── Yes → Use React component
   └── No → Does it need server-side data?
       ├── Yes → Use Astro component
       └── No → Does it need interactivity?
           ├── Yes → Use React with client directive
           └── No → Use Astro component
   ```

2. State Management:
   ```
   Is state shared between components?
   ├── Yes → Use nanostore
   └── No → Is it server-side data?
       ├── Yes → Use Astro.props
       └── No → Use local React state
   ```

## 🔌 Frontend-Backend Integration

### RPC Architecture
- Frontend communicates with backend through typed RPC calls
- All RPC endpoints must be fully typed
- Use Zod for runtime validation on both ends
- Keep RPC methods small and focused
- Handle errors consistently across all endpoints

### Type System
- Shared Types Location: `src/typestash/shared/`
- Interface vs Type Usage:
  ```typescript
  // Use interfaces for extendable object shapes
  interface BaseEstimate {
    id: string;
    createdAt: Date;
  }

  // Use types for unions and specific shapes
  type EstimateStatus = 'draft' | 'pending' | 'approved';
  ```

### Data Flow
1. Frontend Flow:
   ```typescript
   // Action Definition
   export const createEstimate = async (data: CreateEstimateInput) => {
     try {
       const result = await Astro.callAction('estimate:create', data);
       return result;
     } catch (error) {
       handleRpcError(error);
     }
   };
   ```

2. Backend Flow:
   ```typescript
   // RPC Handler
   export const handleCreateEstimate = async (
     input: CreateEstimateInput
   ): Promise<EstimateResponse> => {
     const validated = createEstimateSchema.parse(input);
     return await estimateService.create(validated);
   };
   ```

## 🧪 Testing Strategy

### Component Testing
```typescript
// React Component Test
describe('EstimateCard', () => {
  it('should render estimate details', () => {
    const estimate = mockEstimate();
    render(<EstimateCard estimate={estimate} />);
    expect(screen.getByText(estimate.title)).toBeInTheDocument();
  });
});

// Astro Component Test
describe('EstimateWrapper', () => {
  it('should handle invalid routes', async () => {
    const response = await astroRender('/invalid');
    expect(response.status).toBe(404);
  });
});
```

### Integration Testing
```typescript
// RPC Integration Test
describe('estimate:create', () => {
  it('should create new estimate', async () => {
    const input = mockEstimateInput();
    const result = await callRpc('estimate:create', input);
    expect(result.id).toBeDefined();
  });
});
```

### Performance Testing
- Lighthouse CI configuration
- Bundle size monitoring
- API response time thresholds
- Worker CPU/memory limits

## 🏗️ Backend Architecture

### Service Layer
```typescript
// Service Pattern
export class EstimateService {
  constructor(
    private db: Database,
    private cache: Cache
  ) {}

  async create(data: ValidatedEstimateInput): Promise<Estimate> {
    const result = await this.db.transaction(async (trx) => {
      // Transaction logic
    });
    await this.cache.invalidate(['estimates']);
    return result;
  }
}
```

### Error Catalog
```typescript
// Error Types
export const ErrorCodes = {
  INVALID_INPUT: 'INVALID_INPUT',
  NOT_FOUND: 'NOT_FOUND',
  UNAUTHORIZED: 'UNAUTHORIZED',
  SERVER_ERROR: 'SERVER_ERROR',
} as const;

// Error Structure
interface AppError {
  code: keyof typeof ErrorCodes;
  message: string;
  details?: Record<string, unknown>;
}
```

## 🔒 Security Implementation

### Authentication Flow
```typescript
// Auth Middleware
export const authenticate = async (
  request: Request,
  env: Env
): Promise<AuthContext> => {
  const token = request.headers.get('Authorization');
  if (!token) throw new UnauthorizedError();
  
  return await validateToken(token, env);
};
```

### Authorization Patterns
```typescript
// Permission Check
export const checkPermission = (
  user: User,
  resource: Resource,
  action: Action
): boolean => {
  const permissions = getPermissions(user.role);
  return permissions.can(action).execute(resource);
};
```

## 📊 Monitoring and Performance

### Key Metrics
- RPC Response Times: < 200ms p95
- Worker CPU Usage: < 50ms per request
- Cache Hit Rate: > 80%
- Error Rate: < 0.1%

### Performance Budgets
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Bundle Size: < 200KB (initial)
- API Response: < 200ms

## 🔄 Version Control Guidelines

### Branch Structure
```
main
├── staging
└── feature/
    ├── estimate-creation
    └── user-dashboard
```

### Commit Convention
```
type(scope): description

- type: feat|fix|docs|style|refactor|test|chore
- scope: component|api|db|worker
- description: present tense, lowercase
```

### Release Process
1. Feature branch → Staging
2. Integration testing
3. Staging → Main
4. Deploy to production
5. Monitor metrics

## ⚡ Performance Optimization

### Caching Strategy
```typescript
// Cache Implementation
export const cacheConfig = {
  estimates: {
    ttl: 3600,
    invalidation: ['create', 'update', 'delete']
  },
  users: {
    ttl: 7200,
    invalidation: ['update']
  }
};
```

### Worker Optimization
```typescript
// Worker Resource Management
export const workerConfig = {
  maxConcurrency: 10,
  maxDuration: 50,
  memoryLimit: '128MB'
};
```

## 📈 Analytics Implementation

### Event Tracking
```typescript
// Analytics Events
export const trackEvent = {
  ESTIMATE_CREATED: 'estimate_created',
  ESTIMATE_UPDATED: 'estimate_updated',
  USER_SIGNUP: 'user_signup',
  PAYMENT_PROCESSED: 'payment_processed'
};
```

### Metric Collection
- User engagement metrics
- Performance metrics
- Business metrics
- Error tracking

## 🚨 Error Handling

### Error Boundaries
```typescript
// Global Error Boundary
export class GlobalErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

### RPC Error Handling
```typescript
// Error Handler
export const handleRpcError = (error: unknown): never => {
  if (error instanceof RpcError) {
    // Handle specific RPC errors
    switch (error.code) {
      case ErrorCodes.INVALID_INPUT:
        throw new ValidationError(error.message);
      case ErrorCodes.NOT_FOUND:
        throw new NotFoundError(error.message);
      default:
        throw new ServerError('An unexpected error occurred');
    }
  }
  throw error;
};
```