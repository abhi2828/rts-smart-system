'use client';

import type { ReactNode } from 'react';
import React from 'react';

type AppLayoutProps = {
  children: ReactNode;
};

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return <>{children}</>;
};

export default AppLayout;
