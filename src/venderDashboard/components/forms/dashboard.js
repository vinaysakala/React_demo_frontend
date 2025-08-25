import Navbar from  '../Navbar'
import { Outlet } from 'react-router-dom'

const dashboard = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  )
}

export default dashboard
