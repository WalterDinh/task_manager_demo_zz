import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  orderBy,
  QueryDocumentSnapshot,
  DocumentData,
  limit,
  startAfter,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { useAuthStore } from "@/store/useAuthStore";
import { ITask } from "../types/ITask";
import { useToastController } from "@tamagui/toast";
import { useLoadingStore } from "@/store/useLoadingStore";

export type TaskStatus =
  | "pending"
  | "completed"
  | "in-progress"
  | "all"
  | "open";

export function useHandleTaskList() {
  const [tasks, setTasks] = useState<ITask[] | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<TaskStatus>("all");
  const [hasMore, setHasMore] = useState(true);
  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const PAGE_SIZE = 10;
  const user = useAuthStore((s) => s.user);
  const toast = useToastController();
  const showLoading = useLoadingStore.getState().showLoading;
  const hideLoading = useLoadingStore.getState().hideLoading;

  const fetchTasks = async (
    filterStatus: TaskStatus = status,
    isLoadMore = false
  ) => {
    if (!user) return;

    if (!isLoadMore) {
      setTasks(undefined);
      setLastDoc(null);
      setHasMore(true);
    }
    setLoading(true);
    try {
      let filters = [
        where("userId", "==", user.uid),
        orderBy("dueDate", "asc"),
      ];
      if (filterStatus !== "all") {
        filters.push(where("status", "==", filterStatus));
      }

      let q;
      if (isLoadMore && lastDoc) {
        q = query(
          collection(db, "tasks"),
          ...filters,
          startAfter(lastDoc),
          limit(PAGE_SIZE)
        );
      } else {
        q = query(collection(db, "tasks"), ...filters, limit(PAGE_SIZE));
      }
      const snap = await getDocs(q);

      const list = snap.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<ITask, "id">),
      }));

      if (isLoadMore) {
        setTasks((prev) => (prev ? [...prev, ...list] : list));
      } else {
        setTasks(list);
      }

      setLastDoc(snap.docs.length > 0 ? snap.docs[snap.docs.length - 1] : null);
      setHasMore(snap.docs.length === PAGE_SIZE);
    } catch (err) {
      console.error("Fetch tasks error:", err);
      toast.show("Error fetching tasks", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id: string, onSuccess: () => void) => {
    if (!user || !id) return;
    showLoading();
    try {
      await deleteDoc(doc(db, "tasks", id));
      setTasks((prev) => prev?.filter((task) => task.id !== id));
      toast.show("Task deleted", { type: "success" });
      onSuccess();
    } catch (err) {
      toast.show("Error fetching tasks", { type: "error" });

      console.error("Delete task error:", err);
    } finally {
      hideLoading();
    }
  };

  const loadMoreTasks = async () => {
    if (!hasMore || loading) return;

    await fetchTasks(status, true);
  };

  // Fetch on mount and when status changes
  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, user]);

  // Filter in-memory if needed (e.g. by keyword)
  const filterTasks = (keyword: string) => {
    if (!keyword) return tasks;
    return tasks?.filter((task) =>
      task.title.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  const handleUpdateOrder = async (newTasks: ITask[]) => {
    try {
      for (let i = 0; i < newTasks.length; i++) {
        const task = newTasks[i];
        if (task.sortIndex !== i) {
          await updateDoc(doc(db, "tasks", task.id), { sortIndex: i });
        }
      }
    } catch (error) {
      console.error("Error updating task order:", error);
      toast.show("Error updating task order", { type: "error" });
      return;
    }
  };

  return {
    tasks,
    loading,
    status,
    setStatus,
    fetchTasks,
    filterTasks,
    deleteTask,
    hasMore,
    loadMoreTasks,
    handleUpdateOrder,
  };
}
