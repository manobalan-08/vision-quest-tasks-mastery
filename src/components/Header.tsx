
import { useAppContext } from "@/context/AppContext";

export function Header() {
  const { stats } = useAppContext();
  
  return (
    <div className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 p-4 rounded-lg shadow-lg mb-6">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-3 md:mb-0">
          <div className="bg-white p-3 rounded-full shadow-md">
            <span className="text-2xl">✨</span>
          </div>
          <div className="ml-3">
            <h1 className="text-2xl font-bold text-white">Vision Quest</h1>
            <p className="text-purple-100">Task Mastery System</p>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg text-center min-w-[80px]">
            <div className="text-xl font-bold text-white">{stats.totalPoints}</div>
            <div className="text-xs text-purple-100">POINTS</div>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg text-center min-w-[80px]">
            <div className="text-xl font-bold text-white">{stats.level}</div>
            <div className="text-xs text-purple-100">LEVEL</div>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg text-center min-w-[80px]">
            <div className="text-xl font-bold text-white">{stats.streakDays}</div>
            <div className="text-xs text-purple-100">STREAK</div>
          </div>
        </div>
      </div>
    </div>
  );
}
