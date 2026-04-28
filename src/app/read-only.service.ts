import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ReadOnlyService {
  private readonly state = signal<Record<string, boolean>>({});

  setReadOnly(value: boolean, group = 'default'): void {
    this.state.update(current => ({ ...current, [group]: value }));
  }

  isReadOnly(group = 'default'): boolean {
    return this.state()[group] ?? false;
  }

  readonly readOnlyState = this.state.asReadonly();
}
