import { Currency } from '@currency/data-access';
import { LanguageCode } from '@language/data-access';
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
