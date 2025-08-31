export interface DropdownButtonConfig {
  key?: string;
  defaultLabel: string;
  lang?: string;
  iconUrl?: string;
  alt?: string;
  link?: string;
  type: MenuType;
}

export enum MenuType {
  CURRENCY = 'Currency',
  LANGUAGE = 'Language',
  NAV = 'Nav',
  AUTHENTICATION = 'Authentication',
}
