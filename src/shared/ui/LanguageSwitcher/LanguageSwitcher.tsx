import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { useTranslation } from 'react-i18next';
import css from './LanguageSwitcher.module.css';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleChange = (value: string) => {
    if (value) {
      i18n.changeLanguage(value);
    }
  };

  return (
    <ToggleGroup.Root
      type="single"
      value={i18n.language}
      onValueChange={handleChange}
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
}
