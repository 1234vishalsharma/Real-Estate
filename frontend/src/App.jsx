import './App.css'
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import UploadProperty from './components/pages/UploadProperty';
import AppBar from './components/utils/AppBar';
import Home from './components/pages/Home';
import {Adminsignup , Adminlogin} from './components/pages/adminPage'
import OpenRoute from './openRoute/openRoute';

function App() {
  return (
    <BrowserRouter>
      <AppBar/>
      <Routes>      
        
        <Route path = '/' element={<Home/>}/>
        <Route path = '/Home' element={<Home/>}/>


          <Route path = '/Login' element={
            <OpenRoute>
              <Login/>
            </OpenRoute>
          }/>

        
        
          <Route path = '/Signup' element={
            <OpenRoute>
              <Signup/>
            </OpenRoute>}/>
        

        <Route path = '/Upload' element={<UploadProperty/>}/>
        <Route path = '/admin/Signup' element={<Adminsignup/>}/>
        <Route path = '/admin/login' element={<Adminlogin/>}/>
      </Routes>
    
    </BrowserRouter>
  )
}

export default App
