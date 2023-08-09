import { useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { Link } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const Form = ({ handleSubmit, toggleForm }) => {


    //             <form 
                    //     style={{
                    //     position: 'absolute',
                    //     background:'#fff',
                    //     width:'200px', 
                    //     right:0, 
                    //     marginRight:'8em',
                    //     border:'1px solid #ccc',
                    //     padding: '0.5em 0.5em',
                    //     boxShadow:'4px 4px 4px #ccc',
                
                    //     }} 
                    //     onSubmit={handleSubmit}
                    //     className='drop-down'
                    //     id='form'
                       
                    //     >
                        
                    //     <div style={{
                    //         display:'flex',
                    //         justifyContent:'space-between',
                    //         alignItems:'center'
                    //     }}>

                    //     <label htmlFor="email">Email</label>
                    //     <AiOutlineCloseCircle
                    //     style={{cursor:'pointer'}}
                    //     onClick={() => setSelected(false)}/>
                    //     </div>

                    //     <input
                    //      type="email" 
                    //      name="email"
                    //      value={loginUser.email}
                    //      onChange={(e) => setLoginUser({...loginUser, email: e.target.value})}
                    //      style={{
                    //         padding:'0.2em 0'
                    //      }} 
                    //       />
                    //     <label htmlFor="password">Password</label>
                    //     <input
                    //      type="password" 
                    //      name="password"
                    //      value={loginUser.password}
                    //      onChange={(e) => setLoginUser({...loginUser, password: e.target.value})}
                    //      style={{
                    //         padding:'0.2em 0'
                    //      }} 
                    //       />
                    //     <Link  
                    //     style={{
                    //         fontSize:'10px',
                    //          textDecoration:'none',
                    //           color:'#000', 
                    //           fontWeight:'bolder'
                    //           }} 
                    //           to={'/register'}>
                    //             Dont have an Account?
                    //    </Link>
                    //     <button
                    //     type='submit'
                    //     style={{
                    //         padding:'0.5em',
                    //         marginTop:'1em'
                    //     }}
                        
                    //     >Login</button>
                    //     </form>

    const [loginUser, setLoginUser] = useState({
        email: '',
        password:''
    });

    const handleEmail = (e) => {
        setLoginUser({...loginUser, email: e.target.value})
    }

    const handlePassword = (e) => {
        setLoginUser({...loginUser, password: e.target.value})
    }

    const formStyles = {
        position: 'absolute',
        background:'#fff',
        width:'200px', 
        right:0, 
        marginRight:'8em',
        border:'1px solid #ccc',
        padding: '0.5em 0.5em',
        boxShadow:'4px 4px 4px #ccc',
        zIndex: 1
    }

    const emailLabel = {
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center'
    }

  return (
    <form 
    style={formStyles} 
    onSubmit={handleSubmit}
    className='drop-down'
    id='form'
    >

    <div style={emailLabel}>   
    <label htmlFor="email">Email</label>
    <AiOutlineCloseCircle style={{cursor:'pointer'}} onClick={toggleForm}/>
    </div>

  <input type="email" name="email" value={loginUser.email} onChange={(e) => handleEmail(e)}
     style={{
        padding:'0.2em 0'
     }} 
      />
    <label htmlFor="password">Password</label>
    <input
     type="password" 
     name="password"
     value={loginUser.password}
     onChange={(e) => handlePassword(e)}
     style={{
        padding:'0.2em 0'
     }} 
      />
    <Link  
    style={{
        fontSize:'10px',
         textDecoration:'none',
          color:'#000', 
          fontWeight:'bolder'
          }} 
          to={'/register'}>
            Dont have an Account?
   </Link>
    <button
    type='submit'
    style={{
        padding:'0.5em',
        marginTop:'1em'
    }}
    
    >Login</button>
    </form>
  )
}

export default Form