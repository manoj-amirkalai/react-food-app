import Navbar from "./components/Navbar/Navbar"
import Sidebar from "./components/Sidebar/Sidebar"
import {Route, Routes} from 'react-router-dom'
import Add from "./pages/Add/Add"
import List from "./pages/List/List"
import Orders from "./pages/Orders/Orders"
import Users from "./pages/Users/Users"

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./components/Login/Login"


const App = () => {
  const code=sessionStorage.getItem("code")||false;


  
  const url = "https://manoj-food-app-backend.onrender.com";
  
  return (
    <div>{!code?<Login url={url} />:<>
      <ToastContainer />
      <Navbar/>
      <hr />
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route  path="/add" element={<Add url={url}/>} />
          <Route  path="/list" element={<List url={url}/>} />
          <Route  path="/users" element={<Users url={url}/>} />
          <Route  path="/orders" element={<Orders url={url}/>} />
        </Routes>
      </div></>}
    </div>
  )
}

export default App
