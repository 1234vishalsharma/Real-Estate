import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function OpenRoute({children}){
    
    const token = useSelector((state) => state.user.currentUser);
    if(token != null){
        return <Navigate  to ='/Home'/>    
    }else{
        return children;
    }
}

export default OpenRoute;