import { cookies, headers } from 'next/headers';

export type Locale = 'es' | 'en' | 'fr';
export const defaultLocale: Locale = 'es';
export const supportedLocales: Locale[] = ['es', 'en', 'fr'];

// Lazy dictionary loaders — add a new locale here to support it
const dictionaries: Record<string, () => Promise<object>> = {
  es: () => import('@/dictionaries/es.json').then((m) => m.default),
  en: () => import('@/dictionaries/en.json').then((m) => m.default),
  fr: () => import('@/dictionaries/fr.json').then((m) => m.default),
};

export async function getCurrentLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const lang = cookieStore.get('USER_LANGUAGE')?.value as Locale | undefined;
  if (lang && (supportedLocales as string[]).includes(lang)) {
    return lang;
  }
  
  try {
    const headersList = await headers();
    const acceptLanguage = headersList.get('accept-language');
    
    if (acceptLanguage) {
      const preferredLocales = acceptLanguage
        .split(',')
        .map((langItem) => langItem.split(';')[0].trim().substring(0, 2).toLowerCase());
        
      for (const locale of preferredLocales) {
        if ((supportedLocales as string[]).includes(locale)) {
          return locale as Locale;
        }
      }
    }
  } catch (error) {
    // headers() might throw in some static generation contexts
    console.error('Error reading accept-language header:', error);
  }

  return defaultLocale;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getDictionary(locale?: Locale): Promise<any> {
  const activeLocale = locale ?? (await getCurrentLocale());
  const loader = dictionaries[activeLocale] ?? dictionaries[defaultLocale];
  return loader();
}
