import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Result from './Result';
import Classification from './Classification';
import IdealWeight from './IdealWeight';
import { useState } from 'react';

const FormIMC = () => {
    //Variaveis utilizando useState()
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [imc, setImc] = useState(null);
    const [classificacao, setClassificacao] = useState(null)
    const [pesoMin, setPesoMin] = useState('');
    const [pesoMax, setPesoMax] = useState('');
    const [erroPeso, setErroPeso] = useState('');
    const [erroAltura, setErroAltura] = useState('');
    
    
    //Função de validação
    const validarPeso = (texto) => {

        setPeso(texto.replace(",",".")); //Recebe o valor do input e evita erro de digitação
        const pesoNum = parseFloat(texto); 
        if (isNaN(pesoNum) || pesoNum <= 0 || pesoNum.toString() !== texto.trim()) { //Verifica se ao tirar os espaços(trim), ainda há caracteres ao transformar em strings(toString)
          setErroPeso('Digite um peso válido'); //Resposta em tempo real graças ao useState
        } else {
          setErroPeso(''); //Caso passe na verificação, retorna um valor vazio aceito para o funcionamento do botão
        }
      }
      
      //Função de validação
      const validarAltura = (texto) => {
        setAltura(texto.replace(",",".")); //Recebe o valor do input e evita erro de digitação
        const alturaNum = parseFloat(texto); 
        if (isNaN(alturaNum) || alturaNum <= 0 || alturaNum.toString() !== texto.trim()) { //Verifica se ao tirar os espaços(trim), ainda há caracteres ao trasnformar em strings(toString)
          setErroAltura('Digite uma altura válida'); //Resposta em tempo real graças ao useState
        } else {
          setErroAltura(''); //Caso passe na verificação, retorna um valor vazio aceito para o funcionamento do botão
        }
      }

      //Função para calcular o IMC
    const calcularIMC = () => {
        if (peso && altura) {
            const alturaMetros = parseFloat(altura) / 100; //Transforma o valor em metros
            const imcCalculado = (parseFloat(peso) / (alturaMetros * alturaMetros)).toFixed(2); //Realiza o calculo
            setImc(imcCalculado); //Recebe por meio de useState

            const imcNum = parseFloat(imcCalculado); //Utiliza if e elses para classificar, usa imcNum para evitar erros de useState
            if (imcNum < 18.5) setClassificacao('Abaixo do peso 😟');
            else if (imcNum < 25) setClassificacao('Peso normal 😄');
            else if (imcNum < 30) setClassificacao('Sobrepeso 😐');
            else if (imcNum < 35) setClassificacao('Obesidade Grau I 😟');
            else if (imcNum < 40) setClassificacao('Obesidade Grau II 😣');
            else setClassificacao('Obesidade Grau III 😣');
        }
    };

    //Função para calcular o peso
    const pesoIdeal = () => {
        if (peso && altura) {
            const alturaMetros = parseFloat(altura) / 100; //Transforma o valor em metros
            setPesoMin((18.5 * (alturaMetros * alturaMetros)).toFixed(2)); //Realiza os calculos
            setPesoMax((24.9 * (alturaMetros * alturaMetros)).toFixed(2));
        }
    }

    //Função para limpar os campos, reinicializando-os
    const limparCampos = () => {
        setPeso('');
        setAltura('');
        setImc(null);
        setClassificacao(null);
        setPesoMin('');
        setPesoMax('');
    }
    
    //Função que agrupa outras funções para funcionamento do botão
    const botao = () => {
        if (erroPeso != '' || erroAltura != '') { //Caso passe na verificação, realiza as funções / Caso não passe, reinicia os valores e impede funcionamento
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
                value={peso} //Recebe como parametro peso
                onChangeText={validarPeso} //Inicia função de validação
            />
            {erroPeso ? <Text style={styles.erro}>{erroPeso}</Text> : null} 
            {/*Caso a função de validação retorne um valor não nulo, identificado por meio de um for each, aparece a mensagem de erro */}

            <TextInput
                style={styles.input}
                placeholder="Altura (cm)"
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={altura} //Recebe como parametro altura
                onChangeText={validarAltura} //Inicia função de validação
            />
            {erroAltura ? <Text style={styles.erro}>{erroAltura}</Text> : null}
            {/*Caso a função de validação retorne um valor não nulo, identificado por meio de um for each, aparece a mensagem de erro */}


            {/* Criação dos botões que chamam as funções criadas, utiliza TouchableOpacity para responsividade*/}
            <TouchableOpacity style={styles.button} onPress={botao}> 
                <Text style={styles.buttonText}>Calcular IMC</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={limparCampos}>
                <Text style={styles.buttonText}>Limpar</Text>
            </TouchableOpacity>

            {/*Utiliza os valores e inicializa as funções dos componentes gráficos */}
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
