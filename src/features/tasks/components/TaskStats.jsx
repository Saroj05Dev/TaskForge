import { useTasks } from "@/hooks/useTasks";
import { useCurrentTeam } from "@/hooks/useCurrentTeam";
import StatCard from "@/components/ui/StateCard";
import { CheckSquare, Clock, CheckCircle, Users } from "lucide-react";

const TaskStats = () => {
  const { total, inProgress, completed } = useTasks();
  const { team } = useCurrentTeam();

  const memberCount = team?.members?.length || 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
      <StatCard
        title="TOTAL TASKS"
        value={total}
        icon={CheckSquare}
        color="blue"
      />
      <StatCard
        title="IN PROGRESS"
        value={inProgress}
        icon={Clock}
        color="orange"
      />
      <StatCard
        title="COMPLETED"
        value={completed}
        icon={CheckCircle}
        color="green"
      />
      <StatCard
        title="TEAM MEMBERS"
        value={memberCount}
        icon={Users}
        color="purple"
      />
    </div>
  );
};

export default TaskStats;
