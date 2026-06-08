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
            <View className="border mx-4 p-4 rounded-2xl border-border mb-4 gap-2">
                <View className="flex flex-row justify-between">
                    <Text
                        className="text-base font-semibold text-foreground max-w-3/4"
                        numberOfLines={2}
                    >
                        {corrida.descricao}
                    </Text>
                    <Text className="text-sm text-muted-foreground">
                        {corrida.data.toLocaleDateString("pt-BR")}
                    </Text>
                </View>
                <Text className="text-xl font-bold text-green-600">
                    {corrida.valor.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    })}
                </Text>
                <Text className="text-sm text-muted-foreground">
                    <Text className="text-base font-semibold text-foreground">
                        {corrida.kmFinal - corrida.kmInicial} Km
                    </Text>{" "}
                    · {corrida.kmInicial} → {corrida.kmFinal} km
                </Text>
            </View>
        </Swipeable>
    );
}
