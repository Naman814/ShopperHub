import React from 'react';
import styled from 'styled-components';

 const Container = styled.div`
    height:30px;
    background-color:#D77FA1;
    color:white;
    display:flex;
    justify-content:center;
    align-items:center;
    fontSize:20px;
    weight:400px;
`

const Advertisement = () => {
  return (
    <Container><marquee>Free shipping over order worth 250rs.</marquee></Container>
  );
};

export default Advertisement;
