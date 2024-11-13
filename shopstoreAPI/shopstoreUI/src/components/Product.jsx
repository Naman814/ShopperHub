import styled from "styled-components";
import React from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import {mobile} from '../responsive';
import {Link} from "react-router-dom";

const Container = styled.div`
 display:flex;
 align-items:center;
 justify-content:center;
 flex-direction:column;
 position:relative;
`

const Img = styled.img`
height:400px;
width:400px;
object-fit:cover;
 background-color:#FDEBF7;
 ${mobile({height:"300px" , width:"300px"})}

`

const IconWrapper = styled.div`
position:absolute;
display:flex;
opacity : 0;
&:hover{
  opacity:1;
}

`
const Icons = styled.div`
  padding:0.5rem;
  cursor:pointer;
  opacity:1;
  transition:0.7s ease;
  
  &:hover{
    transform: scale(1.5);
     ${'' /* //zoom on hover */}
  }
  
`

const Product = ({item}) => {
  return (
      <Container>
        <Img src={item.img} />  
        <IconWrapper>
          <Icons>
          <ShoppingCartIcon style={{fontSize:"50px" ,color:"white"}}></ShoppingCartIcon>
          </Icons>
          <Icons>
          <Link to={`/product/${item._id}`}>
          <SearchIcon style={{fontSize:"50px",color:"white"}}></SearchIcon>
          </Link>
          </Icons>
          <Icons>
          <ThumbUpIcon  style={{fontSize:"50px",color:"white"}}></ThumbUpIcon>
          </Icons>
        </IconWrapper>
     </Container>
  );
};

export default Product;
