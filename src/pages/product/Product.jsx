import axios from 'axios'
import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createPro, getAllProduct } from '../../store/slices/product'

const Product = () => {
    const [name,setName] = useState('')
    const [price,setPrice] = useState('')
    const [des,setDes] = useState('')
    const [qnt,setQnt] = useState(1)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const ReducProduct = useSelector(getAllProduct)


    console.log(ReducProduct);
    const handleSubmit=(e)=>{
        e.preventDefault();
        let data = {
            name,
            price,
            des,
            qnt
        }

        axios.post(`http://localhost:5000/products`,data)
        .then((res)=>{
            console.log(res.data);
            dispatch(createPro(res.data));
            navigate('/')
        }).catch((error)=>{
            console.log(error);
        })
    }
  return (
    <div>
      <Container>
         <Row>
            <Col></Col>
            <Col>
               <form onSubmit={handleSubmit}>
                  <p>
                    <input type='text' placeholder='Enter Name' className='form-control' onChange={(e)=>setName(e.target.value)} />
                  </p>
                  <p>
                    <input type='number' placeholder='Enter Price' className='form-control' onChange={(e)=>setPrice(e.target.value)} />
                  </p>
                  <p>
                    <input type='text' placeholder='Enter DEs' className='form-control' onChange={(e)=>setDes(e.target.value)} />
                  </p>
                  <p>
                    <input type='text' disabled className='form-control' value={qnt} onChange={(e)=>setQnt(e.target.value)} />
                  </p>
                  <p>
                    <input type='submit' className='form-control' value="Add" />
                  </p>
               </form>
            </Col>
            <Col></Col>
         </Row>
      </Container>
    </div>
  )
}

export default Product
