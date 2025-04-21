import { AppProvider } from "@/context/AppContext";
import { Header } from "@/components/Header";
import { TaskList } from "@/components/TaskList";
import { Dashboard } from "@/components/Dashboard";
import { Rewards } from "@/components/Rewards";
import { Quotes } from "@/components/Quotes";
import { PocketMoney } from "@/components/PocketMoney";

const Index = () => {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <Header />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <TaskList />
            </div>
            <div className="md:col-span-2 space-y-6">
              <Dashboard />
              <PocketMoney />
              <Rewards />
              <Quotes />
            </div>
          </div>
        </div>
      </div>
    </AppProvider>
  );
};

export default Index;
