import React from 'react';
import styled from 'styled-components';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import {mobile} from '../responsive';

const Container = styled.div`
        height:35vh;
`
const Wrapper = styled.div`
    display:flex;
    justify-content:space-around;
    align-items:center;
    ${mobile({flexDirection:"column", textAlign:"center"})};
`
const Section = styled.div`
    display:flex;
    flex-direction:column;
    margin : 2rem 0rem;

`
const Title = styled.div`
    font-size : 30px;
    margin :2 rem 0rem;
    font-weight:bold;
`
const Link = styled.div`
    margin: 0.5rem 0rem;
    cursor:pointer;
`
const Social = styled.div`
    display : flex;
    justify-content:center;
    align-items:center;
`
const Footer = () => {
  return (
      <Container> 
        <Wrapper>
            <Section>
                <Title>Links</Title>
                <Link>Home</Link>
                <Link>Men Fashion</Link>
                <Link>Women Fashion</Link>
                <Link>Order Tracking</Link>
                <Link>Accessories</Link>
            </Section>
            <Section>
                <Title>Account Details</Title>
                <Link>My Account</Link>
                <Link>Wishlist</Link>
                <Link>Cart</Link>
                <Link>Your Orders</Link>
            </Section>
            <Section>
                <Title>Contact</Title>
                <Link>814 xyz street</Link>
                <Link>New Delhi - 110055</Link>
                <Link>LandMark : xyz Hotel</Link>
            </Section>
            <Social>
            <EmailIcon style={{fontSize:"40px", paddingRight:"0.5rem"}}/>
            <FacebookIcon style={{fontSize:"40px" ,paddingRight:"0.5rem"}}/>
            <InstagramIcon style={{fontSize:"38px",paddingRight:"0.5rem"}} />
        </Social>
        </Wrapper>
      </Container>
  );
};

export default Footer;
