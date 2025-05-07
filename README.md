# SsrExample

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.10.

- [SsrExample](#ssrexample)
  - [Purpose](#purpose)
  - [Translations](#translations)
  - [Development server](#development-server)
  - [Code scaffolding](#code-scaffolding)
  - [Building](#building)
  - [Running unit tests](#running-unit-tests)
  - [Additional Resources](#additional-resources)

## Purpose

This is an example application intended to show Angular 19 features such as
signals. The goal is to fit as many examples of core Angular functionality in as
possible to have basic reference implementations. I found that a lot of current
examples, documentation, blog posts, etc, were focused on older patterns. I hope
this proves useful for people looking for up to date examples.

If you see something wrong, open an issue!

The flow of the application is pretty basic. There is a welcome page, login,
registration, and a task list. Once you have a session you can create and complete
tasks. The app uses session storage and IndexedDB for persistence so it's all
browser side.


## Translations

I'm still working on configuring the app to serve translations. Text extraction
is working but I haven't yet figured out how to serve the other locales. Also, so far, ChatGPT crashes when trying to do translations.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
npm run test
```

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
