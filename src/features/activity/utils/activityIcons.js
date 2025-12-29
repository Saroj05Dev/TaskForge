import {
  PlusCircle,
  Pencil,
  Trash2,
  UserPlus,
  MessageCircle,
  Paperclip,
  CheckCircle,
} from "lucide-react";

export const getActivityIcon = (type) => {
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
