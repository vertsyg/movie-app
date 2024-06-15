import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Header } from './components/header/header'
import { MainPage } from './pages/mainPage/mainPage'
import { FavoritePage } from './pages/favoritesPage/favoritesPage'
import { NotFoundPage } from './pages/notFoundPage/notFoundPage'

function App() {

  return (
    <div className="container">
      <Header/>
      <main>
        <Routes>
          <Route path='/' element={<MainPage/>}/>
          <Route path='/favorites' element={<FavoritePage/>}/>
          <Route path='*' element={<NotFoundPage/>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
