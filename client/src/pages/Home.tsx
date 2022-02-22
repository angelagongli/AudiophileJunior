import React from 'react';
import { getAuth, signOut } from 'firebase/auth';

export interface IHomePageProps {};

const HomePage: React.FunctionComponent<IHomePageProps> = props => {
    const auth = getAuth();

    return (
        <div>
            <p>
                Home Page Protected by Firebase
            </p>
            <button onClick={() => signOut(auth)}>
                Sign Out
            </button>
        </div>
    );
};

export default HomePage;
