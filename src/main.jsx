import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import { AuthContextProvider } from '../context/AuthContext.jsx'
import { SocketContextProvider } from '../context/SocketContext.jsx'

createRoot(document.getElementById('root')).render(
  
   <AuthContextProvider>
      <SocketContextProvider>
    <App />
      </SocketContextProvider>
   </AuthContextProvider>
)
