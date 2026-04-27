# Improvement Plan: angular_readonly

## Overview
Angular 5 app with a custom `[read-only]` directive. Useful pattern but built on Angular 5 (EOL). Directive relies on EventEmitter from a service, which is a non-standard use (EventEmitter is designed for `@Output`, not services).

## Improvements

### Modernization (High Priority)
- Upgrade from Angular 5 to Angular 19+
- Replace `.angular-cli.json` with `angular.json`
- Replace TSLint with ESLint + `@angular-eslint`

### Architecture
- Replace the service's `EventEmitter` with a `BehaviorSubject` (or Angular Signal in v19+) — EventEmitter in a service is an anti-pattern; BehaviorSubject/Signal is the idiomatic approach and allows late subscribers to receive the current state
- Make the directive support multiple independent readonly zones on the same page via an input key/group

### Testing
- Add unit tests for the `ReadonlyDirective`: verify that Angular Material controls are disabled/enabled when the service emits
- Add unit tests for `ReadonlyService`
- Add component tests using `TestBed` with an Angular Material form

### Code Quality
- Enable TypeScript `strict` mode
- Add proper typing to the directive's host element queries

### Documentation
- Expand README with a usage example showing how to wire up the directive and service
- Document why EventEmitter was replaced with BehaviorSubject/Signal

### DevOps
- Add GitHub Actions CI: lint + test + build
