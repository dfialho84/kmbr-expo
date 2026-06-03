import AddCorridaForm from "@/components/corridas/AddCorridaForm";
import CorridaItem from "@/components/corridas/CorridaItem";
import CorridasHeader from "@/components/corridas/CorridasHeader";
import Button from "@/components/ui/Button";
import CircleButton from "@/components/ui/CircleButton";
import { CorridasProvider, useCorridasContext } from "@/contexts/corridas-context";
import React, { useState } from "react";
import { FlatList, Modal, Text, View } from "react-native";

type EmptyListProps = {
    onPress: () => void;
};

function EmptyList({ onPress }: EmptyListProps) {
    return (
        <View className="mx-4 flex gap-4">
            <Text className="text-muted-foreground">
                Nenhuma corrida ainda!
            </Text>
            <Button label="Adicionar Corrida" onPress={onPress} />
        </View>
    );
}

function CorridasScreen() {
    const [showAddModal, setShowAddModal] = useState(false);
    const { corridasFiltradas, addCorrida } = useCorridasContext();

    return (
        <View className="flex-1 bg-background">
            <FlatList
                ListHeaderComponent={CorridasHeader}
                ListEmptyComponent={
                    <EmptyList onPress={() => setShowAddModal(true)} />
                }
                data={corridasFiltradas}
                renderItem={({ item }) => <CorridaItem corrida={item} />}
                keyExtractor={(item) => item.id}
            />
            <CircleButton
                iconName="add"
                className="absolute bottom-6 right-6"
                onPress={() => setShowAddModal(true)}
            />
            <Modal
                visible={showAddModal}
                onRequestClose={() => setShowAddModal(false)}
                transparent
            >
                <AddCorridaForm
                    onSave={async (data) => {
                        await addCorrida(data);
                        setShowAddModal(false);
                    }}
                    onCancel={() => setShowAddModal(false)}
                />
            </Modal>
        </View>
    );
}

export default function Corridas() {
    return (
        <CorridasProvider>
            <CorridasScreen />
        </CorridasProvider>
    );
}
