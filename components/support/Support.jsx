import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Support = () => {
    const [visibleAnswer, setVisibleAnswer] = useState(null);

    const questions = [
        { id: 1, q: '¿Cómo restablezco mi contraseña?', a: 'Para restablecer tu contraseña...' },
        { id: 2, q: '¿Dónde encuentro mi factura?', a: 'Puedes encontrar tu factura en...' },
        // ... más preguntas y respuestas
    ];

    const toggleAnswer = (id) => {
        if (visibleAnswer === id) {
            setVisibleAnswer(null);
        } else {
            setVisibleAnswer(id);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.headerText}>Centro de Soporte</Text>
            {questions.map(({ id, q, a }) => (
                <View key={id} style={styles.questionContainer}>
                    <TouchableOpacity onPress={() => toggleAnswer(id)}>
                        <Text style={styles.question}>{q}</Text>
                    </TouchableOpacity>
                    {visibleAnswer === id && <Text style={styles.answer}>{a}</Text>}
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    headerText: {
        textAlign: 'center',
        fontSize: 20,
        marginVertical: 20,
    },
    questionContainer: {
        marginBottom: 15,
        marginTop: 10,
        borderWidth: .5,
        padding: 9,
        borderRadius: 5,
    },
    question: {
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center',
        marginBottom: 10,
        fontSize: 17
    },
    answer: {
        marginTop: 5,
        textAlign: 'center', 
    },
});

export default Support;
