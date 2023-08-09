import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import EventDataProvider from './context/Context'

    

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <EventDataProvider>
        <App />
    </EventDataProvider>
  </React.StrictMode>
)
