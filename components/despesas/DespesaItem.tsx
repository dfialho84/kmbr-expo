import { TIPO_CONFIG } from "@/constants/despesas";
import { Despesa } from "@/types/despesa";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

type Props = {
    despesa: Despesa;
};

export default function DespesaItem({ despesa }: Props) {
    return (
        <View className="border mx-4 p-4 rounded-2xl border-gray-400 mb-4 gap-2 flex-row">
            <View className="justify-center">
                <MaterialCommunityIcons
                    name={TIPO_CONFIG[despesa.tipo].icon}
                    size={32}
                />
            </View>
            <View className="flex-1 flex-col flex gap-2">
                <View className="flex flex-row justify-between flex-1">
                    <Text
                        className="font-extrabold text-lg max-w-3/4"
                        numberOfLines={2}
                    >
                        {despesa.descricao || despesa.tipo}
                    </Text>
                    <Text className="text-gray-400">
                        {despesa.data.toLocaleDateString("pt-BR")}
                    </Text>
                </View>
                <Text className="font-extrabold text-2xl text-error">
                    {despesa.valor.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    })}
                </Text>
            </View>
        </View>
    );
}
