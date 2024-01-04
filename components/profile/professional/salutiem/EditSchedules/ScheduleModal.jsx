import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path } from "react-native-svg"
import { stringToTime, timeToString } from '../../../../utilities/FormatoFechaHora';
import { arraysHaveDifferences } from '../../../../utilities/arrayUtils';
import DateTimePicker from '@react-native-community/datetimepicker';
import { updateSchedules } from '../../../../../src/services/servicesRolMedico';
import { useSchedulesContext } from '../../../../../src/context/SchedulesContext';
import { useAuth } from '../../../../../src/context/AuthContext';

const ScheduleModal = ({ visible, onClose, day }) => {
    const {accessToken} = useAuth();
    const { schedules, setSchedules } = useSchedulesContext()
    const [isSaving, setIsSaving] = useState(false);
    const [enableButtonSave, setEnableButtonSave] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [schedulesSelectedToEdit, setSchedulesSelectedToEdit] = useState([])
    const [dataScheduleSelected, setDataScheduleSelected] = useState({ index: null, timeTitle: null })

    const [mostrarSelector, setMostrarSelector] = useState(false);

    useEffect(() => {
        if (schedules[day]) {
            setSchedulesSelectedToEdit(schedules[day]);
        }
    }, [visible]);

    const eliminarHorario = (index) => {
        const newSchedulesToEdit = schedulesSelectedToEdit.filter((_, i) => i !== index);
        setSchedulesSelectedToEdit(newSchedulesToEdit);
        setMostrarSelector(false)
        validateButtonEnable()
    };

    const addNuevaFranja = () => {
        const newFranja = {
            desde: "00:00",
            hasta: "00:00"
        };
        setSchedulesSelectedToEdit([...schedulesSelectedToEdit, newFranja]);
    }

    const changeTimeDesde = (index) => {
        setDataScheduleSelected({ index: index, timeTitle: 'desde' })
        const dateFromString = stringToTime(schedulesSelectedToEdit[index].desde);
        setSelectedDate(dateFromString)
    }
    const changeTimeHasta = (index) => {
        setDataScheduleSelected({ index: index, timeTitle: 'hasta' })
        const dateFromString = stringToTime(schedulesSelectedToEdit[index].hasta);
        setSelectedDate(dateFromString)
    }

    const validarHorarios = () => {
        for (let i = 0; i < schedulesSelectedToEdit.length; i++) {
            for (let j = i + 1; j < schedulesSelectedToEdit.length; j++) {
                const horarioA = schedulesSelectedToEdit[i];
                const horarioB = schedulesSelectedToEdit[j];
                if (horarioA.desde < horarioB.hasta && horarioA.hasta > horarioB.desde) {
                    return true;
                }
            }
        }
        return false;
    };

    const guardarCambios = () => {
        if (validarHorarios()) {
            alert('Los horarios no pueden solaparse.');
            return; // Stop the save process
        }
        fetchUpdateSchedules();
    };

    const fetchUpdateSchedules = async () => {
        setIsSaving(true)
        try {
            const responseDataUpdate = await updateSchedules(day, schedulesSelectedToEdit, accessToken);
            setSchedules(responseDataUpdate);
        } catch (error) {
            console.error('Error al obtener datos del perfil:', error);
        } finally {
            onClose();
            setIsSaving(false)
        }
    };

    const handleDateChange = (event, date) => {
        if (event.type === 'set') {
            const dateEventString = timeToString(date);
            schedulesSelectedToEdit[dataScheduleSelected.index]
            const newSchedulesToEdit = schedulesSelectedToEdit.map((schedules, i) => {
                if (i === dataScheduleSelected.index) { // Modifica el objeto solo si es el índice seleccionado
                    return { ...schedules, [dataScheduleSelected.timeTitle]: dateEventString };
                } else {
                    return schedules; // Devuelve el objeto sin cambios para otros índices
                }
            });
            setSchedulesSelectedToEdit(newSchedulesToEdit);
            validateButtonEnable()
        }
    };

    const closeModal = () => {
        onClose()
        setMostrarSelector(false)
        setDataScheduleSelected({ index: null, timeTitle: null })
        setEnableButtonSave(false);
        setSchedulesSelectedToEdit([]);
    }

    const validateButtonEnable = () => {

        const schedulesOriginals = schedules[day];
        setSchedulesSelectedToEdit((prevSchedules) => {
            const hasEmptySchedule = prevSchedules.some(schedule => (
                schedule.desde === "00:00" && schedule.hasta === "00:00"
            ));
            const arraysDiffer = arraysHaveDifferences(schedulesOriginals, prevSchedules);
            if (!hasEmptySchedule && arraysDiffer) {
                setEnableButtonSave(true);
            } else {
                setEnableButtonSave(false);
            }
            return prevSchedules;
        });
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalView}>
                <View style={styles.modalContent}>
                    <View style={{ marginBottom: 20, fontSize: 18 }}>
                        <Text style={{ fontSize: 18 }}>{day?.charAt(0).toUpperCase() + day?.slice(1)}</Text>
                    </View>

                    {schedulesSelectedToEdit?.length > 0
                        ? schedulesSelectedToEdit?.map((horario, index) => (
                            <View style={styles.row} key={index}>
                                <View>
                                    <Text>de</Text>
                                </View>
                                <View style={styles.inputContainer}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            changeTimeDesde(index)
                                            setMostrarSelector(true);
                                        }}
                                        style={
                                            dataScheduleSelected.index == index && dataScheduleSelected.timeTitle == "desde"
                                                ? styles.inputSelectedStyle
                                                : styles.inputStyle
                                        }
                                    >
                                        <Text style={styles.textInput}>
                                            {horario.desde}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <Text>a</Text>
                                </View>
                                <View style={styles.inputContainer}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            changeTimeHasta(index)
                                            setMostrarSelector(true);
                                        }}
                                        style={
                                            dataScheduleSelected.index == index && dataScheduleSelected.timeTitle == "hasta"
                                                ? styles.inputSelectedStyle
                                                : styles.inputStyle
                                        }
                                    >
                                        <Text style={styles.textInput}>
                                            {horario.hasta}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <TouchableOpacity
                                        onPress={() => eliminarHorario(index)}
                                    >
                                        {/* <Text style={styles.iconClose}>X</Text> */}
                                        <Svg
                                            width={20}
                                            height={20}
                                            viewBox="0 -960 960 960"
                                        >
                                            <Path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" fill="#5f6367" />
                                        </Svg>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))
                        : null
                    }

                    {
                        schedulesSelectedToEdit?.length < 2
                            ?
                            < View style={styles.row}>
                                <View style={styles.inputContainer}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            addNuevaFranja()
                                        }}
                                    >
                                        <Text>
                                            Agregar
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            :
                            null
                    }

                    <View>
                        {mostrarSelector && selectedDate !== null && (
                            <DateTimePicker
                                value={selectedDate}
                                mode="time"
                                is24Hour={true}
                                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                onChange={handleDateChange}
                            />
                        )}
                    </View>

                    <View style={styles.containerActions}>
                        <TouchableOpacity
                            style={
                                enableButtonSave && !isSaving
                                    ? styles.button
                                    : styles.buttonDisabled
                            }
                            onPress={
                                enableButtonSave
                                    ? guardarCambios
                                    : null
                            }
                            disabled={isSaving}
                        >
                        {
                            isSaving
                            ? <Text style={styles.buttonText}>Guardando...</Text>
                            : <Text style={styles.buttonText}>Guardar cambios</Text>
                        }
                            
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.simpleCloseButton} 
                        onPress={() => 
                        {
                            isSaving
                            ? null
                            : closeModal()
                        }} 
                        disabled={isSaving}>
                            <Text style={styles.simpleCloseButtonText}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal >
    );
};

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo negro con opacidad para el overlay
    },
    modalContent: {
        backgroundColor: "white", // Fondo blanco para el contenido del modal
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%', // Ajusta este valor según el ancho que desees para tu modal
    },
    inputContainer: {
        alignItems: 'center', // Centra el texto y el botón verticalmente
        margin: 5, // Espacio alrededor de cada contenedor
        // Otros estilos que necesites
    },
    inputStyle: {
        borderBottomWidth: 1,
        borderColor: '#cccccc',
        padding: 5,
        margin: 5,
        width: 60,
        textAlign: 'center',
        borderRadius: 5,
        backgroundColor: '#ffffff'
    },
    inputSelectedStyle: {
        borderBottomWidth: 1.8,
        borderColor: '#217ac9',
        padding: 5,
        margin: 5,
        width: 60,
    },
    textInput: {
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Ajusta el espaciado entre elementos
        alignItems: 'center', // Alinea los elementos verticalmente

    },
    containerActions: {
        marginTop: 30,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    button: {
        marginTop: 40,
        width: 'auto',
        backgroundColor: '#27b4e4', // Color de fondo
        padding: 10, // Relleno
        borderRadius: 5, // Bordes redondeados
        alignItems: 'center', // Alineación del texto en el botón
    },
    buttonDisabled: {
        marginTop: 40,
        width: 'auto',
        backgroundColor: '#27b4e4', // Color de fondo
        opacity: 0.5,
        padding: 10, // Relleno
        borderRadius: 5, // Bordes redondeados
        alignItems: 'center', // Alineación del texto en el botón
    },
    simpleCloseButton: {
        marginTop: 40,
        color: 'black',
        width: 'auto',
        padding: 10, // Relleno
        borderRadius: 5, // Bordes redondeados
        alignItems: 'center', // Alineación del texto en el botón
    },
    simpleCloseButtonText: {
        color: 'black',
        alignItems: 'center', // Alineación del texto en el botón
        textDecorationLine: 'underline',
    },
    buttonText: {
        color: 'white', // Color del texto
        fontSize: 16, // Tamaño del texto
    },
});

export default ScheduleModal;
