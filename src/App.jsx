import React from 'react';
import Home from './components/Paginas/Home';
import './App.css'
import { useState } from 'react';
import { createContext } from 'react';

export const temaContexto = createContext(null)


function App() {
  const [tema, setTema] = useState('claro');
  return (
    <>
      <temaContexto.Provider value={{ tema, setTema }}>
        <Home />
      </temaContexto.Provider>
    </>
  )
}

export default App
