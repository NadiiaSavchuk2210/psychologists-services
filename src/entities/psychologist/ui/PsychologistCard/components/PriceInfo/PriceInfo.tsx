import { Trans } from 'react-i18next';

import type { Psychologist } from '@entities/psychologist';
import { usePsychologistsTranslation } from '@shared/hooks';

import css from './PriceInfo.module.css';

interface Props {
  psychologist: Psychologist;
}

const PriceInfo = ({ psychologist }: Props) => {
  const { t } = usePsychologistsTranslation();

  return (
    <p className={css.price}>
      <Trans
        i18nKey="pricePerHour"
        t={t}
        values={{ price: psychologist.price_per_hour }}
        components={{
          price: <span className={css.priceAccent} />,
        }}
      />
    </p>
  );
};

export default PriceInfo;
