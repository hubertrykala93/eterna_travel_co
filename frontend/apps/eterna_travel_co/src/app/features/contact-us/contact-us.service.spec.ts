import { TestBed, inject } from '@angular/core/testing';
import { ContactUsService } from './contact-us.service';

describe('Service: ContactUs', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ContactUsService],
    });
  });

  it('should ...', inject([ContactUsService], (service: ContactUsService) => {
    expect(service).toBeTruthy();
  }));
});
