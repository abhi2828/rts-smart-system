import Head from 'next/head';
import React, { useEffect } from 'react';

import Footer from '@/components/Footer';
import Header from '@/components/Header';

const Home = () => {
  useEffect(() => {
    window.location.href = '/auth/login';
  }, []);

  return (
    <>
      <Head>
        <title>RTS</title>
        <meta
          name='description'
          content='HubSpot Payment integration to receive payments in HubSpot CRM'
          key='desc'
        />
      </Head>
      <section className='tw-h-[100%] tw-w-fit md:tw-w-[100%]'>
        <section className='tw-bg-purpleLight2'>
          <Header />
          <span>Hello</span>
        </section>

        <Footer />
      </section>
    </>
  );
};
export default Home;
