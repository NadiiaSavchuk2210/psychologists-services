export type Lang = 'en' | 'ua';

export interface IMetaTranslations {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
}

export interface IFiltersTranslations {
  all: string;
  a_z: string;
  z_a: string;
  popular: string;
  not_popular: string;
  cheap: string;
  expensive: string;
  title: string;
}
export interface IAuthTranslations {
  login: string;
  logout: string;
  register: string;
  signup: string;

  loginTitle: string;
  loginDescription: string;
  loginEmailPlaceholder: string;
  loginPasswordPlaceholder: string;

  registerTitle: string;
  registerDescription: string;
  registerNamePlaceholder: string;
  registerEmailPlaceholder: string;
  registerPasswordPlaceholder: string;
  registerButton: string;

  toastAuthRequired: string;
  toastAuthAction: string;

  toastFavoriteAdded: string;
  toastFavoriteRemoved: string;
  toastFavoriteError: string;
}

export interface IValidationTranslations {
  fields: {
    name: string;
    email: string;
    password: string;
  };
  required: string;
  min: string;
  invalid_email: string;
}

export interface ICommonTranslations {
  loading: string;
  save: string;
  cancel: string;
  error: string;
  success: string;
  auth: {
    email_exists: string;
    weak_password: string;
    invalid_email: string;
    user_not_found: string;
    wrong_password: string;
    too_many_requests: string;
    network_error: string;
  };
  homeLink: string;
  openMenu: string;
  closeMenu: string;
}

export interface IA11yTranslations {
  favoriteAdd: string;
  favoriteRemove: string;
  modalClose: string;
  expand: string;
}

export interface INavbarTranslations {
  home: string;
  psychologists: string;
  favorites: string;
}

export interface IHomeTranslations {
  meta: IMetaTranslations;
  heroTitlePrefix: string;
  heroTitleAccent: string;
  heroTitleSuffix: string;
  heroText: string;
  heroStatLabel: string;
  btnLinkGetStarted: string;
}

export interface IPsychologistsTranslations {
  meta: IMetaTranslations;
  psychologist: string;
  rating: string;
  reviews: string;
  readMore: string;
  collapse: string;
  pricePerHour: string;
  noReviews: string;
  experience: string;
  license: string;
  specialization: string;
  initialConsultation: string;
  title: string;
  listTitle: string;
  makeAppointment: string;
  loadMore: string;
  loadingMore: string;
  emptyTitle: string;
  emptyDescription: string;
}

export interface IFavoritesTranslations {
  meta: IMetaTranslations;
  title: string;
  listTitle: string;
  ogTitle: string;
  ogDescription: string;
  emptyTitle: string;
  emptyDescription: string;
  loadMore: string;
  loadingMore: string;
}

export interface INotFoundTranslations {
  meta: IMetaTranslations;
  title: string;
  buttonGoHome: string;
  text: string;
}

export interface IErrorTranslations {
  meta: IMetaTranslations;
  title: string;
  text: string;
  buttonGoHome: string;
}

export interface IAppointmentTranslations {
  title: string;
  subtitle: string;
  yourPsychologist: string;
  fields: {
    name: string;
    email: string;
    phoneNumber: string;
    meetingTime: string;
    comment: string;
    submit: string;
    sending: string;
  };
  validation: {
    required: string;
    min: string;
    max: string;
    invalidEmail: string;
    invalidPhone: string;
    timeTaken: string;
  };
  toasts: {
    success: string;
    error: string;
    authRequired: string;
  };
}

export interface ILocales {
  common: ICommonTranslations;
  a11y: IA11yTranslations;
  auth: IAuthTranslations;
  validation: IValidationTranslations;
  navbar: INavbarTranslations;
  home: IHomeTranslations;
  psychologists: IPsychologistsTranslations;
  filters: IFiltersTranslations;
  favorites: IFavoritesTranslations;
  'not-found': INotFoundTranslations;
  error: IErrorTranslations;
  appointment: IAppointmentTranslations;
}
