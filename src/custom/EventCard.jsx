import { BiTimeFive } from 'react-icons/bi'
import { GoLocation } from 'react-icons/go'
import {MdDelete} from 'react-icons/md'
import {BiEditAlt} from 'react-icons/bi'

// eslint-disable-next-line react/prop-types
const EventCard = ({cardTitle, dateTime, category, cardText, location, handleDelete}) => {
    const title = {
        fontWeight: 'bold',
        marginBottom: '1em'
      }
    
      



      const description = {
        color: '#000',
        marginTop:'2em',
        fontSize:'0.9em'
      }
    
      const card = {
        border: '1px solid gray',
        borderRadius: '5px',
        maxWidth: '300px',
        padding: '1em 1em',
        marginTop:'2em',
        width: '500px'
      }
    
      const smallText = {
        fontSize: '14px'
      }

  return (
    <>
        <div className="card" style={card}>            
    <div className="title" style={title}>
      <h2>{cardTitle}</h2>
    </div>
    
    {/* <img src={cardImg} width={'100%'} height={'200px'}  alt={cardText} /> */}
    
    <div style={smallText} className="location">
      <p><GoLocation size={'16px'}/>    {location}</p>
    </div>
    
    <div style={smallText} className="date-time">
      <p><BiTimeFive size={'16px'}/> {dateTime}</p>
    </div>
    <div style={{marginTop:'1em'}}>
      <button style={{padding:'0.4em', fontSize:'12px'}}>{category}</button>
    </div>
    <div style={description}>
    <p>{cardText}</p>  
    </div>
</div>
    <div style={{display:'flex', justifyContent:'space-between', padding:'0.5em', alignItems:'center', width:'300px', background:'#000'}}>
    <button style={{ padding:'0.5em'}}><BiEditAlt color='#fff' size={20}/></button>
    <button onClick={handleDelete} style={{ padding:'0.5em'}}><MdDelete color='#fff' size={20}/></button>
    </div>
    </>
  )
}

export default EventCard