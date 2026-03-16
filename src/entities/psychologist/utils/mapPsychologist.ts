import type {
  Lang,
  Psychologist,
  PsychologistDTO,
} from '../model/types/psychologist';

export const mapPsychologist = (
  dto: PsychologistDTO,
  lang: Lang
): Psychologist => {
  return {
    id: dto.id!,

    name: lang === 'ua' ? dto.name_ua : dto.name,
    specialization: lang === 'ua' ? dto.specialization_ua : dto.specialization,
    about: lang === 'ua' ? dto.about_ua : dto.about,

    experience:
      lang === 'ua' ? dto.experience.replace('years', 'років') : dto.experience,

    avatar_url: dto.avatar_url,
    price_per_hour: dto.price_per_hour,
    rating: dto.rating,
    license: dto.license,

    initial_consultation:
      lang === 'ua'
        ? dto.initial_consultation
            .replace('Free', 'Безкоштовна')
            .replace('-minute', '-хвилинна')
            .replace('initial consultation', 'первинна консультація')
        : dto.initial_consultation,

    reviews: dto.reviews.map(r => ({
      reviewer: lang === 'ua' ? r.reviewer_ua : r.reviewer,
      rating: r.rating,
      comment: r.comment[lang],
    })),
  };
};
