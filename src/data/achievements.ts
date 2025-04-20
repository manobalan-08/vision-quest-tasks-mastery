
import { Achievement } from "../types";

export const achievements: Achievement[] = [
  {
    id: 1,
    title: "First Steps",
    description: "Complete your first task",
    pointsRequired: 10,
    icon: "🏅",
    reward: "10 bonus points",
    unlocked: false
  },
  {
    id: 2,
    title: "Consistency Champion",
    description: "Complete tasks for 3 days in a row",
    pointsRequired: 50,
    icon: "🔥",
    reward: "25 bonus points",
    unlocked: false
  },
  {
    id: 3,
    title: "Task Master",
    description: "Complete 10 tasks",
    pointsRequired: 100,
    icon: "⭐",
    reward: "50 bonus points",
    unlocked: false
  },
  {
    id: 4,
    title: "Productivity Pro",
    description: "Complete 5 tasks in a single day",
    pointsRequired: 150,
    icon: "💪",
    reward: "Custom theme unlock",
    unlocked: false
  },
  {
    id: 5,
    title: "Goal Crusher",
    description: "Reach 300 points total",
    pointsRequired: 300,
    icon: "🏆",
    reward: "Premium badge",
    unlocked: false
  }
];
