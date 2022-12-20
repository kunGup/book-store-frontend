import React,{useState} from 'react'
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import {createCategory} from './apiAdmin'
import {Link} from 'react-router-dom'

function AddCategory() {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  //destructure user and token from localStorage
    const {user,token} = isAuthenticated()

    const clickSubmit = (e) => {
        e.preventDefault()
        setError(false)
        setSuccess(false)
        //make request to api to create category

        createCategory(user._id,token,{name})
            .then(data=>{
                if(data.error){
                    setError(data.error)
                }else{
                    setError(false)
                    setSuccess(true)
                }
            })
    }

    const handleChange = (e) => {
        setError('')
        setName(e.target.value)
    }

  const newCategoryForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label htmlFor="name" className="text-muted" >
          Name
        </label>
        <input type="text" className="form-control" autoFocus id="name" onChange={handleChange} value={name} />
      </div>
      <button className="btn btn-outline-primary">Create Category</button>
    </form>
  );
  const showError = () =>{
    return (
        <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
        >
        category should be unique
        </div>
    )
  }

  const showSuccess = () =>{
    return (
      <div
        className="alert alert-success"
        style={{ display: success ? "" : "none" }}
      >
        category created
      </div>
    );
  }

  const goBack = () => {
    return <div className="mt-5">
        <Link to="/admin/dashboard" className="text-warning">Back to dashboard</Link>
    </div>
  }
  return (
    <Layout
      title="Add a new category"
      description={`G'Day ${user.name}, ready to add a new category?`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
            {showError()}
            {showSuccess()}
            {newCategoryForm()}
            {goBack()}
        </div>
      </div>
    </Layout>
  );
}

export default AddCategory