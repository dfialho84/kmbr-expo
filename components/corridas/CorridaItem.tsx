import { Corrida } from "@/types/corrida";
import { Text, View } from "react-native";

export default function CorridaItem({ corrida }: { corrida: Corrida }) {
    return (
        <View className="border mx-4 p-4 rounded-2xl border-gray-400 mb-4 last:mb-0 gap-2">
            <View className="flex flex-row justify-between">
                <Text
                    className="font-extrabold text-xl max-w-10/12"
                    numberOfLines={2}
                >
                    {corrida.descricao}
                </Text>
                <Text className="text-gray-400">
                    {corrida.criadoEm.toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
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
    );
}
