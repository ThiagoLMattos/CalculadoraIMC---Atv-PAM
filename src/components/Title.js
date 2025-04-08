import { Text, StyleSheet } from 'react-native';

const Title = () => {
    return (
        <Text style={styles.title}>🌿Calculadora de IMC🍃</Text>
    );
};

const styles = StyleSheet.create ({
    title: {
        fontSize: 30 ,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 24,
        color: '#1E392A',
    },
});

export default Title;

