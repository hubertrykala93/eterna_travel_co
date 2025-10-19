import { dropDownNavigationButtons } from './header.const';
import { MenuType } from './header.enum';
import { DropDownSelectorButtonConfig } from './header.model';

export function getFilteredDropDownNavigationButtons(
  menuType: MenuType,
): DropDownSelectorButtonConfig[] {
  return dropDownNavigationButtons.filter((button) => button.type === menuType);
}
