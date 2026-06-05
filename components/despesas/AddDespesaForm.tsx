import { DespesaFormData, despesaSchema } from "@/types/despesa";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import Button from "../ui/Button";

type Props = {
    onSave: (data: DespesaFormData) => void;
    onCancel: () => void;
};

export default function AddDespesaForm({ onSave, onCancel }: Props) {
    const despesaForm = useForm<DespesaFormData>({
        resolver: zodResolver(despesaSchema),
    });

    return (
        <View className="items-center justify-center bg-gray-500/50 flex-1">
            <Text> AddDespesaForm</Text>
            <View className="flex-row justify-end gap-2 mt-4">
                <Button
                    label="Salvar"
                    onPress={despesaForm.handleSubmit(onSave)}
                />
                <Button
                    label="Cancelar"
                    variant="secondary"
                    onPress={onCancel}
                />
            </View>
        </View>
    );
}
