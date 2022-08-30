import { Route, Routes } from 'react-router'
import Home from './routes/home/home.compon/home.component'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
    </Routes>
  )
}

export default App
 