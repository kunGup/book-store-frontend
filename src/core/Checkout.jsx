import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Layout from "../core/Layout";
import { getCart } from "./cartHelpers";
import Card from "./Card";
import {
  getBraintreeClientToken,
  processPayment,
  createOrder,
} from "./apiCore";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import DropIn from "braintree-web-drop-in-react";
import { emptyCart } from "./cartHelpers";

const Checkout = ({ products, setRun = (f) => f, run = undefined }) => {
  const [data, setData] = useState({
    success: false,
    loading: false,
    clientToken: null,
    error: "",
    instance: {},
    address: "",
  });
  const handleAddress = (e) => {
    setData({ ...data, address: e.target.value });
  };

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then((data) => {
      if (data.error) {
        setData({ ...data, error: data.error });
      } else {
        setData({ clientToken: data.clientToken });
      }
    });
  };

  const showDropIn = () => (
    <div onBlur={() => setData({ ...data, error: "" })}>
      {data.clientToken !== null && products.length > 0 ? (
        <div>
          <div className="form-group">
            <label htmlFor="" className="text-muted">
              Delivery address:
            </label>
            <textarea
              onChange={handleAddress}
              className="form-control"
              value={data.address}
              placeholder="Type your delivery address here..."
            />
          </div>

          <DropIn
            options={{
              authorization: data.clientToken,
              paypal: {
                flow: "vault",
              },
            }}
            onInstance={(instance) => (data.instance = instance)}
          />
          <button onClick={buy} className="btn btn-success btn-block">
            Pay
          </button>
        </div>
      ) : null}
    </div>
  );
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };
  const deliveryAddress = data.address;
  const buy = () => {
    setData({ loading: true });
    //send nonce to your server
    //nonce = data.instance.requestPaymentMethod()
    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((data) => {
        console.log(data);
        nonce = data.nonce;
        //once you have nonce (card type,card number) send nonce as 'paymentMethodNonce'
        //and also total to be charged
        // console.log('send nonce and total to process: ',nonce,getTotal(products));
        let paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products),
        };
        processPayment(userId, token, paymentData)
          .then((res) => {
            // console.log(res);
            const createOrderData = {
              products: products,
              transaction_id: res.transaction.id,
              amount: res.transaction.amount,
              address: deliveryAddress,
            };
            //create order
            //empty cart
            createOrder(userId, token, createOrderData)
              .then((res) => {
                emptyCart(() => {
                  setRun(!run); // run useEffect in parent Cart
                  console.log("cart is empty payment done");
                  setData({ loading: false, success: true });
                });
              })
              .catch((error) => {
                console.log(error);
                setData({ loading: false });
              });
          })
          .catch((error) => {
            console.log(error);
            setData({ loading: false });
          });
      })
      .catch((error) => {
        console.log("drop in error:", error);
        setData({ ...data, error: error.message });
      });
  };

  const showCheckout = () => {
    return isAuthenticated() ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link to="/signin">
        <button className="btn btn-primary">Sign in to checkout</button>
      </Link>
    );
  };

  const showError = (error) => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };
  const showSuccess = (success) => {
    return (
      <div
        className="alert alert-success"
        style={{ display: success ? "" : "none" }}
      >
        Thanks! Your payment was successful.
      </div>
    );
  };
  const showLoading = (loading) =>
    loading && <h2 className="text-danger">Loading...</h2>;
  return (
    <div>
      <h2>Total: ₹ {getTotal()}</h2>
      {showLoading(data.loading)}
      {showSuccess(data.success)}
      {showError(data.error)}
      {showCheckout()}
    </div>
  );
};

export default Checkout;
