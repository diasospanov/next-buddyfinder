## Intro

This is a Web App to help people find a partner(s) to run/cycle with.

## Following features/technologies are used in this app

- App is written in Typescript;
- Postgres is used for database;
- Communication between client and database is handled by app's own API routes;
- Password encryption is handled using Bcrypt;
- node:crypto is used for session token creation;
- User authentication is implemented to access event management;
- Access to certain pages is granted after client-side validation;
- Server-side validation is implemented in "join event" API route; 
- End-to-end testing is done with Playwright;
- The App is deployed on fly.io (link is on app's repository page);

## Running app on a local machine

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
