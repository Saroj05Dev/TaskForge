import EmptyState from "@/components/ui/EmptyState";
import Alert from "@/components/ui/Alert";

import React from 'react'

const KanbanBoard = () => {
  return (
    <div className="card">
      <div className="flex justify-between mb-4">
        <h2 className="font-medium">Kanban Board</h2>
        <button className="btn-primary">Refresh</button>
      </div>

      <Alert type="error" message="Failed to load tasks. Please try again." />

      <div className="grid grid-cols-3 gap-4 mt-4">
        <EmptyState title="Todo" />
        <EmptyState title="In Progress" />
        <EmptyState title="Done" />
      </div>
    </div>
  );
}

export default KanbanBoard
