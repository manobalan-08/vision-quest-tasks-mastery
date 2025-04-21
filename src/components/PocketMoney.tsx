
import { useAppContext } from "@/context/AppContext";
import { Wallet, WalletCards } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function calculatePocketMoney({
  completedTasks,
  totalTasks,
  streakDays,
  level,
}: {
  completedTasks: number;
  totalTasks: number;
  streakDays: number;
  level: number;
}) {
  // Base: 2 currency units per completed task
  let pocket = completedTasks * 2;
  
  // Streak bonus: +10 (strict: only if streak >= 5 and completedTasks >= 5)
  if (streakDays >= 5 && completedTasks >= 5) {
    pocket += 10;
  }
  
  // Level bonus: +5 per level after level 2 (encourage progress)
  if (level > 2) {
    pocket += (level - 2) * 5;
  }
  
  // Strictness: if <60% tasks completed or total tasks > 0, cut bonus by 50%
  const completionRate = totalTasks > 0 ? completedTasks / totalTasks : 1;
  if (completionRate < 0.6) {
    pocket = Math.floor(pocket * 0.5);
  }
  
  // Minimum amount: 0 (no negative)
  return Math.max(0, pocket);
}

const tips = [
  "Complete all tasks for the day to maximize pocket money!",
  "Maintain a streak of 5+ days to unlock bonus rewards!",
  "Higher levels boost your pocket money bonuses.",
  "Keep a high completion rate—try not to leave tasks incomplete.",
];

export function PocketMoney() {
  const { stats } = useAppContext();
  const amount = calculatePocketMoney(stats);

  return (
    <Card className="mb-8 animate-fade-in">
      <CardHeader className="bg-gradient-to-r from-green-400 via-blue-300 to-purple-300 flex items-center gap-2">
        <WalletCards className="text-white h-6 w-6 mr-3" />
        <CardTitle className="text-white text-lg flex items-center">
          Pocket Money Earned
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mt-3">
          <Wallet size={32} className="text-green-500" />
          <span className="text-4xl font-bold text-green-700">₹{amount || 0}</span>
        </div>
        <div className="mt-2 text-gray-700 text-sm">
          <p>
            <span className="font-semibold">Formula:</span> ₹2 per completed task
            {", "}
            + bonus for streaks & levels,
            <span className="text-red-600"> strict deduction if incomplete tasks!</span>
          </p>
        </div>
        {amount === 0 && (
          <div className="mt-2 text-red-500 text-sm font-semibold">
            Increase your completion rate to earn pocket money!
          </div>
        )}
        <div className="mt-2 bg-gray-100 border-l-4 border-purple-300 rounded px-3 py-2">
          <span className="text-purple-700 font-semibold">Tip: </span>{tips[Math.floor(amount) % tips.length]}
        </div>
      </CardContent>
    </Card>
  );
}

