import { useTasks } from "@/hooks/useTasks";
import StatCard from "../../../components/ui/StateCard";
import { useTeam } from "../../../hooks/useTeam";
import { CheckSquare, Clock, CheckCircle, Users } from "lucide-react";

const TaskStats = () => {
  const { total, inProgress, completed } = useTasks();
  const { memberCount } = useTeam();

  return (
    <div className="grid grid-cols-4 gap-5">
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
