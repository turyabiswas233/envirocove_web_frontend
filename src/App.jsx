import "./App.css";
import Login from "./components/Login";
import Onboard from "./components/Onboard";
import Consumer from "./components/Consumer";
import Product from "./components/Product";
import Cart from "./components/Cart";
import CheckoutPay from "./components/CheckoutPay";
import CheckoutShip from "./components/CheckoutShip";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import VerifyPhone from "./components/VerifyPhone";
import RequestProgress from "./components/RequestProgress";
import VerifyID from "./components/VerifyId";
function App() {
  return (
    <div className="font-poppins">
      <Routes>
        <Route path="/" Component={Onboard}/>
        <Route path="/home" Component={Consumer}/>
        <Route path="/product/:id" Component={Product}/>
        <Route path="/mycart" Component={Cart}/>
        <Route path="/signup" Component={Signup}/>
        <Route path="/login" Component={Login}/>
        <Route path="/verify_phone" Component={VerifyPhone}/>
        <Route path="/verify_id" Component={VerifyID}/>
        <Route path="/requestprogress" Component={RequestProgress}/>
        <Route path="/checkout/ship" Component={CheckoutShip}/>
        <Route path="/checkout/pay" Component={CheckoutPay}/>


      </Routes>
    </div>
  );
}

export default App;
