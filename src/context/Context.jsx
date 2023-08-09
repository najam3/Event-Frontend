/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { apis } from "../api/config";


        const initialState = {
          events: null,
          isLoggedIn: false,
          token: '',
          userData: [],
          isLoading: false
        }
  

        export const EventContext = createContext();

          const EventDataProvider = ({  children  }) => {
          const [event, setEvent] = useState(initialState.events);
          const [userData, setUserData] = useState(initialState.userData);
          const [isLoggedIn, setIsLoggedIn] = useState(initialState.isLoggedIn);
          const [selectedEvent, setSelectedEvent] = useState({});
          const [isLoading, setIsLoading] = useState(initialState.isLoading)
          const [LoggedInUser, setLoggedinUser] = useState({});
          const [updatedEvents, setUpdatedEvents] = useState();
          const [checkoutUsers, setCheckoutUsers] = useState([]);
          const [allevents, setAllEvents] = useState(null);
          const [loadingUserEvents, setLoadingUserEvents] = useState(false);  
          const token = localStorage.getItem('token');

            // Create a new event
           const createEvent = async () => {
            
            // Initial settings for the api
            const { email } = LoggedInUser;
            const url = apis.createEvent;
            const options = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({event, email: email})
            }
            // Proceed to the request if event is available else don't make request and return error
            if(event) {
              try {      
                    const request = await fetch(url, options);
                    const response = await request.json();
                    // const newItems = [...updatedEvents];
                    // setUpdatedEvents(newItems);
                    console.log(`Created new Event for User ${email}`, response);
                  
              }
                catch(error) {
                   console.log(`error:- ${error}`);
                   setIsLoading(false);
                  }
            }

            }
            
       
                

            // Post the event on home page
            const addToHome= async () => {
              const eventToSend = event;
              const options = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({obj:eventToSend})
              }

              if(event) {
                try {
                    const request = await fetch(apis.allEvents, options);
                    const response = await request.json();
                    console.log(response.message);
              
                  } catch (error) {
                  console.log(`error: ${error}`)
                }
              }
            }

            // Check whether user is logged in or not
            const isAuthenticated = async () => {
              setIsLoading(true);
              try{
                if(token) {
                  const request =  await fetch(apis.decode, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ token: token })
                  })
                  const response = await request.json();
                  // After the user logged in we decoded the token to get the payload..
                  const { payload } = response;
                 
                  if(payload) {
                    setIsLoggedIn(true);
                    setLoggedinUser(payload);
                    setIsLoading(false)
                  } 
                } else {
                  return;
                }
              } catch(error) {
                console.log(`${error}`)
                setIsLoading(false)
              } 
            }
          
            // Get the events and display on user dashboard
            const getEvents = async () => {
              setLoadingUserEvents(true)
              const { email } = LoggedInUser;
              
              const url = apis.getEvents;
              const options = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({email})
              }
          
              try {
          
                const request = await fetch(url, options);
                const response = await request.json();
                
                const newEvents = response.user.events;
          
                  setUpdatedEvents(newEvents);           
                 setLoadingUserEvents(false)
              } catch (error) {
                console.log(`error:- ${error}`)  
                setLoadingUserEvents(false)
              }
            }



            useEffect(() => {
                  getEvents()
            }, [event, LoggedInUser])

            useEffect(() => {
               addToHome();
               createEvent();
            
            }, [event])

            useEffect(() => {
              isAuthenticated()
            }, [token])


             return(
                <EventContext.Provider value={{ event, selectedEvent, setLoggedinUser, isLoading, loadingUserEvents, setUpdatedEvents, checkoutUsers, setCheckoutUsers, setSelectedEvent, isLoading, setIsLoading, allevents, setAllEvents, setEvent,  userData, setUserData, setIsLoggedIn, updatedEvents, isLoggedIn, LoggedInUser, getEvents } }>
                        {children}
                </EventContext.Provider>
              )
        };


export default EventDataProvider;