import Register from "components/Register/Register";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "components/Login/Login";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home/Home";

import Admin from "components/Admin/Admin";

const App = () => {
    
    const padding = {
            padding: 5
        }

    return (
        <Router>
            <div>
                <Link style={padding} to="/login">login</Link>
                <Link style={padding} to="/register">register</Link>
                <Link style={padding} to="/home">home</Link>
                <Link style={padding} to="/admin">admin</Link>
            </div>
            <Routes>
                <Route path="/login"  element={ <Login />} />
                <Route path="/register"  element={ <Register />}/>
                <Route path="/home"  element={ <Home />}/>
                <Route path="/admin"  element={ < Admin />}/>
                <Route path="/"  element={ <Home />}/>
            </Routes>
        </Router>
    )
}
export default App;
