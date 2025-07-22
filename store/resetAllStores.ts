import { useAuthStore } from "./useAuthStore";
import { useThemeStore } from "./themeStore";
import { useTaskCountStore } from "./useTaskCountStore";

export function resetAllStores() {
  useAuthStore.getState().clearUser();
  useThemeStore.setState({ theme: "light" });
  useTaskCountStore.getState().stopListening();
  useTaskCountStore.setState({
    counts: { pending: 0, completed: 0, "in-progress": 0, open: 0 },
    total: 0,
    chartData: [],
  });
}