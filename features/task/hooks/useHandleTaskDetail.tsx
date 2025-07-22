import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { useLoadingStore } from "@/store/useLoadingStore";
import { ITask } from "../types/ITask";

export function useHandleTaskDetail(reset: (data: any) => void, id?: string) {

  const [task, setTask] = useState<ITask | null>(null);
  const showLoading = useLoadingStore.getState().showLoading;
  const hideLoading = useLoadingStore.getState().hideLoading;

  useEffect(() => {
    if (!id) return;
    const fetchTask = async () => {
      showLoading();
      try {
        const docRef = doc(db, "tasks", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setTask({ id: docSnap.id, ...(docSnap.data() as Omit<ITask, "id">) });
           reset({ id: docSnap.id, ...(docSnap.data() as Omit<ITask, "id">) });
        } else {
          setTask(null);
        }
      } catch (err) {
        setTask(null);
        console.error("Fetch task detail error:", err);
      } finally {
        hideLoading();
      }
    };
    fetchTask();
  }, [id]);

//   useEffect(() => {
//     if (!!task) {
//       const taskFormInputs = task
//         ? {
//             title: task?.title ?? "",
//             description: task.description ?? "",
//             dueDate: task.dueDate ?? "",
//             dueTime:
//               task.dueTime !== undefined && task.dueTime !== null
//                 ? String(task.dueTime)
//                 : "",
//             priority: task.priority ?? "medium",
//             reminder: task.reminder ?? false,
//           }
//         : undefined;
//       reset(taskFormInputs);
//     }
//   }, [task, reset]);

  return { task };
}
