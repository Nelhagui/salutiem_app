import { createContext, useContext, useState } from 'react';

const SchedulesContext = createContext();

export const useSchedulesContext = () => {
    return useContext(SchedulesContext);
};

export const SchedulesProvider = ({ children }) => {
    const [schedules, setSchedules] = useState([]);

    const updateSchedules = (newSchedules) => {
        setSchedules(newSchedules);
    };

    const editSchedule = (day, updatedSchedule) => {
        setSchedules((prevSchedules) =>
            prevSchedules.map((schedule) => (schedule.day === day ? updatedSchedule : schedule))
        );
    };
    
    return (
        <SchedulesContext.Provider
            value={{
                schedules,
                updateSchedules,
                setSchedules
            }}
        >
            {children}
        </SchedulesContext.Provider>
    );
};
