import type { Lang } from '@shared/lib/i18n';

import type { Psychologist } from '../model/types/psychologist';

export const mapPsychologist = (dto: Psychologist, lang: Lang) => {
  return {
    ...dto,

    displayName: lang === 'uk' ? dto.name_ua : dto.name,
    displaySpecialization:
      lang === 'uk' ? dto.specialization_ua : dto.specialization,
    displayAbout: lang === 'uk' ? dto.about_ua : dto.about,

    displayExperience:
      lang === 'uk' ? dto.experience.replace('years', 'років') : dto.experience,

    displayInitialConsultation:
      lang === 'uk'
        ? dto.initial_consultation
            .replace('Free', 'Безкоштовна')
            .replace('-minute', '-хвилинна')
            .replace('initial consultation', 'первинна консультація')
        : dto.initial_consultation,

    displayReviews: dto.reviews.map(r => ({
      ...r,
      displayReviewer: lang === 'uk' ? r.reviewer_ua : r.reviewer,
      displayComment: lang === 'uk' ? r.comment_ua : r.comment,
    })),
  };
};
