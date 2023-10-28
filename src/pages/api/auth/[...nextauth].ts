/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// @ts-nocheck

import type {
  CallbacksOptions,
  NextAuthOptions,
  PagesOptions,
} from 'next-auth';
import NextAuth from 'next-auth';
import type { AppProviders } from 'next-auth/providers';
import Credentials from 'next-auth/providers/credentials';

const providers: AppProviders = [
  Credentials({
    // The name to display on the sign in form (e.g. 'Sign in with...')
    name: 'Credentials',
    // The credentials is used to generate a suitable form on the sign in page.
    // You can specify whatever fields you are expecting to be submitted.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
      username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
      password: { label: 'Password', type: 'password' },
    },
    async authorize(credentials) {
      if (
        credentials.username === 'rtstest' &&
        credentials.password === '12345'
      ) {
        return {
          id: 1,
          username: 'Karthik',
        };
      }

      // Return null if user data could not be retrieved
      return null;
    },
  }),
];
const callbacks: Partial<CallbacksOptions> = {};

const pages: PagesOptions = {
  signIn: '/auth/login',
};

export const options: NextAuthOptions = {
  providers,
  callbacks,
  pages,
};

export default NextAuth(options);
