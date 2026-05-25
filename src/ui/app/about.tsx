import { View, Text } from 'react-native';

export default function AboutScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold text-gray-900">Sobre o KMBR</Text>
      <Text className="text-gray-600 mt-4">Versão 0.1.0</Text>
    </View>
  );
}
