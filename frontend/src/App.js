import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import './App.css';

// Import your components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// Import your main views or pages
import Home from './views/Home/Home';
import About from './views/About/About';   // Assuming you have this view
import Contact from './views/Contact/Contact'; // Assuming you have this view

function App() {
    return (
      <div>
        <h1>Testing...</h1>
        <Router>
          <div className="App">
            <Header />
  
            <Routes>
              <Route path="/" exact component={Home} />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              {/* Add other routes as needed */}
            </Routes>
  
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
  
  export default App;