# SsrExample

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.10.

- [SsrExample](#ssrexample)
  - [Purpose](#purpose)
  - [Translations](#translations)
  - [Project Structure](#project-structure)
  - [Tests](#tests)
  - [Things I would still like to add](#things-i-would-still-like-to-add)
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
tasks. There is also an impersonation mechanism to let you view the app as another
user. This is mostly to show off how signals can cascade updates across the whole
application.

The app uses session storage and IndexedDB for persistence so it's all
browser side.

## Translations

The app currently builds an English and French version. This is mostly because the
[i18n](https://angular.dev/guide/i18n) documentation uses French and I know a few
native French speakers who would likely get a laugh out of bad automated translations
which is all I'm willing to do for this.

I have not yet figured out how to actually _serve_ those translations though.

## Project Structure

Demonstrating an ideal project structure isn't one of the goals of this project. I personally like the way Next structures components around routes and used that style here.

I like that this keeps components close to where they are used, but if you prefer something
else that's okay too.

## Tests

My goal was to create a test suite that covered common scenarios I've run into so that
others would have examples beyond the documentation as well. If you find an area that
is inadequate or would like more examples on, open an issue and I'll try to figure it out.


## Things I would still like to add

I wasn't able to come up with uses for everthing in this demo app. Here are a few I am
hoping to eventually get to. Open an issue if you have something in mind.

- [ ] Attribute directives
- [ ] `@defer`
- [ ] Deployment Dockerfile that serves multiple locales

## Development server

To start a local development server, run:

```bash
npm run start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
npm run ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
npm run ng generate --help
```

## Building

To build the project run:

```bash
npm run build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
npm run test
```

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
