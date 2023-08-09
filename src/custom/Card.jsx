import {GoLocation} from 'react-icons/go';
import {BiTimeFive} from 'react-icons/bi';
import {CgProfile} from 'react-icons/cg';
import {CgCalendarNext} from 'react-icons/cg'
import '../css/Card.css'
// eslint-disable-next-line react/prop-types
const Card = ({  username,  cardTitle, category, location, dateTime, time, attending, postedAgo,  handleClick, price }) => {

  const customTime = time.substring(0, 2);
  

  const title = {
    fontWeight: 'bold',
    marginBottom: '1em',
    fontSize:'16px'
  }



  return (
    <div onClick={handleClick} style={{position:'relative', width:'max-content'}}>
        <div id='attending'>
        {attending}
      </div>

        <div id='card'>
            
            <div className="title" style={title}>
              <h2>{cardTitle.substring(0, 30)}</h2>
            </div>
                
            <div id="location">
             <GoLocation size={'40px'}/>
              <p>{location}</p>
            </div>
            
            <div className="date-time" style={{fontSize:'12px'}}>
             <BiTimeFive size={'20px'}/> 
              <p> {time} {customTime > 12 ? '' : 'PM'} </p>
            </div>
              
              <div style={{display:'flex', alignItems:'center', gap:'1em', marginTop:'0.5em', fontSize:'12px'}}>
                <CgCalendarNext size={20}/>
              <p>{ new Date(dateTime).toDateString() }  </p>
              </div>
              
            <div style={{marginTop:'1em'}}>
              <button style={{padding:'0.4em', fontSize:'12px'}}>{category}</button>
            </div>
           
            <div id='price'>

              <p>Starting at Rs.{price}</p>
            </div>
          
            
            <div id='lower-card'>
            <div style={{display:'flex',alignItems:'center',gap:'0.5em'}}>
                <CgProfile color='lightblue' size={20}/> 
                 <p style={{fontSize:'14px'}}>{username}</p> 
            </div>
                   <p>{postedAgo}</p>
                </div>
       
          
        </div>
    </div>
  )
}

export default Card