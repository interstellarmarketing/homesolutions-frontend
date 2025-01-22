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

## 📋 Frontend Methodology

### Component Structure
- Components are organized by feature/domain in `src/components/`
- Each component should be in its own directory with associated types and utilities
- SVG components are isolated in `components/svgs/` directory
- Analytics components are separated in `components/analytics/`
- Navigation components are grouped in `components/nav/`

### Layout Methodology
- Layouts are stored in `src/layouts/`
- Base layout (`Layout.astro`) provides:
  - Common HTML structure
  - Meta tags and SEO setup
  - Navigation integration
  - Analytics inclusion (conditional for local development)
  - Base styling with Tailwind classes
  - Responsive viewport configuration
- Feature-specific layouts (e.g. `EstimateWrapper.astro`):
  - Extend the base layout
  - Add feature-specific validation
  - Implement consistent container structures
  - Handle route protection/redirection
  - Maintain consistent spacing and layout patterns

#### Layout Guidelines
1. HTML Structure:
   - Use semantic HTML elements
   - Implement proper meta tags
   - Maintain consistent head structure
   - Include necessary viewport settings

2. Styling Patterns:
   - Use Tailwind's container classes for width control
   - Implement flexible layouts with flex/grid
   - Use consistent spacing utilities
   - Follow mobile-first responsive design
   - Use dvh (dynamic viewport height) for full-height layouts

3. Layout Composition:
   - Keep layouts focused on structure
   - Use slots for content injection
   - Implement proper type checking for props
   - Handle layout-specific validation
   - Maintain clear separation of concerns

4. Performance Considerations:
   - Conditional loading of analytics
   - Proper meta tag implementation
   - Efficient CSS class usage
   - Minimal JS in layout files

### Page Organization
- Pages use the `.astro` extension and are located in `src/pages/`
- Each page should be minimal, primarily composing components
- Complex pages should be broken down into sub-directories (e.g. `pages/estimate/`)
- Pages follow Astro's file-based routing convention

#### Page Patterns
1. Static vs Dynamic Pages:
   - Use `export const prerender = true` for static pages
   - Dynamic pages should handle data fetching in the frontmatter
   - Utilize Astro.locals for runtime environment access
   - Handle errors gracefully with proper typing

2. Data Handling:
   - Database queries should be in the frontmatter section
   - Use Astro.callAction for API interactions
   - Implement proper error handling for data fetching
   - Keep data transformation logic in utilities

3. UI Structure:
   - Maintain consistent grid/flex patterns
   - Use responsive class modifiers (e.g. `md:grid-cols-4`)
   - Implement consistent spacing (gap-4, gap-8)
   - Use semantic class naming for hover states

4. Dynamic Routes:
   - Use directory-based dynamic routing
   - Implement proper parameter validation
   - Handle invalid routes with redirects
   - Maintain type safety for route parameters

5. Performance Patterns:
   - Prerender static content where possible
   - Implement proper loading states
   - Use client directives sparingly
   - Keep component tree depth minimal

### State Management
- Uses nanostores for global state management
- Store files are named descriptively (e.g. `activeEstimateType.ts`)
- Each store has a single responsibility
- Stores are located in `src/stores/` directory
- State updates should be done through defined actions/methods

### Type Safety
- All components should have proper TypeScript types
- Types are stored in `src/typestash/`
- Use interfaces for object shapes
- Prefer type inference where possible
- Zod for runtime type validation

### Styling Guidelines
- Uses Tailwind CSS for styling
- Follow utility-first CSS approach
- Common styles should be extracted to Tailwind components
- Maintain consistent spacing and color schemes
- Use Tailwind's responsive design utilities

### Actions
- API interactions are isolated in `src/actions/`
- Each action should be typed and documented
- Use async/await for asynchronous operations
- Handle errors gracefully with proper types

### Assets
- Static assets are stored in `src/assets/`
- Public assets go in `public/` directory
- SVG files should be componentized
- Use appropriate image formats and optimization

### Best Practices
1. Component Creation:
   - One component per file
   - Use functional components
   - Props should be typed
   - Keep components focused and small

2. State Management:
   - Minimize global state
   - Use local state when possible
   - Document store purpose and usage

3. Performance:
   - Lazy load where appropriate
   - Optimize images and assets
   - Use proper Astro client directives

4. Code Style:
   - Follow consistent naming conventions
   - Use meaningful variable names
   - Document complex logic
   - Keep functions pure when possible

## 📁 Project Structure

```text
/
├── src/
│   ├── actions/         # API actions
│   ├── assets/         # Static assets
│   ├── components/     # Reusable UI components
│   ├── layouts/        # Page layouts
│   ├── pages/         # Route pages
│   ├── stores/        # State management
│   ├── typestash/     # TypeScript types
│   └── utils/         # Helper functions
├── be-rpc-estimates/  # Backend service
│   ├── src/          # Backend source code
│   └── drizzle/      # Database operations
└── public/           # Static assets
```

## 🚀 Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. For backend development:
   ```bash
   cd be-rpc-estimates
   npm install
   ```

## 🛠️ Available Commands

| Command                | Action                                           |
| :-------------------- | :----------------------------------------------- |
| `npm run dev`         | Start development server at `localhost:4321`     |
| `npm run build`       | Build for production                            |
| `npm run preview`     | Preview production build locally                 |
| `npm run deploy`      | Deploy to Cloudflare Pages                      |
| `npm run cf-typegen`  | Generate Cloudflare Worker types                |

## 🔧 Tech Stack

- [Astro](https://astro.build/) - Web Framework
- [React](https://reactjs.org/) - UI Components
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [TypeScript](https://www.typescriptlang.org/) - Type Safety
- [Cloudflare Workers](https://workers.cloudflare.com/) - Serverless Platform
- [Drizzle ORM](https://orm.drizzle.team/) - Database ORM
- [PostHog](https://posthog.com/) - Analytics
- [Nanostores](https://github.com/nanostores/nanostores) - State Management
