        import { useContext, useEffect, useState } from "react";
        import { EventContext } from "../context/Context";
        import '../css/Home.css';
        import { MdCorporateFare, MdOutlineNightlife, MdOutlineSportsTennis } from 'react-icons/md';
        import { CgCommunity } from 'react-icons/cg' 
        import { LiaBusinessTimeSolid } from 'react-icons/lia';
        import UseWindowResize from "../custom hooks/UseWindowResize";
        import { useNavigate } from "react-router-dom";
        import Card from "../custom/Card";
        import loader from '../assets/Rolling-1s-200px.svg';
        import Users from "../custom/Users";
        import 'react-responsive-carousel/lib/styles/carousel.min.css'
        import { apis } from "../api/config";


        const Home = () => {
          const context = useContext(EventContext);
          const [isLoading, setIsLoading] = useState(false);
          const [myEvent, setMyEvent] = useState([]);
          const [allUsers, setAllUsers] = useState([]);
          const [userIsAttending, setUserIsAttending] = useState([]);
          const [selectedCategory, setSelectedCategory] = useState('');
          const { width } = UseWindowResize();
          const event = context.event;
          const navigate = useNavigate();
          const setSelectedEvent = context.setSelectedEvent;
          const isLoggedIn = context.isLoggedIn;
          const LoggedInUser = context.LoggedInUser;
          const setCheckoutUsers = context.setCheckoutUsers;
          const checkoutUsers = context.checkoutUsers;

          const getAllEvents = async () => {
            setIsLoading(true)
            try {
              const request = await fetch(apis.newsfeed);
              const response = await request.json();
              const { data } = response;
            
              if(data) {
                data.map((event) => {
                  const { created_on } = event;
                  const utcFormat = new Date().toISOString();  
                  const datePosted = new Date(created_on);
                  const currentDate = new Date(utcFormat);
                  
                  const timeDiff = currentDate - datePosted;
  
                  const timeElapsedInMinutes = Math.floor(timeDiff / (1000 * 60));
                  const timeElapsedInHours = Math.floor(timeDiff / (1000 * 60 * 60));
                  const timeElapsedInSeconds = Math.floor(timeDiff / 1000);
                  const timeElapsedInDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
             
  
                      if(timeElapsedInSeconds < 60) {
                         event.passedTime = `posted few seconds ago`
                      } else if(timeElapsedInSeconds > 60 && timeElapsedInSeconds <= 3600) {
                          event.passedTime = `${timeElapsedInMinutes} minutes ago`
                     } else if( timeElapsedInMinutes > 60 && timeElapsedInMinutes < 1440 ) {
                      event.passedTime = `${timeElapsedInHours === 1 ? `${timeElapsedInHours} hour ago` :  `${timeElapsedInHours} hours ago`}`
                    } else if( timeElapsedInHours >= 24 ) {
                      event.passedTime = `${timeElapsedInDays === 1 ? `${timeElapsedInDays} day` : `${timeElapsedInDays} days`} ago`
                    }
                 })  
               
                 setMyEvent(data);
              }
                setIsLoading(false)
              } catch (error) {
                console.log(error);
                setIsLoading(false);
            }   finally {
                setIsLoading(false)
            }
            }
           
            const getUsersDataToFindAttending = async () => {
              const api = apis.users
              
              const response = await fetch(api);
              const usersData = await response.json();
              setAllUsers(usersData)
              setCheckoutUsers(usersData)
              
              localStorage.setItem('usersData', JSON.stringify(usersData));
          }
           
            const matchUsers = () => {
              const loggedInEmail = LoggedInUser.email;
              const checkoutUsers = JSON.parse(localStorage.getItem('usersData'));
              
              const user = checkoutUsers?.filter(myUser => {
              return  myUser.email === loggedInEmail      
              })
              
              const newsFeedUsers = myEvent.filter(user => {
                return user.created_by !== loggedInEmail
              })

                user?.map(({attending} )=> {
                   attending.map(events => {
                     for(const newsfeed of newsFeedUsers) {
                         events.name === newsfeed.name ? 
                         setUserIsAttending((prev) => {
                           return [...prev, newsfeed.name]
                         })

                          : ''
                     }
                   })
                    
                })
            
            };
        
    
            const getTheChosenEvent = (i) => {
              setSelectedEvent(myEvent[i])
              const eventToSave = JSON.stringify(myEvent[i]);
              localStorage.setItem('event', eventToSave);
              navigate('/details')
            }


        const categorySelected = (e) => {
          setSelectedCategory(e.target.className);
        }
       
   
      
     
      useEffect(() => {
     isLoggedIn ? matchUsers() : ''
      }, [myEvent])   
        
        useEffect(() => {
          getAllEvents()
          
        }, [event])
  
        useEffect(() => {
          getUsersDataToFindAttending()
        }, [])

          if(isLoading){
            return(
              <div style={{ position: 'relative', height: '100vh' }}>
              <div style={{display:'flex', alignItems:'center', justifyContent:'center', top:0, left:0, position:'absolute', width:'100%', height:'100%'}}>
                <img src={loader} width={'50px'} />
              </div>

              </div>

            )
          } else {
            return (
              <div>
                <div className="my-banner" style={{ height:'100vh'}}>
                        <div className={ width <=800 ? 'small-container' : 'container' }>
                        <div className="content-wrapper">
                        <div className="my-content">
                        <p className="small">Got something to plan?</p>
                        <h1>Discover Create & Share Your Events!</h1>
                        <p className="headline">Embrace the spotlight, because your next event is about to steal the show!</p>
                        <button onClick={() => navigate('/register')}>Register now</button>
                       </div>
                    </div>
                      </div>
                </div>

            <section style={{padding: '4em 0'}}>
              <div className={ width <= 800 ? 'small-container' : 'container'}>
              <h1 style={{marginBottom:'1em'}}>Check out trending categories</h1>
                   <div className="card">
                       <div className="row">
                         <div onClick={(e) => categorySelected(e)} className="Corporate Events">
                         <MdCorporateFare size={20}/> &nbsp; &nbsp; &nbsp; &nbsp; Corporate 
                         </div>
                         <div onClick={(e) => categorySelected(e)} className="Social Events">
                         <MdOutlineNightlife size={20}/> &nbsp; &nbsp; &nbsp; &nbsp; Social 
                         </div>
                         <div onClick={(e) => categorySelected(e)} className="Educational Events">
                         <MdCorporateFare size={20}/> &nbsp; &nbsp; &nbsp; &nbsp; Educational 
                         </div>
                    </div>

                    <div className="row">
                       <div onClick={(e) => categorySelected(e)} className="Sports Events">
                         <MdOutlineSportsTennis size={20}/> &nbsp; &nbsp; &nbsp; &nbsp; Sports 
                       </div>

                       <div className="Community Events">
                         <CgCommunity onClick={(e) => categorySelected(e)} size={20}/> &nbsp; &nbsp; &nbsp; &nbsp; Community 
                       </div>

                       <div className="Business Events">
                         <LiaBusinessTimeSolid onClick={(e) => categorySelected(e)} size={20}/> &nbsp; &nbsp; &nbsp; &nbsp; Business 
                       </div>
                        <div onClick={(e) => categorySelected(e)} className="">
                            All
                        </div>
                     </div>
                    </div>
                  
                  <div className="newsfeed">     
                    <div className="flex-container">                        
                      {
                          myEvent
                          .filter(event => !selectedCategory || event.category === selectedCategory)
                          .map((event, i) => (
                            <>
                              <Card 
                               cardTitle={event.name} 
                              dateTime={event.date}
                              location={event.location}
                              time={event.time}
                              category={event.category}
                              attending={
                              isLoggedIn && userIsAttending.length > 0 &&
                                 (userIsAttending.includes(event.name) ? 'Attending' : '')
                              }
                             
                              username={event.created_by_user}
                              price={event.ticket.price}
                              postedAgo={event.passedTime}
                              handleClick={() => getTheChosenEvent(i)}
                              />
{/* 
                            <EventsCard
                           attendingIt={
                            userIsAttending.length > 0 &&
                            (userIsAttending.includes(event.name) ? 'Attending' : '')
                          }
                            handleClick={() => getTheChosenEvent(i)}
                            title={event.name} 
                            date={event.date} 
                            description = {event.description} 
                            category={event.category}                         
                            time={event.time}
                            postedAgo={event.passedTime}
                            postedBy={event.created_by}
                            />            */}
                            </>  
                            ))
                      }
                    </div>
                 </div>

                    


                      <hr />
                 
                  <div className="users">
                 
                        <Users users={checkoutUsers} />
                 
                  </div>
              </div>
            </section>
              </div>
            )
          }
          }

export default Home;