import Register from "components/Register/Register";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "components/Login/Login";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home/Home";
import AdNewForm from "components/Ad/AdNewForm";

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
                <Link style={padding} to="/newAd">Ajout annonce</Link>
            </div>
            <Routes>
                <Route path="/login"  element={ <Login />} />
                <Route path="/register"  element={ <Register />}/>
                <Route path="/home"  element={ <Home />}/>
                <Route path="/"  element={ <Home />}/>
                <Route path="/newAd"  element={ <AdNewForm />}/>
            </Routes>
        </Router>
    )
}
export default App;
