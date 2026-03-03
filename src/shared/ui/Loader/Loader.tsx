import { ScaleLoader } from 'react-spinners';
import css from './Loader.module.css';
import { useTheme } from '../../../app/providers/theme';
import { THEMES } from '../../../features/theme-switcher';

export default function Loader() {
  const { theme } = useTheme();
  const { color } = THEMES[theme];

  return (
    <div className={css.backdrop}>
      <ScaleLoader color={color} />
    </div>
  );
}
