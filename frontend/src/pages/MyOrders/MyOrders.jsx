import { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { assets } from '../../assets/assets'

import { toast } from "react-toastify";

const MyOrders = () => {
    const {url,token}=useContext(StoreContext)
    const [data,setData]=useState([])
    const fetchOrders=async()=>{
        const response=await axios.post(url+"/api/order/userorders",{},{headers:{token}})
        setData(response.data.data)
    }
    const deleteOrder=async(order)=>{
        const response=await axios.post(url+"/api/order/delete",{orderId:order._id})
       if(response.data.success){
        toast.info("order removed")
       }else(
        toast.error("order not removed")
       )
      
      await fetchOrders()
    }
    useEffect(()=>{
        if(token){
    fetchOrders()}
    },[token])
  return (
    <div className='my-orders'>
        <h2>My Orders</h2>
        <div className="container">
          {!data.length?  <div className="verify">
      <div className="spinner"></div>
    </div>:  <>
            {data.map((order,index)=>{
                return(
                    <div  key={index} className="my-orders-order">
                        <img src={assets.parcel_icon} alt="" />
                        <p>{order.items.map((item,index)=>{
                            if(index===order.items.length-1){
                                return item.name+" x "+item.quantity;
                            }else{
                                
                                return item.name+" x "+item.quantity+", ";
                            }
                        })}</p>
                        
                        <p>${order.amount}{order.payment? 
                        <span className="paid" >&#x2714; </span>
                        :
                        <span className="notpaid" onClick={()=>deleteOrder(order)} >&#x2716;</span>}</p>
                        <p>Items:{order.items.length}</p>
                        <p><span>&#x25cf;</span><b>{order.status}</b></p>
                        
            <p>{order.time} GMT</p>
            <p>{order.date.slice(0,10)}</p>
                        <button onClick={fetchOrders}>Track order</button>

                
            
                    </div>
                )

            })}</>}
        </div>
      
    </div>
  )
}

export default MyOrders
