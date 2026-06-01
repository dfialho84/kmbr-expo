import CircleButton from "@/components/ui/CircleButton";
import React from "react";
import { FlatList, Text, View } from "react-native";

const itens = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

export default function Corridas() {
    return (
        <View className="flex-1 bg-background">
            <FlatList
                ListHeaderComponent={() => <Text>Eu sou o Header</Text>}
                data={itens}
                renderItem={({ item }) => (
                    <Text className="text-4xl text-foreground">{item}</Text>
                )}
                keyExtractor={(item) => String(item)}
            />
            <CircleButton
                iconName="add"
                className="absolute bottom-6 right-6"
            />
        </View>
    );
}
