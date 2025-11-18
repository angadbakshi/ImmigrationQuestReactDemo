# ImmigrationQuest React Demo

> ⚠️ **Work in Progress** - This application is currently under active development.

A comprehensive immigration management platform built with React, TypeScript, and Supabase.

## Project Structure

This monorepo contains multiple packages:

- **`immigration-2/`** - Main application
- **`admin/`** - Admin dashboard
- **`auth/`** - Authentication package
- **`core/`** - Shared core components and utilities

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account

## Installation

```bash
# Install dependencies
npm install
```

## Development

```bash
# Run the main application
cd immigration-2
npm run dev

# Run the admin dashboard
cd admin
npm run dev
```

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Backend**: Supabase
- **Authentication**: Supabase Auth
- **Database**: PostgreSQL (via Supabase)

## Features

- User authentication and authorization
- Admin dashboard
- Program management
- Document handling
- Task management
- Community features
- Learning resources
- Specialized services

## Scripts

Database scripts are available in the `scripts/` directory for:
- Schema setup
- User creation
- Data seeding

## License

MIT License

Copyright (c) 2025 ImmigrationQuest

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
