import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import store from './redux/index.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <App />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              fontWeight: 'bold',
              fontFamily: 'sans-serif'
            }
          }}
        />
      </Router>
    </React.StrictMode>
  </Provider>
)
