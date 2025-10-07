# 3D Printing Platform

A modern web application for 3D printing services built with Next.js, GraphQL, and TypeScript.

## Features

### User Features

- **User Registration & Authentication**: Secure user registration and login system
- **Order Management**: Create orders by uploading 3D model URLs
- **Material Selection**: Choose from various plastic types and colors
- **Order History**: View and track all your orders
- **Responsive Design**: Modern UI that works on all devices

### Admin Features

- **Plastic Management**: Add, edit, and delete plastic types with pricing
- **Color Management**: Manage available colors with hex codes
- **Order Overview**: View all orders in the system

## Tech Stack

- **Frontend**: Next.js 15 with App Router, TypeScript, Tailwind CSS
- **Backend**: GraphQL with Apollo Server
- **Database**: SQLite with Prisma ORM
- **Authentication**: NextAuth.js
- **State Management**: Apollo Client with SWR
- **Testing**: Cucumber + WebdriverIO for E2E testing

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd 3d-printing-platform
```

2. Install dependencies:

```bash
npm install
```

3. Set up the database:

```bash
npx prisma migrate dev
npm run db:seed
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Default Accounts

The database is seeded with default accounts:

**Admin Account:**

- Email: admin@example.com
- Password: admin123

**User Account:**

- Email: user@example.com
- Password: user123

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:seed` - Seed the database with sample data
- `npm run test:e2e` - Run E2E tests
- `npm run test:e2e:headless` - Run E2E tests in headless mode

## Project Structure

```
3d-printing-platform/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── auth/              # Authentication pages
│   │   ├── admin/             # Admin dashboard
│   │   ├── orders/            # Order management
│   │   └── providers.tsx      # App providers
│   ├── components/            # React components
│   └── lib/                   # Utilities and configurations
│       ├── apollo-client.ts   # Apollo Client setup
│       ├── auth.ts           # NextAuth configuration
│       ├── prisma.ts         # Prisma client
│       └── graphql/          # GraphQL schema and resolvers
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.ts              # Database seeding
├── tests/
│   ├── features/            # Cucumber feature files
│   └── step-definitions/    # Step definitions
└── pages/
    └── api/                 # API routes
```

## Database Schema

The application uses the following main entities:

- **User**: User accounts with roles (USER/ADMIN)
- **Order**: 3D printing orders with model URLs and material selections
- **Plastic**: Available plastic types with pricing
- **Color**: Available colors with hex codes

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/[...nextauth]` - NextAuth.js endpoints
- `POST /api/graphql` - GraphQL endpoint

## GraphQL Schema

The application exposes a comprehensive GraphQL API with queries and mutations for:

- User management
- Order CRUD operations
- Plastic type management
- Color management

## Testing

The project includes comprehensive E2E tests using Cucumber and WebdriverIO:

- User authentication flows
- Order creation and management
- Admin functionality for managing materials

Run tests with:

```bash
npm run test:e2e
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
