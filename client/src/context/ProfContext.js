// ProfContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ProfContext = createContext();
const backLink = process.env.REACT_APP_BACK_LINK;

export function ProfProvider({ children }) {
  const [prof, setProf] = useState('');
  const [hist, setHist] = useState('');

  const updateProf = (newProf) => {
    setProf(newProf);
  };

  const updateHist = (newHist) => {
    setHist(newHist);
  };

  return (
    <ProfContext.Provider value={{ prof, updateProf, hist, updateHist}}>
      {children}
    </ProfContext.Provider>
  );
}

export function useProf() {
  return useContext(ProfContext);
}
