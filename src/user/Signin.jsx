import React, { useState } from "react";
import Layout from "../core/Layout";
import { Redirect } from "react-router-dom";
import { signin,authenticate, isAuthenticated } from "../auth";
function Signin() {
  const [values, setValues] = useState({
    email: "john@gmail.com",
    password: "password1",
    error: "",
    loading: false,
    redirectToReferrer: false
  });
  const { email, password, error, loading, redirectToReferrer } = values;
  const {user} = isAuthenticated()
  const handleChange = (name) => (e) => {
    setValues({...values,error:false, [name] : e.target.value})
  }

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({...values,error:false,loading:true})
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          loading: false,
        });
      } else {
        authenticate(data,()=>{
          setValues({
            ...values,
            redirectToReferrer: true,
          });
        })
      }
    });
  };

  const showError = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };
  const showLoading = () => (
    loading && (
      <div
        className="alert alert-info"
        style={{ display: error ? "" : "none" }}
      >
        Loading...
      </div>
    )
  );
  const redirectUser = () => {
    if(redirectToReferrer){
      if(user&&user.role===1)
        return <Redirect to="/admin/dashboard" />
      else
        return <Redirect to="/user/dashboard" />;
    }
    if(isAuthenticated()){
      return <Redirect to="/"/>
    }
  }
  const signinForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          type="email"
          className="form-control"
          onChange={handleChange("email")}
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          type="password"
          className="form-control"
          onChange={handleChange("password")}
          value={password}
        />
      </div>
      <button onClick={clickSubmit} className="btn btn-primary">
        Signin
      </button>
    </form>
  );
  return (
    <Layout
      title="Signin"
      description="Node React Signin"
      className="container col-md-8 offset-md-2"
    >
      {showError()}
      {showLoading()}
      {signinForm()}
      {redirectUser()}
    </Layout>
  );
}

export default Signin;
