import { View, TextInput, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import Result from './Result';
import Classification from './Classification';
import IdealWeight from './IdealWeight';
import { useState } from 'react';

const FormIMC = () => {
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [imc, setImc] = useState(null);
    const [classificacao, setClassificacao] = useState(null)
    const [pesoMin, setPesoMin] = useState('');
    const [pesoMax, setPesoMax] = useState('');
    const [erroPeso, setErroPeso] = useState('');
    const [erroAltura, setErroAltura] = useState('');
    

    const validarPeso = (texto) => {
        setPeso(texto);
        const pesoNum = parseFloat(texto);
        if (isNaN(pesoNum) || pesoNum <= 0 || pesoNum.toString() !== texto.trim()) {
          setErroPeso('Digite um peso válido');
        } else {
          setErroPeso('');
        }
      }
      
      const validarAltura = (texto) => {
        setAltura(texto);
        const alturaNum = parseFloat(texto);
        if (isNaN(alturaNum) || alturaNum <= 0 || alturaNum.toString() !== texto.trim()) {
          setErroAltura('Digite uma altura válida');
        } else {
          setErroAltura('');
        }
      }

    const calcularIMC = () => {
        if (peso && altura) {
            const alturaMetros = parseFloat(altura) / 100;
            const imcCalculado = (parseFloat(peso) / (alturaMetros * alturaMetros)).toFixed(2);
            setImc(imcCalculado);

            const imcNum = parseFloat(imcCalculado);
            if (imcNum < 18.5) setClassificacao('Abaixo do peso 😟');
            else if (imcNum < 25) setClassificacao('Peso normal 😄');
            else if (imcNum < 30) setClassificacao('Sobrepeso 😐');
            else if (imcNum < 35) setClassificacao('Obesidade Grau I 😟');
            else if (imcNum < 40) setClassificacao('Obesidade Grau II 😣');
            else setClassificacao('Obesidade Grau III 😣');
        }
    };

    const pesoIdeal = () => {
        if (peso && altura) {
            const alturaMetros = parseFloat(altura) / 100;
            setPesoMin((18.5 * (alturaMetros * alturaMetros)).toFixed(2));
            setPesoMax((24.9 * (alturaMetros * alturaMetros)).toFixed(2));
        }
    }

    const limparCampos = () => {
        setPeso('');
        setAltura('');
        setImc(null);
        setClassificacao(null);
        setPesoMin('');
        setPesoMax('');
    }
    
    
    const botao = () => {
        if (erroPeso != '' || erroAltura != '') {
            setImc(null);
            setClassificacao(null);
            setPesoMin('');
            setPesoMax('');
            return;
        }
        calcularIMC();
        pesoIdeal();
    };
    

    return (
        <View style={styles.formContainer}>
            <TextInput
                style={styles.input}
                placeholder="Peso (kg)"
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={peso}
                onChangeText={validarPeso}
            />
            {erroPeso ? <Text style={styles.erro}>{erroPeso}</Text> : null}

            <TextInput
                style={styles.input}
                placeholder="Altura (cm)"
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={altura}
                onChangeText={validarAltura}
            />
            {erroAltura ? <Text style={styles.erro}>{erroAltura}</Text> : null}


            <TouchableOpacity style={styles.button} onPress={botao}>
                <Text style={styles.buttonText}>Calcular IMC</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={limparCampos}>
                <Text style={styles.buttonText}>Limpar</Text>
            </TouchableOpacity>

            {imc && <Result imc={imc} />}
            {classificacao && <Classification classIMC={classificacao} />}
            {pesoMin && pesoMax && <IdealWeight pesoMin={pesoMin} pesoMax={pesoMax} />}
        </View>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        backgroundColor: '#E9F7EF',
        padding: 24,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    input: {
        height: 48,
        borderColor: '#A3D9A5',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 12,
        backgroundColor: '#FFFFFF',
        color: '#333',
    },
    button: {
        backgroundColor: '#2ECC71',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    erro: {
        color: 'red',
        marginBottom: 8,
        marginTop: -8,
        fontSize: 14,
      },
});

export default FormIMC;
