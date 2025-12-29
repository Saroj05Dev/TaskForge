import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTasks } from "@/hooks/useTasks";
import { fetchActivities } from "@/features/activity/activitySlice";

import {
  Pencil,
  PlusCircle,
  Trash2,
  UserPlus,
  MessageCircle,
  Paperclip,
  CheckCircle,
} from "lucide-react";

const getActionIcon = (type) => {
  switch (type) {
    case "created":
    case "subtask_added":
      return PlusCircle;
    case "updated":
    case "subtask_updated":
      return Pencil;
    case "deleted":
      return Trash2;
    case "member_invited":
      return UserPlus;
    case "comment_added":
      return MessageCircle;
    case "attachment_added":
      return Paperclip;
    case "assigned":
      return CheckCircle;
    default:
      return Pencil;
  }
};

const getRelativeTime = (date) => {
  const diff = Date.now() - new Date(date).getTime();
  const seconds = Math.floor(diff / 1000);

  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
};

const TaskOverview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { total, completed } = useTasks();
  const activities = useSelector((state) => state.activity.items);

  useEffect(() => {
    dispatch(fetchActivities()); // fetch once
  }, [dispatch]);

  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  // Only last 5 actions for dashboard preview
  const recentFiveActivities = activities.slice(0, 5);

  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        padding: "20px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "12px",
        }}
      >
        <h2>Task Overview</h2>
        <span>{progress}% completed</span>
      </div>

      {/* Progress Bar */}
      <div style={{ marginBottom: "20px" }}>
        <div
          style={{
            height: "10px",
            width: "100%",
            backgroundColor: "#e5e7eb",
            borderRadius: "999px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              backgroundColor: "#22c55e",
              transition: "width 0.4s ease",
            }}
          />
        </div>

        <p style={{ marginTop: "8px", fontSize: "14px" }}>
          {completed} of {total} tasks completed
        </p>
      </div>

      {/* Recent Activity */}
      <h4>Recent Activity</h4>

      {recentFiveActivities.length === 0 ? (
        <p style={{ fontSize: "14px", marginTop: "8px" }}>
          No recent activity yet
        </p>
      ) : (
        <ul style={{ marginTop: "8px" }}>
          {recentFiveActivities.map((activity) => {
            const Icon = getActionIcon(activity.actionType);

            return (
              <li
                key={activity._id}
                style={{
                  display: "flex",
                  gap: "8px",
                  marginBottom: "10px",
                  fontSize: "14px",
                }}
              >
                <Icon size={16} style={{ marginTop: "3px" }} />

                <div>
                  <div>
                    <strong>{activity.user?.fullName}</strong>{" "}
                    {activity.actionType.replace("_", " ")}
                    {activity.task && (
                      <>
                        {" "}
                        on <strong>{activity.task.title}</strong>
                      </>
                    )}
                  </div>

                  <div
                    style={{
                      fontSize: "12px",
                      color: "#6b7280",
                    }}
                  >
                    {getRelativeTime(activity.createdAt)}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {/* Show All Button */}
      <button
        onClick={() => navigate("/activity")}
        style={{
          marginTop: "12px",
          fontSize: "14px",
          color: "#2563eb",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
        }}
      >
        Show all actions →
      </button>
    </div>
  );
};

export default TaskOverview;
