import { API } from "../config";

export const signup = (user) => {
  return fetch(`${API}/signup`, {
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
    method: "POST",
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const signin = (user) => {
  return fetch(`${API}/signin`, {
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
    method: "POST",
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const authenticate = (data,next) =>{
    if(typeof window !== 'undefined'){
        localStorage.setItem('jwt',JSON.stringify(data))
        next()
    }
}

export const signout = (next)=>{
    if(typeof window !== 'undefined'){
        localStorage.removeItem('jwt')
        next()
        fetch(`${API}/signout`,{
            method: 'GET'
        })
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
    }
}

export const isAuthenticated = () =>{
  if(typeof window == 'undefined'){
    return false;
  }
  if(localStorage.getItem('jwt')){
    return JSON.parse(localStorage.getItem("jwt"));
  }
  else return false;
}