# Angular Readonly Directive

A custom Angular attribute directive (`appReadOnly`) that makes any form element non-editable. Supports toggling the readonly state dynamically via a service.

## Features

- Custom `ReadOnly` attribute directive for any `<input>`, `<textarea>`, or `<select>`
- `ReadOnlyService` to toggle readonly state globally or per-field

## Tech Stack

- Angular (CLI v1.7.4)
- TypeScript

## Prerequisites

- [Node.js](https://nodejs.org/) v10+
- Angular CLI: `npm install -g @angular/cli`

## Getting Started

```bash
git clone https://github.com/ahasan09/angular-readonly-directive
cd angular-readonly-directive
npm install
ng serve
```

Open [http://localhost:4200](http://localhost:4200).

## Usage

```html
<input type="text" appReadOnly [isReadOnly]="true" />
```

## Commands

| Command | Description |
|---------|-------------|
| `ng serve` | Start dev server on port 4200 |
| `ng build --prod` | Production build |
| `ng test` | Run unit tests (Karma) |
| `ng e2e` | Run end-to-end tests (Protractor) |

## Key Files

```
src/app/
├── read-only.directive.ts   # The custom directive
└── read-only.service.ts     # Service to toggle readonly state
```
