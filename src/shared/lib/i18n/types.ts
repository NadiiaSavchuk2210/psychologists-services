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
  heroTitlePrefix: string;
  heroTitleAccent: string;
  heroTitleSuffix: string;
  heroText: string;
  heroStatLabel: string;
  btnLinkGetStarted: string;
}

export interface IPsychologistsTranslations {
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
  loadMore: 'Load more';
  loadingMore: 'Loading...';
  emptyTitle: 'No psychologists found';
  emptyDescription: 'Try changing the filters or come back later';
}

export interface ILocales {
  common: ICommonTranslations;
  a11y: IA11yTranslations;
  auth: IAuthTranslations;
  validation: IValidationTranslations;
  navbar: INavbarTranslations;
  home: IHomeTranslations;
  psychologists: IPsychologistsTranslations;
}
