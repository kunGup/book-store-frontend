import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
function AdminDashboard() {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();
  const adminInfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Admin Information</h3>
        <ul className="list-group">
          <li className="list-group-item">{name}</li>
          <li className="list-group-item">{email}</li>
          <li className="list-group-item">
            {role === 1 ? "Admin" : "Registered User"}
          </li>
        </ul>
      </div>
    );
  };
  const adminLinks = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Admin Links</h3>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/create/category">Create category</Link>
          </li>
          <li className="list-group-item">
            <Link to="/create/product">Create product</Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/orders">View Orders</Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/products">Manage products</Link>
          </li>
        </ul>
      </div>
    );
  };
  return (
    <Layout
      title="Dashboard"
      description={`G'Day ${name}`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-md-9">{adminInfo()}</div>
        <div className="col-md-3">{adminLinks()}</div>
      </div>
    </Layout>
  );
}

export default AdminDashboard;
