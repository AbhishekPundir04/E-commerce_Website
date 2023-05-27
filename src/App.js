import React, { Fragment, useState,useContext,useEffect,Suspense} from "react";
import axios from "axios";
import { Route,Redirect  } from "react-router-dom";
import Header from "./Components/Layout/Header/Header";
import Footer from "./Components/Layout/Footer/Footer";
import Cart from "./Components/Cart/Cart";
import CartProvider from "./Components/Store/CartProvider";
import LoginContext from "./Components/Store/LoginContext";
import CartContext from "./Components/Store/cart-context";

import LoadingSpinner from "./Components/UI/LoadingSpinner";



const AboutUs = React.lazy(()=>import ('./Components/Pages/AboutUs'))
const Home2=React.lazy(()=>import('./Components/Pages/Home2'))
const Store=React.lazy(()=>import('./Components/Pages/Store'))
const ContactUs=React.lazy(()=>import('./Components/Pages/ContactUs'))
const ProductDetail=React.lazy(()=>import('./Components/Pages/ProductDetails'))
const LoginForm=React.lazy(()=>import('./Components/Pages/LoginPage'))

function App() {

  if(!localStorage.getItem('email')) {
    localStorage.setItem("email","")
  }

  const authCtx = useContext(LoginContext);
  const cartCtx = useContext(CartContext);
  let email = localStorage.getItem("email").replace(".", "").replace("@", "");


  const [cartIsShown, setCartIsShown] = useState(false);

  const ShowCartHandler = () => {
    setCartIsShown(true);
  };

  const HideCartHandler = () => {
    setCartIsShown(false);
  };

  useEffect(() => {
    if (!email) return;
     axios.get(`https://crudcrud.com/api/c7a83aeaf6c64ce78b371ea4eebf611b/Cart${email}`).then((res) => {
       const data= (res.data)
       for (const key in data) {
         const item = data[key];
         item._id = key;
         cartCtx.mapID(item)
       }
       
     }).catch((err) => {
       alert(err)
     })
   }, [email, cartCtx])

  return (
    <Fragment>
      
      <CartProvider>
        {cartIsShown && <Cart onClose={HideCartHandler} />}
        <Header onShowCart={ShowCartHandler} />
        
        <Suspense fallback={<div className="centered"><LoadingSpinner/></div>}>
        <Route path="/" exact>
          <Redirect to="/Login" />
        </Route>

        <Route path="/AboutUs">
          <AboutUs />
        </Route>

        <Route path="/Home">
          <Home2 />
        </Route>

        <Route path="/Store">
        {authCtx.isLoggedIn && <Store />}
           {!authCtx.isLoggedIn && <Redirect to='/Login'/>}
          
        </Route>

        <Route path="/ContactUs">
          <ContactUs />
        </Route>

        <Route path="/products/:product_id">
            <ProductDetail />
          </Route>

       <Route path="/Login" exact>
        <LoginForm/>
        {!authCtx.isLoggedIn && <Redirect to='/Login'/>}
        </Route>
        </Suspense>
        

        <Footer />
      </CartProvider>
    </Fragment>
  );
}

export default App;



