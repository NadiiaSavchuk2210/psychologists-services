import { useEffect } from 'react';

type MetaParams = {
  t: (key: string) => string;
  i18n: { language: string };
  titleKey?: string;
  descriptionKey?: string;
  ogTitleKey?: string;
  ogDescriptionKey?: string;
  ogImage?: string;
  ogUrl?: string;
  canonicalUrl?: string;
  ogType?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  twitterImage?: string;
};

export const useMetaTags = ({
  t,
  i18n,
  titleKey = 'meta.title',
  descriptionKey = 'meta.description',
  ogTitleKey = 'meta.ogTitle',
  ogDescriptionKey = 'meta.ogDescription',
  ogImage,
  ogUrl,
  canonicalUrl,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  twitterImage,
}: MetaParams) => {
  useEffect(() => {
    const title = t(titleKey);
    const description = t(descriptionKey);
    const ogTitle = t(ogTitleKey);
    const ogDescription = t(ogDescriptionKey);

    document.title = title;

    const setMetaTag = (
      attr: 'name' | 'property',
      key: string,
      content?: string
    ) => {
      if (!content) return;
      let el = document.querySelector<HTMLMetaElement>(
        `meta[${attr}="${key}"]`
      );
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const setLinkTag = (rel: string, href?: string) => {
      if (!href) return;
      let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    setMetaTag('name', 'description', description);

    setMetaTag('property', 'og:title', ogTitle);
    setMetaTag('property', 'og:description', ogDescription);
    setMetaTag('property', 'og:image', ogImage);
    setMetaTag('property', 'og:url', ogUrl);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag(
      'property',
      'og:locale',
      i18n.language === 'uk' ? 'uk_UA' : 'en_US'
    );

    setMetaTag('name', 'twitter:card', twitterCard);
    setMetaTag('name', 'twitter:title', ogTitle);
    setMetaTag('name', 'twitter:description', ogDescription);
    setMetaTag('name', 'twitter:image', twitterImage || ogImage);

    setLinkTag('canonical', canonicalUrl || ogUrl);
  }, [
    t,
    i18n.language,
    titleKey,
    descriptionKey,
    ogTitleKey,
    ogDescriptionKey,
    ogImage,
    ogUrl,
    canonicalUrl,
    ogType,
    twitterCard,
    twitterImage,
  ]);
};
