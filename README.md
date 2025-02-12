# Project Name

## Table of Contents

- [Project Overview](#project-overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application Locally](#running-the-application-locally)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Deployment](#deployment)
  - [CI/CD](#cicd)

## Project Overview

Munday Reviews is an Angular-based web application designed to allow users to submit and view companies reviews.

## Getting Started

### Prerequisites

Before you can run this project locally, ensure you have the following installed on your machine:

- Node.js: You need Node.js and npm installed. You can download it from [nodejs.org](https://nodejs.org).
- Angular CLI: The Angular CLI is required to develop and serve Angular applications locally. Install it globally using npm:
  ```bash
  npm install -g @angular/cli
  ```

### Installation

1. Clone the Repository:

   ```bash
   git clone https://github.com/eawebmaster20/munday-reviews-fe.git
   cd munday-reviews-fe
   ```

2. Install Dependencies:
   ```bash
   npm install
   ```

### Running the Application Locally

1. Create environment variables:
   ```bash
   node set-env.js
   ```
2. Update environment variables:

   - with this you replace the apiUrl value with the api base url

3. Start the Development Server:

   ```bash
   npm start
   ```

4. Access the Application: Once the server is running, open your browser and navigate to `http://localhost:4200`. The application should now be running locally.

## Project Structure

```
project-name/
├── e2e/                    # End-to-end tests
├── src/                    # Application source code
│   ├── app/                # Angular app components, services, and modules
│   ├── assets/             # Images, styles, and other static assets
│   ├── environments/       # Environment-specific configuration files (dev, prod)
│   └── index.html          # Main HTML entry file
├── angular.json            # Angular CLI configuration file
├── package.json            # Project metadata and dependencies
├── tsconfig.json           # TypeScript configuration file
└── README.md
```

## Technologies Used

- **Angular**: The main framework used to build the front-end of the app
- **TypeScript**: Superset of JavaScript used for static typing
- **RxJS**: Reactive programming library for handling asynchronous data
- **SCSS**: CSS preprocessor for writing maintainable styles
- **Angular Material**: UI component library for Angular
- **husky pre commit hook**: for running routine linting tests
- **Chartjs**: Chart for dashboard
- **Socket.io client**: For web socket communication with the server

## Features

- **User Token based Authentication**: Login, signup, for user and company(only login)
- **Review System**: Users can submit and read company reviews
- **Rating System**: Companies can be rated on a scale of 1 to 5 stars
- **Crud operations on reviews**: Personalized dashboard based on user activity

## Deployment

### CI/CD

This project uses GitHub Actions for continuous integration and deployment.

- The CI/CD pipeline is set up to build and push to docker hub.
- To trigger the deployment manually, use the GitHub Actions tab in your repository to start the workflow.

