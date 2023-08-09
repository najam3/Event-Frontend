import React, { useContext, useEffect, useState } from "react"
// import {AiOutlinePlus, AiOutlineMinus} from 'react-icons/ai';
import {CiLocationOn, CiCalendarDate} from 'react-icons/ci';
import '../css/details.css';
import { EventContext } from "../context/Context";
import Checkout from "./Checkout";
import UseWindowResize from "../custom hooks/UseWindowResize";

const EventDetails = () => {
    const context = useContext(EventContext);
    const clickedEvent = context.selectedEvent;
    const [details, setDetails] = useState({});
    const [showCheckout, setShowCheckout] = useState(false);
    const loggedInUser = context.LoggedInUser;
    const { width } = UseWindowResize();
    const cancel = () => {
        setShowCheckout(false)
        
    }
    
      


        useEffect(() => {
            const data = localStorage.getItem('event');
            const eventDetails = JSON.parse(data);
            setDetails(eventDetails);
        }, [clickedEvent])

  return (

    <React.Fragment>

            <section className="details">
            
             <div className={ width <=800 ? 'small-container' : 'container' }>
                <div className="inner-wrapper">
                    <div className="first-col">
                    <h1>{new Date(details.date).toDateString()}</h1>
                    <h1 className="title">{details.name}</h1>
                   <h1 className="when-where">When and Where</h1>
                    <div className="flexy-container">
                        <div className="location">
                            <div className="icon">
                            <CiCalendarDate size={60}/>
                            </div>
                            <div >
                            <h3>Date</h3>
                            <p className="inner">{ new Date(details.date).toDateString() }</p>
                            </div>
                        </div>
                        
                        <div className="date-time">
                            <div className="icon">
                            <CiLocationOn size={50}/>
                            </div>
                            <div>
                            <h3>Location</h3>
                            <p className="inner">{details.location}</p>
                            </div>
                        </div>
                    </div>

                        <div className="about-event">
                            <h1>About this Event</h1>
                            <p>{clickedEvent.description}</p>
                        </div>
                    </div>
                
                <div className="ticketing">
                    <h2>Ticketing</h2>  
                <button onClick={() => {
                localStorage.setItem('event', JSON.stringify(details))
                    clickedEvent.created_by !== loggedInUser.email ? 
                    setShowCheckout(true) : alert('You cannot attend your own event')
                }       
            }  className="book-btn">GET TICKETS</button>
                </div>
                </div>
            </div>

            </section>
        
        {
            showCheckout ? 
            <Checkout hide={() => setShowCheckout(false)} cancel={cancel}/>
            : ''
        }



    </React.Fragment>
  )
}

export default EventDetails