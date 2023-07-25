import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Layout from "../core/Layout";
import { listRelated, read } from "./apiCore";
import Card from "./Card";
import Spinner from "./Spinner";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [error, setError] = useState(false);
  const [loadingRelated,setLoadingRelated] = useState(false)

  const loadSingleProduct = (productId) => {
    setLoadingRelated(true)
    read(productId).then((data) => {
        
      if (data.error) {
        setError(data.error);
      } else {
        setProduct({ ...data });
        //fetch related products
        listRelated(data._id).then(data=>{
            setLoadingRelated(false);
            if(data.error){
                setError(data.error)
            }else{
                setRelatedProducts(data)
            }
        })
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  return (
    <Layout
      title={product && product.name}
      description={
        product &&
        product.description &&
        `${product.description.substring(0, 100)}...`
      }
      className="container-fluid"
    >
      <div className="row">
        <div className="col-md-8 mb-5">
          {!(product && product.description) ? <Spinner/> : (
            <Card product={product} showViewProductButton={false} />
          )}
        </div>
        <div className="col-md-4">
          <h4 className="mb-3">Related products</h4>
          {loadingRelated ? <Spinner/> : relatedProducts.map((p, i) => (
            <div className="mb-3">
              <Card product={p} key={i} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Product;
