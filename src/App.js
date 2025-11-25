import './App.css';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './screens/Login';
import Signup from './screens/Signup';
import Dashboard from './screens/Dashboard';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
