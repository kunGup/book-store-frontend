import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Layout from "../core/Layout";
import { listRelated, read } from "./apiCore";
import Card from "./Card";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct({ ...data });
        //fetch related products
        listRelated(data._id).then(data=>{
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
        <div className="col-8">
          {product && product.description && (
            <Card product={product} showViewProductButton={false} />
          )}
        </div>
        <div className="col-4">
          <h4>Related products</h4>
          {relatedProducts.map((p, i) => (
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
