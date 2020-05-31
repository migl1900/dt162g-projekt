import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

// Import all needed components
import Navbar from './components/navbar.js';
import TrainingsList from './components/trainingslist.js';
import CreateTraining from './components/createtraining.js';
import EditTraining from './components/edittraining.js';
import CreateUser from './components/createuser.js';
import EditUser from './components/edituser.js';
import Banner from "./components/banner.js";
import Footer from "./components/footer.js";

// Create app
function App() {
  return (
    <Router>
      <Navbar />
      <Banner />
      <Route path="/" exact component={TrainingsList} />
      <Route path="/createtraining" component={CreateTraining} />
      <Route path="/edittraining/:id" component={EditTraining} />
      <Route path="/createuser" component={CreateUser} />
      <Route path="/edituser/:id" component={EditUser} />
      <Footer />
    </Router>
  );
}

export default App;
