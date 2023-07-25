import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Layout from "../core/Layout";
import { getCart } from "./cartHelpers";
import Card from "./Card";
import { Link } from "react-router-dom";
import Checkout from "./Checkout";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);
  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = (items) => {
    return (
      <div>
        <h2>Your cart has {`${items.length}`} items</h2>
        <hr />
        {items.map((product, i) => (
          <Card
            product={product}
            key={i}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveProductButton={true}
            setRun={setRun}
            run={run}
          />
        ))}
      </div>
    );
  };

  const noItemsMessage = () => (
    <h2>
      Your cart is empty.
      <br />
      <Link to="/shop">Continue Shopping</Link>
    </h2>
  );

  return (
    <Layout
      title="Shopping Cart"
      description="Manage your cart items. Add remove checkout or continue shopping."
      className="container-fluid"
    >
      <div className="row">
        <div className="col-sm-6 mb-3">
          <h2 className="mb-4">Your cart summary</h2>
          <hr />
          <Checkout products={items} setRun={setRun} run={run} />
        </div>
        <div className="col-sm-6">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
