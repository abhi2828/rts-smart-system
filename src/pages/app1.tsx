import dynamic from 'next/dynamic';
import React from 'react';
const LoginPage = dynamic(() => import('@/components/App1'), {
  ssr: false,
});

const Login = () => {
  return <LoginPage />;
};

export default Login;
