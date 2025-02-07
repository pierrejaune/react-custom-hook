import React, { useEffect, useState } from 'react';
const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    const jsonValue = window.localStorage.getItem(key);
    if (jsonValue !== null && jsonValue !== undefined) {
      try {
        return JSON.parse(jsonValue);
      } catch (e) {
        console.error(`Error parsing localStorage key "${key}":`, e);
        return defaultValue;
      }
    }
    return defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [value, setValue]);

  return [value, setValue];
};

export default useLocalStorage;
