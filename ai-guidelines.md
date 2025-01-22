# AI Development Guidelines for Zach Estimates

This document serves as a comprehensive guide for AI assistants working on the Zach Estimates project. It combines technical specifications with AI-specific guidance to ensure consistent and effective development assistance.

## 🎯 Quick Reference

### Project Overview
- Modern web application for estimates and calculations
- Frontend: Astro.js + React
- Backend: Cloudflare Workers
- Database: Drizzle ORM
- State Management: nanostores

### Key File Locations
```text
src/
├── components/  # UI components
├── pages/       # Route pages
├── stores/      # State management
├── typestash/   # TypeScript types
└── actions/     # API actions
```

## 🤖 AI Assistant Guidelines

### Decision Making Framework

1. Component Creation Decision Tree:
   ```
   New component needed?
   ├── Is it purely presentational?
   │   ├── Yes → Create React component in src/components/
   │   └── No → Continue
   ├── Needs server-side data?
   │   ├── Yes → Create Astro component
   │   └── No → Continue
   └── Needs interactivity?
       ├── Yes → React with client directive
       └── No → Astro component
   ```

2. State Management Decision Tree:
   ```
   New state needed?
   ├── Shared between components?
   │   ├── Yes → Create nanostore
   │   └── No → Continue
   ├── Server-side data?
   │   ├── Yes → Use Astro.props
   │   └── No → Use local React state
   ```

### Common Patterns to Follow

1. Component Structure:
```typescript
// React Component Template
import { memo } from 'react';
import type { ComponentProps } from '@/typestash';

export const NewComponent = memo(({ prop1, prop2 }: ComponentProps) => {
  return (
    <div className="rounded-lg shadow-md p-4">
      {/* Component content */}
    </div>
  );
});

// Astro Component Template
---
import type { AstroProps } from '@/typestash';
import { validateData } from '@/utils/validation';

const { data } = Astro.props;
const isValid = validateData(data);
---

{isValid && (
  <div class="wrapper">
    <slot />
  </div>
)}
```

2. Store Pattern:
```typescript
// Store Template
import { atom } from 'nanostores';
import type { DataType } from '@/typestash';

export const $storeName = atom<DataType | null>(null);

export const setStoreData = (data: DataType) => {
  $storeName.set(data);
};
```

3. RPC Pattern:
```typescript
// Action Template
export const performAction = async (data: InputType) => {
  try {
    const result = await Astro.callAction('action:name', data);
    return result;
  } catch (error) {
    handleRpcError(error);
  }
};
```

### Common Mistakes to Avoid

1. Type System:
   - ❌ Don't use `any` or `unknown` types
   - ❌ Don't bypass TypeScript checks
   - ✅ Use proper type definitions from typestash
   - ✅ Create new types when needed in appropriate files

2. State Management:
   - ❌ Don't mix client/server state
   - ❌ Don't create unnecessary stores
   - ✅ Use appropriate state solution based on need
   - ✅ Follow established patterns for store updates

3. Component Creation:
   - ❌ Don't mix Astro and React patterns
   - ❌ Don't use client directives unnecessarily
   - ✅ Follow component decision tree
   - ✅ Use established component templates

## 📝 Code Generation Guidelines

### Component Generation

1. New React Component:
```typescript
// Template for new React components
import { memo } from 'react';
import type { ComponentProps } from '@/typestash';

export const ComponentName = memo(({ prop1, prop2 }: ComponentProps) => {
  // 1. Start with prop validation if needed
  // 2. Define any local state
  // 3. Define handlers and callbacks
  // 4. Return JSX with Tailwind classes
  return (
    <div className="layout-classes">
      <div className="content-classes">
        {/* Component content */}
      </div>
    </div>
  );
});
```

2. New Astro Component:
```astro
---
// Import types
import type { AstroProps } from '@/typestash';

// Define interface for component props
interface Props {
  title: string;
  data: AstroProps;
}

// Get props with typing
const { title, data } = Astro.props;

// Perform any necessary data validation
const isValid = validateData(data);
---

{/* Component template */}
{isValid && (
  <div class="wrapper-classes">
    <h1>{title}</h1>
    <slot />
  </div>
)}
```

### API Integration

1. RPC Action Template:
```typescript
// src/actions/newAction.ts
import type { InputType, OutputType } from '@/typestash';
import { handleRpcError } from '@/utils/error';

export const newAction = async (
  data: InputType
): Promise<OutputType> => {
  try {
    const result = await Astro.callAction('action:name', data);
    return result;
  } catch (error) {
    handleRpcError(error);
  }
};
```

2. Error Handling Template:
```typescript
// Error handling pattern
try {
  // Attempt operation
} catch (error) {
  if (error instanceof RpcError) {
    // Handle RPC-specific errors
    handleRpcError(error);
  } else if (error instanceof ValidationError) {
    // Handle validation errors
    handleValidationError(error);
  } else {
    // Handle unexpected errors
    handleUnexpectedError(error);
  }
}
```

## 🔍 Code Review Checklist

When generating or modifying code, ensure:

1. Type Safety
   - [ ] All props are properly typed
   - [ ] No use of `any` or `unknown`
   - [ ] Proper error types defined
   - [ ] Type imports are from correct files

2. Component Structure
   - [ ] Follows decision tree guidelines
   - [ ] Uses appropriate state management
   - [ ] Implements proper error boundaries
   - [ ] Uses correct file structure

3. Performance
   - [ ] Implements proper memoization
   - [ ] Uses appropriate loading strategies
   - [ ] Follows caching guidelines
   - [ ] Optimizes re-renders

4. Security
   - [ ] Validates all inputs
   - [ ] Implements proper error handling
   - [ ] Follows security best practices
   - [ ] Uses proper authentication/authorization

## 🎨 Styling Guidelines

### Tailwind Patterns

1. Layout Classes:
```html
<!-- Common layout patterns -->
<div class="container mx-auto px-4">
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <!-- Content -->
  </div>
</div>
```

2. Component Classes:
```html
<!-- Common component patterns -->
<div class="rounded-lg shadow-md p-4 bg-white">
  <h2 class="text-lg font-semibold mb-2">
    <!-- Title -->
  </h2>
  <div class="space-y-4">
    <!-- Content -->
  </div>
</div>
```

### Responsive Design

1. Breakpoint Usage:
```html
<!-- Mobile-first responsive design -->
<div class="
  w-full
  sm:w-1/2
  md:w-1/3
  lg:w-1/4
  p-4
  sm:p-6
  md:p-8
">
  <!-- Content -->
</div>
```

## 📚 Project Structure Reference

```text
/
├── src/
│   ├── actions/         # API actions
│   │   ├── estimate.ts
│   │   └── user.ts
│   ├── components/     # UI components
│   │   ├── estimate/
│   │   ├── shared/
│   │   └── user/
│   ├── layouts/        # Page layouts
│   │   ├── Layout.astro
│   │   └── EstimateWrapper.astro
│   ├── pages/         # Route pages
│   ├── stores/        # State management
│   ├── typestash/     # TypeScript types
│   └── utils/         # Helper functions
└── be-rpc-estimates/  # Backend service
    ├── src/
    ├── drizzle/
    └── tests/
```

## 🔄 Version Control Guidelines

### Commit Message Format
```
type(scope): description

- type: feat|fix|docs|style|refactor|test|chore
- scope: component|api|db|worker
- description: present tense, lowercase
```

### Branch Naming
```
feature/descriptive-name
bugfix/issue-description
hotfix/urgent-fix
release/version-number
```

## 🛠️ Development Commands

| Command                | Action                                           |
|:----------------------|:-------------------------------------------------|
| `npm run dev`         | Start development server                         |
| `npm run build`       | Build for production                            |
| `npm run test`        | Run tests                                       |
| `npm run deploy`      | Deploy to Cloudflare Pages                      |

## 🔒 Security Checklist

When implementing features:

1. Data Validation
   - [ ] Validate all user inputs
   - [ ] Sanitize data before processing
   - [ ] Implement proper error handling
   - [ ] Use type-safe operations

2. Authentication/Authorization
   - [ ] Check user permissions
   - [ ] Validate authentication tokens
   - [ ] Implement proper session handling
   - [ ] Follow security best practices

3. API Security
   - [ ] Validate all API inputs
   - [ ] Implement rate limiting
   - [ ] Use proper error responses
   - [ ] Follow API security guidelines