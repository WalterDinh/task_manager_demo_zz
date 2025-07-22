import { useForm } from "react-hook-form";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { useAuthStore } from "@/store/useAuthStore";
import { useLoadingStore } from "@/store/useLoadingStore";
import { useToastController } from "@tamagui/toast";
import { useExpoRouter } from "expo-router/build/global-state/router-store";
import * as Notifications from "expo-notifications";

export type TaskFormInputs = {
  title: string;
  description: string;
  dueDate: string;
  dueTime: string;
  priority: "high" | "medium" | "low";
  reminder: boolean;
  status: "open" | "in-progress" | "completed" | "pending";
  id?: string; // Optional for updates
  sortIndex?: number | "";
  notificationId?: string; // To store notification ID for reminders
};

export function useHandleTaskForm(task?: TaskFormInputs) {
  const { user } = useAuthStore();
  const showLoading = useLoadingStore.getState().showLoading;
  const hideLoading = useLoadingStore.getState().hideLoading;
  const toast = useToastController();
  const { goBack } = useExpoRouter();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<TaskFormInputs>({
    defaultValues: task ?? {
      title: "",
      description: "",
      dueDate: "",
      dueTime: "",
      status: "open",
      priority: "low",
      sortIndex: "",
      notificationId: "",
      reminder: false,
    },
  });

  // Hàm đặt notification
  const scheduleReminder = async (data: TaskFormInputs) => {
    if (!data.reminder || !data.dueDate) return;
    const trigger = new Date(`${data.dueDate}`);
    if (trigger.getTime() < Date.now()) return; // Không đặt nếu đã quá hạn

    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Reminder for Task",
        body: data.title,
        sound: true,
      },
      trigger: { type: "date", date: trigger },
    });
    return id;
  };

  // Hàm hủy notification
  const cancelReminder = async (notificationId?: string) => {
    if (notificationId) {
      await Notifications.cancelScheduledNotificationAsync(notificationId);
    }
  };

  const onSubmit = async (data: TaskFormInputs) => {
    if (!user) return;
    showLoading();
    try {
      let notificationId;
      if (data.reminder) {
        notificationId = await scheduleReminder(data);
      }
      await addDoc(collection(db, "tasks"), {
        ...data,
        userId: user.uid,
        sortIndex: "",
        createdAt: new Date().toISOString(),
        notificationId: notificationId || "",
      });
      toast.show("Task created!", { type: "success" });
      reset();
    } catch (err) {
      toast.show("Create task failed!", { type: "error" });
      console.error("Add task error:", err);
    } finally {
      hideLoading();
    }
  };

  const onSubmitUpdate = async (data: TaskFormInputs) => {
    if (!user || !data.id) return;
    showLoading();
    try {
      // Lấy notificationId cũ nếu có
      const notificationId = data.notificationId;
      if (data.reminder) {
        // Nếu reminder bật lại, đặt notification mới
        const newId = await scheduleReminder(data);
        await updateDoc(doc(db, "tasks", data.id), {
          ...data,
          userId: user.uid,
          updatedAt: new Date().toISOString(),
          notificationId: newId,
        });
      } else {
        // Nếu reminder tắt, hủy notification cũ
        await cancelReminder(notificationId);
        await updateDoc(doc(db, "tasks", data.id), {
          ...data,
          userId: user.uid,
          updatedAt: new Date().toISOString(),
          notificationId: "",
        });
      }
      toast.show("Task updated!", { type: "success" });
    } catch (err) {
      toast.show("Update task failed!", { type: "error" });
      console.error("Update task error:", err);
    } finally {
      hideLoading();
    }
  };

  const onDelete = async (id?: string, notificationId?: string) => {
    if (!user || !id) return;
    showLoading();
    try {
      await cancelReminder(notificationId);
      await deleteDoc(doc(db, "tasks", id));
      toast.show("Task deleted!", { type: "success" });
      goBack();
    } catch (err) {
      toast.show("Delete task failed!", { type: "error" });
      console.error("Delete task error:", err);
    } finally {
      hideLoading();
    }
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    setValue,
    watch,
    reset,
    onSubmitUpdate,
    onDelete,
  };
}
