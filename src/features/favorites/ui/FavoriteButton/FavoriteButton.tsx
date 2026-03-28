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
  const { favorites, isFavoritePending, toggleFavorite } = useFavorites();
  const itemId = String(item.id);

  const isFavorite = favorites.some(f => String(f.id) === itemId);
  const isPending = isFavoritePending(itemId);
  const label = isFavorite ? t('favoriteRemove') : t('favoriteAdd');

  return (
    <button
      className={css.favoriteBtn}
      type="button"
      aria-label={label}
      aria-pressed={isFavorite}
      aria-busy={isPending}
      disabled={isPending}
      onClick={() => {
        void toggleFavorite(item);
      }}
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
