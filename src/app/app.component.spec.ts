import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ReadOnlyService } from './read-only.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let service: ReadOnlyService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideAnimationsAsync()],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    service = TestBed.inject(ReadOnlyService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should toggle zone1 read-only state on button click', () => {
    expect(service.isReadOnly('zone1')).toBeFalse();
    const buttons = fixture.nativeElement.querySelectorAll('button[mat-raised-button]');
    (buttons[0] as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(service.isReadOnly('zone1')).toBeTrue();
  });

  it('should toggle zone2 independently', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button[mat-raised-button]');
    (buttons[1] as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(service.isReadOnly('zone2')).toBeTrue();
    expect(service.isReadOnly('zone1')).toBeFalse();
  });
});
