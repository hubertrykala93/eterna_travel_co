import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  public readonly loader = signal<boolean | null>(null);

  public show(): void {
    this.loader.set(true);
  }

  public hide(): void {
    this.loader.set(null);
  }
}
