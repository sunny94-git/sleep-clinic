// Note: Next.js 16 deprecated middleware in favor of "proxy".
// For now, admin route protection is handled at the page/API level.
// Each admin page checks the session client-side, 
// and each admin API route checks auth server-side.

export { auth as middleware } from '@/lib/auth';

export const config = {
  matcher: ['/admin/((?!login).*)'],
};
