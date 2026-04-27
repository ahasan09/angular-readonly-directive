# Angular Readonly

Angular 5 application featuring a reusable `[read-only]` directive that toggles the disabled/enabled state of Angular Material form controls within a DOM subtree, driven by a service EventEmitter.

## Tech Stack
- Angular 5
- Angular Material
- TypeScript
- RxJS EventEmitter

## Project Structure
```
angular_readonly/
├── src/
│   └── app/
│       ├── readonly.directive.ts   # Core [read-only] attribute directive
│       └── readonly.service.ts     # EventEmitter to toggle read-only state
├── .angular-cli.json
└── package.json
```

## Development
```bash
# Install dependencies
npm install

# Run development server
ng serve

# Build
ng build
```

## Key Notes
- The `[read-only]` directive applies to a container element and disables all Angular Material form controls inside it.
- State is toggled by calling a method on `ReadonlyService` which fires an EventEmitter.
- Uses legacy `.angular-cli.json` (Angular 5 era).
