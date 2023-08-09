

// eslint-disable-next-line react/prop-types
const Profile = ({events, name}) => {

    const profile = {
        borderRadius: '50%',
        width:'150px',
        height: '150px',
        boxShadow: '0 4px 15px 0 rgba(40,44,53,.09), 0 2px 2px 0 rgba(40,44,53,0.8)',
        display:'flex',
        alignItems: 'center',
        justifyContent:'center',
        fontSize: '52px',
        color:'#000'
    }

    const avatarStyles = {
        display:'flex',
        alignItems:'center',
        gap:'1em',
        flexWrap: 'wrap'
    }
    const infoStyles = {
        marginLeft:'0.5em'
    }

    const nameStyles = {
        fontSize:'20px',
        marginBottom:'0.5em'
    }

    const spans = {
        color: '#4b4d63',
        marginRight:'2em',
    }

 
    
  return (
    <div style={avatarStyles}>
            <div style={profile} className="profile">
                {name?.substring(0, 1).toUpperCase()}
            </div>
            <div style={infoStyles} className="profile-info">
            <div style={nameStyles} className="name">
                <h1>{name}</h1>
            </div>
                <span style={spans}>{ events } events</span>
                        
                
                {/* <span style={green}> {attending === 1 ? `Attending ${attending} event` : `Attending ${attending} events`}</span> */}
            </div>
    </div>
  )
}

export default Profile