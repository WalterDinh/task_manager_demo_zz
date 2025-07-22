import { Button, H6, Text, View, XGroup, YStack } from "tamagui";
import { ViewStyle } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { useTaskCountStore } from "@/store/useTaskCountStore";
import { useMemo } from "react";
type TaskStatisticsChartProps = {
  style?: ViewStyle;
  width?: number;
  height?: number;
};
const data = [
  {
    value: 2500,
    frontColor: "#006DFF",
    gradientColor: "#009FFF",
    spacing: 6,
    label: "Jan",
  },
  { value: 2400, frontColor: "#3BE9DE", gradientColor: "#93FCF8" },
  {
    value: 3500,
    frontColor: "#006DFF",
    gradientColor: "#009FFF",
    spacing: 6,
    label: "Feb",
  },
  { value: 3000, frontColor: "#3BE9DE", gradientColor: "#93FCF8" },
  {
    value: 4500,
    frontColor: "#006DFF",
    gradientColor: "#009FFF",
    spacing: 6,
    label: "Mar",
  },
  { value: 4000, frontColor: "#3BE9DE", gradientColor: "#93FCF8" },
  {
    value: 5200,
    frontColor: "#006DFF",
    gradientColor: "#009FFF",
    spacing: 6,
    label: "Apr",
  },
  { value: 4900, frontColor: "#3BE9DE", gradientColor: "#93FCF8" },
  {
    value: 3000,
    frontColor: "#006DFF",
    gradientColor: "#009FFF",
    spacing: 6,
    label: "May",
  },
  { value: 2800, frontColor: "#3BE9DE", gradientColor: "#93FCF8" },
];

export default function TaskStatisticsChart({
  style,
  width,
  height,
}: TaskStatisticsChartProps) {
  const chartData = useTaskCountStore((s) => s.chartData);
  const chartMode = useTaskCountStore((s) => s.chartMode);

  const setChartMode = useTaskCountStore((s) => s.setChartMode);
  const barData = useMemo(
    () =>
      chartData.flatMap((item) => [
        {
          value: item.completed,
          frontColor: "#009FFF",
          gradientColor: "#006DFF",
          label: `${item.label}`,
          spacing: 2,
        },
        {
          value: item.notCompleted,
          frontColor: "#F29C6E",
          gradientColor: "#F29C6E",
          label: "",
          spacing: 2,
        },
      ]),
    [chartData]
  );

  return (
    <YStack
      bg={"$background"}
      p={"$3"}
      justify={"flex-start"}
      items="flex-start"
      width={width}
      gap={"$2"}
      height={height}
    >
      <H6>Task Statistics</H6>
      {chartData.length == 0 ? (
        <YStack
          items="center"
          justify="center"
          width="100%"
          mt={40}
          height={height}
        >
          <H6>No data available</H6>
        </YStack>
      ) : (
        <>
          <XGroup>
            <XGroup.Item>
              <Button
                onPress={() => setChartMode("day")}
                width="50%"
                size="$2"
                bg={"$primary"}
                color={"white"}
                fontWeight={"600"}
                opacity={chartMode == "day" ? 1 : 0.5}
              >
                By Day
              </Button>
            </XGroup.Item>

            <XGroup.Item>
              <Button
                opacity={chartMode == "week" ? 1 : 0.5}
                onPress={() => setChartMode("week")}
                color={"white"}
                fontWeight={"600"}
                bg={"$primary"}
                width="50%"
                size="$2"
              >
                By Week
              </Button>
            </XGroup.Item>
          </XGroup>
          <XGroup mt="$3" gap="$4" items="center" justify="center" width="100%">
            <XGroup.Item>
              <View
                width={18}
                height={18}
                bg="#F29C6E"
                rounded="$2"
                mr="$2"
                display="inline"
              />
              <Text color="$color" fontSize="$4" display="inline">
                Uncompleted
              </Text>
            </XGroup.Item>
            <XGroup.Item>
              <View
                width={18}
                height={18}
                bg="#009FFF"
                rounded="$2"
                mr="$2"
                display="inline"
              />
              <Text color="$color" fontSize="$4" display="inline">
                Completed
              </Text>
            </XGroup.Item>
          </XGroup>
          <View items={"center"} width={"100%"} height={height}>
            <BarChart
              data={barData ?? []}
              barWidth={24}
              width={(width ?? 300) - 80}
              initialSpacing={10}
              spacing={16}
              barBorderRadius={4}
              showGradient
              yAxisThickness={0}
              xAxisType={"dashed"}
              xAxisColor={"lightgray"}
              yAxisTextStyle={{ color: "lightgray" }}
              stepValue={5}
              maxValue={30}
              noOfSections={6}
              yAxisLabelTexts={["0", "3", "5", "10", "15", "20"]}
              labelWidth={50}
              xAxisLabelTextStyle={{ color: "lightgray", textAlign: "center" }}
              showLine
              lineConfig={{
                color: "#F29C6E",
                thickness: 3,
                curved: true,
                hideDataPoints: true,
                shiftY: 20,
                initialSpacing: -30,
              }}
            />
          </View>
        </>
      )}
    </YStack>
  );
}
