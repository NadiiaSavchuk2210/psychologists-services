import type { Lang } from '@shared/lib/i18n';
import type { Psychologist } from '../model/types/psychologist';

export const mapPsychologist = (dto: Psychologist, lang: Lang) => {
  return {
    ...dto,

    displayName: lang === 'ua' ? dto.name_ua : dto.name,
    displaySpecialization:
      lang === 'ua' ? dto.specialization_ua : dto.specialization,
    displayAbout: lang === 'ua' ? dto.about_ua : dto.about,

    displayExperience:
      lang === 'ua' ? dto.experience.replace('years', 'років') : dto.experience,

    displayInitialConsultation:
      lang === 'ua'
        ? dto.initial_consultation
            .replace('Free', 'Безкоштовна')
            .replace('-minute', '-хвилинна')
            .replace('initial consultation', 'первинна консультація')
        : dto.initial_consultation,

    displayReviews: dto.reviews.map(r => ({
      ...r,
      displayReviewer: lang === 'ua' ? r.reviewer_ua : r.reviewer,
      displayComment: lang === 'ua' ? r.comment_ua : r.comment,
    })),
  };
};
