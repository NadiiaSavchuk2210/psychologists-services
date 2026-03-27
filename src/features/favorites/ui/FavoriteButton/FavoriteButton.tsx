import clsx from 'clsx';

import type { Psychologist } from '@entities/psychologist';
import { useFavorites } from '@features/favorites/model/hooks/useFavorites';
import { useA11yTranslation } from '@shared/hooks';
import { Icon } from '@shared/ui';

import css from './FavoriteButton.module.css';

interface Props {
  item: Psychologist;
}

const FavoriteButton = ({ item }: Props) => {
  const { t } = useA11yTranslation();
  const { favorites, toggleFavorite } = useFavorites();

  const isFavorite = favorites.some(f => f.id === item.id);
  const label = isFavorite ? t('favoriteRemove') : t('favoriteAdd');

  return (
    <button
      className={css.favoriteBtn}
      type="button"
      aria-label={label}
      aria-pressed={isFavorite}
      onClick={() => toggleFavorite(item)}
    >
      <Icon
        className={clsx(css.favoriteIcon, isFavorite && css.isFavorite)}
        name="icon-heart"
        width={26}
        height={26}
      />
    </button>
  );
};

export default FavoriteButton;
