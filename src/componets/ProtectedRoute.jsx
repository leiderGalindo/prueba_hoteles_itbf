// import { Navigate, Outlet } from 'wouter'
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = ({ isAllowed, children }) => {
  if (!isAllowed) return <Navigate to="/" />

  return children ? children : <Outlet />
}

export default ProtectedRoute