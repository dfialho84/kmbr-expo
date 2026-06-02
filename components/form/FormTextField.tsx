import { Label } from "@react-navigation/elements";
import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { View } from "react-native";
import TextInput from "../ui/TextInput";
import ErrorLabel from "./ErrorLabel";

type Props<T extends FieldValues> = React.ComponentProps<typeof View> & {
    control: Control<T>;
    name: Path<T>;
    label: string;
    placeholder?: string;
    keyboardType?: React.ComponentProps<typeof TextInput>["keyboardType"];
};

export default function FormTextField<T extends FieldValues>({
    control,
    name,
    label,
    placeholder,
    keyboardType,
    ...props
}: Props<T>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <View {...props}>
                    <Label>{label}</Label>
                    <TextInput
                        placeholder={placeholder}
                        value={field.value}
                        onChangeText={field.onChange}
                        onBlur={field.onBlur}
                        keyboardType={keyboardType}
                    />
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
