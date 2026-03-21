import { Icon } from '@shared/ui';
import css from './FavoriteButton.module.css';
import clsx from 'clsx';

import { useFavorites } from '@features/favorites/model/hooks/useFavorites';
import type { Psychologist } from '@entities/psychologist';

interface Props {
  item: Psychologist;
}

const FavoriteButton = ({ item }: Props) => {
  const { favorites, toggleFavorite } = useFavorites();

  const isFavorite = favorites.some(f => f.id === item.id);

  return (
    <button className={css.favoriteBtn} onClick={() => toggleFavorite(item)}>
      <Icon
        className={clsx(css.favoriteIcon, isFavorite && css.isFavorite)}
        name="icon-heart"
        label="favorite"
        width={26}
        height={26}
      />
    </button>
  );
};

export default FavoriteButton;
