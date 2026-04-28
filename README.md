# Angular Read-Only Directive

A reusable Angular 19 attribute directive (`[appReadOnly]`) that disables all Angular Material form controls inside a container DOM subtree. State is toggled via a service backed by Angular Signals, with support for multiple independent read-only zones on the same page.

## Features

- `[appReadOnly]` attribute directive — apply to any container element
- Multiple independent zones, each identified by a string group name
- `ReadOnlyService` uses Angular `signal<Record<string, boolean>>` — no RxJS needed
- Standalone components, no NgModule
- TypeScript strict mode
- ESLint with angular-eslint v19
- 14 unit tests (service + directive + app component)

## Tech Stack

- Angular 19
- Angular Material 19
- TypeScript 5.6 (strict)
- Angular Signals
- ESLint 9 / angular-eslint 19
- Karma + Jasmine

## Why Signals instead of EventEmitter?

The Angular 5 original used `EventEmitter` as a service bus — an anti-pattern. `EventEmitter` is designed for `@Output()` bindings, not service communication. The replacement uses Angular's built-in `signal<Record<string, boolean>>()`:

- Reactive by default — `effect()` in the directive automatically re-runs when the signal changes
- No manual subscribe/unsubscribe, no memory-leak risk
- Works seamlessly with Angular's change detection
- Per-group state is just a keyed object in a single signal

## Prerequisites

- Node.js 22+
- Angular CLI 19: `npm install -g @angular/cli`

## Getting Started

```bash
git clone https://github.com/ahasan09/angular-readonly-directive
cd angular-readonly-directive
npm install
ng serve
```

Open [http://localhost:4200](http://localhost:4200).

## Usage

### Service API

```ts
import { ReadOnlyService } from './app/read-only.service';

// Inject and use
readonly readOnlyService = inject(ReadOnlyService);

// Disable a named zone
this.readOnlyService.setReadOnly(true, 'myZone');

// Check state
this.readOnlyService.isReadOnly('myZone'); // true

// Re-enable
this.readOnlyService.setReadOnly(false, 'myZone');
```

### Directive in template

```html
<!-- Zone 1 -->
<div [appReadOnly]="'zone1'">
  <mat-form-field>
    <input matInput placeholder="Disabled when zone1 is read-only" />
  </mat-form-field>
  <button mat-button>Also disabled</button>
</div>

<!-- Zone 2 — independent from Zone 1 -->
<div [appReadOnly]="'zone2'">
  <mat-checkbox>Independent checkbox</mat-checkbox>
</div>

<!-- Toggle buttons -->
<button (click)="readOnlyService.setReadOnly(true, 'zone1')">Lock Zone 1</button>
<button (click)="readOnlyService.setReadOnly(false, 'zone1')">Unlock Zone 1</button>
```

### Two-zone example (full component)

```ts
@Component({
  standalone: true,
  imports: [ReadOnlyDirective, MatButtonModule, /* ... */],
  template: `
    <button (click)="toggle('zone1')">Toggle Zone 1</button>
    <div [appReadOnly]="'zone1'">
      <input matInput />
    </div>

    <button (click)="toggle('zone2')">Toggle Zone 2</button>
    <div [appReadOnly]="'zone2'">
      <mat-checkbox>Check</mat-checkbox>
    </div>
  `,
})
export class MyComponent {
  readonly svc = inject(ReadOnlyService);
  toggle(g: string) { this.svc.setReadOnly(!this.svc.isReadOnly(g), g); }
}
```

## Commands

| Command | Description |
|---------|-------------|
| `ng serve` | Start dev server on port 4200 |
| `ng build` | Production build |
| `ng test` | Run unit tests (Karma + FirefoxHeadless locally) |
| `ng lint` | ESLint check |

## Key Files

```
src/app/
├── app.config.ts            # bootstrapApplication providers
├── app.component.ts         # Demo standalone component
├── app.component.html       # Two-zone demo template
├── read-only.directive.ts   # [appReadOnly] directive
├── read-only.service.ts     # Signal-based service
├── read-only.service.spec.ts
├── read-only.directive.spec.ts
└── app.component.spec.ts
```
