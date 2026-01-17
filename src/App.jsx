import { BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'

function App() {
  return (
    <BrowserRouter basename="/life-counter">
      <Home />
    </BrowserRouter>
  )
}

export default App
