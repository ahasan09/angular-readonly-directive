import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReadOnlyDirective } from './read-only.directive';
import { ReadOnlyService } from './read-only.service';

@Component({
  standalone: true,
  imports: [ReadOnlyDirective, MatFormFieldModule, MatInputModule, MatCheckboxModule],
  template: `
    <div [appReadOnly]="'zone1'">
      <input id="test-input" />
      <button id="test-button">Click</button>
    </div>
    <div [appReadOnly]="'zone2'">
      <input id="zone2-input" />
    </div>
  `,
})
class TestHostComponent {}

describe('ReadOnlyDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let service: ReadOnlyService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [provideAnimationsAsync()],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    service = TestBed.inject(ReadOnlyService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture).toBeTruthy();
  });

  it('should not disable controls initially', () => {
    const input = fixture.nativeElement.querySelector('#test-input') as HTMLInputElement;
    expect(input.disabled).toBeFalse();
  });

  it('should disable controls in zone1 when service sets zone1 read-only', async () => {
    service.setReadOnly(true, 'zone1');
    fixture.detectChanges();
    await fixture.whenStable();

    const input = fixture.nativeElement.querySelector('#test-input') as HTMLInputElement;
    expect(input.disabled).toBeTrue();
    expect(input.style.pointerEvents).toBe('none');
  });

  it('should not affect zone2 controls when zone1 is disabled', async () => {
    service.setReadOnly(true, 'zone1');
    fixture.detectChanges();
    await fixture.whenStable();

    const zone2Input = fixture.nativeElement.querySelector('#zone2-input') as HTMLInputElement;
    expect(zone2Input.disabled).toBeFalse();
  });

  it('should re-enable controls when service clears zone1 read-only', async () => {
    service.setReadOnly(true, 'zone1');
    fixture.detectChanges();
    await fixture.whenStable();

    service.setReadOnly(false, 'zone1');
    fixture.detectChanges();
    await fixture.whenStable();

    const input = fixture.nativeElement.querySelector('#test-input') as HTMLInputElement;
    expect(input.disabled).toBeFalse();
    expect(input.style.pointerEvents).toBe('');
  });

  it('should disable button inside zone1 when read-only', async () => {
    service.setReadOnly(true, 'zone1');
    fixture.detectChanges();
    await fixture.whenStable();

    const button = fixture.nativeElement.querySelector('#test-button') as HTMLButtonElement;
    expect(button.disabled).toBeTrue();
  });
});
