
import { useState } from "react";
import { PlusCircle, Check, Trash2, Edit, Calendar } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function TaskList() {
  const { tasks, addTask, toggleTaskCompletion, deleteTask } = useAppContext();
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      addTask({ title: newTaskTitle, completed: false });
      setNewTaskTitle("");
    }
  };

  return (
    <Card className="w-full shadow-md">
      <CardContent className="p-6">
        <div className="flex items-center mb-6">
          <Calendar className="mr-2 h-5 w-5 text-purple-500" />
          <h2 className="text-xl font-bold">Daily Tasks</h2>
        </div>
        
        <form onSubmit={handleAddTask} className="flex space-x-2 mb-6">
          <Input
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1"
          />
          <Button type="submit" disabled={!newTaskTitle.trim()}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add
          </Button>
        </form>
        
        <div className="space-y-3">
          {tasks.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <p>No tasks yet. Add your first task to get started!</p>
            </div>
          ) : (
            tasks.map((task) => (
              <div 
                key={task.id} 
                className={cn(
                  "flex items-center justify-between p-3 rounded-lg transition-all",
                  task.completed 
                    ? "bg-green-50 border border-green-100" 
                    : "bg-white border border-gray-100 hover:border-purple-200"
                )}
              >
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-8 w-8 rounded-full mr-2",
                      task.completed 
                        ? "bg-green-500 text-white hover:bg-green-600" 
                        : "bg-purple-100 text-purple-500 hover:bg-purple-200"
                    )}
                    onClick={() => toggleTaskCompletion(task.id)}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <span className={task.completed ? "line-through text-gray-500" : ""}>
                    {task.title}
                  </span>
                  {task.completed && (
                    <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      +{task.points} pts
                    </span>
                  )}
                </div>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-400 hover:text-gray-500"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-400 hover:text-red-500"
                    onClick={() => deleteTask(task.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
