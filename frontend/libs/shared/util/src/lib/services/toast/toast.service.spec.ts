import { TestBed, inject } from '@angular/core/testing';
import { ToastService } from './toast.service';

describe('Service: Toast', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ToastService],
    });
  });

  it('should ...', inject([ToastService], (service: ToastService) => {
    expect(service).toBeTruthy();
  }));
});
