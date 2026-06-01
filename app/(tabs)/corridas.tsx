import CircleButton from "@/components/ui/CircleButton";
import React, { useState } from "react";
import { FlatList, Modal, Text, TextInput, View } from "react-native";

const itens = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

export default function Corridas() {
    const [showAddModel, setShowAddModel] = useState<boolean>(false);
    const [data, setData] = useState("");
    const [descricao, setDescricao] = useState("");
    const [kmInicial, setKmInicial] = useState("");
    const [kmFinal, setKmFinal] = useState("");
    const [valor, setValor] = useState("");

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
                            <View className="gap-3">
                                <View className="gap-1">
                                    <Text className="text-sm font-medium text-foreground">Data</Text>
                                    <TextInput
                                        className="border border-border rounded-md px-3 py-2 text-foreground bg-background"
                                        placeholder="dd/mm/aaaa"
                                        value={data}
                                        onChangeText={setData}
                                        keyboardType="numeric"
                                    />
                                </View>
                                <View className="gap-1">
                                    <Text className="text-sm font-medium text-foreground">Descrição</Text>
                                    <TextInput
                                        className="border border-border rounded-md px-3 py-2 text-foreground bg-background"
                                        placeholder="Ex: Entrega centro"
                                        value={descricao}
                                        onChangeText={setDescricao}
                                    />
                                </View>
                                <View className="flex-row gap-3">
                                    <View className="flex-1 gap-1">
                                        <Text className="text-sm font-medium text-foreground">Km Inicial</Text>
                                        <TextInput
                                            className="border border-border rounded-md px-3 py-2 text-foreground bg-background"
                                            placeholder="0"
                                            value={kmInicial}
                                            onChangeText={setKmInicial}
                                            keyboardType="numeric"
                                        />
                                    </View>
                                    <View className="flex-1 gap-1">
                                        <Text className="text-sm font-medium text-foreground">Km Final</Text>
                                        <TextInput
                                            className="border border-border rounded-md px-3 py-2 text-foreground bg-background"
                                            placeholder="0"
                                            value={kmFinal}
                                            onChangeText={setKmFinal}
                                            keyboardType="numeric"
                                        />
                                    </View>
                                </View>
                                <View className="gap-1">
                                    <Text className="text-sm font-medium text-foreground">Valor</Text>
                                    <TextInput
                                        className="border border-border rounded-md px-3 py-2 text-foreground bg-background"
                                        placeholder="R$ 0,00"
                                        value={valor}
                                        onChangeText={setValor}
                                        keyboardType="numeric"
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
}
