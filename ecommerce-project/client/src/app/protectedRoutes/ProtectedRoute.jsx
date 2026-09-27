import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';



 const ProtectedRoute = () => {
      const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated)
        if(!isAuthenticated){
           return <Navigate to={"/login"} />
        }
       return <Outlet/>
  }

export default ProtectedRoute
