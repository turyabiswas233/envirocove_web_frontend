import "./App.css";
import Login from "./components/Login";
import Onboard from "./components/Onboard";
import Consumer from "./components/Consumer";
import Product from "./components/Product";
import Cart from "./components/Cart";
import CheckoutPay from "./components/CheckoutPay";
import CheckoutShip from "./components/CheckoutShip";
function App() {
  return (
    <>
      <div className="grid gap-10 bg-gray-400 md:grid-cols-2">
        <Login />
        <Onboard />
        <Consumer />
        <Product />
        <Cart />
        <CheckoutPay />
        <CheckoutShip />
      </div>
    </>
  );
}

export default App;
