import CircleButton from "@/components/ui/CircleButton";
import React, { useState } from "react";
import { FlatList, Modal, Text, View } from "react-native";

const itens = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

export default function Corridas() {
    const [showAddModel, setShowAddModel] = useState<boolean>(false);

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
                onPress={() => setShowAddModel(true)}
            />
            <View>
                <Modal
                    visible={showAddModel}
                    onRequestClose={() => setShowAddModel(false)}
                    transparent
                >
                    <View className="items-center justify-center bg-gray-500/50 flex-1">
                        <View className="bg-card border border-border p-4 rounded-lg shadow-lg w-3/4 gap-4">
                            <View>
                                <Text className="text-2xl font-bold text-primary">
                                    Nova Corrida
                                </Text>
                            </View>
                            <View>
                                <Text>Eu sou o modal</Text>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
}
