import React from "react";
import { Text, View } from "react-native";

export default function TopPanel() {
    return (
        <View className="flex-row gap-2">
            <View className="flex-1 bg-gray-200 rounded-2xl p-4 gap-4">
                <Text className="text-sm text-gray-500 font-extrabold">
                    Corridas
                </Text>
                <Text className="text-2xl font-extrabold">25</Text>
            </View>
            <View className="flex-1 bg-gray-200 rounded-2xl p-4 gap-4">
                <Text className="text-sm text-gray-500 font-extrabold">
                    Total Ganho
                </Text>
                <Text className="text-2xl font-extrabold text-primary">
                    R$ 25,00
                </Text>
            </View>
            <View className="flex-1 bg-gray-200 rounded-2xl p-4 gap-4">
                <Text className="text-sm text-gray-500 font-extrabold">
                    Ganho/Corrida
                </Text>
                <Text className="text-2xl font-extrabold text-primary">
                    R$ 2,50
                </Text>
            </View>
        </View>
    );
}
