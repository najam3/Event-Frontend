import { BrowserRouter } from 'react-router-dom'
import Routing from "./Router/Routing";
import Navigation from "./components/Navigation";
import Footer from './components/Footer';



function App() {
  return (
      <>
    <BrowserRouter>
      <Navigation />
        <Routing />
        <Footer/>
    </BrowserRouter>
      </>
  );
}

export default App;
