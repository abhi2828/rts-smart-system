import dynamic from 'next/dynamic';
import React from 'react';
const Inventory = dynamic(() => import('@/components/Inventory'), {
  ssr: false,
});

const InventoryPage = () => {
  return <Inventory />;
};

export default InventoryPage;
