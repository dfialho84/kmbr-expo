import { clsx } from "clsx";
import React from "react";
import { Text } from "react-native";

type Props = React.ComponentProps<typeof Text> & {
    error: string;
};

export default function ErrorLabel({ error, className, ...props }: Props) {
    return <Text className={clsx("text-error mt-1", className)}>{error}</Text>;
}
