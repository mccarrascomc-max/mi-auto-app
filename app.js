import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export default function App() {
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

  	<TouchableOpacity style={styles.button}>
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
});