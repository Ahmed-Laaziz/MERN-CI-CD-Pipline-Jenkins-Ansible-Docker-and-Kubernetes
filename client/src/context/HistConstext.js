// HistContext.js

import React, { createContext, useContext, useState } from 'react';

const HistContext = createContext();

export function HistProvider({ children }) {
  const [hist, setHist] = useState('');

  const updateHist = (newHist) => {
    setHist(newHist);
  };

  return (
    <HistContext.Provider value={{ hist, updateHist }}>
      {children}
    </HistContext.Provider>
  );
}

export function useHist() {
  return useContext(HistContext);
}
