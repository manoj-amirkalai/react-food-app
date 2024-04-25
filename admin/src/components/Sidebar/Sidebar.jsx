import "./Sidebar.css";
import { assets } from "../../assets/assets";
import {NavLink} from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        {" "}
        <NavLink  to="/" className="sidebar-option">
          <img src={assets.order_icon} alt="" width={25}/>
          <p>Orders</p>
        </NavLink>

       
        <NavLink  to="/list" className="sidebar-option">
          <img src={assets.list} alt="" width={25} />
          <p>List Items</p>
        </NavLink>{" "}
        <NavLink  to="/add" className="sidebar-option">
          <img src={assets.add_icon} alt=""width={25} />
          <p>Add Items</p>
        </NavLink> <NavLink  to="/users" className="sidebar-option">
          <img src={assets.profile_icon} alt="" width={20}/>
          <p>Users</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
