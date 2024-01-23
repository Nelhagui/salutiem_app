import { createContext, useContext, useState } from 'react';

const LoginRegisterContext = createContext();

export const LoginRegisterProvider = ({ children }) => {
    const [isProfessional, setIsProfessional] = useState(false);
    const [addressRegister, setAddressRegister] = useState('');
    const [coordinatesRegister, setCoordinatesRegister] = useState('');
    const values = {
        isProfessional, setIsProfessional,
        addressRegister, setAddressRegister,
        coordinatesRegister, setCoordinatesRegister
    };
    return <LoginRegisterContext.Provider value={values}>{children}</LoginRegisterContext.Provider>;
};


export const useLoginRegister = () => {
    const context = useContext(LoginRegisterContext);

    if (!context) {
        throw new Error('useLoginRegister debe ser utilizado dentro de un LoginRegisterProvider');
    }

    return context;
};
