import client from './config/apollo.config';
import { ApolloProvider } from '@apollo/client';
import Auth from './pages/Auth/';
import { useState, useEffect, useMemo } from 'react';
import { ToastContainer } from 'react-toastify';
import { getToken, decodeToken } from './utils/token';
import { AuthContext } from './contexts/AuthContext';
import { Navigation } from './routes/Navigation';

const App = () => {

  const [auth, setAuth] = useState();

  useEffect(() => {
    const token = getToken()

    if(!token) {
      setAuth(null)
    } else {
      setAuth(decodeToken(token))
    }
  }, [])

  const logout = () => {
    console.log('Deslogueo')
  };

  const setUser = (user) => {
    setAuth(user);
  }

  const authData = useMemo(
    () => ({
      auth,
      logout,
      setUser
    }),
    [auth]
  ); 

  if(auth === undefined) return null;

  return (
    <ApolloProvider client={client} >
      <AuthContext.Provider value={authData}>
        {!auth ? <Auth /> : <Navigation /> }
        <ToastContainer 
          position='top-right'
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;