import Socialmediafront from './Socialmediafront';
// import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Logout from './components/Logout';
import HomeLoginUser from './components/HomeLoginUser';
import UserProfile from './components/UserProfile';
import {Route} from "react-router-dom";
import Mypost from "./components/Mypost"
import Savedpost from "./components/Savedpost";
import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css'
function App() {
  return (
    <>
    {/* <Navbar /> */}
    <Route exact path="/" >
    <Socialmediafront />
    </Route>

    <Route exact path="/Login" >
    <Login />
    </Route>

    <Route  exact path="/Signup">
    <Signup />
    </Route>

    <Route  exact path="/LoginUser">
    <HomeLoginUser />
    </Route>

    <Route  exact path="/logout">
    <Logout />
    </Route>
    <Route  exact path="/userProfile">
    <UserProfile />
    </Route>
    <Route  exact path="/mypost">
    <Mypost />
    </Route>
    <Route  exact path="/savedpost">
    <Savedpost />
    </Route>
    </>
  );
}

export default App;
