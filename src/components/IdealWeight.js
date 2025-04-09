import React from 'react';
import { Text, StyleSheet} from 'react-native';

//Componente gráfico para o peso ideal
const IdealWeight = ({pesoMin, pesoMax}) => {
    return (
        <Text style={style.result}>Seu peso ideal é entre: {pesoMin}kg e {pesoMax}kg </Text>
    );
};

const style = StyleSheet.create ({
    result: {
        marginTop: 20,
        fontSize: 24,
        textAlign: 'center',
        color: '#333',
    },
});

export default IdealWeight;
