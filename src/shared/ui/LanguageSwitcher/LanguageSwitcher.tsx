import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { useTranslation } from 'react-i18next';

import css from './LanguageSwitcher.module.css';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  return (
    <ToggleGroup.Root
      type="single"
      value={i18n.resolvedLanguage}
      onValueChange={value => value && i18n.changeLanguage(value)}
      className={css.switcher}
    >
      <ToggleGroup.Item value="en" className={css.item}>
        EN
      </ToggleGroup.Item>

      <ToggleGroup.Item value="uk" className={css.item}>
        UA
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  );
};

export default LanguageSwitcher;
