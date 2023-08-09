import '../css/Users.css'





// eslint-disable-next-line react/prop-types
const Users = ({users}) => {

// eslint-disable-next-line react/prop-types
// const myUsers = JSON.parse(localStorage.getItem('usersData'));

  return (
    <>
    
    {
            // eslint-disable-next-line react/prop-types
            users?.map(user => (

                <>
                <div id="card">
                    <div className="avatar">
                            <h2>{user.name.substring(0, 1).toUpperCase()}</h2>
                    </div>
                        <div className="user-info">
                        <h2>{user.name}</h2>
                        <p id="small">100 Followers</p>
                        </div>
                
                        <button id='btn-follow'>Follow</button>
                
                    
                </div>
                </>
            ))
    }
    
    
    </>



        
  )
}

export default Users