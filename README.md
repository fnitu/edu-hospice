# EduHospice

This project is available online here:
- Development: https://edu-hospice.herokuapp.com/
- Production: http://86.121.249.150/edu-hospice

## Local installing of the application dependencies
Run `npm ci` in the root of the folder after the project is checked out on your local machine.
If you add new dependencies, you need to run `npm install` so `package-lock.json` is updated.

## Local Development Server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
Use the `--prod` flag for a production build.

## Local Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Heroku Development Server
On Heroku development server, the following file is run: [server.js](https://github.com/fnitu/edu-hospice/blob/master/server.js)

## SIIT Production server
In order to create the files that need to be uploaded, you need to run:
`ng build --prod --base-href=/edu-hospice/ --deploy-url=/edu-hospice/`
