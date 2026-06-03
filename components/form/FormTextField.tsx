import Label from "@/components/ui/Label";
import React, { useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { View } from "react-native";
import TextInput from "../ui/TextInput";
import ErrorLabel from "./ErrorLabel";

type NumberInputProps = {
    initialValue: number | undefined;
    onChange: (value: number | undefined) => void;
    onBlur: () => void;
    placeholder?: string;
    keyboardType?: React.ComponentProps<typeof TextInput>["keyboardType"];
};

function NumberInput({ initialValue, onChange, onBlur, placeholder, keyboardType }: NumberInputProps) {
    const [text, setText] = useState(initialValue != null ? String(initialValue) : "");
    return (
        <TextInput
            placeholder={placeholder}
            value={text}
            onChangeText={(newText) => {
                setText(newText);
                const n = parseFloat(newText.replace(",", "."));
                onChange(isNaN(n) ? undefined : n);
            }}
            onBlur={onBlur}
            keyboardType={keyboardType}
        />
    );
}

type Props<T extends FieldValues> = React.ComponentProps<typeof View> & {
    control: Control<T>;
    name: Path<T>;
    label: string;
    placeholder?: string;
    keyboardType?: React.ComponentProps<typeof TextInput>["keyboardType"];
    valueAsNumber?: boolean;
};

export default function FormTextField<T extends FieldValues>({
    control,
    name,
    label,
    placeholder,
    keyboardType,
    valueAsNumber,
    ...props
}: Props<T>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <View {...props}>
                    <Label>{label}</Label>
                    {valueAsNumber ? (
                        <NumberInput
                            initialValue={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            placeholder={placeholder}
                            keyboardType={keyboardType}
                        />
                    ) : (
                        <TextInput
                            placeholder={placeholder}
                            value={field.value ?? ""}
                            onChangeText={field.onChange}
                            onBlur={field.onBlur}
                            keyboardType={keyboardType}
                        />
                    )}
                    {fieldState.error && (
                        <ErrorLabel
                            error={fieldState.error.message || "Campo inválido"}
                        />
                    )}
                </View>
            )}
        />
    );
}
