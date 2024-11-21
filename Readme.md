# Guide for Starting the Project

## Demo
Demo is hosted on `https://pftp-task.vercel.app`.

Backend is hosted on Render which puts applications to sleep after some time of inactivity, this may cause no locations to begin with, try refreshing the page & within a few seconds render will boot up & at least one home location will be visible


The directory structure looks like following
```
./
  backend/
    src/
    .env
    ...
    package.json
  database/ (ignore)
  frontend/
    src/
    .env.development
    .env.production
    ...
    package.json
  docker-compose.yml  (ignore, trying to containerise the whole project)
```

To run backend
```
cd backend
npm install (this has postinstall configured to run prisma generate)
npm run dev (.env is provided with the application, within the repo)
```
you have your backend ready at 10000 port. Verify if you can see `OK` on `http://localhost:10000/api`.

To run frontend
```
cd frontend
npm install
npm run dev (.env.development is provided with the application, connects to the local backend)
```
you have your frontend ready at 3000 port. Verify on `http://localhost:3000`.

You must login with esri as application opens for first time, you can use any account to login.
Authentication is needed to make use of Geocoding APIs.

If you have any queries or issues feel free to reach out to my emails on `rupamkairi@gmail.com` or `rupamkairi@hotmail.com`.
