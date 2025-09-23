'use client';

import { useSession, signIn as nextSignIn, signOut as nextSignOut } from 'next-auth/react';

// Named + default export so both import styles work.
export function useAuth() {
  const { data, status } = useSession();
  return {
    user: data?.user || null,
    loading: status === 'loading',
    signIn: () => nextSignIn('google'),
    signOut: () => nextSignOut(),
  };
}

export default useAuth;
