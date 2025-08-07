'use server';

import config from '@payload-config';
import { logout } from '@payloadcms/next/auth';

export async function logoutAction() {
  try {
    return await logout({ allSessions: true, config });
  } catch (error) {
    throw new Error(`Logout failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
