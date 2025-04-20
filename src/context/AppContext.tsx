
import React, { createContext, useContext, useState, useEffect } from "react";
import { Task, UserStats, Achievement } from "../types";
import { achievements as initialAchievements } from "../data/achievements";

interface AppContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, "id" | "date" | "points">) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
  stats: UserStats;
  achievements: Achievement[];
  getRandomQuoteIndex: () => number;
}

const defaultStats: UserStats = {
  totalTasks: 0,
  completedTasks: 0,
  streakDays: 0,
  totalPoints: 0,
  level: 1
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState<UserStats>(defaultStats);
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  
  // Load data from localStorage on initial load
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    const savedStats = localStorage.getItem("stats");
    const savedAchievements = localStorage.getItem("achievements");
    
    if (savedTasks) setTasks(JSON.parse(savedTasks));
    if (savedStats) setStats(JSON.parse(savedStats));
    if (savedAchievements) setAchievements(JSON.parse(savedAchievements));
  }, []);
  
  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("stats", JSON.stringify(stats));
    localStorage.setItem("achievements", JSON.stringify(achievements));
  }, [tasks, stats, achievements]);
  
  // Update stats when tasks change
  useEffect(() => {
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalPoints = tasks.reduce((acc, task) => acc + (task.completed ? task.points : 0), 0);
    
    // Calculate streak
    let streak = 0;
    if (tasks.length > 0) {
      const dates = [...new Set(tasks
        .filter(task => task.completed)
        .map(task => task.date.split('T')[0]))];
      
      dates.sort();
      
      if (dates.length > 0) {
        streak = 1;
        for (let i = 1; i < dates.length; i++) {
          const prevDate = new Date(dates[i-1]);
          const currDate = new Date(dates[i]);
          
          const diffTime = Math.abs(currDate.getTime() - prevDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          
          if (diffDays === 1) {
            streak++;
          } else if (diffDays > 1) {
            streak = 1;
          }
        }
      }
    }
    
    // Calculate level - level up every 100 points
    const level = Math.max(1, Math.floor(totalPoints / 100) + 1);
    
    setStats({
      totalTasks: tasks.length,
      completedTasks,
      streakDays: streak,
      totalPoints,
      level
    });
    
    // Check for unlocked achievements
    setAchievements(prevAchievements => 
      prevAchievements.map(achievement => {
        if (!achievement.unlocked && totalPoints >= achievement.pointsRequired) {
          return { ...achievement, unlocked: true };
        }
        return achievement;
      })
    );
  }, [tasks]);
  
  const addTask = (taskData: Omit<Task, "id" | "date" | "points">) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: taskData.title,
      completed: false,
      date: new Date().toISOString(),
      points: 10 // Default points for a task
    };
    
    setTasks(prevTasks => [...prevTasks, newTask]);
  };
  
  const updateTask = (updatedTask: Task) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };
  
  const deleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };
  
  const toggleTaskCompletion = (id: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id 
          ? { ...task, completed: !task.completed } 
          : task
      )
    );
  };
  
  const getRandomQuoteIndex = () => {
    return Math.floor(Math.random() * 5);
  };
  
  return (
    <AppContext.Provider 
      value={{ 
        tasks, 
        addTask, 
        updateTask, 
        deleteTask, 
        toggleTaskCompletion,
        stats,
        achievements,
        getRandomQuoteIndex
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
