import { routes } from '../routes/routes';
import { getSessionData } from '../services/session.service';
import {Navigate,Outlet} from 'react-router-dom'

const AuthGuard = ({isProtected = true}) => {
    const email = getSessionData("email")
    return (
        isProtected
            ? Boolean(email)
                ? <Outlet /> : <Navigate to={routes.signin} />
            : !Boolean(email)
                ? <Outlet /> : <Navigate to={routes.home} />
    )
}

export default AuthGuard;