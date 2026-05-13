import { restApiRequest } from "../api/restClient";
import type { Habit, HabitUpdatePayload } from "../types";

export function getAllHabits(): Promise<Habit[]> {
  return restApiRequest("/habits");
}

export function createHabit(habitTitle: string): Promise<Habit[]> {
  return restApiRequest("/habits", {
    method: "POST",
    body: JSON.stringify({ title: habitTitle }),
  });
}

export function updateHabit(
  habitId: string,
  updatedData: HabitUpdatePayload,
): Promise<Habit[]> {
  return restApiRequest(`/habits/${habitId}`, {
    method: "PATCH",
    body: JSON.stringify(updatedData),
  });
}
