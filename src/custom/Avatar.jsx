// eslint-disable-next-line react/prop-types
const Avatar = ( { user, event } ) => {
 {
    /*   In case The component doesn't work as expected */
    /* <div 
                        style={{
                            borderRadius:'50%',
                            border:'1px solid #fff',
                            minWidth:'35px',
                            minHeight:'35px',
                            fontWeight:'bolder',
                            color:'#fff',
                            display:'flex',
                            alignItems:'center',
                            justifyContent:'center',
                            cursor:'pointer'
                        }}
                        id='profile'
                        onClick={() => setSelected(true)}
                        >
                           { LoggedInUser.name !== undefined ? LoggedInUser.name[0] : '' }
                        </div> */}
    const styles = {
        borderRadius:'50%',
        border:'1px solid #fff',
        width:'35px',
        height:'35px',
        fontWeight:'bolder',
        color:'#fff',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        cursor:'pointer'
    }

  return (
    <div id='profile' style={styles} onClick={event}>
        { user }
    </div>
  )
}

export default Avatar