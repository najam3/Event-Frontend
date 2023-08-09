import '../css/Footer.css'
import UseWindowResize from '../custom hooks/UseWindowResize'

const Footer = () => {
  const { width } = UseWindowResize();

  return (
    <footer className="dark-footer">
        <div className={ width <=800 ? 'small-container' : 'container' }>
        <div className="footer-content">
           
            <nav className="footer-links">
                <li>
                <a href="#">Home</a>

                </li>
                <li>
                <a href="#">Events</a>

                </li>
                <li>
                <a href="#">Create Event</a>

                </li>
            </nav>
            
            <p>Contact: dummyemail@gmail.com</p>
            <p>&copy; 2023 ManageEvents. All rights reserved.</p>
        </div>

        </div>
    </footer>
 

  )
}

export default Footer