import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import API from "../utils/API";
import UserContext from '../utils/UserContext';

export interface IAuthRouteProps {};

const AuthRoute: React.FunctionComponent<IAuthRouteProps> = props => {
    const { children } = props;
    const auth = getAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [ourUser, setOurUser] = useState({});
    // const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        console.log("Rendering...");
        // Copy AuthCheck fix by the Nerdy Canuck, defining the AuthCheck function in the effect:
        // https://github.com/joeythelantern/React-Firebase-9/commit/f74a731b772a12953f2bb430d0a8397fe8409b83
        const AuthCheck = onAuthStateChanged(auth, (authUser) => {
            if (authUser) {
                console.log("Logged in");
                setLoading(false);
                // Why does he setLoading to false when we have not yet set it to true?
                // setLoggedIn(true);
                API.getUserByAuthUID(authUser.uid)
                .then(res => {
                    if (res.data.length) {
                        console.log("Set the user here: ");
                        setOurUser(res.data[0]);
                    } else {
                        API.makeUser({
                            AuthUID: authUser.uid,
                            AuthDisplayName: authUser.displayName
                        }).then(res => {
                            console.log("Created new user in db!");
                        });
                    }
                }).catch(err => console.log(err));
            } else {
                console.log("Unauthorized");
                // setLoggedIn(false);
                navigate('/login');
            }
        });

        return () => {
            console.log("Cleaning up...");
            AuthCheck();
        }
    }, [auth]);

    // useEffect(() => {
    //     console.log("Rendering...");
    //     AuthCheck();
    //     return () => {
    //         console.log("Cleaning up...");
    //         AuthCheck();
    //     }
    // }, [loggedIn]);
    /* Why does auth being in the dependency array completely following the
    Video tutorial by the Nerdy Canuck on YouTube still not force the page to
    Render upon signout? */

    // const AuthCheck = onAuthStateChanged(auth, (user) => {
    //     if (user) {
    //         console.log("Logged in");
    //         setLoading(false);
    //         // setLoggedIn(true);
    //     } else {
    //         console.log("Unauthorized");
    //         // setLoggedIn(false);
    //         navigate('/login');
    //     }
    // });

    if (loading) {
        return <p>Loading...</p>;
    }

    return <UserContext.Provider value={ourUser}>{children}</UserContext.Provider>;
}

export default AuthRoute;
