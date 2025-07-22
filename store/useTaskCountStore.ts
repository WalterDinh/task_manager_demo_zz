import { create } from "zustand";
import { db } from "@/firebase/config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useAuthStore } from "./useAuthStore";
import { TaskStatus, ITask } from "@/features/task/types/ITask";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import weekOfYear from "dayjs/plugin/weekOfYear";
dayjs.extend(isoWeek);
dayjs.extend(weekOfYear);

type ChartMode = "day" | "week";
type ChartDataItem = {
  label: string;
  completed: number;
  notCompleted: number;
};

type TaskCountStore = {
  counts: Record<TaskStatus, number>;
  total: number;
  chartData: ChartDataItem[];
  chartMode: ChartMode;
  setChartMode: (mode: ChartMode) => void;
  listenTaskCounts: () => void;
  stopListening: () => void;
};

let unsubscribe: (() => void) | null = null;

export const useTaskCountStore = create<TaskCountStore>((set, get) => ({
  counts: {
    pending: 0,
    completed: 0,
    "in-progress": 0,
    open: 0,
  },
  total: 0,
  chartData: [],
  chartMode: "day",
  setChartMode: (mode) => {
    set({ chartMode: mode });
    // Khi đổi mode, sẽ tự động tính lại chartData ở listener bên dưới
    get().listenTaskCounts();
  },
  listenTaskCounts: () => {
    const user = useAuthStore.getState().user;
    if (!user) return;
    get().stopListening();

    const q = query(collection(db, "tasks"), where("userId", "==", user.uid));
    unsubscribe = onSnapshot(q, (snap) => {
        console.log("Realtime snapshot size:", snap.size);
        
      const counts: Record<TaskStatus, number> = {
        pending: 0,
        completed: 0,
        "in-progress": 0,
        open: 0,
      };
      const tasks: ITask[] = [];
      snap.docs.forEach((doc) => {
        const data = doc.data();
        const status = data.status as TaskStatus;
        if (counts[status] !== undefined) counts[status]++;
        tasks.push({ id: doc.id, ...(data as Omit<ITask, "id">) });
      });

      // Tính chartData theo mode
      const mode = get().chartMode;
      let chartData: ChartDataItem[] = [];
      if (mode === "day") {
        const grouped: Record<
          string,
          { completed: number; notCompleted: number }
        > = {};
        tasks.forEach((task) => {
          if (!task.dueDate) return;
          const date = dayjs(task.dueDate).format("YYYY-MM-DD");
          if (!grouped[date]) grouped[date] = { completed: 0, notCompleted: 0 };
          if (task.status === "completed") grouped[date].completed += 1;
          else grouped[date].notCompleted += 1;
        });
        chartData = Object.entries(grouped).map(([date, value]) => ({
          label: dayjs(date).format("DD/MM"),
          completed: value.completed,
          notCompleted: value.notCompleted,
        }));
      } else {
        // week
        const grouped: Record<
          string,
          { completed: number; notCompleted: number }
        > = {};
        tasks.forEach((task) => {
          if (!task.dueDate) return;
          const weekStart = dayjs(task.dueDate)
            .startOf("isoWeek")
            .format("YYYY-MM-DD");
          if (!grouped[weekStart])
            grouped[weekStart] = { completed: 0, notCompleted: 0 };
          if (task.status === "completed") grouped[weekStart].completed += 1;
          else grouped[weekStart].notCompleted += 1;
        });
        chartData = Object.entries(grouped).map(([week, value]) => {
          const weekStart = dayjs(week);
          // Tính tuần thứ mấy trong tháng
          const weekOfMonth = Math.ceil(
            (weekStart.date() - weekStart.startOf("month").day() + 1) / 7
          );
          const month = weekStart.format("MM");
          return {
            label: `W${weekOfMonth}/${month}`,
            completed: value.completed,
            notCompleted: value.notCompleted,
          };
        });
      }

      set({ counts, total: snap.size, chartData });
    });
  },
  stopListening: () => {
    if (unsubscribe) {
      unsubscribe();
      unsubscribe = null;
    }
  },
}));
