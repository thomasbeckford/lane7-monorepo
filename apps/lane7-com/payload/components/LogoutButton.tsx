'use client';
import { logoutAction } from '@/payload/actions/logout';

export default function LogoutButton() {
  return <button onClick={() => logoutAction()}>Logout</button>;
}
