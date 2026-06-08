import { useDespesasContext } from "@/contexts/despesas-context";
import React from "react";
import { Text, View } from "react-native";

const formatBRL = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function TopPanel() {
    const { despesasFiltradas } = useDespesasContext();

    const total = despesasFiltradas.length;
    const totalGasto = despesasFiltradas.reduce((acc, d) => acc + d.valor, 0);

    return (
        <View className="flex-row gap-2 px-4">
            <View className="flex-1 bg-gray-200 rounded-2xl p-4 gap-4">
                <Text className="text-sm text-gray-500 font-extrabold">
                    Despesas
                </Text>
                <Text className="text-2xl font-extrabold">{total}</Text>
            </View>
            <View className="flex-1 bg-gray-200 rounded-2xl p-4 gap-4">
                <Text className="text-sm text-gray-500 font-extrabold">
                    Total Gasto
                </Text>
                <Text className="text-2xl font-extrabold text-primary">
                    {formatBRL(totalGasto)}
                </Text>
            </View>
        </View>
    );
}
