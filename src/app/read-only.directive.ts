import { Directive, ElementRef, Input, OnInit, inject, effect } from '@angular/core';
import { ReadOnlyService } from './read-only.service';

@Directive({
  selector: '[appReadOnly]',
  standalone: true,
})
export class ReadOnlyDirective implements OnInit {
  @Input('appReadOnly') group = 'default';

  private readonly el = inject(ElementRef);
  private readonly readOnlyService = inject(ReadOnlyService);

  constructor() {
    effect(() => {
      const state = this.readOnlyService.readOnlyState();
      const isReadOnly = state[this.group] ?? false;
      this.applyReadOnly(isReadOnly);
    });
  }

  ngOnInit(): void {
    this.applyReadOnly(this.readOnlyService.isReadOnly(this.group));
  }

  private applyReadOnly(isReadOnly: boolean): void {
    const host: HTMLElement = this.el.nativeElement as HTMLElement;
    const tags = [
      'input', 'textarea', 'button', 'select', 'mat-checkbox',
      'mat-radio-button', 'mat-slider', 'mat-slide-toggle',
      'mat-button-toggle', 'mat-chip', 'mat-select', 'a',
    ];

    for (const tag of tags) {
      const elements = Array.from(host.getElementsByTagName(tag)) as HTMLInputElement[];
      for (const el of elements) {
        if (isReadOnly) {
          el.disabled = true;
          el.style.pointerEvents = 'none';
        } else {
          el.disabled = false;
          el.style.pointerEvents = '';
        }
      }
    }
  }
}
