# RelacjeSportowe

Project of application which allows every person to became an amateur sport journalist. The main feature of application is to create channels with text transmission from the football match and allow to write information about events which has occured e.g. goal, penalty, free kick, yellow card and many more. More detailed information can be found in [report](https://github.com/gregoryfikator/RelacjeSportowe/blob/main/Report.pdf).

## Technologies:

**Backend:** .NET Core 3.1, EntityFramework Core 3.1.8, ASP.NET Core SignalR 1.1.0

**Frontend:** Angular 8, Bootstrap 4.5.3, RxJS 6.5.3, ASP.NET SignalR 1.1.4 and more minor libraries

**Database:** MS SQL Server 2017

**Tools:** Visual Studio 2019 Community, Visual Studio Code

## Installation:

- Clone the repository.
- Open solution with Visual Studio 2019 or later. It's necessery as .NET Core 3.1 is not supported in older versions of VS.
- Change connection string for database in [appsettings.json](https://github.com/gregoryfikator/RelacjeSportowe/blob/main/RelacjeSportowe.Web/appsettings.json).
- Start solution with or without debugging. It should open SwaggerUI which presents available controllers, methods and used data schemas.
- With Visual Studio Code open folder RelacjeSportowe.Web/ClientApp or with command line navigate to the same directory.
- Make sure you have installed Angular CLI https://angular.io/guide/setup-local.
- In the terminal type `npm install` in order to install required packages (preassumption: you have installed npm).
- When packages are installed you can run command `ng serve` which should host UI at http://localhost:4200 (preassumption: you have installed correctly node.js and Angular CLI).

## Launching

If you have everything installed and set up correctly these are the only steps required to launch application:
- Start solution with or without debugging.
- Run command `ng serve --open` in RelacjeSportowe.Web/ClientApp directory.
- Using `--open` attribute will tell Angular to open new window/tab in browser at http://localhost:4200 when the build is ready.
