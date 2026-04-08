import {
  PlusCircle, Pencil, Trash2, UserPlus, UserMinus,
  MessageCircle, Paperclip, CheckCircle, Share2,
  Users, LogOut, Sparkles, GitMerge, Activity,
} from "lucide-react";

export const ACTION_CONFIG = {
  created:            { icon: PlusCircle,    color: "text-blue-600",   bg: "bg-blue-50",    label: "Created task"         },
  updated:            { icon: Pencil,        color: "text-amber-600",  bg: "bg-amber-50",   label: "Updated task"         },
  deleted:            { icon: Trash2,        color: "text-red-500",    bg: "bg-red-50",     label: "Deleted task"         },
  assigned:           { icon: Sparkles,      color: "text-purple-600", bg: "bg-purple-50",  label: "Assigned task"        },
  comment_added:      { icon: MessageCircle, color: "text-teal-600",   bg: "bg-teal-50",    label: "Added comment"        },
  comment_deleted:    { icon: MessageCircle, color: "text-red-400",    bg: "bg-red-50",     label: "Deleted comment"      },
  attachment_added:   { icon: Paperclip,     color: "text-indigo-600", bg: "bg-indigo-50",  label: "Added attachment"     },
  attachment_deleted: { icon: Paperclip,     color: "text-red-400",    bg: "bg-red-50",     label: "Deleted attachment"   },
  subtask_added:      { icon: PlusCircle,    color: "text-cyan-600",   bg: "bg-cyan-50",    label: "Added subtask"        },
  subtask_updated:    { icon: Pencil,        color: "text-cyan-600",   bg: "bg-cyan-50",    label: "Updated subtask"      },
  subtask_deleted:    { icon: Trash2,        color: "text-red-400",    bg: "bg-red-50",     label: "Deleted subtask"      },
  member_invited:     { icon: UserPlus,      color: "text-green-600",  bg: "bg-green-50",   label: "Invited member"       },
  member_removed:     { icon: UserMinus,     color: "text-red-500",    bg: "bg-red-50",     label: "Removed member"       },
  team_created:       { icon: Users,         color: "text-blue-600",   bg: "bg-blue-50",    label: "Created team"         },
  team_updated:       { icon: Users,         color: "text-amber-600",  bg: "bg-amber-50",   label: "Updated team"         },
  team_deleted:       { icon: Users,         color: "text-red-500",    bg: "bg-red-50",     label: "Deleted team"         },
  left_team:          { icon: LogOut,        color: "text-orange-500", bg: "bg-orange-50",  label: "Left team"            },
  task_shared:        { icon: Share2,        color: "text-teal-600",   bg: "bg-teal-50",    label: "Shared task"          },
  task_unshared:      { icon: Share2,        color: "text-gray-500",   bg: "bg-gray-100",   label: "Unshared task"        },
  conflict_resolved:  { icon: GitMerge,      color: "text-violet-600", bg: "bg-violet-50",  label: "Resolved conflict"    },
};

export const getActionConfig = (type) =>
  ACTION_CONFIG[type] ?? { icon: Activity, color: "text-gray-500", bg: "bg-gray-100", label: type?.replace(/_/g, " ") ?? "Activity" };

// Unique action types for filter dropdown
export const ACTION_TYPES = Object.entries(ACTION_CONFIG).map(([key, val]) => ({
  value: key,
  label: val.label,
}));
