import { styled } from "nativewind";
import React from "react";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

type Props = React.ComponentProps<typeof SafeAreaView>;

export default function StyledSafeAreaView({ children, ...props }: Props) {
    return <SafeAreaView {...props}>{children}</SafeAreaView>;
}
