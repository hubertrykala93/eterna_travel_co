import { StorageService } from '@shared/util/services';
import { ACTIVE_CURRENCY } from './currency.const';
import { Currency } from './currency.enum';

export const initializeCurrency = (storageService: StorageService): void => {
  const storedCurrency = storageService.getItem(ACTIVE_CURRENCY);

  const currency = storedCurrency ?? Currency.USD;

  if (!currency) {
    storageService.setItem(ACTIVE_CURRENCY, currency);
  }
};
