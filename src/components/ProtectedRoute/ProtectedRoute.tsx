import {FC, ReactNode} from "react";
import {Navigate} from "react-router-dom";

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({children}) => {
    const isAuth = true
    if (!isAuth) {
        return <Navigate to='/'/>
    }
    return (
        <div>
            {children}
        </div>
    );
};

export default ProtectedRoute