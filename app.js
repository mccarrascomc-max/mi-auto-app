import { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';

export default function App() {
  const [pantalla, setPantalla] = useState('inicio');

  const [kilometraje, setKilometraje] = useState('');
  const [litros, setLitros] = useState('');
  const [precio, setPrecio] = useState('');
  const [tipoCarga, setTipoCarga] = useState('');

  const guardarRegistro = () => {
	if (!kilometraje || !litros || !precio || !tipoCarga) {
  	Alert.alert('Faltan datos', 'Completa todos los campos antes de guardar.');
  	return;
	}

	Alert.alert(
  	'Registro guardado',
  	`Kilometraje: ${kilometraje} km\nLitros: ${litros} L\nPrecio: $${precio}\nTipo: ${tipoCarga}`
	);

	setKilometraje('');
	setLitros('');
	setPrecio('');
	setTipoCarga('');
	setPantalla('inicio');
  };

  if (pantalla === 'formulario') {
	return (
  	<View style={styles.container}>
    	<Text style={styles.title}>Registrar combustible</Text>
    	<Text style={styles.subtitle}>Ingresa los datos de la carga</Text>

    	<TextInput
      	style={styles.input}
      	placeholder="Kilometraje actual"
      	keyboardType="numeric"
      	value={kilometraje}
      	onChangeText={setKilometraje}
    	/>

    	<TextInput
      	style={styles.input}
      	placeholder="Litros cargados"
      	keyboardType="numeric"
      	value={litros}
      	onChangeText={setLitros}
    	/>

    	<TextInput
      	style={styles.input}
      	placeholder="Precio total"
      	keyboardType="numeric"
      	value={precio}
      	onChangeText={setPrecio}
    	/>

    	<Text style={styles.sectionTitle}>Tipo de carga</Text>

    	<TouchableOpacity
      	style={[
        	styles.optionButton,
        	tipoCarga === 'Carga completa' && styles.optionSelectedFull,
      	]}
      	onPress={() => setTipoCarga('Carga completa')}
    	>
      	<Text
        	style={[
          	styles.optionText,
          	tipoCarga === 'Carga completa' && styles.optionTextSelected,
        	]}
      	>
        	Carga completa
      	</Text>
    	</TouchableOpacity>

    	<TouchableOpacity
      	style={[
        	styles.optionButton,
        	tipoCarga === 'Carga parcial' && styles.optionSelectedPartial,
      	]}
      	onPress={() => setTipoCarga('Carga parcial')}
    	>
      	<Text
        	style={[
          	styles.optionText,
          	tipoCarga === 'Carga parcial' && styles.optionTextSelected,
        	]}
      	>
        	Carga parcial
      	</Text>
    	</TouchableOpacity>

    	<TouchableOpacity style={styles.button} onPress={guardarRegistro}>
      	<Text style={styles.buttonText}>Guardar registro</Text>
    	</TouchableOpacity>

    	<TouchableOpacity
      	style={styles.backButton}
      	onPress={() => setPantalla('inicio')}
    	>
      	<Text style={styles.backButtonText}>Volver</Text>
    	</TouchableOpacity>
  	</View>
	);
  }

  return (
	<View style={styles.container}>
  	<Text style={styles.title}>Mi Auto</Text>
  	<Text style={styles.subtitle}>Control de mantenimiento y combustible</Text>

  	<View style={styles.card}>
    	<Text style={styles.cardTitle}>Próximas mantenciones</Text>
    	<Text style={styles.item}>🛢️ Cambio de aceite</Text>
    	<Text style={styles.item}>🌬️ Filtro de aire</Text>
  	</View>

  	<View style={styles.card}>
    	<Text style={styles.cardTitle}>Combustible</Text>
    	<Text style={styles.item}>⛽ Carga completa</Text>
    	<Text style={styles.item}>⛽ Carga parcial</Text>
  	</View>

  	<TouchableOpacity
    	style={styles.button}
    	onPress={() => setPantalla('formulario')}
  	>
    	<Text style={styles.buttonText}>Agregar registro</Text>
  	</TouchableOpacity>
	</View>
  );
}

const styles = StyleSheet.create({
  container: {
	flex: 1,
	padding: 24,
	backgroundColor: '#f3f4f6',
	justifyContent: 'center',
  },
  title: {
	fontSize: 34,
	fontWeight: 'bold',
	textAlign: 'center',
	color: '#111827',
	marginBottom: 8,
  },
  subtitle: {
	fontSize: 16,
	textAlign: 'center',
	color: '#6b7280',
	marginBottom: 30,
  },
  sectionTitle: {
	fontSize: 18,
	fontWeight: 'bold',
	color: '#111827',
	marginBottom: 12,
	marginTop: 8,
  },
  card: {
	backgroundColor: '#ffffff',
	padding: 20,
	borderRadius: 16,
	marginBottom: 16,
	elevation: 3,
  },
  cardTitle: {
	fontSize: 20,
	fontWeight: 'bold',
	color: '#111827',
	marginBottom: 12,
  },
  item: {
	fontSize: 16,
	color: '#374151',
	marginBottom: 8,
  },
  input: {
	backgroundColor: '#ffffff',
	padding: 16,
	borderRadius: 12,
	marginBottom: 12,
	fontSize: 16,
	borderWidth: 1,
	borderColor: '#e5e7eb',
  },
  button: {
	backgroundColor: '#2563eb',
	padding: 16,
	borderRadius: 14,
	marginTop: 10,
  },
  buttonText: {
	color: '#ffffff',
	fontSize: 16,
	fontWeight: 'bold',
	textAlign: 'center',
  },
  backButton: {
	padding: 16,
	marginTop: 12,
  },
  backButtonText: {
	textAlign: 'center',
	color: '#2563eb',
	fontSize: 16,
	fontWeight: 'bold',
  },
  optionButton: {
	backgroundColor: '#ffffff',
	padding: 14,
	borderRadius: 12,
	marginBottom: 10,
	borderWidth: 1,
	borderColor: '#d1d5db',
  },
  optionSelectedFull: {
	backgroundColor: '#16a34a',
	borderColor: '#16a34a',
  },
  optionSelectedPartial: {
	backgroundColor: '#f59e0b',
	borderColor: '#f59e0b',
  },
  optionText: {
	color: '#111827',
	textAlign: 'center',
	fontWeight: 'bold',
  },
  optionTextSelected: {
	color: '#ffffff',
  },
});
