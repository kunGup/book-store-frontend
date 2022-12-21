import React,{useState} from "react";
import Layout from "../core/Layout";
import {Link} from 'react-router-dom'
import {signup} from '../auth'
function Signup() {
    const [values,setValues] = useState({
        name:'',
        email:'',
        password:'',
        error:'',
        success:false
    })
    const {name,email,password,error,success} = values
    const handleChange = name => event => {
        setValues({...values,error:false,[name]:event.target.value})
    }

    const clickSubmit = (e) =>{
        e.preventDefault()
        signup({name,email,password})
            .then(data=>{
                if(data.error){
                    setValues({
                        ...values,
                        error:data.error,
                        success: false
                    })
                }else{
                    setValues({
                      ...values,
                      name: "",
                      email: "",
                      password: "",
                      error: "",
                      success: true,
                    });
                }
            })
    }

    const showError = ()=>{
        return <div className="alert alert-danger" style={{display:error?'':'none'}}>
            {error}
        </div>
    }
    const showSuccess = ()=>{
        return (
          <div
            className="alert alert-info"
            style={{ display: success ? "" : "none" }}
          >
            New account is created. Please <Link to="/signin">Sign in.</Link>
          </div>
        );
    }
    const signupForm = ()=>(
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" className="form-control" onChange={handleChange('name')} value={name} />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" className="form-control" onChange={handleChange('email')} value={email} />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" className="form-control" onChange={handleChange('password')} value={password} />
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">Signup</button>
        </form>
    )
  return (
    <Layout
      title="Signup"
      description="create new account"
      className="container col-md-8 offset-md-2"
    >
        {showError()}
        {showSuccess()}
        {signupForm()}
    </Layout>
  );
}

export default Signup;
