import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold text-gray-900">Bem-vindo ao KMBR</Text>
      <Text className="text-gray-600 mt-4">Aplicativo Mobile</Text>
      <StatusBar style="auto" />
    </View>
  );
}
