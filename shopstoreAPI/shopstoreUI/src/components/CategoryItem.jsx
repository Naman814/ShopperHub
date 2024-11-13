import styled from 'styled-components';
import React from 'react';
import {Link} from "react-router-dom";

const Container = styled.div`
    flex:1;
    margin:3px;
    height:70vh;
    position:relative;
`
const Wrapper = styled.div`
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
  display:flex;
  align-items:center;
  justify-content:center;
  flex-direction:column;
  
`
const Image = styled.img`
    width:100%;
    height:100%;
    object-fit:cover;
`
const Title = styled.h1`
    color:white;
    margin:1rem;
`
const Button = styled.button`
    font-size:20px;
    padding:10px;
    border:none;
    cursor:pointer;
    color:gray;
`

const CategoryItem = ({item}) => {
  return (
    <Container>
        <Link to={`/products/${item.cat}`}>
        <Image src={item.img}/>
        <Wrapper>
            <Title>${item.title}</Title>
            <Button>SHOP NOW</Button>
        </Wrapper>
        </Link>
    </Container>
  );
 
};

export default CategoryItem;
