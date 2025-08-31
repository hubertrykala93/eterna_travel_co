import { MenuType } from './header/header.model';

export interface TranslationConfig {
  key?: string;
  defaultLabel: string;
}

export interface IconConfig {
  iconUrl?: string;
  alt?: string;
}

export interface UrlConfig {
  url?: string;
}

export interface ActionConfig {
  value?: string;
}

export interface TypeConfig {
  type?: MenuType;
}

export interface NavigationButtonConfig
  extends TranslationConfig,
    IconConfig,
    UrlConfig,
    ActionConfig,
    TypeConfig {}
