import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteUser, getUsers } from '../../store/slices/user';
import { addToCart, decrement, deletePro, getAllProduct, getCartProduct, increment, removefromCart } from '../../store/slices/product';

const List = () => {
    const [datas,setDatas] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const ReduxData = useSelector(getUsers)
    const ReducProduct = useSelector(getAllProduct)
    const ReduxCartProduct = useSelector(getCartProduct)
 
    let TotalAmm = ReduxCartProduct.reduce((total,item)=>total + item.qnt * item.price,0);
    let TotalQnt = ReduxCartProduct.reduce((total,item)=>total + item.qnt,0);
    useEffect(()=>{
     getAllData()
    },[])

    let getAllData=()=>{
        axios.get('http://localhost:5000/users')
     .then((res)=>{
         console.log(res);
         setDatas(res.data)
     }).catch((error)=>{
         console.log(error);
     })
    }

let handleUpdate=(id)=>{
    console.log(id);
    navigate('/user',{state:{userId:id}})
}


let handleDelete=(id,type)=>{
    const confirmDelete = window.confirm("Are you sure you want to delete this?");
    if(confirmDelete){
     if(type === 'user'){
        dispatch(deleteUser(id))
        axios.delete('http://localhost:5000/users/'+id)
    .then((res)=>{
        console.log(res);
        getAllData()
    }).catch((error)=>{
        console.log(error);
    })
     }else{
        dispatch(deletePro(id))
     }
    }
}

let handleCart=(id)=>{
    dispatch(addToCart(id))
}

let handleInc=(id)=>{
    console.log(id);
    dispatch(increment(id));
}
let handleDec=(id)=>{
    console.log(id);
    dispatch(decrement(id))
}

let handleCartRemove=(id)=>{
    dispatch(removefromCart(id))
}
  return (
    <div>
    <h1 className='text-center'>User Table</h1>
      {
        ReduxData?.length > 0 ?
        (
            <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Action</th>
                
              </tr>
            </thead>
            <tbody>
             {ReduxData?.map((item,index)=>{
                return(
                    <tr key={index}>
                      <td>{index}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.mobile}</td>
                      <td>
                       <Button onClick={()=>handleUpdate(item.id)}>
                          Update
                       </Button>
                       <Button onClick={()=>handleDelete(item.id,'user')}>
                          Delete
                       </Button>
                      </td>
                      
                    </tr>
                )
             })}
            </tbody>
          </Table>
        )
        :
        <h1>No Record Found</h1>
      }


      <h1 className='text-center'>Product Table</h1>      
      {
        ReducProduct?.length > 0 ?
        (
            <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Pro_Name</th>
                <th>Pro_Price</th>
                <th>Pro_Des</th>
                <th>Pro_Quantity</th>
                <th>Action</th>
                <th>Add</th>
              </tr>
            </thead>
            <tbody>
             {ReducProduct?.map((item,index)=>{
                return(
                    <tr key={index}>
                      <td>{index}</td>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{item.des}</td>
                      <td>{item.qnt}</td>
                      <td>
                       <Button onClick={()=>handleUpdate(item.id)}>
                          Update
                       </Button>
                       <Button onClick={()=>handleDelete(item.id,"pro")}>
                          Delete
                       </Button>
                      </td>
                      <td>
                      <Button onClick={()=>handleCart(item)}>Cart</Button>
                   </td>
                    </tr>
                )
             })}
            </tbody>
          </Table>
        )
        :
        <h1>No Record Found</h1>
      }

      <h1 className='text-center'>Cart Table</h1>      
      {
        ReduxCartProduct?.length > 0 ?
        (
            <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Pro_Name</th>
                <th>Pro_Price</th>
                <th>Pro_Des</th>
                <th>Pro_Quantity</th>
                <th>Action</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
             {ReduxCartProduct?.map((item,index)=>{
                return(
                    <tr key={index}>
                      <td>{index}</td>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{item.des}</td>
                      <td>{item.qnt}</td>
                      <td>
                       <Button onClick={()=>handleInc(item.id)}>
                          +
                       </Button>
                       <Button onClick={()=>handleDec(item.id)}>
                          -
                       </Button>
                      </td>
                      <td>
                      <Button onClick={()=>handleCartRemove(item)}>Remove</Button>
                   </td>
                    </tr>
                )
             })}
            </tbody>
            <p>Total Ammount : {TotalAmm}</p>
            <p>Total Quantity : {TotalQnt}</p>
          </Table>
        )
        :
        <h1>No Record Found</h1>
      }

    </div>
  )
}

export default List
