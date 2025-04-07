import React from 'react';
import { Text, StyleSheet} from 'react-native';

const Result = ({imc}) => {
    return (
        <Text style={style.result}>Seu IMC é de: {imc}</Text>
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

export default Result;
