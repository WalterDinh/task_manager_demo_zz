import { View, Animated, Pressable } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { YStack, XStack, SizableText, useTheme } from "tamagui";
import { LayoutDashboard, ListTodo, Plus } from "@tamagui/lucide-icons";
import { useRef, useEffect } from "react";
import { SpecialTabButton } from "./SpecialTabButton";

const iconMap = [LayoutDashboard, ListTodo]; // lucide icon components

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const routes = state.routes;
  console.log("routes", routes);

  return (
    <YStack
      position="absolute"
      b={0}
      l={0}
      r={0}
      pb={insets.bottom}
      bg="$background"
      borderTopWidth={1}
      borderColor="$borderColor"
    >
      <XStack justify="space-around" items="center" height={60}>
        {routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel ?? options.title ?? route.name;

          // Action Button (center)
          if (route.name === "action") {
            return <SpecialTabButton />;
          }

          // Tab Icon
          const isFocused = state.index === index;
          const IconComponent = iconMap[index > 0 ? index - 1 : 0]; // Vì có 1 item giữa là action
          const labelAnim = useRef(
            new Animated.Value(isFocused ? 1 : 0)
          ).current;

          useEffect(() => {
            Animated.timing(labelAnim, {
              toValue: isFocused ? 1 : 0,
              duration: 200,
              useNativeDriver: true,
            }).start();
          }, [isFocused]);

          return (
            <Pressable
              key={route.key}
              onPress={() => {
                if (!isFocused) navigation.navigate(route.name);
              }}
              style={{ flex: 1, alignItems: "center" }}
            >
              <XStack items="center" justify="center" gap="$2">
                <IconComponent
                  size={24}
                  color={isFocused ? theme.color.get() : "#999"}
                />

                <Animated.View
                  style={{
                    opacity: labelAnim,
                    transform: [
                      {
                        translateX: labelAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [-10, 0],
                        }),
                      },
                    ],
                  }}
                >
                  <SizableText size="$2" color="$color">
                    {label}
                  </SizableText>
                </Animated.View>
              </XStack>
            </Pressable>
          );
        })}
      </XStack>
    </YStack>
  );
}
