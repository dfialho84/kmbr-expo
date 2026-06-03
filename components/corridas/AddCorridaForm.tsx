import { zodResolver } from "@hookform/resolvers/zod";
import { corridaSchema, CorridaFormData } from "@/types/corrida";
import { useCorridasContext } from "@/contexts/corridas-context";
import React from "react";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import FormDateField from "../form/FormDateField";
import FormMoneyField from "../form/FormMoneyField";
import FormTextField from "../form/FormTextField";
import Button from "../ui/Button";

type Props = {
    onSave: (data: CorridaFormData) => void;
    onCancel: () => void;
};

function buildDefaultValues(corridas: ReturnType<typeof useCorridasContext>["corridas"]) {
    const hoje = new Date();
    const corridasHoje = corridas.filter((c) => {
        const d = c.data;
        return (
            d.getFullYear() === hoje.getFullYear() &&
            d.getMonth() === hoje.getMonth() &&
            d.getDate() === hoje.getDate()
        );
    });
    const proximoNumero = corridasHoje.length + 1;
    const ultimaKm = corridas.length > 0 ? corridas[0].kmFinal : 0;
    return {
        data: hoje,
        descricao: `Corrida #${proximoNumero}`,
        kmInicial: ultimaKm,
        kmFinal: ultimaKm,
        valor: 0,
    };
}

export default function AddCorridaForm({ onSave, onCancel }: Props) {
    const { corridas } = useCorridasContext();
    const corridaForm = useForm<CorridaFormData>({
        resolver: zodResolver(corridaSchema),
        defaultValues: buildDefaultValues(corridas),
    });

    return (
        <View className="items-center justify-center bg-gray-500/50 flex-1">
            <View className="bg-card border border-border p-4 rounded-lg shadow-lg w-3/4 gap-4">
                <View>
                    <Text className="text-2xl font-bold text-primary">
                        Nova Corrida
                    </Text>
                </View>
                <View className="gap-3">
                    <FormDateField
                        className="gap-1"
                        control={corridaForm.control}
                        name="data"
                        label="Data"
                        placeholder="dd/mm/aaaa"
                    />
                    <FormTextField
                        className="gap-1"
                        control={corridaForm.control}
                        name="descricao"
                        label="Descrição"
                        placeholder="Ex: Entrega centro"
                    />
                    <View className="flex-row gap-3">
                        <FormTextField
                            className="flex-1 gap-1"
                            control={corridaForm.control}
                            name="kmInicial"
                            label="Km Inicial"
                            placeholder="0"
                            keyboardType="numeric"
                            valueAsNumber
                        />
                        <FormTextField
                            className="flex-1 gap-1"
                            control={corridaForm.control}
                            name="kmFinal"
                            label="Km Final"
                            placeholder="0"
                            keyboardType="numeric"
                            valueAsNumber
                        />
                    </View>
                    <FormMoneyField
                        className="gap-1"
                        control={corridaForm.control}
                        name="valor"
                        label="Valor (R$)"
                    />
                    <View className="flex-row justify-end gap-2 mt-4">
                        <Button
                            label="Salvar"
                            onPress={corridaForm.handleSubmit(onSave)}
                        />
                        <Button
                            label="Cancelar"
                            variant="secondary"
                            onPress={onCancel}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}
