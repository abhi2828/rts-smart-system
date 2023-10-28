'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const usePortalId = (): string => {
  const router = useRouter();
  const [portalId, setPortalId] = useState<string | undefined>(undefined);

  useEffect(() => {
    setPortalId(router.query.portalId as string);
  }, [router.isReady]);

  /* if (portalId && portalId?.length > 0) {
    return Number.parseInt(portalId);
  }

  return undefined; */

  return portalId as string;
};

export default usePortalId;
