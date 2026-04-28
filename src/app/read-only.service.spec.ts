import { TestBed } from '@angular/core/testing';
import { ReadOnlyService } from './read-only.service';

describe('ReadOnlyService', () => {
  let service: ReadOnlyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadOnlyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return false by default for any group', () => {
    expect(service.isReadOnly('default')).toBeFalse();
    expect(service.isReadOnly('zone1')).toBeFalse();
  });

  it('should set read-only state for default group', () => {
    service.setReadOnly(true);
    expect(service.isReadOnly()).toBeTrue();
  });

  it('should set read-only state for a named group', () => {
    service.setReadOnly(true, 'zone1');
    expect(service.isReadOnly('zone1')).toBeTrue();
    expect(service.isReadOnly('zone2')).toBeFalse();
  });

  it('should toggle read-only state independently per group', () => {
    service.setReadOnly(true, 'zone1');
    service.setReadOnly(false, 'zone2');
    expect(service.isReadOnly('zone1')).toBeTrue();
    expect(service.isReadOnly('zone2')).toBeFalse();
    service.setReadOnly(false, 'zone1');
    expect(service.isReadOnly('zone1')).toBeFalse();
  });

  it('should update readOnlyState signal', () => {
    service.setReadOnly(true, 'zone1');
    expect(service.readOnlyState()['zone1']).toBeTrue();
  });
});
