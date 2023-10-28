import React, { useEffect } from 'react';

export default function Logout() {
  useEffect(() => {
    window.localStorage.removeItem('authToken');
  }, []);

  return <div title={`Logging out! Please wait!`} />;
}
