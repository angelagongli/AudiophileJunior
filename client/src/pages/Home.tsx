import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import EmptyStaff from '../components/EmptyStaff';
import MyOwnEmptyStaff from '../components/MyOwnEmptyStaff';

export interface IHomePageProps {};

const HomePage: React.FunctionComponent<IHomePageProps> = props => {
    const auth = getAuth();

    return (
        <div>
            <p>
                Home Page Protected by Firebase
            </p>
            {/* Render an empty staff on the home page */}
            <EmptyStaff />
            {/* <MyOwnEmptyStaff /> */}
            <button onClick={() => signOut(auth)}>
                Sign Out
            </button>
        </div>
    );
};

export default HomePage;
