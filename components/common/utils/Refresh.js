'use client';
import { useEffect } from 'react';

const Refresh = (value) => {
  const time = (value != null) ? value : 5000;
  useEffect(() => {
    const intervalId = setInterval(() => {
      location.reload();
    }, time);

    return () => clearInterval(intervalId);
  }, []);
};

export default Refresh;