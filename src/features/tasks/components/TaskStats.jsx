import { useTasks } from "@/hooks/useTasks";

import React from 'react'
import StatCard from "../../../components/ui/StateCard";
import { useTeam } from "../../../hooks/useTeam";

const TaskStats = () => {

    const { total, inProgress, completed } = useTasks();
    const { memberCount } = useTeam();

  return (
    <div className="grid grid-cols-4 gap-4">
      <StatCard title="Total Tasks" value={total} />
      <StatCard title="In Progress" value={inProgress} />
      <StatCard title="Completed" value={completed} />
      <StatCard title="Team Members" value={memberCount} />
    </div>
  )
}

export default TaskStats
