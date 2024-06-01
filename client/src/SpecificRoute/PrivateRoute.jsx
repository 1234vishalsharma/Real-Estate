import {useSelector} from 'react-redux';
import { Navigate } from 'react-router-dom'; 
export default function PrivateRoute({children}) {
    const token = useSelector((state) => state.user.currentUser);
    console.log("token hai" ,token);
    if(token != null){
        return children;
    }else{
        return <Navigate to="/Signup"/>
    }
}
