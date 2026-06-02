import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { View } from "react-native";
import DateInput from "../ui/DateInput";
import Label from "../ui/Label";
import ErrorLabel from "./ErrorLabel";

type Props<T extends FieldValues> = React.ComponentProps<typeof View> & {
    control: Control<T>;
    name: Path<T>;
    label: string;
    placeholder?: string;
};

export default function FormDateField<T extends FieldValues>({
    name,
    control,
    placeholder,
    label,
    ...props
}: Props<T>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <View {...props}>
                    <Label>{label}</Label>
                    <DateInput
                        placeholder={placeholder}
                        value={field.value}
                        onChangeDate={field.onChange}
                        onBlur={field.onBlur}
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
