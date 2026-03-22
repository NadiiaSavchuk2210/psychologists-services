import { motion } from 'framer-motion';
import css from './CardDetails.module.css';
import type { PsychologistUI } from '@entities/psychologist/model/types/psychologist';
import {
  useAppointmentTranslation,
  useAuthTranslation,
  usePsychologistsTranslation,
} from '@shared/hooks';
import Reviews from '@shared/ui/Reviews/Reviews';
import { Button } from '@shared/ui';
import { useAuthStore } from '@shared/lib/store/authStore';
import { toastService } from '@shared/lib/toasts/toastService';
import { useModalStore } from '@shared/lib/store/modalStore';

interface Props {
  isExpanded: boolean;
  psychologist: PsychologistUI;
  onAppointmentOpen: () => void;
}

const CardDetails = ({
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
    <motion.div
      layout
      initial={false}
      animate={{ height: isExpanded ? 'auto' : 0 }}
      className={css.details}
    >
      <section className={css.section}>
        <h4 className="visually-hidden">{t('reviews')}</h4>
        <Reviews psychologist={psychologist} />
        <Button
          className={css.btnAppointment}
          type="button"
          onClick={makeAppointment}
        >
          {t('makeAppointment')}
        </Button>
      </section>
    </motion.div>
  );
};

export default CardDetails;
