'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import type { Locale } from '@/lib/i18n';

export async function setLanguage(locale: Locale) {
  const cookieStore = await cookies();
  cookieStore.set('USER_LANGUAGE', locale, {
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: '/',
    httpOnly: false, // readable from client if needed
    sameSite: 'lax',
  });
  revalidatePath('/', 'layout');
}
