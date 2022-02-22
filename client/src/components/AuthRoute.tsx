import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export interface IAuthRouteProps {};

const AuthRoute: React.FunctionComponent<IAuthRouteProps> = props => {
    const { children } = props;
    const auth = getAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        console.log("Rendering...");
        AuthCheck();
        return () => {
            console.log("Cleaning up...");
            AuthCheck();
        }
    }, [loggedIn]);
    /* Why does auth being in the dependency array completely following the
    Video tutorial by the Nerdy Canuck on YouTube still not force the page to
    Render upon signout? */

    const AuthCheck = onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("Logged in");
            setLoading(false);
            setLoggedIn(true);
        } else {
            console.log("Unauthorized");
            setLoggedIn(false);
            navigate('/login');
        }
    });

    if (loading) {
        return <p>Loading...</p>;
    }

    return <>{children}</>;
}

export default AuthRoute;
