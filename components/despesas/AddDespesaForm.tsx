import { DespesaFormData, despesaSchema, TIPOS_DESPESA } from "@/types/despesa";
import { TIPO_CONFIG } from "@/constants/despesas";
import { zodResolver } from "@hookform/resolvers/zod";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import FormDateField from "../form/FormDateField";
import FormMoneyField from "../form/FormMoneyField";
import Button from "../ui/Button";
import FormTextField from "../form/FormTextField";

type Props = {
    onSave: (data: DespesaFormData) => void;
    onCancel: () => void;
};

export default function AddDespesaForm({ onSave, onCancel }: Props) {
    const despesaForm = useForm<DespesaFormData>({
        resolver: zodResolver(despesaSchema),
        defaultValues: {
            data: new Date(),
            tipo: "Abastecimento",
            valor: 0,
            descricao: "",
        },
    });

    return (
        <View className="items-center justify-center bg-gray-500/50 flex-1">
            <View className="bg-card border border-border p-4 rounded-lg shadow-lg w-3/4 gap-4">
                <View>
                    <Text className="text-lg font-bold text-foreground">
                        Nova Despesa
                    </Text>
                </View>
                <View className="gap-3">
                    <FormDateField
                        className="gap-1"
                        control={despesaForm.control}
                        name="data"
                        label="Data"
                        placeholder="dd/mm/aaaa"
                    />

                    <Controller
                        control={despesaForm.control}
                        name="tipo"
                        render={({ field: { value, onChange } }) => (
                            <View className="gap-1">
                                <Text className="text-sm font-medium text-foreground">Tipo</Text>
                                <View className="flex-row gap-2">
                                    {TIPOS_DESPESA.map((tipo) => {
                                        const selected = value === tipo;
                                        const { icon, label } = TIPO_CONFIG[tipo];
                                        return (
                                            <Pressable
                                                key={tipo}
                                                onPress={() => onChange(tipo)}
                                                className={`flex-1 items-center justify-center py-3 rounded-lg border ${
                                                    selected
                                                        ? "bg-primary border-primary"
                                                        : "bg-card border-border"
                                                }`}
                                            >
                                                <MaterialCommunityIcons
                                                    name={icon}
                                                    size={24}
                                                    className={selected ? "text-primary-foreground" : "text-muted-foreground"}
                                                />
                                                <Text
                                                    className={`text-xs mt-1 font-medium text-center ${
                                                        selected ? "text-primary-foreground" : "text-muted-foreground"
                                                    }`}
                                                >
                                                    {label}
                                                </Text>
                                            </Pressable>
                                        );
                                    })}
                                </View>
                            </View>
                        )}
                    />

                    <FormMoneyField
                        className="gap-1"
                        control={despesaForm.control}
                        name="valor"
                        label="Valor (R$)"
                    />

                    <FormTextField
                        className="gap-1"
                        control={despesaForm.control}
                        name="descricao"
                        label="Descrição"
                        placeholder="Opcional"
                    />

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
            </View>
        </View>
    );
}
