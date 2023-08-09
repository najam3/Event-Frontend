        import {  Route, Routes } from 'react-router-dom';
        import CreateEvent from "../components/CreateEvent";
        import Event from '../components/Event';
        import Registration from '../components/Registration';
        import Login from '../components/Login';
        import PrivateRouting from '../components/PrivateRouting';
        import Home from '../components/Home';
        import EventPrivate from '../components/EventPrivate';
import EventDetails from '../components/EventDetails';

      const Routing = () => {
        return (
          <div>
            <Routes>
              <Route path='/' element={<Home />}/>
              <Route path="/register" index element={<Registration />} />
              <Route path='/login' element={<Login /> }/>
              <Route path='/details' element={<EventDetails /> }/>
              
              <Route element={<PrivateRouting />}>
              <Route path="/events" element={<Event />} />
              </Route>
              <Route element={<EventPrivate />}>
              <Route path='/create' element={<CreateEvent />}/>
              </Route>
            </Routes>
          </div>
        )
      }

      export default Routing;