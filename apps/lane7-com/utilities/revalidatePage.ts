'use server';

import config from '@payload-config';
import { revalidatePath } from 'next/cache';
import { getPayload } from 'payload';

export async function revalidatePage({ slug, locale }: { slug: string; locale: string }) {
  try {
    if (!slug) {
      console.warn('⚠️ No slug found for revalidation');
      return { success: false, error: 'No slug found' };
    }

    const payload = await getPayload({ config });

    payload.logger.info(`🚀 Server Action revalidation triggered for: ${slug}`);

    revalidatePath(`/${locale}/${slug}`, 'page');

    payload.logger.info(`🎉 Server Action revalidation completed for: ${slug}`);

    return { success: true };
  } catch (error: unknown) {
    console.error('❌ Server Action revalidation failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
