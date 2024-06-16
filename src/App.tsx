import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Header } from './components/header/header'
import { MainPage } from './pages/mainPage/mainPage'
import { FavoritePage } from './pages/favoritesPage/favoritesPage'
import { NotFoundPage } from './pages/notFoundPage/notFoundPage'
import { useEffect } from 'react'
import { useAppDispatch } from './types/hooks'
import { getMovies } from './services/actions/movies'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getMovies())
  }, [])

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
