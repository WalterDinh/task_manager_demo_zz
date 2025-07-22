// hooks/useTasks.ts

import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { useAuthStore } from "@/store/useAuthStore";
import { ITask } from "../types/ITask";

export function useTasks() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(false);
  const user = useAuthStore((s) => s.user);

  const fetchTasks = async (statusFilter = null) => {
    if (!user) return;
    setLoading(true);
    try {
      const filters = [
        where("userId", "==", user.uid),
        orderBy("dueDate", "asc"),
      ];
      if (statusFilter) {
        filters.push(where("status", "==", statusFilter));
      }

      const q = query(collection(db, "tasks"), ...filters);
      const snap = await getDocs(q);
      const list = snap.docs.map((doc) => {
        const data = doc.data() as Omit<ITask, "id">;
        return { id: doc.id, ...data };
      });
      setTasks(list);
    } catch (err) {
      console.error("Fetch tasks error:", err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (task: ITask) => {
    if (!user) return;
    const newTask: ITask = {
      ...task,
      userId: user.uid,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    const docRef = await addDoc(collection(db, "tasks"), newTask);
    const { id, ...taskWithoutId } = newTask;
    setTasks((prev) => [...prev, { id: docRef.id, ...taskWithoutId }]);
  };

  const updateTask = async (id: string, updates: Partial<ITask>) => {
    await updateDoc(doc(db, "tasks", id), updates);
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  };

  const deleteTask = async (id: string) => {
    await deleteDoc(doc(db, "tasks", id));
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return {
    tasks,
    loading,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
  };
}
