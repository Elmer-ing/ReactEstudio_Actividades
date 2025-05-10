import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import TMDBComponent from './components/10-mayo/TMDBComponent'
// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TMDBComponent />
    </>
  )
}

export default App
