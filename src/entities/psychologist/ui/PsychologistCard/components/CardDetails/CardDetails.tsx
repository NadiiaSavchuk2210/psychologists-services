import type { PsychologistUI } from '@entities/psychologist/model/types/psychologist';
import {
  useAppointmentTranslation,
  useAuthTranslation,
  usePsychologistsTranslation,
} from '@shared/hooks';
import { useAuthStore } from '@shared/lib/store/authStore';
import { useModalStore } from '@shared/lib/store/modalStore';
import { toastService } from '@shared/lib/toasts/toastService';
import { Button } from '@shared/ui';

import css from './CardDetails.module.css';
import Reviews from '../Reviews/Reviews';

interface Props {
  detailsId: string;
  isExpanded: boolean;
  psychologist: PsychologistUI;
  onAppointmentOpen: () => void;
}

const CardDetails = ({
  detailsId,
  isExpanded,
  psychologist,
  onAppointmentOpen,
}: Props) => {
  const { t } = usePsychologistsTranslation();
  const { t: tAuth } = useAuthTranslation();
  const { t: tApp } = useAppointmentTranslation();
  const { user } = useAuthStore();
  const { openLogin } = useModalStore();

  const makeAppointment = () => {
    if (!user) {
      toastService.authRequired(openLogin, tAuth, tApp, true);
      return;
    }
    onAppointmentOpen();
  };

  return (
    <div
      id={detailsId}
      className={css.details}
      data-expanded={isExpanded}
      aria-hidden={!isExpanded}
      inert={!isExpanded}
    >
      <div className={css.inner}>
        <section className={css.section}>
          <h4 className="visually-hidden">{t('reviews')}</h4>
          <Reviews psychologist={psychologist} />
          <Button
            className={css.btnAppointment}
            type="button"
            disabled={!isExpanded}
            onClick={makeAppointment}
          >
            {t('makeAppointment')}
          </Button>
        </section>
      </div>
    </div>
  );
};

export default CardDetails;
