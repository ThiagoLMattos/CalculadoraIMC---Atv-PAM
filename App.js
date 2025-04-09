import { StyleSheet, View } from 'react-native';
import Title from './src/components/Title';
import FormIMC from './src/components/FormIMC';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';


//Componente principal que inicializa as funções
//Utiliza TouchableWithoutFeedback para funcionamento em sistemas que possuem a opção manual de retirar o teclado
export default function App() {
  return (
    
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Title /> 
        <FormIMC />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#DFF5EA',
  },
});
