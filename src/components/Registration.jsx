import { useContext, useEffect, useRef, useState } from "react";
import {EventContext} from '../context/Context';
import { Link } from "react-router-dom";
import UseWindowResize from '../custom hooks/UseWindowResize';
import loader from '../assets/Rolling-1s-200px.svg';

const Registration = () => {
    const context = useContext(EventContext);
    const [responseMessage, setResponseMessage] = useState('');
    const [color, setColor] = useState('#000');
    const [nameMessage, setNameMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const ref = useRef(null);
    const nameRef = useRef(null);
    const { width } = UseWindowResize();
    const [user, setUser] = useState({
        name: '',
        password: '',
        email:'',
        eventsCreated: [],
        isLoggedIn: false, 
        eventsToAttend: []        // You haven't set up schema for this property...
    });

        const submitData = async (e) => {
            setIsLoading(true)
            e.preventDefault();
           
            const setData = context.setUserData;
            const { name, password, email } = user;
           
            if(name && password && email) {
                // Set the state on the front-end
                setData(prev => {
                    return [...prev, user]
                });
            } else{
                nameRef.current.value === '' ? setNameMessage('Please Enter Your Name') : setNameMessage('');
                return;
            }
         // Add to database
        const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
          }
    
        try {
          const data = await fetch('https://wild-red-smock.cyclic.app/register', options);
          const response = await data.json(); 
         setResponseMessage(response.message);
         setIsLoading(false);
         if(response.message === 'Email Address already in use') {
            setColor('red');
            return;
         }
      } catch (error) {
        console.log(`error: ${error}`);
        setIsLoading(false);
      }
            setUser({
                name: '',
                password: '',
                email:''
            })
        }


        useEffect(() => {
            if(color === 'red'){
                ref.current.focus();
            }
        }, [color])

        if(isLoading) {
            return(
                <div style={{ position: 'relative', height: '100vh' }}>
                <div style={{display:'flex', alignItems:'center', justifyContent:'center', top:0, left:0, position:'absolute', width:'100%', height:'100%'}}>
                  <img src={loader} width={'50px'} />
                </div>
                </div>
              )
        } else {
          return (
                <div className="registration-now" style={{paddingTop: '3em', paddingBottom:'3em'}}>
                    <div className={width <=800 ? 'small-container' : 'container'}>
                        {
                           responseMessage === 'User Signed up successfully' ? 
                            <>
                            <h1 style={{textAlign:'center'}}>{responseMessage}</h1>
                            <div style={{display:'flex', alignItems:'center', gap:'2em', justifyContent:'center', marginTop:'3em'}}>
                            <button><Link to={'/login'}>Login</Link></button> 
                            </div>
                            </>
                            :  <div className="registration-form">
                            <div style={{marginBottom: '2em'}}>
                             <h1 style={{marginBottom: '0.5em'}}>Register now and start posting events</h1>
                            </div>
                            <form style={{ margin: '1em 0' }}>
                            <div>
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" ref={ref} value={user.email} onChange={e => setUser({...user, email: e.target.value  })} />
                            <p style={{color:'red', marginBottom: '0.5em'}}>{responseMessage}</p>
                            </div>
                
                            <div>
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" ref={nameRef} id="name" value={user.name} onChange={e => setUser({...user, name: e.target.value})}/>
                            <p style={{color:'red', marginBottom: '0.5em'}}>{nameMessage}</p>
                            </div>
                
                            <div>
                            <label htmlFor="password">password</label>
                            <input type="password" value={user.password} name="password" id="password" onChange={e => setUser({...user, password: e.target.value})}/>
                            </div>
                
                            <button onClick={submitData} type="submit">Submit</button>
                            </form>
                            <div>
                            
                            <Link style={{textDecoration:'none', color:'green', fontWeight: 'bold'}}>I Already have an Account</Link>
                            </div>
                                </div> 
                    
                        }
                    </div>
                </div>)
        }

}

export default Registration;