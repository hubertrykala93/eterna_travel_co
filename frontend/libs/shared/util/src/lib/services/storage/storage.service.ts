import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  public getItem<T>(key: string): T | null {
    const value = sessionStorage.getItem(key);

    return value ? (JSON.parse(value) as T) : null;
  }

  public setItem<T>(key: string, value: T): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
}
