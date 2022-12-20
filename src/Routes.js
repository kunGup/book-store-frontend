import React from 'react'
import Signin from './user/Signin'
import Signup from './user/Signup'
import Home from './core/Home'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import PrivateRoute from './auth/PrivateRoute'
import UserDashboard from './user/UserDashboard'
import AdminDashboard from "./user/AdminDashboard";
import AdminRoute from './auth/AdminRoute'
import AddProduct from "./admin/AddProduct";
import UpdateProduct from "./admin/UpdateProduct";
import AddCategory from "./admin/AddCategory";
import Shop from './core/Shop'
import Product from "./core/Product";
import Cart from './core/Cart'
import Orders from './admin/Orders'
import Profile from './user/Profile'
import ManageProducts from './admin/ManageProducts'

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/shop" exact component={Shop} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/create/category" exact component={AddCategory} />
        <AdminRoute path="/create/product" exact component={AddProduct} />
        <Route path="/product/:productId" exact component={Product} />
        <AdminRoute path="/admin/orders" exact component={Orders} />
        <AdminRoute path="/admin/products" exact component={ManageProducts} />
        <AdminRoute
          path="/admin/product/update/:productId"
          exact
          component={UpdateProduct}
        />
        <PrivateRoute path="/profile/:userId" exact component={Profile} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes