import { clsx } from "clsx";
import React from "react";
import { Text } from "react-native";

type Props = React.ComponentProps<typeof Text>;

export default function Label({ children, className, ...props }: Props) {
    return (
        <Text
            className={clsx("text-sm font-medium text-foreground", className)}
            {...props}
        >
            {children}
        </Text>
    );
}
