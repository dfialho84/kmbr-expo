import AddDespesaForm from "@/components/despesas/AddDespesaForm";
import Button from "@/components/ui/Button";
import CircleButton from "@/components/ui/CircleButton";
import {
    DespesasProvider,
    useDespesasContext,
} from "@/contexts/despesas-context";
import React, { useState } from "react";
import { FlatList, Modal, Text, View } from "react-native";

type EmptyListProps = {
    onPress: () => void;
};

function EmptyList({ onPress }: EmptyListProps) {
    return (
        <View className="mx-4 flex gap-4">
            <Text className="text-muted-foreground">
                Nenhuma despesa ainda!
            </Text>
            <Button label="Adicionar Despesa" onPress={onPress} />
        </View>
    );
}

function DespesasScreen() {
    const [showAddModal, setShowAddModal] = useState(false);
    const { despesas, addDespesa } = useDespesasContext();

    return (
        <View className="flex-1 bg-background">
            <FlatList
                ListHeaderComponent={<Text>Header</Text>}
                ListEmptyComponent={
                    <EmptyList onPress={() => setShowAddModal(true)} />
                }
                data={despesas}
                renderItem={({ item }) => <Text>{item.tipo}</Text>}
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
                <AddDespesaForm
                    onSave={async (data) => {
                        await addDespesa(data);
                        setShowAddModal(false);
                    }}
                    onCancel={() => setShowAddModal(false)}
                />
            </Modal>
        </View>
    );
}

export default function Despesas() {
    return (
        <DespesasProvider>
            <DespesasScreen />
        </DespesasProvider>
    );
}
