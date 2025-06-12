import { useEffect, useState } from "react";
import axios from "axios";
import {assets} from '../../assets/assets';

const Orders = () => {
  const [data, setData] = useState([]);
  const updateStatus = async (event,orderId) =>{
    const response = await axios.patch(`https://foodeeshub.up.railway.app/api/orders/update-status/${orderId}?status=${event.target.value}`);
    if(response.status===200){
      await fetchOrders();
    }
  }

  const fetchOrders = async () => {
    const response = await axios.get("https://foodeeshub.up.railway.app/api/orders/all");
    setData(response.data);
  };

  useEffect(() => {
      fetchOrders();
  }, []);

  return (
    <div className="container-fluid">
      <div className="py-2 row justify-content-center">
        <div className="col-12 card w-100">
          <table className="">
            <tbody>
              {data.map((order, index) => {
                return (
                  <tr key={index} className="d-flex justify-content-between align-items-center border-bottom flex-wrap py-4 gap-3">
                    <td><img src={assets.parcel} alt="" height={48} width={48} /></td>
                    <td className="col-8 col-md-6">
                      <div>
                        {order.orderedItems.map((item, index) => {
                        if (index === order.orderedItems.length - 1) {
                          return item.name + " x " + item.quantity;
                        } else {
                          return item.name + " x " + item.quantity + ", ";
                        }
                      })}
                      </div>
                      <div>{order.userAddress}</div>
                    </td>
                    <div className="d-flex w-md-100 gap-4 justify-content-between">
                      <td>&#x20B9;{order.amount.toFixed(2)}</td>
                      <td>Items: {order.orderedItems.length}</td>
                    </div>
                    <td>
                      <select className="form-control" onChange={(event)=>updateStatus(event,order.id)} value={order.orderStatus}>;
                        <option value="Food Preparing">Food Preparing</option>
                        <option value="Out for delivery">Out for delivery</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
