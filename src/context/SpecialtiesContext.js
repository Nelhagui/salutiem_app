import { createContext, useContext, useState } from 'react';

const SpecialtiesContext = createContext();

export const useSpecialtiesContext = () => {
    return useContext(SpecialtiesContext);
};

export const SpecialtiesProvider = ({ children }) => {
    const [specialties, setSpecialties] = useState([]);
    return (
        <SpecialtiesContext.Provider
            value={{
                specialties,
                setSpecialties
            }}
        >
            {children}
        </SpecialtiesContext.Provider>
    );
};
