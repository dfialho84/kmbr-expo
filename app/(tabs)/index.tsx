import StyledSafeAreaView from "@/components/ui/StyledSafeAreaView";
import { Text } from "react-native";

export default function Index() {
    return (
        <StyledSafeAreaView className="flex-1 items-center justify-center bg-background">
            <Text className="font-extrabold text-2xl text-foreground">
                Edit app/index.tsx to edit this screen.
            </Text>
        </StyledSafeAreaView>
    );
}
