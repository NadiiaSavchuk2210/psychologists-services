export interface IAuthTranslations {
  login: string;
  logout: string;
  register: string;
}

export interface ICommonTranslations {
  loading: string;
  save: string;
  cancel: string;
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

export interface ILocales {
  auth: IAuthTranslations;
  common: ICommonTranslations;
  navbar: INavbarTranslations;
  home: IHomeTranslations;
}
