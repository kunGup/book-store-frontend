import React,{useState,useEffect} from 'react'
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link,Redirect } from "react-router-dom";
import {read,update,updateUser} from './apiUser'

function Profile({match}) {
    const [values,setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    })

    const {token} = isAuthenticated()
    const {name,email,password,error,success} = values

    const init = (userId) => {
        read(userId,token).then(data=>{
            if(data.error){ 
                setValues({...values,error:true})
            }else{
                setValues({...values,name:data.name,email:data.email})
            }
        })
    }

    useEffect(()=>{
        init(match.params.userId)
    },[])

    const handleChange = name => e => {
        setValues({...values,error:false, [name]:e.target.value})
    }

    const clickSubmit = e => {
        e.preventDefault();
        update(match.params.userId,token,{name,email,password})
            .then(data=>{
                if(data.error){
                    console.log(data.error);
                }
                else{
                    updateUser(data,()=>{
                        setValues({
                            ...values,
                            name: data.name,
                            email: data.email,
                            success: true
                        })
                    })
                }
            })
    }

    const redirectUser = (success) => {
        if(success){
            return <Redirect to="/cart"/>
        }
    }
    const profileUpdate = (name,email,password) => (
        <form>
            <div className="form-group">
                <label htmlFor="" className="text-muted">Name</label>
                <input type="text" className="form-control" onChange={handleChange("name")} value={name}/>
            </div>
            <div className="form-group">
                <label htmlFor="" className="text-muted">Email</label>
                <input type="text" className="form-control" onChange={handleChange("email")} value={email}/>
            </div>
            <div className="form-group">
                <label htmlFor="" className="text-muted">Password</label>
                <input type="text" className="form-control" onChange={handleChange("password")} value={password}/>
            </div>

            <button className="btn btn-primary" onClick={clickSubmit}>Submit</button>
        </form>
    )

  return (
    <Layout
      title="Profile"
      description="Update your profile"
      className="container-fluid"
    >
      {profileUpdate(name,email,password)}
      {redirectUser(success)}
    </Layout>
  );
}

export default Profile