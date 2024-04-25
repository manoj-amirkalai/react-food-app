import { useEffect, useState } from "react";
import axios from "axios";
import "./Users.css";
import { toast } from "react-toastify";

const Users = ({ url }) => {
  const [list, setList] = useState([]);
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/users`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Failed to load food list");
    }
  };
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="container">
      <h3>User's List</h3>
      <table>
        <tr>
          <th>Username</th>
          <th >Email Address</th>
        </tr>

        {list.map((user) => (
          <tr>
            <td>{user.name}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Users;
