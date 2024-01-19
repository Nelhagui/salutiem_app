import { createContext, useContext, useState } from 'react';

const MapContext = createContext();

export const useMapContext = () => {
    return useContext(MapContext);
};

export const MapProvider = ({ children }) => {
    const [addressSelected, setAddressSelected] = useState('');
    const [specialtySelected, setSpecialtySelected] = useState('');
    return (
        <MapContext.Provider
            value={{
                addressSelected,
                setAddressSelected,
                specialtySelected,
                setSpecialtySelected
            }}
        >
            {children}
        </MapContext.Provider>
    );
};