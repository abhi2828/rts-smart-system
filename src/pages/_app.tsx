/* eslint-disable import/no-extraneous-dependencies */
import '../styles/global.css';

import { createTheme, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import type { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
// eslint-disable-next-line import/no-extraneous-dependencies
import { appWithTranslation } from 'next-i18next';
// eslint-disable-next-line import/no-extraneous-dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nProgress from 'nprogress';
import {
  QueryClient as QueryClientMain,
  QueryClientProvider,
} from 'react-query';
import { Provider as ReduxProvider } from 'react-redux';

import { store } from '@/redux/store';

import { options as authOptions } from '../pages/api/auth/[...nextauth]';

// Font files can be colocated inside of `pages`

const queryClient = new QueryClientMain({
  defaultOptions: {
    queries: {
      cacheTime: 0,
    },
  },
});

const theme = createTheme({
  typography: {
    fontFamily: 'Figtree',
  },
  palette: {
    primary: {
      light: '#211061',
      main: '#211061',
      dark: '#211061',
      contrastText: '#FFFFFF',
    },
  },
});

nProgress.configure({ showSpinner: false });

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <ReduxProvider store={store}>
            <SessionProvider session={pageProps.session}>
              <Component {...pageProps} />
            </SessionProvider>
          </ReduxProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
};

export default appWithTranslation(MyApp);

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getServerSession(context.req, context.res, authOptions);

  return {
    props: {
      ...(await serverSideTranslations(context.locale as string, ['app'])),
      session,
    },
  };
};
