# Tarot Reading Application

## Overview

This is a full-stack web application for tarot card readings built using React (frontend) and Express.js (backend). The application allows users to draw three tarot cards for past-present-future readings and provides detailed interpretations. It features a mystical, purple-themed UI with animations and stores reading history in the backend.

## System Architecture

The application follows a modern full-stack JavaScript architecture with a clear separation between client and server:

- **Frontend**: React with TypeScript, using Vite as the build tool
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for schema management
- **UI Framework**: shadcn/ui components with Tailwind CSS
- **State Management**: TanStack Query for server state management
- **Animations**: Framer Motion for UI animations
- **Routing**: Wouter for client-side routing

## Key Components

### Frontend Architecture
- **Component Structure**: Uses shadcn/ui component library for consistent UI components
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack Query handles API calls and caching
- **Animations**: Framer Motion provides smooth card animations and transitions
- **Routing**: Wouter handles client-side navigation (currently minimal with just Home and 404 pages)

### Backend Architecture
- **API Design**: RESTful API with Express.js
- **Data Layer**: Drizzle ORM with PostgreSQL for persistent storage
- **Development Storage**: In-memory storage implementation for development
- **Validation**: Zod schemas for request validation
- **Error Handling**: Centralized error handling middleware

### Database Schema
- **tarot_readings**: Stores reading history with cards (array of IDs), interpretation text, reading type, and timestamps
- **Validation**: Uses Drizzle-Zod for type-safe schema validation

## Data Flow

1. **Card Drawing**: User clicks draw button → Frontend selects 3 random cards from local tarot deck data
2. **Reading Generation**: Frontend generates interpretation based on card meanings and positions
3. **Storage**: Reading data (card IDs, interpretation, type) is sent to backend API
4. **Persistence**: Backend validates and stores reading in database
5. **Display**: Frontend shows animated cards with detailed modal information

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React 18 with TypeScript support
- **UI Components**: Extensive shadcn/ui component library (@radix-ui components)
- **Styling**: Tailwind CSS with PostCSS
- **Animations**: Framer Motion for card animations
- **HTTP Client**: Native fetch API with TanStack Query wrapper
- **Form Handling**: React Hook Form with Hookform Resolvers
- **Utilities**: clsx, class-variance-authority for styling utilities

### Backend Dependencies
- **Database**: @neondatabase/serverless for PostgreSQL connection
- **ORM**: Drizzle ORM with Drizzle Kit for migrations
- **Validation**: Zod for schema validation
- **Session**: connect-pg-simple for PostgreSQL session storage
- **Utilities**: date-fns for date manipulation

### Development Tools
- **Build**: Vite for frontend, esbuild for backend
- **TypeScript**: Full TypeScript support across the stack
- **Development**: tsx for TypeScript execution in development

## Deployment Strategy

The application is configured for deployment on Replit with the following setup:

- **Environment**: Node.js 20 with PostgreSQL 16
- **Development**: `npm run dev` starts the development server with hot reload
- **Production Build**: `npm run build` creates optimized bundles for both frontend and backend
- **Production Server**: `npm run start` runs the compiled application
- **Database**: Uses environment variable `DATABASE_URL` for PostgreSQL connection
- **Port Configuration**: Server runs on port 5000, exposed as port 80 externally

The build process:
1. Frontend builds to `dist/public` using Vite
2. Backend builds to `dist` using esbuild
3. Static files are served from the Express server in production

## Recent Changes

- June 20, 2025: Enhanced tarot interpretations with deeply emotional and captivating readings
- June 20, 2025: Added comprehensive card descriptions using professional tarot encyclopedia
- June 20, 2025: Created complete 56-card tarot deck with custom SVG imagery
- June 20, 2025: Added close button to card detail modal for better UX
- June 16, 2025: Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.