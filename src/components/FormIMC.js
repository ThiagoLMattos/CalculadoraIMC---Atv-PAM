import { View, TextInput, Button, StyleSheet} from 'react-native';
import Result from './Result';
import Classification from './Classification';
import IdealWeight from './IdealWeight';
import { useState } from 'react';

const formIMC = () => {
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [imc, setImc] = useState(null);
    const [classificacao, setClassificacao] = useState(null)
    const [pesoMin, setPesoMin] = useState('');
    const [pesoMax, setPesoMax] = useState('');


    const calcularIMC = () => {
        if (peso && altura) {
            const alturaMetros = parseFloat(altura) / 100;
            const imcCalculado = (parseFloat(peso) / (alturaMetros * alturaMetros)).toFixed(2);
            setImc(imcCalculado);
        }
    }
    
    const classificarIMC = () => {
                
        if (imc < 18.5) {
            setClassificacao('Abaixo do peso');
        }
        if (imc >= 18.5 && imc < 25) {
            setClassificacao('Peso normal');
        }
        if (imc >= 25 && imc < 30) {
            setClassificacao('Sobrepeso');
        }
        if (imc >= 30 && imc < 35) {
            setClassificacao('Obesidade Grau I');
        }
        if (imc >= 35 && imc < 40) {
            setClassificacao('Obesidade Grau II');
        }
        if (imc>= 40) {
            setClassificacao('Obesidade Grau III');
        }
    }

    const pesoIdeal = () => {
        if (peso && altura) {
            const alturaMetros = parseFloat(altura) / 100;
            setPesoMin(18.5*(alturaMetros*alturaMetros));
            setPesoMin(24.9*(alturaMetros*alturaMetros));
        }
    }
    
    
    const botao = () => {
        calcularIMC();
        classificarIMC();
        pesoIdeal();
    }
    
    
    ;

    return (
        <View style={StyleSheet.formContainer}>
            <TextInput 
                style={style.input}
                placeholder="Peso (kg)"
                keyboardType="numeric"
                value={peso}
                onChangeText={setPeso}
            />
            <TextInput
                style={style.input}
                placeholder='Altura (cm)'
                keyboardType='numeric'
                value={altura}
                onChangeText={setAltura}
            />
            <Button title="Calcular IMC" onPress={botao} />
            {imc && <Result imc={imc} />}
            {classificacao && <Classification classIMC={classificacao} />}
            {pesoMin && pesoMax && <IdealWeight pesoMin={pesoMin} pesoMax={pesoMax} />}
        </View>    
    );
};

const style = StyleSheet.create({
    formContainer: {
        backgroundColor: '#f0f0f0',
        padding: 16,
        borderRadius: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBlock: 12,
        paddingHorizontal: 8,
        borderRadius: 5,
    },
});

export default formIMC;
