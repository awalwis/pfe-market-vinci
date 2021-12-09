import AdListTemp from 'components/Ad/AdListTemp';
import NewAddForm from 'components/Ad/newAdForm';
import AdDetail from 'components/Ad/AdDetail';
import {
  BrowserRouter as Router,
  Route,
  Link,
  useParams,
  Routes,
} from "react-router-dom";



  function App(){
    return(
      <div>
        <Router>
          <Routes>
            <Route path="/ads/:id" element={<AdDetail />} />
            <Route path="/newAd" element={<NewAddForm />} />
            <Route path="/listAd" element={<AdListTemp/>}/>
          </Routes>
        </Router>
      </div>
    )
}

export default App;
