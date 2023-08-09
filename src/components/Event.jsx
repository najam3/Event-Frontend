import { useContext, useEffect, useState } from 'react';
import { EventContext } from '../context/Context';
import '../css/Event.css';
import loader from '../assets/Rolling-1s-200px.svg';
import Profile from '../custom/Profile';
import { AiFillDelete } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import UseWindowResize from '../custom hooks/UseWindowResize';

const Event = () => {
  const context = useContext(EventContext);
  const loggedInUser = context.LoggedInUser;
  const [isLoading, setIsLoading] = useState(false);
  // const [registeredUsers, setRegisteredUsers] = useState([])
  const isLoggedIn = context.isLoggedIn;
  const updatedEvents = context.updatedEvents;
  const setUpdatedEvents = context.setUpdatedEvents;
  const getEvents = context.getEvents;
  const event = context.event;
  const loadingUserEvents = context.loadingUserEvents
  const setIsLoggedIn = context.setIsLoggedIn;
  const  setLoggedinUser = context.setLoggedinUser;
  const navigate = useNavigate();
  const { width } = UseWindowResize();

   const deleteEvent = async (i) => {
    const { email } = loggedInUser;
    setIsLoading(true);
   if (updatedEvents) {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: email, event: updatedEvents[i] }),
      };

      try {
        const request = await fetch('https://wild-red-smock.cyclic.app/delete', options);
        const response = await request.json();
        console.log(response);

        // Update the state with the updatedEvents after deletion
        if (response) {
          updatedEvents.splice(i, 1); // Remove the deleted event from the array
          setUpdatedEvents(updatedEvents);
        }
      } catch (error) {
        console.log(`error: ${error}`);
      } finally {
        setIsLoading(false); // Reset the loading state, regardless of success or failure
      }
    }
  };


 const deleteAccount = async () => {
  setIsLoading(true)
  const { email } = loggedInUser;
  const api = 'https://wild-red-smock.cyclic.app/deleteaccount';
  const options = {
     method: 'POST',
     headers:{
      'Content-Type':'application/json'
     },
     body: JSON.stringify({user:email})
  }

    try {
      const req = await fetch(api, options);
      const res = await req.json();
      console.log(res)
      setIsLoading(false)
      navigate('/')
      setIsLoggedIn(false);
      localStorage.removeItem('token');
      setLoggedinUser({});
    } catch(error) {
      console.log(`error: ${error}`)
      setIsLoading(false);
    }
 }


      
  useEffect(() => {
    getEvents();
  }, [event])


if(isLoading || loadingUserEvents) {
  return(
    <div style={{ position: 'relative', height: '100vh' }}>
    <div style={{display:'flex', alignItems:'center', justifyContent:'center', top:0, left:0, position:'absolute', width:'100%', height:'100%'}}>
      <img src={loader} width={'50px'} />
    </div>
    </div>
  )
} else {
  return (
    <section style={{padding:'4em 0'}}>
      <div className={ width <=800 ? 'small-container' : 'container'  }>
    {isLoggedIn ? (
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap'}}>
            <Profile 
            email={ loggedInUser.email } 
            events={ updatedEvents? updatedEvents.length : 0 } 
            name={loggedInUser.name}/>

          <button onClick={deleteAccount} style={{marginTop:'0.5em'}} type='button'>Delete Account</button>
          </div>
        ) : (
          ''
        )}
    
      
          {
          
            updatedEvents && updatedEvents?.length > 0 ? (
              <div style={{width: '100%', overflow:'scroll'}}>
              <table>
              <thead>
                <tr>
                  <th>#NO</th>
                  <th>Event</th>
                  <th>Ticket</th>
                  {/* <th>Description</th> */}
                  <th>Time</th>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Delete</th>
                </tr>
      
              </thead>
      
                  <tbody>
      
              {updatedEvents?.map((event, i) => (
                  <>
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{event.name}</td>
                          <td>Rs.{event.ticket.price}</td>
                          {/* <td className='description'>{event.description}</td> */}
                          <td>{event.time}</td>
                          <td>{event.dateOfEvent}</td>
                          <td>{event.category}</td>
                          <td>
                            <button onClick={() => {
                              
                              deleteEvent(i)}} style={{cursor:'pointer', background:'transparent', padding:'0.3em', color:'#000'}}><AiFillDelete size={20} /></button>
                          </td>
                        </tr>
      
                  </>
                
              ))}
                      </tbody>
              </table>

              </div>
            )
              : (
            <p style={{marginTop:'2em', textAlign:'center'}}>No events found!</p>
          )}
          
        
      
      </div>
    </section>
  );
}
};

export default Event;
