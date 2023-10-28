import dynamic from 'next/dynamic';
import React from 'react';
const AppHome = dynamic(() => import('@/components/App'), {
  ssr: false,
});

const AppHomePage = () => {
  return <AppHome />;
};

export default AppHomePage;
