import { API } from "../config";

export const createCategory = (userId,token,category) => {
  return fetch(`${API}/category/create/${userId}`, {
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    method: "POST",
    body: JSON.stringify(category),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const createProduct = (userId,token,product) => {
  return fetch(`${API}/product/create/${userId}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: product,
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const getCategories = () => {
  return fetch(`${API}/categories`)
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const listOrders = (userId, token) => {
  return fetch(`${API}/order/list/${userId}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const getStatusValues = (userId, token) => {
  return fetch(`${API}/order/status-value/${userId}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const updateOrderStatus = (userId, token,orderId,status) => {
  return fetch(`${API}/order/${orderId}/status/${userId}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "PUT",
    body: JSON.stringify({status,orderId})
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

/**
 * to perform crud on product
 * get all products
 * get a single product
 * update a single product
 * delete a single product
 */

export const getProducts = () => {
  return fetch(`${API}/products?limit=undefined`, {
    
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const getProduct = (productId) => {
  return fetch(`${API}/product/${productId}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const deleteProduct = (productId,userId, token) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const updateProduct = (productId,userId, token,product) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};