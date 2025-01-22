# Technical Documentation

This document outlines the technical architecture, integration patterns, and critical aspects of the Zach Estimates application that should be maintained.

## 🔌 Frontend-Backend Integration

### RPC Architecture
- Frontend communicates with backend through typed RPC calls
- All RPC endpoints must be fully typed
- Use Zod for runtime validation on both ends
- Keep RPC methods small and focused
- Handle errors consistently across all endpoints

### Data Flow
1. Frontend Flow:
   - Actions defined in `src/actions/`
   - Use Astro.callAction for RPC calls
   - Handle loading and error states
   - Type safety through shared types

2. Backend Flow:
   - RPC handlers in backend service
   - Validate input with Zod schemas
   - Process through service layer
   - Return typed responses

### Type Sharing
- Share types between frontend and backend
- Use TypeScript for end-to-end type safety
- Maintain consistent type naming conventions
- Keep shared types in designated locations

## 🏗️ Backend Architecture

### Service Layer
- Services handle business logic
- Keep services small and focused
- Implement proper error handling
- Use dependency injection where appropriate
- Document service responsibilities

### Database Operations
- Use Drizzle ORM for database interactions
- Keep schema definitions clean and documented
- Use migrations for schema changes
- Implement proper indexing
- Handle database errors gracefully

### Cloudflare Integration
- Workers handle request processing
- Use proper environment variables
- Implement caching strategies
- Handle worker limitations appropriately
- Follow Cloudflare best practices

### Testing Strategy
- Unit tests for services
- Integration tests for RPC endpoints
- Use Vitest for testing
- Maintain test coverage
- Mock external services appropriately

## 🔒 Security Considerations

### Data Validation
- Validate all input data
- Use Zod schemas consistently
- Implement proper sanitization
- Handle edge cases appropriately

### Environment Security
- Secure environment variable handling
- Proper secret management
- Follow least privilege principle
- Document security requirements

### Error Handling
- Never expose internal errors
- Implement proper error logging
- Use consistent error responses
- Handle all edge cases

## 💾 Data Management

### Database Schema
- Document all schema changes
- Maintain referential integrity
- Use appropriate field types
- Implement proper constraints

### Caching Strategy
- Define caching policies
- Handle cache invalidation
- Use appropriate cache durations
- Document cache dependencies

## 🚀 Deployment

### CI/CD Pipeline
- Automated testing before deployment
- Environment-specific configurations
- Proper versioning strategy
- Rollback procedures

### Environment Management
- Development environment setup
- Staging environment configuration
- Production deployment process
- Environment variable management

## ⚠️ Critical Patterns to Maintain

1. Type Safety:
   - Never disable TypeScript checks
   - Maintain strict type checking
   - Keep type definitions updated
   - Use proper type inference

2. Error Handling:
   - Consistent error patterns
   - Proper error logging
   - User-friendly error messages
   - Error recovery strategies

3. Performance:
   - Optimize database queries
   - Implement proper caching
   - Monitor worker performance
   - Handle rate limiting

4. Code Organization:
   - Maintain service boundaries
   - Keep code modular
   - Follow naming conventions
   - Document complex logic

## 📊 Monitoring and Logging

### Performance Monitoring
- Monitor RPC call performance
- Track database query times
- Watch worker execution metrics
- Set up proper alerting

### Error Tracking
- Log all errors appropriately
- Track error frequencies
- Monitor error patterns
- Implement error reporting

### Usage Analytics
- Track API usage patterns
- Monitor resource utilization
- Analyze performance metrics
- Document analytical findings 