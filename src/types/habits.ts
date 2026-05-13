import { Setter } from "./common";

export type HabitStore = {
  habits: Habit[];
  loading: boolean;
  fetchHabits: () => Promise<void>;
  createHabit: (habitTitle: string) => Promise<void>;
  updateHabit: (habitId: string, updatedData: Partial<Habit>) => Promise<void>;
};
export interface HabitUpdatePayload {
  title?: string;
  isArchived?: boolean;
}

export type Habit = {
  _id: string;
  title: string;
  isArchived: boolean;
};

export interface HabitProps extends HabitListProps {
  habit: Habit;
  handleHabitDelete: (habit_id: string) => void;
}

export interface HabitListProps {
  record: string[];
  setRecord: Setter<string[]>;
}

export type SummaryProps = {
  setModalOpen: Setter<boolean>;
};

export type HabitStatsProps = {
  habit: Habit;
  completedDays: number;
  daysInMonth: number;
};

export type DrawerContentProps = {
  drawerBody: "dailyStats" | "monthlyStats";
  monthYear: { month: number; year: number };
};

export type MonthlyStatsProps = Pick<DrawerContentProps, "monthYear">;
