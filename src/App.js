import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import './App.css';
import Signup from './pages/Signup';
import SignUpSignin from './componants/SignupSignin';
import Header from './componants/Header';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

import Dashboard from './pages/Dashboard';
function App() {
  return (
    <>
    <ToastContainer/>
      <Router>
      <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </Router>
     
    </>
    
  );
}

export default App;
