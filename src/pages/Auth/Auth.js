import React, { useState } from 'react';
import { Container, Image } from 'semantic-ui-react';
import Logo from '../../assets/png/logo.png';
import './Auth.scss';
import RegisterForm from '../../components/Auth/RegisterForm';
import LoginForm from '../../components/Auth/LoginForm';

const Auth = () => {

    const [ showLogin, setShowLogin ] = useState(true);

    return (
        <Container fluid className="auth">
            <Image src={Logo} />

            <div className="container-form">
                {showLogin ? <LoginForm /> : <RegisterForm setShowLogin={setShowLogin} /> }
            </div>

            <div className="change-form">
                {showLogin ? (
                    <>
                        ¿No tienes cuenta?
                        <span onClick={() => setShowLogin(!showLogin)}>Registrate</span>
                    </>
                ) : (
                    <>
                        ¡Entra con tu cuenta!
                        <span onClick={() => setShowLogin(!showLogin)}>Inicia sesión</span>
                    </>
                )}
                
            </div>

        </Container>
    )
};

export default Auth;