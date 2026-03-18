import type { SortOption } from '@entities/psychologist';
import * as Select from '@radix-ui/react-select';
import css from './FilterSelect.module.css';
import { useSortOptions } from '@entities/psychologist/model/hooks/useSortOptions';
import { useDisclosure, useFiltersTranslation } from '@shared/hooks';
import clsx from 'clsx';
import { Icon } from '@shared/ui';

interface Props {
  activeSort: SortOption;
  onChange: (sort: SortOption) => void;
}

export const FilterSelect = ({ activeSort, onChange }: Props) => {
  const { t } = useFiltersTranslation();
  const { options } = useSortOptions();
  const { isOpen, onToggle, onClose, onOpen } = useDisclosure();

  return (
    <div className={clsx(css.filter, 'container')}>
      <span id="filters-label" className={css.label}>
        {t('title')}
      </span>

      <Select.Root
        value={activeSort}
        onValueChange={onChange}
        onOpenChange={open => (open ? onOpen() : onClose())}
      >
        <Select.Trigger
          className={css.trigger}
          aria-labelledby="filters-label"
          onClick={onToggle}
        >
          <Select.Value />

          <Select.Icon>
            <Icon
              name="icon-arrow-down"
              width={12}
              height={7}
              className={clsx(
                css.iconArrow,
                isOpen ? css.iconUp : css.iconDown
              )}
            />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content className={css.content}>
            <Select.Viewport className={css.viewport}>
              {options.map(option => (
                <Select.Item
                  key={option.value}
                  value={option.value}
                  className={css.item}
                >
                  <Select.ItemText>{option.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
};

export default FilterSelect;
