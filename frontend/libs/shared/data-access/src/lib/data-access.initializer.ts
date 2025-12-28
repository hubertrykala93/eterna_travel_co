import { StorageService } from '@shared/util/services';

export function initializeLocale<T>(
  storageService: StorageService,
  key: string,
  defaultValue: T,
  onInitialize?: (value: T) => void,
): void {
  const storedValue = storageService.getItem(key);
  const value = storedValue ?? defaultValue;

  if (onInitialize) {
    onInitialize(value as T);
  }

  if (!storedValue) {
    storageService.setItem(key, value);
  }
}
