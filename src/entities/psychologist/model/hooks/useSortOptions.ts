import { DEFAULT_SORT_OPTION } from '@shared/constants';
import { SORT_CONFIG } from '../config/sortConfig';
import { useFiltersTranslation } from '@shared/hooks';

export const useSortOptions = () => {
  const { t } = useFiltersTranslation();

  const options = Object.entries(SORT_CONFIG).map(([value, config]) => ({
    value,
    label: t(config.labelKey),
  }));

  return {
    options,
    defaultValue: DEFAULT_SORT_OPTION,
  };
};
