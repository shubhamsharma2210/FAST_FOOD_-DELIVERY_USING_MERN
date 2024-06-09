import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = () => {
  const [list, setList] = useState([]);
  const url = "http://localhost:3500";
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    // console.log(response.data)
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error ");
    }
  };
  useEffect(() => {
    fetchList();
  }, []);
  const removeFood = async(foodid) => {
    const response =await axios.post(`${url}/api/food/remove`,{id: foodid})
    await fetchList();
    if (response.data.success){
      toast.success("Food removed successfully")
    }else{
      toast.error("error")
    }
  }
  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {
          list.map((item,index) => {
            return (
              <div key={index} className="list-table-format title">
                <img src={`${url}/images/`+ item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{item.price}</p>
                <p onClick={() => removeFood(item._id)} className="cursor">X</p>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default List;
