import { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';

export default function App() {
  const [pantalla, setPantalla] = useState('inicio');

  const [kilometraje, setKilometraje] = useState('');
  const [litros, setLitros] = useState('');
  const [precio, setPrecio] = useState('');
  const [tipoCarga, setTipoCarga] = useState('');

  const [registros, setRegistros] = useState([]);

  const guardarRegistro = () => {
	if (!kilometraje || !litros || !precio || !tipoCarga) {
  	Alert.alert('Faltan datos', 'Completa todos los campos antes de guardar.');
  	return;
	}

	const kmNumero = Number(kilometraje);
	const litrosNumero = Number(litros);
	const precioNumero = Number(precio);

	if (isNaN(kmNumero) || isNaN(litrosNumero) || isNaN(precioNumero)) {
  	Alert.alert('Datos inválidos', 'Kilometraje, litros y precio deben ser números.');
  	return;
	}

	if (kmNumero <= 0 || litrosNumero <= 0 || precioNumero <= 0) {
  	Alert.alert('Datos inválidos', 'Los valores deben ser mayores a cero.');
  	return;
	}

	const ultimoRegistro = registros[0];

	let consumoCalculado = null;
	let mensajeCalculo = 'No se calcula consumo para este registro.';

	if (
  	ultimoRegistro &&
  	ultimoRegistro.tipoCarga === 'Carga completa' &&
  	tipoCarga === 'Carga completa'
	) {
  	const kmRecorridos = kmNumero - ultimoRegistro.kilometraje;

  	if (kmRecorridos > 0) {
    	consumoCalculado = kmRecorridos / litrosNumero;
    	mensajeCalculo = `Consumo calculado: ${consumoCalculado.toFixed(2)} km/L`;
  	} else {
    	mensajeCalculo = 'No se pudo calcular: el kilometraje debe ser mayor al registro anterior.';
  	}
	}

	if (
  	ultimoRegistro &&
  	ultimoRegistro.tipoCarga !== 'Carga completa' &&
  	tipoCarga === 'Carga completa'
	) {
  	mensajeCalculo =
    	'No se calculó consumo porque la carga anterior no fue completa.';
	}

	if (tipoCarga === 'Carga parcial') {
  	mensajeCalculo =
    	'Carga parcial registrada. No se calcula consumo en cargas parciales.';
	}

	const nuevoRegistro = {
  	id: Date.now().toString(),
  	fecha: new Date().toLocaleDateString(),
  	kilometraje: kmNumero,
  	litros: litrosNumero,
  	precio: precioNumero,
  	tipoCarga,
  	consumo: consumoCalculado,
  	mensaje: mensajeCalculo,
	};

	setRegistros([nuevoRegistro, ...registros]);

	Alert.alert('Registro guardado', mensajeCalculo);

	setKilometraje('');
	setLitros('');
	setPrecio('');
	setTipoCarga('');
	setPantalla('inicio');
  };

  if (pantalla === 'formulario') {
	return (
  	<ScrollView contentContainerStyle={styles.container}>
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

    	<View style={styles.infoBox}>
      	<Text style={styles.infoText}>
        	El consumo solo se calcula si la carga anterior y la carga actual son completas consecutivas.
      	</Text>
    	</View>

    	<TouchableOpacity style={styles.button} onPress={guardarRegistro}>
      	<Text style={styles.buttonText}>Guardar registro</Text>
    	</TouchableOpacity>

    	<TouchableOpacity
      	style={styles.backButton}
      	onPress={() => setPantalla('inicio')}
    	>
      	<Text style={styles.backButtonText}>Volver</Text>
    	</TouchableOpacity>
  	</ScrollView>
	);
  }

  return (
	<ScrollView contentContainerStyle={styles.container}>
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

  	<View style={styles.historyContainer}>
    	<Text style={styles.historyTitle}>Historial de combustible</Text>

    	{registros.length === 0 ? (
      	<Text style={styles.emptyText}>Aún no hay registros.</Text>
    	) : (
      	registros.map((registro) => (
        	<View key={registro.id} style={styles.historyCard}>
          	<Text style={styles.historyMain}>
            	{registro.tipoCarga === 'Carga completa' ? '🟢' : '🟡'} {registro.tipoCarga}
          	</Text>

          	<Text style={styles.historyText}>Fecha: {registro.fecha}</Text>
          	<Text style={styles.historyText}>Kilometraje: {registro.kilometraje} km</Text>
          	<Text style={styles.historyText}>Litros: {registro.litros} L</Text>
          	<Text style={styles.historyText}>Precio: ${registro.precio}</Text>

          	{registro.consumo ? (
            	<Text style={styles.consumoText}>
              	Consumo: {registro.consumo.toFixed(2)} km/L
            	</Text>
          	) : (
            	<Text style={styles.noConsumoText}>{registro.mensaje}</Text>
          	)}
        	</View>
      	))
    	)}
  	</View>
	</ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
	flexGrow: 1,
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
  infoBox: {
	backgroundColor: '#dbeafe',
	padding: 14,
	borderRadius: 12,
	marginTop: 8,
	marginBottom: 8,
  },
  infoText: {
	color: '#1e3a8a',
	fontSize: 14,
	textAlign: 'center',
  },
  historyContainer: {
	marginTop: 24,
  },
  historyTitle: {
	fontSize: 22,
	fontWeight: 'bold',
	color: '#111827',
	marginBottom: 12,
  },
  emptyText: {
	fontSize: 16,
	color: '#6b7280',
	textAlign: 'center',
	marginTop: 10,
  },
  historyCard: {
	backgroundColor: '#ffffff',
	padding: 16,
	borderRadius: 14,
	marginBottom: 12,
	elevation: 2,
  },
  historyMain: {
	fontSize: 17,
	fontWeight: 'bold',
	color: '#111827',
	marginBottom: 8,
  },
  historyText: {
	fontSize: 15,
	color: '#374151',
	marginBottom: 4,
  },
  consumoText: {
	fontSize: 16,
	fontWeight: 'bold',
	color: '#16a34a',
	marginTop: 8,
  },
  noConsumoText: {
	fontSize: 14,
	color: '#92400e',
	marginTop: 8,
  },
});