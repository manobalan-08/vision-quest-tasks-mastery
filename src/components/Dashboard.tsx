
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppContext } from "@/context/AppContext";
import { LayoutDashboard, Award, Activity } from "lucide-react";

export function Dashboard() {
  const { stats, tasks } = useAppContext();
  
  // Create data for the last 7 days
  const getLast7DaysData = () => {
    const data = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      
      const tasksOnDay = tasks.filter(task => 
        task.date.split('T')[0] === dateString && task.completed
      );
      
      data.push({
        name: i === 0 ? 'Today' : i === 1 ? 'Yesterday' : date.toLocaleDateString('en-US', { weekday: 'short' }),
        tasks: tasksOnDay.length,
        points: tasksOnDay.reduce((sum, task) => sum + task.points, 0)
      });
    }
    
    return data;
  };
  
  const last7DaysData = getLast7DaysData();
  
  // Calculate completion percentage
  const completionPercentage = stats.totalTasks > 0 
    ? Math.round((stats.completedTasks / stats.totalTasks) * 100) 
    : 0;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-2">
        <LayoutDashboard className="mr-2 h-5 w-5 text-purple-500" />
        <h2 className="text-xl font-bold">Dashboard</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completionPercentage}%</div>
            <div className="h-4 w-full bg-gray-100 rounded-full mt-2">
              <div 
                className="h-4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" 
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {stats.completedTasks} of {stats.totalTasks} tasks completed
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Current Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline">
              <div className="text-2xl font-bold mr-2">{stats.streakDays}</div>
              <div className="text-muted-foreground">days</div>
            </div>
            <div className="flex items-center mt-2">
              {Array.from({ length: 7 }).map((_, i) => (
                <div 
                  key={i}
                  className={`h-8 w-8 rounded-full flex items-center justify-center mr-1 text-xs font-bold ${
                    i < stats.streakDays % 7 
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {stats.streakDays > 0 
                ? `You're on fire! Keep it up!` 
                : `Complete tasks today to start your streak!`}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Level Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline">
              <div className="text-2xl font-bold mr-2">{stats.level}</div>
              <div className="text-muted-foreground">level</div>
            </div>
            
            <div className="h-4 w-full bg-gray-100 rounded-full mt-2">
              <div 
                className="h-4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" 
                style={{ width: `${(stats.totalPoints % 100)}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {100 - (stats.totalPoints % 100)} points until level {stats.level + 1}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Weekly Activity</CardTitle>
          <CardDescription>Your completed tasks and points for the last 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={last7DaysData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <XAxis 
                dataKey="name" 
                stroke="#888888" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
              />
              <YAxis 
                stroke="#888888" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip />
              <Bar 
                dataKey="tasks" 
                fill="rgba(155, 135, 245, 0.7)" 
                radius={[4, 4, 0, 0]} 
                name="Tasks"
              />
              <Bar 
                dataKey="points" 
                fill="rgba(129, 140, 248, 0.7)" 
                radius={[4, 4, 0, 0]} 
                name="Points"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <div className="flex items-center">
            <Activity className="h-5 w-5 mr-2 text-purple-500" />
            <CardTitle>Consistency Score</CardTitle>
          </div>
          <CardDescription>Your daily activity pattern</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {last7DaysData.map((day, index) => (
              <div key={index} className="text-center">
                <div 
                  className={`w-full aspect-square rounded-full mx-auto flex items-center justify-center ${
                    day.tasks > 0 
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                  style={{
                    opacity: day.tasks ? 0.4 + (day.tasks * 0.2) : 0.3
                  }}
                >
                  {day.tasks}
                </div>
                <div className="text-xs mt-1 text-muted-foreground">{day.name}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            {stats.streakDays >= 3 
              ? "Great consistency! You're building good habits."
              : "Try to complete tasks every day to build consistency."}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
