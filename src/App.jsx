import { BrowserRouter, Route, Routes, } from "react-router";
import { useAuthStore } from './store/auth'
import ProtectedRoute from './componets/ProtectedRoute'
import Board from './pages/Board'
import Profile from './pages/Profile'
import Page404 from './pages/Page404'
import Login from './pages/Login'
import './App.css'

function App() {
  const token = useAuthStore(state => state.token)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          
          <Route element={ <ProtectedRoute isAllowed={(token !== '')} />}>
            <Route path="/board" element={<Board />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
