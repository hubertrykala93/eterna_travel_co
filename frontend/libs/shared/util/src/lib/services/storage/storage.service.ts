import { Injectable, Signal, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly signals = new Map<string, WritableSignal<unknown>>();

  public getSignal<T>(key: string, defaultValue: T): Signal<T> {
    if (!this.signals.has(key)) {
      const storedValue = this.getItem<T>(key) ?? defaultValue;
      const sig = signal<T>(storedValue);

      this.signals.set(key, sig);
    }

    return this.signals.get(key) as Signal<T>;
  }

  public getItem<T>(key: string): T | null {
    const value = sessionStorage.getItem(key);

    return value ? (JSON.parse(value) as T) : null;
  }

  public setItem<T>(key: string, value: T): void {
    sessionStorage.setItem(key, JSON.stringify(value));

    const sig = this.signals.get(key) as WritableSignal<T> | undefined;

    if (sig) {
      sig.set(value);
    }
  }
}
