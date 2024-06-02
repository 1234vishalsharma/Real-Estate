import './App.css'
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Header from './components/Header';
import About from './pages/About';
import Profile from './pages/Profile';
import OpenRoute from './SpecificRoute/openRoute'
import PrivateRoute from './SpecificRoute/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Home" element={<Home/>}/>
        
          <Route path="/Signin" element={
            <OpenRoute>
              <Signin/>
            </OpenRoute>}/>       
        
        
          <Route path="/Signup" element={
            <OpenRoute>
              <Signup/>
            </OpenRoute>}/>
        
        <Route path="/profile" element={
          <PrivateRoute>
            <Profile/>
          </PrivateRoute>}/>
        <Route path="/about" element={<About/>}/>
      </Routes>
  </BrowserRouter>
  )
}


export default App
