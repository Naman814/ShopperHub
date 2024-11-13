import styled from 'styled-components';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from 'react';
import { sliderItems } from '../data';
import {mobile} from '../responsive';

const Container = styled.div`
    width:100%;
    height:100vh;
    display:relative;
    overflow:hidden;
`
const Arrow = styled.div`
    width:50px;
    height:50px;
    border-radius:50%;
    background-color:#C0D8C0;
    display:flex;
    align-items:center;
    justify-content:center;
    position:absolute;
    top:0;
    bottom:0;
    left:${props=>props.direction=== "left" && "10px"};
    right:${props=>props.direction=== "right" && "10px"};
    margin:auto;
    cursor:pointer;
    z-index:2;
    opacity:0.5;
    
`
const Wrapper = styled.div`
    height:100%;
    display:flex;
    transition:all 1.5s ease;
    transform:translateX(${props=>props.slideIdx* -100}vw);
    ${mobile({width:"100%"})}; 
`
const Slide = styled.div`
    width:100vw;
    height:100vh;
    display:flex;
    align-items:center;
    ${'' /* To prevent slide from shrinking */}
    flex-shrink:0; 
    background-color:#${props=>props.bg}; 
    ${mobile({flexDirection:"column"})}; 
 
`;
const ImgContainer = styled.div`
    height:100%;
    flex:1;
    display:flex;
    justify-content:center;
    align-items:center;
    
`;
const InfoContainer = styled.div`
    flex:1;
    padding:50px;
    ${mobile({padding : "20px", height:"20vh"})}; 
   
`;
const Image = styled.img`
    height :80%;
    opacity:0.8;
    z-index:2;
    ${mobile({height:"400px", width:"300px"})}; 
`;

const Title = styled.h1`
    font-size:70px;
    ${mobile({fontSize:"30px"})}; 
`;

const Desc = styled.p`
    font-size:20px;
    margin: 50px 0;
    font-weight:500;
    letter-spacing:3px;
    ${mobile({fontSize:"10px"})}; 
`;

const Button = styled.button`
    font-size:20px;
    padding:10px;
    background-color:transparent;
    cursor:pointer;
`;


const Slider = () => {

    const [slideIdx,setSlideIdx]=useState(0);
    const handleClick=(props)=>{
        if(props==="left"){
            setSlideIdx(slideIdx>0?slideIdx-1:1);
        }
        else{
            setSlideIdx(slideIdx===1?0:slideIdx+1);
        }
    }

  return (
    <Container> 
        <Arrow direction="left" onClick={()=>handleClick("left")}>
            <ArrowBackIosNewIcon />
        </Arrow>
        <Wrapper slideIdx={slideIdx}>
        {sliderItems.map((item) => (
            <Slide bg={item.bg}>
                <ImgContainer>
                    <Image src={item.img} />
                </ImgContainer>
                <InfoContainer>
                    <Title>{item.title}</Title>
                    <Desc>{item.desc}</Desc>
                    <Button>SHOW NOW</Button>
                </InfoContainer>
            </Slide>
            ))}
        </Wrapper>
        <Arrow direction="right" onClick={()=>handleClick("right")}>
            <ArrowForwardIosIcon />
        </Arrow>
    </Container>
  );
};

export default Slider;
