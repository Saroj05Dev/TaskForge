import { useTasks } from "@/hooks/useTasks";
import { useCurrentTeam } from "@/hooks/useCurrentTeam";
import StatCard from "@/components/ui/StateCard";
import { CheckSquare, Clock, CheckCircle, Users } from "lucide-react";

const TaskStats = () => {
  const { total, inProgress, completed } = useTasks();
  const { team } = useCurrentTeam();
  const memberCount = team?.members?.length || 0;
  const todo = total - inProgress - completed;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Tasks"
        value={total}
        icon={CheckSquare}
        color="blue"
        subtitle="across all statuses"
      />
      <StatCard
        title="Todo"
        value={todo < 0 ? 0 : todo}
        icon={CheckSquare}
        color="orange"
        subtitle="not started yet"
      />
      <StatCard
        title="Completed"
        value={completed}
        icon={CheckCircle}
        color="green"
        subtitle="tasks finished"
      />
      <StatCard
        title="Team Members"
        value={memberCount}
        icon={Users}
        color="purple"
        subtitle="in active team"
      />
    </div>
  );
};

export default TaskStats;
