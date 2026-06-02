import AddCorridaForm from "@/components/corridas/AddCorridaForm";
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
                    <AddCorridaForm
                        onSave={(data) => {
                            alert(JSON.stringify(data));
                            setShowAddModel(false);
                        }}
                        onCancel={() => setShowAddModel(false)}
                    />
                </Modal>
            </View>
        </View>
    );
}
