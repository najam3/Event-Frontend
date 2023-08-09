import  { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { EventContext } from '../context/Context';

const EventPrivate = () => {
    const context = useContext(EventContext);
    const isLoggedIn = context.isLoggedIn;
  return isLoggedIn ? <Outlet /> : <Navigate to={'/login'}/>
}

export default EventPrivate