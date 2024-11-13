import React from 'react';
import styled from 'styled-components';
import SendIcon from '@mui/icons-material/Send';
import {mobile} from '../responsive'

const Container = styled.div`
    height: 60vh;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    padding : 2rem 0rem;
    margin-top : 1rem;
    background-color : #D9D7F1;
    ${mobile({height:"40vh"})}
   
`
const Heading = styled.h1`
    font-size : 80px;
    ${mobile({ fontSize:"40px"})}
`
const Tagline = styled.p`
    font-size : 30px;
    margin:2rem;
    ${mobile({fontSize : "15px"})}
`
const Wrapper = styled.div`
    display : flex;
    justify-content : center;
    text-align:center;
    margin:2rem;   
`
const Input = styled.input`
    padding : 10px;
    width:50rem;
    font-size:20px;
    border: none;
    ${mobile({width:"10rem"})}
`

const Bulletin = () => {
  return (
      <Container>
         <Heading>BULLETIN</Heading>
         <Tagline>Get timely updates from your favorite products</Tagline>
         <Wrapper>
             <Input placeholder='Your Email'/> 
             <button style={{width:"4rem" , backgroundColor:"#FDEBF7", border:"none"}}><SendIcon /></button>
         </Wrapper>
      </Container>
  );
};

export default Bulletin;
