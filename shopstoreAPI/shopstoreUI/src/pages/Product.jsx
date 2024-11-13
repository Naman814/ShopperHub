import React, { useEffect } from 'react';
import styled from 'styled-components';
import Advertisement from '../components/Advertisement';
import Navbar from '../components/Navbar';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Bulletin from '../components/Bulletin';
import Footer from '../components/Footer';
import {mobile} from '../responsive';
import { useLocation } from 'react-router';
import CurrencyRupee from '@mui/icons-material/CurrencyRupee';
import { publicRequest } from '../requestMethod';
import { useState } from 'react';
import { addProduct } from '../redux/cartRedux';
import { useDispatch } from 'react-redux';

 
 const Container = styled.div`
    display:flex;
    margin:2rem;
    align-items:center;
    justify-content:center;
    ${mobile({flexDirection:"column"})};
 `

 const Wrapper = styled.div`
    display:flex;
    margin: 3rem 0rem;
 `

 const Img = styled.img`
    flex:1;
    height:700px;
    width:300px;
    ${mobile({height:"600px" , width:"200px"})};
 `

 const Info = styled.div`
    flex:1;
    margin: 0 2rem;
    padding : 3rem;
`

 const Title = styled.h1``

 const Desc = styled.div`
  margin : 2rem 0rem;
  letter-spacing : 1px;
  font-size:20px;
  ${mobile({fontSize:"10px"})};
  
 `
 const Price = styled.p`
    font-size:40px;
    margin : 2rem 0rem;
   
 `
 const Color = styled.div`
    display:flex;
    margin-right:1rem;
 `
 const Button = styled.button`
   cursor:pointer;
   background:none;
   padding:10px;
   font-weight:600;
   border-color:#D77FA1;
 `
 const Quantity = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    margin-right:2rem;
 `
 const Circle = styled.div`
    height:20px;
    width:20px;
    border-radius: 50%;
    margin-right:0.5rem;
    background-color:${props=>props.color};
    cursor:pointer;
 `
 const Counter = styled.div`
    height:35px;
    width:35px;
    border-radius:10px;
    border: 1px solid black;
    display:flex;
    align-items:center;
    justify-content:center;
 `

 const Option = styled.option``
 const Select = styled.select`
    font-size:20px;
 `

 const Product = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {
        const getProduct = async () => {
          try {
            const res = await publicRequest.get("/products/find/" + id);
            setProduct(res.data);
          } catch {}
        };
        getProduct();
      }, [id]);

      const handleQuantity=(e)=>{
            if(e==="inc"){
                setQuantity(quantity+1);
            }
            else{
                quantity>1 && setQuantity(quantity-1);
            }
      }

      const handleCart=()=>{
          dispatch(addProduct({...product, quantity, color,size}));
      };


   return (
       <div>
       <Navbar/>
       <Advertisement />
       <Container>
            <Img src={product.img} />
            <Info>
                <Title>{product.title}</Title>
                    <Desc>
                     {product.desc}
                    </Desc>
                        <Price><CurrencyRupee /> {product.price} </Price>
                        <Wrapper>
                            <span style={{marginRight:"10px"}}>Color</span>
                                <Color> 
                                    {product.color?.map((c)=>(
                                        <Circle color={c} key={c} onClick={()=>setColor(c)}/>
                                    ))}
                                </Color>
                            <span style={{marginRight:"10px" , fontSize:"20px"}}>Size</span>
                                <Select onChange={(e)=>setSize(e.target.value)}>
                                    {product.size?.map((size)=>(
                                        <Option key={size}>{size}</Option>
                                    ))} 
                                </Select>
                        </Wrapper>
                 <Wrapper>
                         <Quantity>
                             <AddIcon onClick={(e)=>(handleQuantity("inc"))} style={{cursor:"pointer"}}/>
                                 <Counter>{quantity}</Counter>
                            <RemoveIcon onClick={(e)=>(handleQuantity("dec"))} style={{cursor:"pointer"}}/>
                        </Quantity>
                    <Button onClick={handleCart}>ADD TO CART</Button>
                </Wrapper>
            </Info>
       </Container>
       <Bulletin />
       <Footer />
       </div>
   );
 };
 
 export default Product;
 