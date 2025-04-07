import React from 'react';
import { Text, StyleSheet} from 'react-native';

const IdealWeight = ({pesoMin, pesoMax}) => {
    return (
        <Text style={style.result}>Seu pesoideal é entre: {pesoMin} e {pesoMax} </Text>
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
