export interface DropdownButtonConfig {
  key?: string;
  defaultLabel: string;
  iconUrl?: string;
  type: MenuType;
}

export enum MenuType {
  CURRENCY = 'Currency',
  LANGUAGE = 'Language',
}
