import { BrowserRouter, Route, Routes, } from "react-router";
import { useAuthStore } from './store/auth'
import { Toaster } from 'sonner'
import ProtectedRoute from './componets/ProtectedRoute'
import Board from './pages/Board'
import DetailHotel from './pages/DetailHotel'
import Page404 from './pages/Page404'
import Login from './pages/Login'
import './App.css'

function App() {
  const { token, validateSession } = useAuthStore() 
  validateSession()
  
  return (
    <>
      <Toaster richColors closeButton />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          
          <Route element={ <ProtectedRoute isAllowed={(token !== '')} />}>
            <Route path="/hotels" element={<Board />} />
            <Route path="/hotels/:slug" element={<DetailHotel />} />
          </Route>

          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
