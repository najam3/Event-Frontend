import { useContext, useState } from 'react';
import '../css/Navigation.css';
import { Link, useNavigate } from 'react-router-dom'
import { EventContext } from '../context/Context';
import {CgProfile} from 'react-icons/cg';
import {RxHamburgerMenu} from 'react-icons/rx';
import {AiOutlineCloseCircle} from 'react-icons/ai';
import UseWindowResize from '../custom hooks/UseWindowResize';
import Avatar from '../custom/Avatar';
import loader from '../assets/Rolling-1s-200px.svg';
import { apis } from '../api/config';

const Navigation = () => {
    const [selected, setSelected] = useState(false);
    const [loginUser, setLoginUser] = useState({
        email: '',
        password:''
    });
        const { width } = UseWindowResize();
        const context = useContext(EventContext);
        const [isLoading, setIsLoading] = useState(false)
        const isLoggedIn = context.isLoggedIn;
        const setIsLoggedIn = context.setIsLoggedIn;
        const setLoggedinUser = context.setLoggedinUser;
        const navigate = useNavigate();
        const LoggedInUser = context.LoggedInUser;
        const [toggleNav, setToggleNav] = useState(false);
const handleSubmit =  async (e) => {
    setIsLoading(true)
    e.preventDefault();
    // Add to data base
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(loginUser)
    }
        const { email, password } = loginUser;
    if(!email || !password) {
        setIsLoading(false)
        return;
    } 
    
    try {
        const data = await fetch(apis.login, options);
        const response = await data.json();
        const {token} = response; 

        if(token !== undefined) {
             navigate('/events');
             localStorage.setItem('token', token);
             setIsLoggedIn(true);
             toggleForm();
            
             setIsLoading(false)
        }  else {
            setIsLoading(false)
            return;
        }    
    } catch (error) {
        console.log(`error: ${error}`);
        setIsLoading(false)
    }


};
        const logout = () => {
            localStorage.removeItem('token');
            setIsLoggedIn(false);
            navigate('/');
            setSelected(false)
            setLoggedinUser({});
        }

const toggleForm = () => {
    setSelected(!selected)
}


if(isLoading){
    return(
      <div style={{ position: 'relative', height: '100vh' }}>
      <div style={{display:'flex', alignItems:'center', justifyContent:'center', top:0, left:0, position:'absolute', width:'100%', height:'100%'}}>
        <img src={loader} width={'50px'} />
      </div>

      </div>

    )
  } 
    else {
        return (
              <header>
                  <div className={ width <= 800 ? "sm-nav-container" : 'nav-container'}>
                  <div className='logo-section'>
                      <div className="logo mb-only">
                          <span className="text">Manage Events</span>
                          <RxHamburgerMenu className='hamburger' color='#fff' onClick={() => setToggleNav(!toggleNav)} size={20}/>
                      </div>
                  </div>
                  <nav>
                      <ul className={toggleNav ? 'mb-nav' : ''}>
                          <li>
                              <Link style={{fontSize:'15px'}} to={'/'}>Home</Link>
                          </li>
                          <li>
                              <Link  style={{textDecoration:'none', fontSize:'15px', color:'#fff'}} to={'/create'}>Create Event</Link>
                          </li>
                          <li>
                              <Link style={{fontSize:'15px'}} to={'/Events'}>My Events</Link>
                          </li>
                         
                          {
                       isLoggedIn ? 
                  <li>
                  <Avatar 
                  event={toggleForm} 
                  user={LoggedInUser.name !== undefined ? LoggedInUser.name[0].toUpperCase() 
                  : ''}
                  />
                   </li>
                              : 
                              <CgProfile size={40} color='#fff'
                              style={{cursor:'pointer'}}
                              onClick={toggleForm}
                              />
                              
                          }
                      </ul>
                      {
                   selected && !isLoggedIn &&
                    <form onSubmit={handleSubmit} className='drop-down' id='form' style={{zIndex:1}}>
                      <div className='form-inner'>
                          <label htmlFor="email">Email</label>
                          <AiOutlineCloseCircle style={{cursor:'pointer'}} onClick={() => setSelected(false)}/>
                      </div>
                    <input type="email" name="email" value={loginUser.email} onChange={(e) => setLoginUser({...loginUser, email: e.target.value})} style={{padding:'0.2em 0'}} />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={loginUser.password} onChange={(e) => setLoginUser({...loginUser, password: e.target.value})} style={{padding:'0.2em 0'}} />
                    <Link style={{fontSize:'12px',textDecoration:'none',color:'#000',fontWeight:'bolder'}} to={'/register'}>Dont have an Account?</Link>
                   <button type='submit' style={{padding:'0.5em',marginTop:'1em'}}>Login</button>
                    </form>
              }
      
                          {
                              selected && isLoggedIn &&
                              
                              <form className='logged-form'>
                            <p>You are signed in as <br /><br /><span>{LoggedInUser !== undefined ? LoggedInUser.name : ''}</span></p>
                                    <p>{LoggedInUser!== undefined ? LoggedInUser.email : ''}</p>  
                              <span className='close-btn' onClick={() => setSelected(false)}><AiOutlineCloseCircle /></span>
                                  <br />
                              <button onClick={logout} >Logout</button>
                              </form>
                         }
      
                  </nav>
                       </div>
                    <div className='below-line'></div>
                 </header>
        )
    }

}

export default Navigation;