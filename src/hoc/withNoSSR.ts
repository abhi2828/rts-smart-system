import dynamic from 'next/dynamic';
import type React from 'react';

const withNoSSR = (Component: React.FunctionComponent) =>
  dynamic(() => Promise.resolve(Component), { ssr: false });

export default withNoSSR;
