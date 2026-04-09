import { useCommonTranslation } from '@shared/hooks';

import css from './LanguageSwitcher.module.css';

const LANGUAGES = [
  {
    value: 'en',
    label: 'EN',
    translationKey: 'languageEnglish',
  },
  {
    value: 'uk',
    label: 'UK',
    translationKey: 'languageUkrainian',
  },
] as const;

const LanguageSwitcher = () => {
  const { i18n, t } = useCommonTranslation();

  return (
    <div className={css.switcher} role="group" aria-label={t('navigationMenu')}>
      {LANGUAGES.map(({ value, label, translationKey }) => {
        const isActive = i18n.resolvedLanguage === value;

        return (
          <button
            key={value}
            type="button"
            className={css.item}
            data-active={isActive}
            aria-pressed={isActive}
            aria-label={t(translationKey)}
            title={t(translationKey)}
            onClick={() => {
              if (!isActive) {
                void i18n.changeLanguage(value);
              }
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
