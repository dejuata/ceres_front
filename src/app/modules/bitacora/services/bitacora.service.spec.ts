import { TestBed } from '@angular/core/testing';
import { BitacoraService } from './bitacora.service';

/*describe('BitacoraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BitacoraService = TestBed.get(BitacoraService);
    expect(service).toBeTruthy();
  });
});*/
describe('BitacoraService', () => {
  let service: BitacoraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BitacoraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
