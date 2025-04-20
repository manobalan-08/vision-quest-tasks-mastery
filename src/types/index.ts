
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  date: string;
  points: number;
}

export interface Quote {
  id: number;
  text: string;
  author: string;
  image: string;
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
  pointsRequired: number;
  icon: string;
  reward: string;
  unlocked: boolean;
}

export interface UserStats {
  totalTasks: number;
  completedTasks: number;
  streakDays: number;
  totalPoints: number;
  level: number;
}
