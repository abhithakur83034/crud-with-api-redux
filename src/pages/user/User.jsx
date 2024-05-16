import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { createUser, getUsers, updateUser } from '../../store/slices/user';

const User = () => {
    const {register,handleSubmit,formState:{errors},setValue}= useForm();
   const navigate = useNavigate();
    const [datas,setDatas] = useState([]);
    const location = useLocation();
    const id = location?.state?.userId;
    console.log(id);
    const dispatch = useDispatch();
    const ReduxData = useSelector(getUsers)
    console.log(ReduxData);

   useEffect(()=>{
    getAllData();
if(id){
    getSingleData();
}
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


   let getSingleData=()=>{
    axios.get('http://localhost:5000/users/'+id)
    .then((res)=>{
        console.log(res);
        setValue('name',res.data.name)
        setValue('email',res.data.email)
        setValue('mobile',res.data.mobile)
    }).catch((error)=>{
        console.log(error);
    })
   }


    let onSubmit=(data)=>{
        console.log(data);
        if(id){
            data.id = id;
            dispatch(updateUser(data))
            axios.put(`http://localhost:5000/users/${id}`,data)
            .then((res)=>{
                console.log(res);
                navigate('/')
            }).catch((error)=>{
                console.log(error);
            })
        }else{
            let filter = datas.filter((item)=>item.email === data.email);
        console.log(filter);
        if(filter.length > 0){
            alert("Already Registered")
        }else{
            axios.post('http://localhost:5000/users',data)
            .then((res)=>{
                console.log(res);
                dispatch(createUser(res.data))
                navigate('/')
            }).catch((error)=>{
                console.log(error);
            })
        }
        }
    }
  return (
    <div>
    <h1 className='text-center'>{id?"Update":"Create"} Your Data</h1>
      <Container>
        <Row>
           <Col></Col>
           <Col>
              <form onSubmit={handleSubmit(onSubmit)}>
              <p>
              <input type='text' placeholder='Enter Name' className='form-control' {...register('name',{required:true})} /> 
              {errors.name && <p>Name is required</p>}
          </p>
          <p>
              <input type='email' placeholder='Enter Email' className='form-control' {...register('email',{required:true})} /> 
              {errors.email && <p>Email is required</p>}

              </p>
          <p>
              <input type='number' placeholder='Enter mobile' className='form-control' {...register('mobile',{required:true})} /> 
              {errors.mobile && <p>Mobile is required</p>}

              </p>
          {
            id ?
            ""
            :
            <p>
              <input type='password' placeholder='Enter password' className='form-control' {...register('password',{required:true})} /> 
              {errors.password && <p>Password is required</p>}

              </p>
          }
          <p>
           <input type='submit' className='form-control' value={id?"Update":"Create"} />
          </p>
              </form>
               </Col>
           <Col></Col>
        </Row>
      </Container>
    </div>
  )
}

export default User
