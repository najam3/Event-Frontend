import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EventContext } from "../context/Context";
// import Modal from "../custom/Modal";
// import loader from '../assets/Rolling-1s-200px.svg';
import { apis } from "../api/config";
import UseWindowResize from "../custom hooks/UseWindowResize";

const Login = () => {
    const navigate = useNavigate();
    const context= useContext(EventContext);
    const setIsLoggedIn = context.setIsLoggedIn;
    const { width } = UseWindowResize()
    // const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [emailMessage, setEmailMessage] = useState('');
    const [passMessage, setPassMessage] = useState('');
    // const [responeMsg, setResponseMsg] = useState('');
    const [loginUser, setLoginUser] = useState({
        email: '',
        password:''
    });
    const emailRef = useRef(null)


    const handleSubmit =  async (e) => {

        e.preventDefault();
        setIsLoading(true)
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
            loginUser.email === '' ? setEmailMessage('Enter a valid email address') :
            loginUser.password === '' ? setPassMessage('Please enter your password') : setPassMessage('')
             
            return;
        } else {
            setEmailMessage('')
            setPassMessage('')
        }
        
        try {
            const data = await fetch(apis.login, options);
            const response = await data.json();
            const {token} = response; 
           
            if(response.message && token !== undefined) {
                 navigate('/events');
                 localStorage.setItem('token', token);

                 setIsLoggedIn(true);
                 setIsLoading(false)
                // response.message === 'User not found' ? setResponseMsg(response.message) : ''
                // setShowModal(true);         
            }  else {
                return;
            }    
        } catch (error) {
            console.log(`error: ${error}`);
            setIsLoading(false)
        }


    };
   
    if(isLoading) {
        return(
            <div style={{ position: 'relative', height: '100vh' }}>
            <div style={{display:'flex', alignItems:'center', justifyContent:'center', top:0, left:0, position:'absolute', width:'100%', height:'100%'}}>
              {/* <img src={loader} width={'50px'} /> */}
                <p>Please wait while we log you in</p>
            </div>

            </div>

          )
    } 
    else {
        return (
        <>
        
          <div className="login-form">
                <div className={ width <=800 ? 'small-container' : 'container' }>
                <form onSubmit={handleSubmit} action="">
                    <p style={{marginBlock:'1em', fontSize:'1.5rem'}}>Please Login to Contiue</p>
                    <div>
                        <label htmlFor="">Email</label>
                        <input type="email" ref={emailRef} name="email" value={loginUser.email} onChange={(e) => 
                            setLoginUser({...loginUser, email:e.target.value})} id="email" />
                        <p style={{marginBottom: '0.5em', color:'red'}}>{emailMessage}</p>
                    </div>

                    <div>
                        <label htmlFor="">Password</label>
                        <input type="password" name="password" id="password" value={loginUser.password} onChange={(e) => setLoginUser({...loginUser, password:e.target.value})} />
                        <p style={{marginBottom: '0.5em', color:'red'}}>{passMessage}</p>
                    </div>
                    <button style={{marginTop:'1em'}}>Sign in</button>
                    <div style={{marginTop:'1em'}}>
                        <Link style={{textDecoration:'none', color:'#000'}} to={'/register'}>Dont have an Account ?</Link>
                    </div>
                </form>
                
                </div>
            </div>

        
        </>
        
            )

    }
            
        
        
        }

export default Login;