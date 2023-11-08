import { type NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';

const pathsToIgnore = [
  '^/$', // home page
  'api',
  'public/assets/images',

  'auth',
  '/auth/login/',
  '/auth/login/?googleAuthentication=true',
  '/auth/signup/',
  'assets/.+',
  'home',
  '/home',
  '/app',
  '/eprocurement',
  '/cmms',
  '/inventory',
  '/hr_to_sap_b1'
];

const ignorePathsFromAuthGuard = new RegExp(pathsToIgnore.join('|'));

export const GuestGuardPaths = ['/auth/login/', '/auth/register/'];

export const GuestGuardPathsParamsIgnore = ['?googleAuthentication=true'];

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;

  // Check if the current path is in GuestGuardPaths

  if (
    GuestGuardPaths.includes(req.nextUrl.pathname) &&
    !GuestGuardPathsParamsIgnore.includes(req.nextUrl.search)
  ) {
    // I am on one of the GuestGuardPaths pages, now check if the user is authenticated or not
    if (isAuthenticated) {
      // If I get here, it means the user is on a GuestGuardPaths page and is authenticated. Redirect to whatever URL.
      return NextResponse.redirect(new URL('/eprocurement', req.url));
    }
  }

  const authMiddleware = await withAuth({
    callbacks: {
      authorized({ token: user }) {
        if (ignorePathsFromAuthGuard.test(req.nextUrl.pathname)) {
          return true;
        }
        return !!user;
      },
    },
  });

  // @ts-expect-error
  return authMiddleware(req);
}
