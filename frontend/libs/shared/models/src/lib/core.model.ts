import { MenuType } from './header/header.model';

export interface TranslationLabel {
  key?: string;
  defaultLabel: string;
}

export interface NavigationButtonConfig extends TranslationLabel {
  lang?: string;
  iconUrl?: string;
  alt?: string;
  link?: string;
  type?: MenuType;
}
