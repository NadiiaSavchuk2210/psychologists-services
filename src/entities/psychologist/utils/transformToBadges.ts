import type { Psychologist } from '../model/types/psychologist';
type TranslateFunc = (key: string, options?: object) => string;

export const transformToBadges = (doctor: Psychologist, t: TranslateFunc) => {
  const badgeConfigs = [
    { i18nKey: 'experience', value: doctor.experience },
    { i18nKey: 'license', value: doctor.license },
    { i18nKey: 'specialization', value: doctor.specialization },
    { i18nKey: 'initialConsultation', value: doctor.initial_consultation },
  ] as const;

  return badgeConfigs.map(({ i18nKey, value }) => ({
    id: i18nKey,
    text: t(i18nKey, {
      experience: value,
      license: value,
      specialization: value,
      consultation: value,
    }),
  }));
};
