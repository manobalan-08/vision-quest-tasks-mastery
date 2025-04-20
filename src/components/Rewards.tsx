
import { useAppContext } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Rewards() {
  const { achievements, stats } = useAppContext();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-2">
        <Award className="mr-2 h-5 w-5 text-purple-500" />
        <h2 className="text-xl font-bold">Rewards & Achievements</h2>
      </div>
      
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
          <CardTitle className="flex items-center">
            <Star className="h-5 w-5 mr-2" />
            Your Achievements
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id}
                className={cn(
                  "p-4 rounded-lg border transition-all",
                  achievement.unlocked
                    ? "bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200"
                    : "bg-gray-50 border-gray-200 opacity-70"
                )}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center text-xl mr-4",
                      achievement.unlocked
                        ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white"
                        : "bg-gray-200 text-gray-400"
                    )}>
                      {achievement.icon}
                    </div>
                    <div>
                      <h3 className="font-bold">{achievement.title}</h3>
                      <p className="text-sm text-gray-500">{achievement.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={cn(
                      "text-sm font-medium",
                      achievement.unlocked ? "text-green-600" : "text-gray-400"
                    )}>
                      {achievement.unlocked ? "UNLOCKED!" : `${stats.totalPoints}/${achievement.pointsRequired} points`}
                    </div>
                    <div className="text-xs text-purple-500 mt-1">
                      Reward: {achievement.reward}
                    </div>
                  </div>
                </div>
                {!achievement.unlocked && (
                  <div className="mt-2 h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                      style={{ 
                        width: `${Math.min(100, (stats.totalPoints / achievement.pointsRequired) * 100)}%` 
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Star className="h-5 w-5 mr-2 text-yellow-500" />
            Points & Rewards System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border p-4 rounded-lg">
              <h3 className="font-bold text-purple-600 mb-2">How to Earn Points</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-500 flex items-center justify-center mr-2 text-xs">+10</span>
                  <span>Complete a task</span>
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-500 flex items-center justify-center mr-2 text-xs">+5</span>
                  <span>Maintain daily streak</span>
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-500 flex items-center justify-center mr-2 text-xs">+50</span>
                  <span>Level up</span>
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-500 flex items-center justify-center mr-2 text-xs">+25</span>
                  <span>Unlock achievement</span>
                </li>
              </ul>
            </div>
            
            <div className="border p-4 rounded-lg">
              <h3 className="font-bold text-purple-600 mb-2">Rewards by Level</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-500 flex items-center justify-center mr-2 text-xs">1</span>
                  <span>Basic features</span>
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-500 flex items-center justify-center mr-2 text-xs">3</span>
                  <span>Custom themes</span>
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-500 flex items-center justify-center mr-2 text-xs">5</span>
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-500 flex items-center justify-center mr-2 text-xs">7</span>
                  <span>Premium badge</span>
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-500 flex items-center justify-center mr-2 text-xs">10</span>
                  <span>Premium features unlocked</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
