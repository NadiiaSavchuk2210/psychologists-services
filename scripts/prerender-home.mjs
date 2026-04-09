import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const cwd = path.resolve(scriptDir, '..');
const distDir = path.join(cwd, 'dist');
const ssrDir = path.join(cwd, 'dist-ssr');
const homeLocalePath = path.join(
  cwd,
  'src/shared/lib/i18n/locales/en/home.json'
);

const findFirstFile = async (dir, predicate) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      const nested = await findFirstFile(fullPath, predicate);

      if (nested) {
        return nested;
      }
    } else if (predicate(entry.name, fullPath)) {
      return fullPath;
    }
  }

  return null;
};

const escapeHtml = value =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

const readJson = async filePath => JSON.parse(await fs.readFile(filePath, 'utf8'));

const [ssrEntryPath, homeLocale, distIndexPath] = await Promise.all([
  findFirstFile(ssrDir, name => name === 'home-entry.js' || name === 'home-entry.mjs'),
  readJson(homeLocalePath),
  Promise.resolve(path.join(distDir, 'index.html')),
]);

if (!ssrEntryPath) {
  throw new Error('SSR entry file was not found in dist-ssr.');
}

const { renderHome } = await import(`file://${ssrEntryPath}`);
const assetsDir = path.join(distDir, 'assets');
const assetFiles = await fs.readdir(assetsDir);
const heroAvif1x = assetFiles.find(file => /^hero-psychologist-.+\.avif$/.test(file));
const heroAvif2x = assetFiles.find(file => /^hero-psychologist@2x-.+\.avif$/.test(file));
const heroAvifMobile = assetFiles.find(
  file => /^hero-psychologist@mobile-.+\.avif$/.test(file)
);
const heroWebp1x = assetFiles.find(
  file => /^hero-psychologist-(?!@2x).+\.webp$/.test(file)
);
const heroWebp2x = assetFiles.find(file => /^hero-psychologist@2x-.+\.webp$/.test(file));
const heroWebpMobile = assetFiles.find(
  file => /^hero-psychologist@mobile-.+\.webp$/.test(file)
);
const heroFontLatin600 = assetFiles.find(
  file => /^inter-latin-600-normal-.+\.woff2$/.test(file)
);
const prerenderedHtml = renderHome();
const heroImageSizes =
  '(min-width: 1158px) 580px, (min-width: 768px) 464px, (max-width: 319px) calc(100vw - 30px), 290px';

if ((!heroAvif1x && !heroWebp1x) || !heroWebp2x) {
  throw new Error('Hero image assets were not found in dist/assets.');
}

const preloadTag = heroAvif1x
  ? `<link rel="preload" as="image" href="/assets/${heroAvif1x}" imagesrcset="/assets/${heroAvif1x} 464w${heroAvifMobile ? `, /assets/${heroAvifMobile} 580w` : ''}${heroAvif2x ? `, /assets/${heroAvif2x} 928w` : ''}" imagesizes="${heroImageSizes}" type="image/avif" fetchpriority="high">`
  : `<link rel="preload" as="image" href="/assets/${heroWebp1x}" imagesrcset="/assets/${heroWebp1x} 464w${heroWebpMobile ? `, /assets/${heroWebpMobile} 580w` : ''}${heroWebp2x ? `, /assets/${heroWebp2x} 928w` : ''}" imagesizes="${heroImageSizes}" fetchpriority="high">`;
const heroFontPreloadTag = heroFontLatin600
  ? `<link rel="preload" href="/assets/${heroFontLatin600}" as="font" type="font/woff2" crossorigin>`
  : '';
const metaTags = [
  `<title>${escapeHtml(homeLocale.meta.title)}</title>`,
  `<meta name="description" content="${escapeHtml(homeLocale.meta.description)}">`,
  `<meta property="og:title" content="${escapeHtml(homeLocale.meta.ogTitle)}">`,
  `<meta property="og:description" content="${escapeHtml(homeLocale.meta.ogDescription)}">`,
  '<meta property="og:type" content="website">',
  '<meta property="og:locale" content="en_US">',
  '<meta property="og:url" content="https://psychologists-services-orpin.vercel.app/">',
  '<meta property="og:image" content="https://psychologists-services-orpin.vercel.app/psychologists-services-og.png">',
  '<meta name="twitter:card" content="summary_large_image">',
  `<meta name="twitter:title" content="${escapeHtml(homeLocale.meta.ogTitle)}">`,
  `<meta name="twitter:description" content="${escapeHtml(homeLocale.meta.ogDescription)}">`,
  '<meta name="twitter:image" content="https://psychologists-services-orpin.vercel.app/psychologists-services-og.png">',
  '<link rel="canonical" href="https://psychologists-services-orpin.vercel.app/">',
  preloadTag,
  heroFontPreloadTag,
].join('\n    ');

let html = await fs.readFile(distIndexPath, 'utf8');

html = html.replace(/<title>[\s\S]*?<\/title>\n?/g, '');

for (const tagPattern of [
  /<meta name="description"[^>]*>\n?/g,
  /<meta property="og:title"[^>]*>\n?/g,
  /<meta property="og:description"[^>]*>\n?/g,
  /<meta property="og:type"[^>]*>\n?/g,
  /<meta property="og:locale"[^>]*>\n?/g,
  /<meta property="og:url"[^>]*>\n?/g,
  /<meta property="og:image"[^>]*>\n?/g,
  /<meta name="twitter:card"[^>]*>\n?/g,
  /<meta name="twitter:title"[^>]*>\n?/g,
  /<meta name="twitter:description"[^>]*>\n?/g,
  /<meta name="twitter:image"[^>]*>\n?/g,
  /<link rel="canonical"[^>]*>\n?/g,
  /<link rel="preload" as="image"[^>]*>\n?/g,
  /<link rel="preload"[^>]*as="font"[^>]*>\n?/g,
]) {
  html = html.replace(tagPattern, '');
}

html = html.replace(
  '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
  '<meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    ' +
    metaTags
);
html = html.replace('<div id="root"></div>', `<div id="root">${prerenderedHtml}</div>`);

await fs.writeFile(distIndexPath, html);
await fs.rm(ssrDir, { recursive: true, force: true });
