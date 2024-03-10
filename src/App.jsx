import "./App.css";
import Login from "./components/Login";
import Onboard from "./components/Onboard";
import Consumer from "./components/Consumer";
import Product from "./components/Product";
function App() {
  return (
    <>
      <div>
        <Login />
        <Onboard />
        <Consumer />
        <Product />
      </div>
    </>
  );
}

export default App;
