import "./Orders.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assests/assets";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get("http://localhost:3500/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Error fetching orders");
      console.error("Error fetching orders:", error);
    }
  };

  const statusHandler = async(event , orderId) => {
    const response = await axios.post("http://localhost:3500/api/order/status",{
      orderId,
      status: event.target.value
    })
    if(response.data.success){
      await fetchAllOrders()
    }
  } 

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div className="order-item" key={index}>
            <img src={assets.parcel_icon} alt="Parcel Icon" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, itemIndex) => (
                  <span key={itemIndex}>
                    {item.name} x {item.quantity}
                    {itemIndex !== order.items.length - 1 && ", "}
                  </span>
                ))}
              </p>
              <p className="order-item-name">{order.address.firstname+ " " +order.address.lastname}</p>
              <div className="order-item-address">
                <p>{order.address.street+ ", "}</p>
                <p>{order.address.city+ ", "}</p>
                <p>{order.address.state+ ", " + order.address.country + ", "+order.address.zipcode}</p>
              </div>
              <p className="order-item-phone">
                {order.address.phone}
              </p>
              
            </div>
            <p>Items : {order.items.length}</p>
            <p>{order.amount}</p>
            <select onChange={(event) =>statusHandler(event, order._id) } value={order.status}>
              <option  value="Food Processing">Food Processing</option>
              <option value="Out For Delivary">Out For Delivary</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
