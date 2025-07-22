import * as Notifications from "expo-notifications";
import { useEffect } from "react";

export function useNotificationPermission() {
  useEffect(() => {
    (async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        await Notifications.requestPermissionsAsync();
      }
    })();
  }, []);
}