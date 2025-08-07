'use client';

import { logoutAction } from '@/server/logout';

export default function LogoutButton() {
  return <button onClick={() => logoutAction()}>Logout</button>;
}
