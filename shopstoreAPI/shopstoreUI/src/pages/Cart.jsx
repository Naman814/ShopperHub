import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Advertisement from '../components/Advertisement';
import Footer from '../components/Footer';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useDispatch, useSelector } from 'react-redux';
import StripeCheckout from "react-stripe-checkout";
import { useCallback,useState,useEffect } from 'react';
import {userRequest} from "../requestMethod";
import { Add, DeleteOutline, Remove } from '@material-ui/icons';
import { deleteProduct , emptyCart } from '../redux/cartRedux';
import { publicRequest } from '../requestMethod';
import { Link , useNavigate} from 'react-router-dom';
import { Router } from 'react-router';


const Container = styled.div``

const Title = styled.h1`
    margin : 1rem;
`

const Wrapper = styled.div`
    border:1px solid black;
    text-align : center;
`
const Top = styled.div`
    display: flex;
    justify-content : space-between;
    align-items:center;
    margin : 2rem;  
`

const TopMid = styled.div`
    display :  flex;
`

const Info = styled.p`
    padding-right:1rem;
    cursor:pointer;
    text-decoration : underline;
    font-size:20px;
`

const Button = styled.button`
    font-size: 20px;
    background:none;
    padding : 10px;
    cursor : pointer;
`
const Mid = styled.div`
    display : flex;
`

const Product = styled.div`
    flex :3;
    display : flex;
    margin : 1rem;
    justify-content: space-between
   
`
const Outer = styled.div`
        flex:3;
        display : flex;
        flex-direction:column;
`


const Left = styled.div`
    display : flex;
    align-items:center;
`

const Img = styled.img`
    margin:2rem;
    height : 10rem;
    width : 10rem;
`

const Right = styled.div`
    display : flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin : 0 5rem;
    padding: 2rem;
`

const Summary = styled.div`
    flex:1;
    border : 1px solid black;
    padding : 20px;
    margin : 1rem;
   height: 50vh;
   
`
const ProductDesc = styled.div`
    display : flex;
    flex-direction: column;
    text-align:left;
`
const ProdTitle = styled.p`
    margin : 1rem 0rem;
    font-size:20px;
`
const ProdId= styled.p`
    margin : 1rem 0rem;
    font-size:20px;
`
const ProdColor= styled.div`
    height:20px;
    width:20px;
    border-radius:100%;
    background-color: ${props => props.color};
    margin : 1rem 0rem;
`

const ProdSize= styled.p`
      margin : 1rem 0rem;
      font-size:20px;
`
const Quantity= styled.div`
    display : flex;
    justify-content :center;
    align-items : center;
`
const Counter= styled.div`font-size : 25px;`
const Price= styled.div`
    font-size : 25px;
`
const TextWrapper = styled.div`
    display : flex;
    justify-content : space-between;
    margin : 2rem;
`
const SubTotal = styled.p`
    font-size : 25px;
`
const Total= styled.p`
    font-size : 25px;
`
const Shipping= styled.p`
    font-size : 25px;
`


const Cart = () => {
    const cart = useSelector(state=>state.cart)
    const [stripeToken, setStripeToken] = useState(null);
    const history = useNavigate();
    const dispatch = useDispatch();
    const KEY = process.env.REACT_APP_STRIPE;
    const onToken = (token) => {
        setStripeToken(token);
      };

      console.log(stripeToken);

      const handleDelete = useCallback((product) => {
        dispatch(
          deleteProduct({
            id: product._id,
            total: product.price * product.quantity,
          })
        );
        console.log(product);
      }, []);

      useEffect(() => {
        const makeRequest = async () => {
          try {
            const res = await userRequest.post(`/checkout/payment`, {
              tokenId: stripeToken.id,
              amount: 500,
            });
            console.log(res);
            dispatch(emptyCart());
            history(
                '/success',
                {
                  replace : true,
                  pathname: '/Success',
                  query: { paymentData: JSON.stringify(res.data) },
                },
               
              );
            } catch (err) {
              console.log(err);
            }
          };
        stripeToken && cart.total>=1 && makeRequest();
      }, [stripeToken, cart.total, history]);

  return (
        <Container>
            <Navbar />
            <Advertisement />
            <Wrapper>
                <Title>Your Cart</Title>
                <Top>
                 <Link to="/">
                    <Button>Continue shopping</Button>
                    </Link>
                    <TopMid>
                        <Info>Shopping Bag ({cart.products.length})</Info>
                        <Info>Your wishlist(0)</Info>
                    </TopMid>
                    <Button
                        onClick={() => dispatch(emptyCart())}
                    >
            EMPTY CART
          </Button>
                </Top>
                <Mid>
                    <Outer>
                    {cart.products.map((info)=>{
                        console.log(info)
                        return (
                            <Product>
                            <Left>
                                <Img src={info.img}></Img>
                                <ProductDesc>
                                    <ProdTitle><b>Product</b> : {info.title}</ProdTitle>
                                    <ProdId><b>Id</b>: {info._id}</ProdId> 
                                    <ProdColor color={info.color}></ProdColor> 
                                    <ProdSize><b>Size </b> : {info.size}</ProdSize> 
                                </ProductDesc>
                            </Left>
                            <Right>
                                <Quantity>
                                    <Add style={{cursor:"pointer"}}/>
                                    <Counter>{info.quantity}</Counter>
                                    <Remove style={{cursor:"pointer"}}/>
                                </Quantity>
                                <Price><CurrencyRupeeIcon /> {info.price*info.quantity}</Price>
                                <DeleteOutline
                                onClick={() => handleDelete(info)}/>
                            </Right>
                    </Product>
                        );
                    })}
                   
                    </Outer>
                    <Summary>
                         <Title>Order Summary</Title>
                         <TextWrapper>
                             <SubTotal>Subtotal</SubTotal>
                             <Price><CurrencyRupeeIcon />{cart.total}</Price>
                         </TextWrapper>
                         <TextWrapper>
                             <Shipping>Shipping</Shipping>
                             <Price><CurrencyRupeeIcon />30</Price>
                         </TextWrapper>
                         <TextWrapper>
                             <Shipping>Discount</Shipping>
                             <Price><CurrencyRupeeIcon />30</Price>
                         </TextWrapper>
                         <TextWrapper>
                            <Total>Total</Total>
                            <Price><CurrencyRupeeIcon />{cart.total}</Price>
                         </TextWrapper>
                         <StripeCheckout
                            name="Shopstore Gateway"
                            image="https://previews.123rf.com/images/keath/keath1609/keath160900267/63404714-ic%C3%B4ne-de-paiement-l-argent-et-le-paiement-bouton-rouge-insigne-illustration.jpg"
                            description={`Your total is $${cart.total}`}
                            billingAddress
                            shippingAddress
                            amount={(cart.total/*+30*/) * 100}
                            token={onToken}
                            stripeKey={KEY}
                         >
              <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
                    </Summary>
                </Mid>
            </Wrapper>
            <Footer />
        </Container>
  );
};
export default Cart;
