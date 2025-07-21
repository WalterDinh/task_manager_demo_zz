import React from "react";
import { FlashList } from "@shopify/flash-list";
import ItemTaskList from "./ItemTaskList";
import { View } from "tamagui";
import { useRouter } from "expo-router";

const DATA = [
  {
    title: "First Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "Second Item",
  },
];

export default function ListTask() {
    const {push}=useRouter();
  return (
    <View flex={1} p="$4">
      <FlashList
        data={DATA}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => (
          <ItemTaskList onPress={()=>push('/detail_task')} title={item.title} number={0} />
        )}
      />
    </View>
  );
}
