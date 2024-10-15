import { useSession } from '@/context/AuthContext';
import { View, Text, Button } from 'react-native';

export default function PerfilUsuario() {
  const { signOut, session } = useSession();

  console.log(session)

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>¡Bienvenido, {session?.email}!</Text>
      <Button title="Cerrar sesión" onPress={signOut} />
    </View>
  );
}
