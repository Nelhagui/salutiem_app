import { createContext, useContext, useState } from 'react';

const ProfessionalDirectionsContext = createContext();

export const useProfessionalDirectionsContext = () => {
    return useContext(ProfessionalDirectionsContext);
};

export const ProfessionalDirectionsProvider = ({ children }) => {
    const [secondaryAddress, setSecondaryAddress] = useState('');
    const [secondaryCoordinates, setSecondaryCoordinates] = useState('');
    const [mainAddress, setMainAddress] = useState('');
    const [mainCoordinates, setMainCoordinates] = useState('');
    return (
        <ProfessionalDirectionsContext.Provider
            value={{
                secondaryAddress,
                setSecondaryAddress,
                mainAddress,
                setMainAddress,
                secondaryCoordinates,
                setSecondaryCoordinates,
                mainCoordinates,
                setMainCoordinates
            }}
        >
            {children}
        </ProfessionalDirectionsContext.Provider>
    );
};
