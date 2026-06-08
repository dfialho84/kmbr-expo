import { useCorridasContext } from "@/contexts/corridas-context";
import React from "react";
import { Text, View } from "react-native";

const formatBRL = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function TopPanel() {
    const { corridasFiltradas } = useCorridasContext();

    const total = corridasFiltradas.length;
    const totalGanho = corridasFiltradas.reduce((acc, c) => acc + c.valor, 0);
    // const ganhoPorCorrida = total > 0 ? totalGanho / total : 0;

    return (
        <View className="flex-row gap-2 px-4">
            <View className="flex-1 bg-gray-200 rounded-2xl p-4 gap-4">
                <Text className="text-sm text-gray-500 font-extrabold">
                    Corridas
                </Text>
                <Text className="text-2xl font-extrabold">{total}</Text>
            </View>
            <View className="flex-1 bg-gray-200 rounded-2xl p-4 gap-4">
                <Text className="text-sm text-gray-500 font-extrabold">
                    Total Ganho
                </Text>
                <Text className="text-2xl font-extrabold text-primary">
                    {formatBRL(totalGanho)}
                </Text>
            </View>
            {/* <View className="flex-1 bg-gray-200 rounded-2xl p-4 gap-4">
                <Text className="text-sm text-gray-500 font-extrabold">
                    Ganho/Corrida
                </Text>
                <Text className="text-2xl font-extrabold text-primary">
                    {formatBRL(ganhoPorCorrida)}
                </Text>
            </View> */}
        </View>
    );
}
