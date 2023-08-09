import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';


// eslint-disable-next-line react/prop-types
const EventsCard = ({ time, title, description, date, postedAgo, handleClick, postedBy,attendingIt }) => {
    const today = DateTime.now().toFormat('yyyy LLL dd');
    const X = DateTime.fromISO(date).toFormat('yyyy LLL dd');


  return (
    <div onClick={handleClick} style={{
        display:'flex',
        alignItems:'center',
        gap:'1em',
        boxShadow:'4px 4px 4px #ccc',
        background: '#eee',
        padding:'1em',
        marginBottom: '1.5em',
        borderRadius:'4px'
    }}>
            <div
            style={{
                background:'#ccc',
                padding:'1em',
                textAlign:'center',
                borderRadius:'4px'
            }}
            className="time">
                <h5 style={{color:'#000', fontWeight:'lighter'}}>
                { today === X ? 'TODAY' : DateTime.fromFormat(X, 'yyyy LLL dd').toFormat('dd LLLL') }
                </h5>
                <h3>{attendingIt}</h3>
                    <h2 style={{
                        marginTop:'0.5em'
                    }}>
                    { time }
                    </h2> 
            </div>

            <div className="s" style={{
                alignSelf:'flex-start'
            }}>
                <h2 style={{
                    marginBottom:'0.3em'
                }}>{title}</h2>
            
                <small>{description.substring(0, 100)}<Link style={{textDecoration:'none', color:'#ccef8'}}>...Read more</Link> </small>
                
            </div>

                <div style={{
                    marginLeft:'2em',
                    alignSelf:'flex-end'
                }} className="action">
                 <small>{postedAgo}</small>   
                 <small>{postedBy}</small>   
                <button>Interested</button>
                </div>
    </div>
  )
}

export default EventsCard