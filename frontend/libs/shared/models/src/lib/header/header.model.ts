import { Currency } from '../currency/currency.model';
import { LanguageCode } from '../language/language.model';

export interface DropDownSelectorButtonConfig {
  key?: string;
  defaultLabel: string;
  iconUrl?: string;
  alt?: string;
  url?: string;
  value?: Currency | LanguageCode;
  type: MenuType;
}

export enum MenuType {
  CURRENCY = 'Currency',
  LANGUAGE = 'Language',
  MAIN = 'Main',
  AUTHENTICATION = 'Authentication',
}
