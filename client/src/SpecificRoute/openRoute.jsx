import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function OpenRoute({children}){
    
    const token = useSelector((state) => state.user.currentUser);
    if(token != null){
        <Navigate  to='/'/>    
    }else{
        return children;
    }
}

export default OpenRoute;