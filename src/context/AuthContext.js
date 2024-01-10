// AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isProfessional, setIsProfessional] = useState(false);
    const [user, setUser] = useState(null)
    const [accessToken, setAccessToken] = useState(null)

    const logout = () => {
        setAccessToken(null);
    };

    const setCredentials = (credentials) => {
        setAccessToken(credentials?.token);
        setUser(credentials?.user);
        setIsProfessional(credentials?.esMedico);
    }

    const values = {
        setCredentials,
        accessToken,
        user,
        isProfessional,
        logout,
    };

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};


export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
    }

    return context;
};
