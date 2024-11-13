import React from 'react'; //rafce shortcut for arrow func
import Advertisement from '../components/Advertisement';
import Categories from '../components/Categories';
import Navbar from '../components/Navbar';
import Slider from '../components/Slider';
import Products from '../components/Products';
import Bulletin from '../components/Bulletin';
import Footer from '../components/Footer';

const Home = () => {
  return (
  <div>
   <Advertisement />
    <Navbar />
    <Slider />
    <Categories />
    <Products />
    <Bulletin />
    <Footer />
  </div>
  )
};

export default Home;
