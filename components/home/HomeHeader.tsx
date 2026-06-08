import React from "react";
import { Text, View } from "react-native";
import FiltrosPeriodo from "./FiltrosPeriodo";

export default function HomeHeader() {
    return (
        <View className="my-4 border-b border-gray-400 gap-2">
            <Text className="text-lg font-bold text-foreground px-4">
                Resumo
            </Text>
            <FiltrosPeriodo />
        </View>
    );
}
