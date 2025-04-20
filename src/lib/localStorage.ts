
import { Task, UserStats, Achievement } from "@/types";

// Task storage functions
export const saveTasks = (tasks: Task[]) => {
  try {
    localStorage.setItem("vision-quest-tasks", JSON.stringify(tasks));
  } catch (error) {
    console.error("Error saving tasks to localStorage:", error);
  }
};

export const loadTasks = (): Task[] => {
  try {
    const tasks = localStorage.getItem("vision-quest-tasks");
    return tasks ? JSON.parse(tasks) : [];
  } catch (error) {
    console.error("Error loading tasks from localStorage:", error);
    return [];
  }
};

// Stats storage functions
export const saveStats = (stats: UserStats) => {
  try {
    localStorage.setItem("vision-quest-stats", JSON.stringify(stats));
  } catch (error) {
    console.error("Error saving stats to localStorage:", error);
  }
};

export const loadStats = (defaultStats: UserStats): UserStats => {
  try {
    const stats = localStorage.getItem("vision-quest-stats");
    return stats ? JSON.parse(stats) : defaultStats;
  } catch (error) {
    console.error("Error loading stats from localStorage:", error);
    return defaultStats;
  }
};

// Achievements storage functions
export const saveAchievements = (achievements: Achievement[]) => {
  try {
    localStorage.setItem("vision-quest-achievements", JSON.stringify(achievements));
  } catch (error) {
    console.error("Error saving achievements to localStorage:", error);
  }
};

export const loadAchievements = (defaultAchievements: Achievement[]): Achievement[] => {
  try {
    const achievements = localStorage.getItem("vision-quest-achievements");
    return achievements ? JSON.parse(achievements) : defaultAchievements;
  } catch (error) {
    console.error("Error loading achievements from localStorage:", error);
    return defaultAchievements;
  }
};
