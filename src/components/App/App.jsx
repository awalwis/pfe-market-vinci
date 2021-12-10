import AdListTemp from 'components/Ad/AdListTemp';
import NewAddForm from 'components/Ad/newAdForm';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import AdUpdate from 'components/Ad/AdUpdate';




  function App(){
    return(
      <div>
        <Router>
          <Routes>
            <Route path="/ads/:id" element={<AdUpdate />} />
            <Route path="/newAd" element={<NewAddForm />} />
            <Route path="/listAd" element={<AdListTemp/>}/>
          </Routes>
        </Router>
      </div>
    )
}
export default App;
