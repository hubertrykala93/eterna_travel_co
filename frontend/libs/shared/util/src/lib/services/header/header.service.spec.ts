import { TestBed, inject } from '@angular/core/testing';
import { HeaderService } from './header.service';

describe('Service: Header', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [HeaderService],
    });
  });

  it('should ...', inject([HeaderService], (service: HeaderService) => {
    expect(service).toBeTruthy();
  }));
});
