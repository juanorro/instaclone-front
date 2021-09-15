import React from 'react';
import useAuth from '../../hooks/useAuth';
import './Home.scss';

const Home = () => {

    const auth = useAuth();

    return (
        <div>
            <h1>Estamos en la home</h1>
        </div>
    )
}

export default Home
