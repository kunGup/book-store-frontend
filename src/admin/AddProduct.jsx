import React,{useState} from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import {createProduct, getCategories} from "./apiAdmin"
function AdminDashboard() {
    const [values,setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    })
  const {
    user,token
  } = isAuthenticated();
  
  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    photo,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData
  } = values

  useEffect(()=>{
    init()
  },[])

  const handleChange = name => event => {
    const value = name === 'photo' ? event.target.files[0]:event.target.value;
    formData.set(name,value)
    setValues({...values,[name]:value})
  }

  const init = () =>{
    getCategories()
      .then((data)=>{
        if(data.error){
          setValues({...values,error:data.error})
        }else{
          setValues({ ...values, categories:data,formData: new FormData() });
        }
      })
  }

  const clickSubmit = (e) =>{
    e.preventDefault()
    setValues({...values,error:"",loading:true})
    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          category: "",
          shipping: "",
          quantity: "",
          photo: "",
          loading: false,
          error: "",
          createdProduct: data.name,
          redirectToProfile: false,
          formData: new FormData(),
        });
      }
    });
  }

  const newProductForm = ()=>{
    return (
      <form className="mb-3" onSubmit={clickSubmit}>
        <h4>Product photo</h4>
        <div className="form-group">
          <label htmlFor="" className="btn btn-secondary">
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange("photo")}
            />
          </label>
        </div>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            onChange={handleChange("name")}
            type="text"
            className="form-control"
            value={name}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Description</label>
          <textarea
            onChange={handleChange("description")}
            className="form-control"
            value={description}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Price</label>
          <input
            onChange={handleChange("price")}
            type="number"
            className="form-control"
            value={price}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Category</label>
          <select onChange={handleChange("category")} className="form-control">
            <option>Please select</option>
            {categories && categories.map((c,i)=>{
              return <option value={c._id} key={i}>{c.name}</option>
            })}
          </select>
        </div>
        <div className="form-group">
          <label className="text-muted">Shipping</label>
          <select onChange={handleChange("shipping")} className="form-control">
            <option>Please select</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </div>
        <div className="form-group">
          <label className="text-muted">Quantity</label>
          <input
            onChange={handleChange("quantity")}
            type="number"
            className="form-control"
            value={quantity}
          />
        </div>

        <button className="btn btn-outline-primary">Create Product</button>
      </form>
    );
  }

  const showError = ()=>{
    return (
      <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
      >
      {error}
      </div>
    )
  }

  const showSuccess = ()=>{
    return (
      <div
      className="alert alert-success"
      style={{ display: createdProduct ? "" : "none" }}
      >
      {`${createdProduct} is created!`}
      </div>
    )
  }

  const showLoading = () => {
    loading && (
      <div className="alert alert-info">
        Loading...
      </div>
    )
  }
  return (
    <Layout
      title="Add a new product"
      description={`G'Day ${user.name}`}
      className="container-fluid"
    >
      <div className="row">
            <div className="col-md-8 offset-md-2">
                {showError()}
                {showSuccess()}
                {showLoading()}
                {newProductForm()}
            </div>
      </div>
    </Layout>
  );
}

export default AdminDashboard;
