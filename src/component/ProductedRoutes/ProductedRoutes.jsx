import { Navigate } from 'react-router-dom'

export default function ProductedRoutes(props) {

    if( localStorage.getItem('userToken') !== null){
        return props.children
    }

    else{
        return <Navigate to={'/login'} />
    }

}



