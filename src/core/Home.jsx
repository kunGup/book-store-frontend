import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Layout from "../core/Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";
import Search from "./Search";
import Spinner from "./Spinner";
function Home() {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts("createdAt").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);
  return (
    <Layout
      title="Home"
      description="Book store home"
      className="container-fluid"
    >
      <Search />
      <h2 className="mb-4">New Arrivals</h2>
      <div className="row">
        {productsByArrival.length === 0 ? (
          <Spinner />
        ) : (
          productsByArrival.map((product, i) => (
            <div key={i} className="col-sm-6 col-lg-4 mb-3">
              <Card product={product} />
            </div>
          ))
        )}
      </div>
      <h2 className="mb-4">Best Sellers</h2>
      <div className="row">
        {productsBySell.length === 0 ? <Spinner/> : productsBySell.map((product, i) => (
          <div key={i} className="col-sm-6 col-lg-4 mb-3">
            <Card product={product} />
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default Home;
