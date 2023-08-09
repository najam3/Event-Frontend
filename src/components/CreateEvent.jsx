import { useContext, useState } from "react"
import { EventContext } from '../context/Context';
import '../css/AddEvent.css';
import UseWindowResize from "../custom hooks/UseWindowResize";



const CreateEvent = () => {
    const { width } = UseWindowResize();
    const context = useContext(EventContext); 
    const createdBy = context.LoggedInUser;
    const { email } = createdBy;
    
    const [event, setEvent] = useState({
      created_by: email? email : 'Email Not Found',
      name: '',
      dateOfEvent: '',
      description: '',
      category: 'Corporate Events',
      location: '',
      ticket: { price: 0 },   // Add in schema
      time: "",
      created_by_user: createdBy.name,
      interested: 0
    });

      
   
    const addNewEvent = async (e) => {
        e.preventDefault();
        let setData = context.setEvent;
      
        setData(event);
          setEvent({
          name: '',
          dateOfEvent: '',
          description: '',
          category: 'Corporate Events',
          time:'',
          location:'',
          ticket: { price: 0 },
          interested: 0,
          
        })
    }

    

    return (
        <div style={{backgroundColor: '#f3f3f3', padding: '4em 0'}}>
          <div style={{width: '100%'}}>
         <form action="" style={{minWidth:'100%'}} onSubmit={addNewEvent}>
        <div className={ width <=800 ? 'small-container' : 'container' }>
          <div style={{borderRadius:'10px', boxShadow:'4px 14px 14px gray'}} className="content">
            <h1>PUBLISH YOUR EVENT</h1>
            <label htmlFor="event-name">Event Name</label>
            <div>
              <input required type="text" placeholder="Give your event a title" name="event-name" id="event-name" value={event.name} onChange={(e) => setEvent({...event, name: e.target.value})}/>
            </div>
            <label htmlFor="date">Date of event</label>
            <div>
            <input required type="date"  name="date" id="date" value={event.dateOfEvent} onChange={(e) => setEvent({...event,dateOfEvent: e.target.value})}/>
            </div>
            
            <label htmlFor="time">Time</label>
            <div>
            <input required type="time" name="time" id="time" value={event.time} onChange={(e) => setEvent({...event, time: e.target.value })} />
            </div>
              <label htmlFor="location">Location</label>
              <div>
                <input required type="text" placeholder="Enter the location" name="locataion" id="location" value={event.location} onChange={(e) =>  setEvent({...event, location:e.target.value})}/>
              </div>
            <label htmlFor="description">Description</label>
            <div style={{margin:'1em 0'}}>
              <textarea style={{padding:'1em', width:'100%'}} name="description" required placeholder="Please Enter What is the Event About.." id="description"  value={event.description} onChange={(e) => setEvent({...event, description: e.target.value})} rows="10"></textarea>

            </div>

          

            <div className="event-ticketing">
              <span>
                <label htmlFor="price">Enter Ticket Price</label>
                <input required  type="number" name="price" id="price" value={event.ticket.price} onChange={(e) => setEvent({...event, ticket: { price: e.target.value }})} />
              </span>
            </div>

            <label htmlFor="Category">Category</label>
            <div>
              <select
                name="Category"
                id="categories" 
                onChange={(e) => setEvent({...event, category: e.target.value})}
                style={{
                  width: '200px',
                  height:'36px',
                  fontSize: '16px',
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  backgroundColor: '#fff',
                  color: '#333',
                  margin: '1em 0'
                }}
                >
                
                <option defaultValue={'Corporate Events'}>Corporate Events</option>
                <option value="Social Events">Social Events</option>
                <option value="Educational Events">Educational Events</option>
                <option value="Cultural Events">Cultural Events</option>                                  
                <option value="Sports Events">Sports Events</option>                                  
                <option value="Community Events">Community Events</option>                                  
                <option value="Business Events">Business Events</option>                                  
              </select>
            </div>
            <button type="submit">Create Event</button>
            </div> 
            
        </div>
        </form>
          </div>        
        </div>
      )
};

export default CreateEvent;