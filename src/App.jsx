
import {Outlet } from 'react-router-dom'
import './App.css'
import ResponsiveAppBar from './ResponsiveAppBar'
import { Box } from '@mui/material'
function App() {

  return (
    <Box>
      <ResponsiveAppBar />
      <hr 
        position="sticky"
        style={{
          height: '2px',
          border: 'none',
          backgroundColor: '#6f0080ff'
        }}
      />
      <Outlet />
    </Box>
    
  )
}

export default App
