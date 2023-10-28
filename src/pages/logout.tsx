import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import { useEffect } from 'react';

const Logout = dynamic(() => import('@/components/Logout'), {
  ssr: false,
});

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    (async function () {
      await signOut();

      function deleteNextAuthCookies() {
        const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
          const parts = cookie.split('=');
          //@ts-ignore
          if (parts[0].trim().includes('next-auth')) {
            document.cookie =
              parts[0] + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
          }
        }
      }

      deleteNextAuthCookies();
      if (typeof localStorage !== undefined) {
        localStorage.removeItem('authToken');
      }
      if (typeof sessionStorage !== undefined) {
        sessionStorage.removeItem('i18nextLng');
      }

      router.push('/auth/login/');
    })();
  }, []);

  return <Logout />;
}
