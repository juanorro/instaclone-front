import { useContext } from 'react';
import { AuthContext, AuthProvider } from '../contexts/AuthContext';

export default () => useContext(AuthContext);