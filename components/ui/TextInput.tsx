import { clsx } from "clsx";
import React from "react";
import { TextInput as RNTextInput } from "react-native";

type Props = React.ComponentProps<typeof RNTextInput>;

export default function TextInput({
    className,
    placeholder,
    value,
    onChangeText,
    keyboardType,
    ...props
}: Props) {
    return (
        <RNTextInput
            className={clsx(
                "border border-border rounded-md px-3 py-2 text-foreground bg-background",
                className,
            )}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
            {...props}
        />
    );
}
