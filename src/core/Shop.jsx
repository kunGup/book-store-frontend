import React from "react";
import { useState } from "react";
import Layout from "../core/Layout";
import Card from "./Card";
import {getCategories,getFilteredProducts} from './apiCore'
import { useEffect } from "react";
import Checkbox from "./Checkbox";
import Radiobox from "./Radiobox";
import { prices } from "./fixedPrices";

function Shop() {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });
  const [error,setError] = useState(false)
  const [categories,setCategories] = useState([])
  const [limit,setLimit] = useState(6)
  const [skip,setSkip] = useState(0)
  const [size,setSize] = useState(0)
  const [filteredResults,setFilteredResults] = useState([])
  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories([...data]);
      }
    });
  };

  const loadFilteredResults = (newFilters) => {
    // console.log(newFilters);
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.data);
        setSize(data.size);
        setSkip(0);
      }
    });
  };

  const loadMore = () => {
    let toSkip = skip+limit;
    getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults([...filteredResults,...data.data]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size>0 &&
      size>=limit && (
        <button onClick={loadMore} className="btn btn-warning mb-5">
          Load more
        </button>
      )
    )
  }
  

  const handleFilters = (filters,filterBy) => {
    // console.log("SHOP",filters,filterBy);
    const newFilters = {...myFilters}
    newFilters.filters[filterBy] = filters

    if(filterBy === "price"){
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues
    }

    setMyFilters(newFilters)
    console.log(myFilters);
    loadFilteredResults(myFilters.filters);
  }

  const handlePrice = value => {
    const data = prices;
    let array =[];
    for(let key in data){
      if(data[key]._id === parseInt(value)){
        array = data[key].array;
      }
    }
    return array;
  }

  useEffect(() => {
    init();
    loadFilteredResults(myFilters.filters);
  }, []);
  
  return (
    <Layout
      title="Shop page"
      description="Shop book of your choice"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-4">
          <h4>Filter by categories</h4>
          <ul>
            <Checkbox
              categories={categories}
              handleFilters={(filters) => handleFilters(filters, "category")}
            />
          </ul>
          <h4>Filter by price</h4>
          <ul>
            <Radiobox
              prices={prices}
              handleFilters={(filters) => handleFilters(filters, "price")}
            />
          </ul>
        </div>
        <div className="col-8">
          <h2 className="mb-4">Products</h2>
          <div className="row">
            {filteredResults.map((product, i) => (
              <div key={i} className="col-4 mb-3">
                <Card product={product} />
              </div>
            ))}
          </div>
          <hr />
          {loadMoreButton()}
        </div>
      </div>
    </Layout>
  );
}

export default Shop;
