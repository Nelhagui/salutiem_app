import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUserContext = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [userAddress, setUserAddress] = useState('');
    const [userCoordinates, setUserCoordinates] = useState('');
    const [userDataEdit, setUserDataEdit] = useState({
        name: '',
        apellido: '',
        email: '',
        direccion: '',
        contrasenia: '',
        nuevaContrasenia: '',
        repetirContrasenia: '',
        coordinates: '',
        foto: '',
    });
    return (
        <UserContext.Provider
            value={{
                userAddress,
                setUserAddress,
                userCoordinates,
                setUserCoordinates,
                userDataEdit, 
                setUserDataEdit
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
