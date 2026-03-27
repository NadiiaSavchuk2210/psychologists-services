import clsx from 'clsx';

import { useTheme } from '@app/providers/theme';

import css from './ThemeSwitcher.module.css';
import { THEMES, type Theme } from '../model/theme.config';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <ul className={css['theme-switcher']}>
      {Object.entries(THEMES).map(([key, value]) => (
        <li key={key}>
          <label
            className={clsx(css['theme-circle'], theme === key && css.active)}
            style={{ backgroundColor: value.color }}
            title={value.label}
          >
            <input
              type="radio"
              name="theme"
              value={key}
              checked={theme === key}
              onChange={() => setTheme(key as Theme)}
              className={css['theme-input']}
            />
            <span className="visually-hidden">{value.label}</span>
          </label>
        </li>
      ))}
    </ul>
  );
};

export default ThemeSwitcher;
