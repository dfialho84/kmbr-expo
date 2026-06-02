import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { z } from "zod";
import FormDateField from "../form/FormDateField";
import FormMoneyField from "../form/FormMoneyField";
import FormTextField from "../form/FormTextField";
import Button from "../ui/Button";

const corridaSchema = z
    .object({
        data: z.date(),
        descricao: z.string().min(1, "Descrição é obrigatória"),
        kmInicial: z
            .number()
            .int("Km inicial deve ser um número inteiro")
            .min(0, "Km inicial deve ser maior que zero"),
        kmFinal: z
            .number()
            .int("Km final deve ser um número inteiro")
            .min(0, "Km final deve ser maior que zero"),
        valor: z.number().min(0, "Valor deve ser maior que zero"),
    })
    .refine((data) => data.kmFinal >= data.kmInicial, {
        message: "Km final deve ser maior ou igual ao Km inicial",
        path: ["kmFinal"],
    });

type CorridaFormData = z.infer<typeof corridaSchema>;

type Props = {
    onSave: (data: CorridaFormData) => void;
    onCancel: () => void;
};

export default function AddCorridaForm({ onSave, onCancel }: Props) {
    const corridaForm = useForm<CorridaFormData>({
        resolver: zodResolver(corridaSchema),
        defaultValues: {
            data: new Date(),
            descricao: "",
            kmInicial: 0,
            kmFinal: 0,
            valor: 0,
        },
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
