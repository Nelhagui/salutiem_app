import 'react-native-gesture-handler';
import React from 'react';
import { AuthProvider } from './src/context/AuthContext';
import ContainerFilterAuth from './src/navigators/auth/ContainerFilterAuth';



const App = () => {
    return (
        <AuthProvider>
            <ContainerFilterAuth/>
        </AuthProvider>
    );
};

export default App;
