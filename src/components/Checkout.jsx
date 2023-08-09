import   { useContext, useEffect, useState } from "react"
import { EventContext } from "../context/Context";
import findOurEven from '../assets/find-our-events.webp';
import { AiOutlineClose } from 'react-icons/ai';
import { apis } from "../api/config";

// eslint-disable-next-line react/prop-types
const Checkout = ({hide}) => {
    const context = useContext(EventContext);
    const clickedEvent = context.selectedEvent;
    const [detailsOfEvent, setDetailsOfEvent] = useState({});
    let [amountOfTickets, setAmountOfTickets] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [response, showResponse] = useState("");
    const LoggedInUser = context.LoggedInUser;
    const setCheckoutUsers = context.setCheckoutUsers;

    const getUsersDataToFindAttending = async () => {
        const api = apis.users
   
        const response = await fetch(api);
        const usersData = await response.json();
        setCheckoutUsers(usersData.users)
        localStorage.setItem('usersData', JSON.stringify(usersData));
    }

    

    const callApi = async () => {
    setIsLoading(true)
     const { email } = LoggedInUser;
   
    //  setTicketInformation({...ticketInformation,  emailOfUser:email? email : 'Email Not found', eventToAttend:clickedEvent})
     const api = apis.ticket

     const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, clickedEvent})
     }

     try {
        const response =  await fetch(api, options);
        const data = await response.json();
   
        showResponse(data);
        setIsLoading(false)
     } catch (error) {
        console.log(`error: ${error}`)
        setIsLoading(false);
     }
    }

    useEffect(() => {
        const events = localStorage.getItem('event');
        const details = JSON.parse(events);
        setDetailsOfEvent(details)
    }, [])

    
    useEffect(() => {
        getUsersDataToFindAttending();
    }, [response])


  return (
    
    <div className="modal-bg">
     <section className="modal">
          
          {
            !response?
            <div className="inner-d">
                <AiOutlineClose onClick={hide} style={{position:'absolute', right:'2%', marginTop:'1em', color:'#fff'}}/>
                <article className="article-1">
                    <div className="container-small">
                    <div className="event_checked">
                    <h2 className="checkout-title">{clickedEvent.name}</h2>
                    <p className="inner">{clickedEvent.date}</p> 
                </div>
                    <hr />

                    <h1>Tickets</h1>
                <div className="add-to-checkout">
                    <div className="flex-ticketing">
                        <p className="inner-ticketing">Enter how many tickets you want to buy?</p>
                        <div style={{display:'flex', gap:'1em'}}>
                                <button onClick={() => setAmountOfTickets(amountOfTickets += 1)}>+</button>
                                    <h2>{amountOfTickets}</h2>
                                <button onClick={() => setAmountOfTickets(amountOfTickets < 1 ? amountOfTickets : amountOfTickets-=1)}>-</button>
                        </div>
                    </div>
                
                </div>
                    </div>
                </article>

                <article className="article-2">
                    <img src={findOurEven} alt="" />
                <div className="checkout">
                    <h4>Order Summary</h4>
                    <div className="flex-btw">
                    <p className="inner">Price</p>
                    <p className="inner">Rs.{clickedEvent.ticket.price? clickedEvent.ticket.price: 'null'}</p>
                    </div>
                    <hr />
                    <div className="flex-btw"> 
                    <p className="inner">Delivery</p>
                    <p className="inner">Rs.50</p>
                    </div>
                    <hr />
                    <div className="flex-btw">
                        <h3>Total</h3>
                        <h3>Rs.{clickedEvent.ticket.price * amountOfTickets}</h3>
                    </div>
                    <div>
                  <button style={{width:'100%', marginTop:'1em'}} onClick={callApi}>Checkout</button>
                    </div>
                </div>
                </article>

            </div>
            : isLoading ? 
            <p>...loading</p> :
            <h1>{response.message}</h1>
          }
          
    </section>

    </div>
  )
}

export default Checkout