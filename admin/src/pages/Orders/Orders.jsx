import { useEffect, useState } from "react";
import "./Orders.css";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../assets/assets";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      let order = response.data.data;
      setOrders([...order.reverse()]);
    } else {
      toast.error("Error");
    }
  };

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: event.target.value,
    });
    if (response.data.success) {
      await fetchAllOrders();
    }
  };


  const deleteOrder = async (order) => {
    const response = await axios.post(url + "/api/order/delete", {
      orderId: order._id,
    });
    if (response.data.success) {
      toast.info("order removed");
    } else toast.error("order not removed");

    await fetchAllOrders();
  };
  useEffect(() => {
    fetchAllOrders();
  }, []);
  return (
    <div className="order add">
      <h3>Order's List</h3>
      <div className="order-list">
        {!orders.length ? (
          <div className="verify">
            <div className="spinner"></div>
          </div>
        ) : (
          <>
            {orders.map((order, index) => (<>
               <p className="orderi"><span className="orderid">Order Id:</span>{order._id}</p>
              
              
              <div key={index} className="order-item">
              
                <img src={assets.parcel_icon} alt="" />
                <div>
                  <p className="order-item-food">
                    {order.items.map((item, index) => {
                      if (index === order.items.length - 1) {
                        return item.name + " x " + item.quantity;
                      } else {
                        return item.name + " x " + item.quantity + ", ";
                      }
                    })}
                  </p>
                  <p className="order-item-name">
                    {order.address.firstName + " " + order.address.lastName}
                  </p>{" "}
                  <p className="order-item-name">{order.address.email}</p>
                  <div className="order-item-address">
                    <p>{order.address.street}</p>
                    <p>
                      {order.address.city +
                        ", " +
                        order.address.state +
                        ", " +
                        order.address.country +
                        ", " +
                        order.address.zipcode}
                    </p>
                  </div>
                  <p className="order-item-phone">{order.address.phone}</p>
                </div>
                <p>Items : {order.items.length}</p>
                <p>
                  ${order.amount}
                  {order.payment ? (
                    <span className="paid">&#x2714; </span>
                  ) : (
                    <span onClick={() => deleteOrder(order)} className="notpaid">&#x2716;</span>
                  )}
                </p>
                <div className="time">
                  <select
                    onChange={(event) => statusHandler(event, order._id)}
                    value={order.status}
                  >
                    <option value="Food Processing">Food Processing</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                  <p>Date:{order.date.slice(0, 10)}</p>
                  <p>Time:{order.time} GMT</p>
                </div>
              </div>
          
              </>  ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Orders;
