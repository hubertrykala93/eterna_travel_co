import { Currency } from '../currency/currency.enum';
import { LanguageCode } from '../language/language.enum';
import { MenuType } from './header.enum';

export interface DropDownSelectorButtonConfig {
  key?: string;
  defaultLabel: string;
  iconUrl?: string;
  alt?: string;
  url?: string;
  value?: Currency | LanguageCode;
  type: MenuType;
}
