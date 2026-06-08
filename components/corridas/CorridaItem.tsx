import { useCorridasContext } from "@/contexts/corridas-context";
import { Corrida } from "@/types/corrida";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, TouchableOpacity, View } from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";

type Props = {
    corrida: Corrida;
};

export default function CorridaItem({ corrida }: Props) {
    const { removeCorrida } = useCorridasContext();

    function renderRightActions() {
        return (
            <TouchableOpacity
                onPress={() => removeCorrida(corrida.id)}
                className="bg-error justify-center items-center w-20 rounded-2xl mr-4 mb-4"
            >
                <Ionicons name="trash-outline" size={24} color="white" />
            </TouchableOpacity>
        );
    }

    return (
        <Swipeable renderRightActions={renderRightActions}>
            <View className="border mx-4 p-4 rounded-2xl border-gray-400 mb-4 gap-2">
                <View className="flex flex-row justify-between">
                    <Text
                        className="font-extrabold text-xl max-w-3/4"
                        numberOfLines={2}
                    >
                        {corrida.descricao}
                    </Text>
                    <Text className="text-gray-400">
                        {corrida.data.toLocaleDateString("pt-BR")}
                    </Text>
                </View>
                <Text className="font-extrabold text-2xl text-primary">
                    {corrida.valor.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    })}
                </Text>
                <Text className="text-gray-500 font-light text-sm">
                    <Text className="text-md font-medium text-lg">
                        {corrida.kmFinal - corrida.kmInicial} Km
                    </Text>{" "}
                    · {corrida.kmInicial} → {corrida.kmFinal} km
                </Text>
            </View>
        </Swipeable>
    );
}
