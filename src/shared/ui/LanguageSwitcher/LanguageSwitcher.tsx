import * as ToggleGroup from '@radix-ui/react-toggle-group';

import { useCommonTranslation } from '@shared/hooks';

import css from './LanguageSwitcher.module.css';

const LanguageSwitcher = () => {
  const { i18n, t } = useCommonTranslation();

  return (
    <ToggleGroup.Root
      type="single"
      value={i18n.resolvedLanguage}
      onValueChange={value => value && i18n.changeLanguage(value)}
      className={css.switcher}
    >
      <ToggleGroup.Item
        value="en"
        className={css.item}
        aria-label={t('languageEnglish')}
        title={t('languageEnglish')}
      >
        EN
      </ToggleGroup.Item>

      <ToggleGroup.Item
        value="uk"
        className={css.item}
        aria-label={t('languageUkrainian')}
        title={t('languageUkrainian')}
      >
        UK
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  );
};

export default LanguageSwitcher;
