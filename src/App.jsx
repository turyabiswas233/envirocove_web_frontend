import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
const TOKEN = localStorage.getItem("TOKEN");
function App() {
  const loc = useLocation()
  console.log(loc.state);
  if(loc.state?.adminError == 'You are not a vendor user') {
    alert(loc.state?.adminError);
    window.history.replaceState({},'')
  }
  
  return (
    <div className="w-auto max-w-screen-md mx-auto">
      <Outlet context={{ TOKEN: TOKEN }} />
    </div>
  );
}

export default App;

/*
admin
US: ashraful
pw: helloworld

vendor
US: turya
@: turya@gmail.com
PW: Turya012


*/