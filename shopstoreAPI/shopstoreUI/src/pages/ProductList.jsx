import React from 'react';
import Navbar from '../components/Navbar';
import Advertisement from '../components/Advertisement';
import Products from '../components/Products';
import styled from 'styled-components';
import Bulletin from '../components/Bulletin';
import Footer from '../components/Footer';
import { useLocation } from 'react-router';
import { useState } from 'react';

const FilterContainer = styled.div`
    display : flex;
    justify-content : space-between;
`
const Title = styled.h1`
    margin:2rem;
`
const Filter = styled.div`
    margin: 2rem;
`

const FilterText = styled.span`
    font-size:20px;
    font-weight:bold;
`

const ProductList = () => {
    const location = useLocation();
    const cat = location.pathname.split("/")[2];
    const [filters,setFilters] = useState({});
    const [sort,setSort] = useState("newest");
    const handleFilters=(e)=>{
        const value = e.target.value;
        setFilters({
            ...filters,
            [e.target.name]:value
        });
    };
   

  return (
         <div>
        <Navbar />
        <Advertisement />
            <Title>{cat}</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Filter Products</FilterText>
                    <select name="color" onChange={handleFilters} style={{margin:"1rem", fontSize:"20px", padding:"5px"}}>
                        <option disabled>Color</option>
                        <option>blue</option>
                        <option>red</option>
                        <option>yellow</option>
                    </select>
                    <select name="size" onChange={handleFilters} style={{margin:"1rem", fontSize:"20px", padding:"5px"}}>
                        <option disabled>Size</option>
                        <option>S</option>
                        <option>M</option>
                        <option>L</option>
                        <option>XL</option>
                    </select>
                </Filter>
                <Filter>
                    <FilterText>Sort Products</FilterText>
                    <select onChange={(e)=>setSort(e.target.value)} style={{margin:"1rem", fontSize:"20px", padding:"5px"}}>
                        <option value="newest">New</option>
                        <option value="desc">Desc</option>
                        <option value="asc">Asc</option>
                    </select>
                </Filter>
            </FilterContainer>
        <Products cat={cat} filters={filters} sort={sort} />
        <Bulletin />
        <Footer />
        </div>
  );
};

export default ProductList;
