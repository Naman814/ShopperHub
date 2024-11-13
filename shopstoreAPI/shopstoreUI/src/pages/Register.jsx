import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { register } from '../redux/apicalls';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate , Link } from "react-router-dom";



const Container = styled.div`
    height : 100vh;
    width: 100vw;
    display : flex;
    justify-content:center;
    align-items:center;
    background-color : #FFF8F3;
`
const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    width:40%;
    border-style : grove;
    border : 1px solid lightgrey;
    padding: 14px 18px;
    background-color : white;
`
const Title = styled.h1``

const Form = styled.form`
    display : flex;
    flex-direction : column; 
`
const Input = styled.input`
    margin : 1rem 0rem;
    background-color : white;
    border-style : grove;
    border : 1px solid lightgrey;
    padding: 10px;
    flex:1;
`
const Button = styled.button`
  border: 1px solid lightgrey;
  background-color: white;
  color: black;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  width : 100%;
  margin:2rem 0rem;
  &:hover{
  background-color: #04AA6D;
  color: white;
  }
`
const Privacy = styled.p`
    margin : 3rem 1rem 0rem 0rem;
`

const Register = () => {
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isFetching, error } = useSelector((state) => state.user);

    const handleClick=(e)=>{
        e.preventDefault();
        console.log(e)
        register(dispatch,{username,email,password})
        alert("User Registered successfully")
        navigate('/login');
    }
  return (
      <Container>
        <Wrapper>
            <Title>Create account</Title>
            <Form>
                <Input placeholder='Your name' value={username} onChange={(e)=>setUsername(e.target.value)} />
                <Input placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
                <Input placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </Form>
            <Privacy>By creating an account, you agree to Shopstore's Conditions of Use and Privacy Notice.</Privacy>
            <Button onClick={handleClick} disabled={isFetching}>Register your account</Button>
            <Link to="/login" className="">
          <a className="my-[10px] text-[12px] cursor-pointer ">
            ALREADY HAVE AN ACCOUNT?
            <span className="text-blue-500 ml-1 underline">SIGN IN</span>
          </a>
        </Link>
        {error && (
          <span className="text-red-500 block ">Something Went Wrong...</span>
        )}
        </Wrapper>
      </Container>
  );
};

export default Register;
