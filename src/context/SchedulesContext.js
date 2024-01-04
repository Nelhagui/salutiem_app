import { createContext, useContext, useState } from 'react';

const SchedulesContext = createContext();

export const useSchedulesContext = () => {
    return useContext(SchedulesContext);
};

export const SchedulesProvider = ({ children }) => {
    const [schedules, setSchedules] = useState([]);
    return (
        <SchedulesContext.Provider
            value={{
                schedules,
                setSchedules
            }}
        >
            {children}
        </SchedulesContext.Provider>
    );
};