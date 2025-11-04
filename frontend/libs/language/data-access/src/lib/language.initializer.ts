import { TranslateService } from '@ngx-translate/core';
import { StorageService } from '@shared/util/services';
import { ACTIVE_LANGUAGE } from './language.const';
import { LanguageCode } from './language.enum';

export const initializeLanguage = (
  storageService: StorageService,
  translateService: TranslateService,
): void => {
  const storedLanguage = storageService.getItem(ACTIVE_LANGUAGE);

  const language = storedLanguage ?? LanguageCode.EN;

  translateService.use(language as LanguageCode);

  if (!storedLanguage) {
    storageService.setItem(ACTIVE_LANGUAGE, language);
  }
};
