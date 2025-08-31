import { ACTIVE_CURRENCY } from '@currency/data-access';
import { ACTIVE_LANGUAGE } from '@language/data-access';
import { TranslateService } from '@ngx-translate/core';
import { Currency, LanguageCode } from '@shared/models';
import { StorageService } from '@shared/util';

export function initializeApp(storageService: StorageService, translateService: TranslateService) {
  return (): void => {
    const storedCurrency = storageService.getItem(ACTIVE_CURRENCY);
    const storedLanguage = storageService.getItem(ACTIVE_LANGUAGE);

    const currency = storedCurrency ?? Currency.USD;
    const language = storedLanguage ?? LanguageCode.EN;

    translateService.use(language as LanguageCode);

    if (!storedCurrency) {
      storageService.setItem(ACTIVE_CURRENCY, currency);
    }

    if (!storedLanguage) {
      storageService.setItem(ACTIVE_LANGUAGE, language);
    }
  };
}
