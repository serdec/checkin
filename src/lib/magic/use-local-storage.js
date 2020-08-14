import { useState } from 'react';

const configureLocalStorage = (key) => (initialValue) => {
  const [state, setState] = useState(() => {
    try {
      let value;
      if (typeof localStorage !== 'undefined') {
        value = localStorage.getItem(key);
      }
      return value ? JSON.parse(value) : initialValue;
    } catch (e) {
      console.log(e);
      return initialValue;
    }
  }, initialValue);

  const storeValue = (value) => {
    const valueToStore = typeof value === 'function' ? value(state) : value;

    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (err) {
      console.log(err);
      // This space intentionally left blank.
    }
    setState(valueToStore);
  };
  return [state, storeValue];
};

export { configureLocalStorage };
