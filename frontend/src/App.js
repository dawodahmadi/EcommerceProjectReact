import { BrowserRouter as Router } from 'react-router-dom';
import { Route , Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './routes/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';



function App() {

  return (
          <Router >
            <Header />
            <Routes>
              <Route index element={<Home />}/>
            </Routes>
            <Footer />
          </Router>

  );
}

export default App;