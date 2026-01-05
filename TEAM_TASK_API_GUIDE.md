# Team-Task API Guide

Complete API reference for team-based task sharing and collaboration.

---

## 🔐 Authentication

All endpoints require authentication via Bearer token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

---

## 📡 Shared Tasks API

### 1. Share Task with Team

**Endpoint:** `POST /shared-tasks`

**Authorization:** Must be the task creator

**Request Body:**

```json
{
  "taskId": "507f1f77bcf86cd799439011",
  "teamId": "507f1f77bcf86cd799439012",
  "permissions": "edit" // optional: "view" | "edit" | "full" (default: "edit")
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "Task shared with team successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "task": "507f1f77bcf86cd799439011",
    "team": "507f1f77bcf86cd799439012",
    "sharedBy": "507f1f77bcf86cd799439014",
    "permissions": "edit",
    "sharedAt": "2026-01-05T04:30:00.000Z",
    "createdAt": "2026-01-05T04:30:00.000Z",
    "updatedAt": "2026-01-05T04:30:00.000Z"
  },
  "error": {}
}
```

**Socket.IO Event Emitted:**

```javascript
io.emit("taskShared", {
  taskId: "507f1f77bcf86cd799439011",
  teamId: "507f1f77bcf86cd799439012",
  sharedBy: "507f1f77bcf86cd799439014",
  permissions: "edit",
});
```

---

### 2. Unshare Task from Team

**Endpoint:** `DELETE /shared-tasks/:taskId/:teamId`

**Authorization:** Must be the task creator

**Request Body:** None

**Response (200):**

```json
{
  "success": true,
  "message": "Task unshared from team successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "task": "507f1f77bcf86cd799439011",
    "team": "507f1f77bcf86cd799439012",
    "sharedBy": "507f1f77bcf86cd799439014",
    "permissions": "edit"
  },
  "error": {}
}
```

**Socket.IO Event Emitted:**

```javascript
io.emit("taskUnshared", {
  taskId: "507f1f77bcf86cd799439011",
  teamId: "507f1f77bcf86cd799439012",
});
```

---

### 3. Get Team Tasks

**Endpoint:** `GET /shared-tasks/team/:teamId`

**Authorization:** Must be a team member

**Request Body:** None

**Response (200):**

```json
{
  "success": true,
  "message": "Team tasks fetched successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "task": {
        "_id": "507f1f77bcf86cd799439011",
        "title": "Implement authentication",
        "description": "Add JWT authentication",
        "status": "In Progress",
        "priority": "High",
        "createdBy": {
          "_id": "507f1f77bcf86cd799439014",
          "fullName": "John Doe",
          "email": "john@example.com"
        },
        "assignedUser": {
          "_id": "507f1f77bcf86cd799439015",
          "fullName": "Jane Smith",
          "email": "jane@example.com"
        },
        "createdAt": "2026-01-05T04:00:00.000Z",
        "updatedAt": "2026-01-05T04:30:00.000Z"
      },
      "team": "507f1f77bcf86cd799439012",
      "sharedBy": {
        "fullName": "John Doe",
        "email": "john@example.com"
      },
      "permissions": "edit",
      "sharedAt": "2026-01-05T04:30:00.000Z"
    }
  ],
  "error": {}
}
```

---

### 4. Get Task Teams

**Endpoint:** `GET /shared-tasks/task/:taskId`

**Authorization:** Must be task creator or assigned user

**Request Body:** None

**Response (200):**

```json
{
  "success": true,
  "message": "Task teams fetched successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "task": "507f1f77bcf86cd799439011",
      "team": {
        "_id": "507f1f77bcf86cd799439012",
        "name": "Development Team",
        "description": "Main dev team",
        "members": [...],
        "createdBy": "507f1f77bcf86cd799439014"
      },
      "sharedBy": {
        "fullName": "John Doe",
        "email": "john@example.com"
      },
      "permissions": "edit",
      "sharedAt": "2026-01-05T04:30:00.000Z"
    }
  ],
  "error": {}
}
```

---

### 5. Update Shared Task Permissions

**Endpoint:** `PATCH /shared-tasks/:taskId/:teamId/permissions`

**Authorization:** Must be the task creator

**Request Body:**

```json
{
  "permissions": "full" // "view" | "edit" | "full"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Permissions updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "task": "507f1f77bcf86cd799439011",
    "team": "507f1f77bcf86cd799439012",
    "sharedBy": "507f1f77bcf86cd799439014",
    "permissions": "full",
    "sharedAt": "2026-01-05T04:30:00.000Z"
  },
  "error": {}
}
```

**Socket.IO Event Emitted:**

```javascript
io.emit("taskPermissionsUpdated", {
  taskId: "507f1f77bcf86cd799439011",
  teamId: "507f1f77bcf86cd799439012",
  permissions: "full",
});
```

---

## 👥 Team Management API

### 1. Get All User's Teams

**Endpoint:** `GET /teams`

**Authorization:** Authenticated user

**Request Body:** None

**Response (200):**

```json
{
  "success": true,
  "message": "Teams fetched successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Development Team",
      "description": "Main dev team",
      "members": [
        {
          "_id": "507f1f77bcf86cd799439014",
          "fullName": "John Doe",
          "email": "john@example.com"
        },
        {
          "_id": "507f1f77bcf86cd799439015",
          "fullName": "Jane Smith",
          "email": "jane@example.com"
        }
      ],
      "createdBy": {
        "_id": "507f1f77bcf86cd799439014",
        "fullName": "John Doe",
        "email": "john@example.com"
      },
      "createdAt": "2026-01-05T03:00:00.000Z",
      "updatedAt": "2026-01-05T04:30:00.000Z"
    }
  ],
  "error": {}
}
```

**⚠️ Breaking Change:** Previously `/teams/my` returned a single team object. Now `/teams` returns an array of all teams.

---

### 2. Create Team

**Endpoint:** `POST /teams`

**Authorization:** Authenticated user

**Request Body:**

```json
{
  "name": "Development Team",
  "description": "Main development team" // optional
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "Team created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Development Team",
    "description": "Main development team",
    "members": ["507f1f77bcf86cd799439014"],
    "createdBy": "507f1f77bcf86cd799439014",
    "createdAt": "2026-01-05T03:00:00.000Z",
    "updatedAt": "2026-01-05T03:00:00.000Z"
  },
  "error": {}
}
```

**Socket.IO Event Emitted:**

```javascript
io.emit("teamCreated", { ...teamData });
```

---

### 3. Update Team

**Endpoint:** `PATCH /teams/:teamId`

**Authorization:** Must be the team creator

**Request Body:**

```json
{
  "name": "Updated Team Name", // optional
  "description": "Updated description" // optional
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Team updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Updated Team Name",
    "description": "Updated description",
    "members": [...],
    "createdBy": {...},
    "createdAt": "2026-01-05T03:00:00.000Z",
    "updatedAt": "2026-01-05T05:00:00.000Z"
  },
  "error": {}
}
```

**Socket.IO Event Emitted:**

```javascript
io.emit("teamUpdated", { ...updatedTeamData });
```

---

### 4. Invite Member

**Endpoint:** `POST /teams/:teamId/invite-member`

**Authorization:** Must be the team creator

**Request Body:**

```json
{
  "email": "newmember@example.com"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Member invited successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Development Team",
    "members": [
      {
        "_id": "507f1f77bcf86cd799439014",
        "fullName": "John Doe",
        "email": "john@example.com"
      },
      {
        "_id": "507f1f77bcf86cd799439016",
        "fullName": "New Member",
        "email": "newmember@example.com"
      }
    ],
    "createdBy": "507f1f77bcf86cd799439014"
  },
  "error": {}
}
```

**Socket.IO Event Emitted:**

```javascript
io.emit("memberInvited", { ...updatedTeamData });
```

---

### 5. Remove Member

**Endpoint:** `DELETE /teams/:teamId/members/:userId`

**Authorization:** Must be the team creator

**Request Body:** None

**Restrictions:**

- Cannot remove the team creator
- Only team creator can remove members

**Response (200):**

```json
{
  "success": true,
  "message": "Member removed successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Development Team",
    "members": [
      {
        "_id": "507f1f77bcf86cd799439014",
        "fullName": "John Doe",
        "email": "john@example.com"
      }
    ],
    "createdBy": "507f1f77bcf86cd799439014"
  },
  "error": {}
}
```

**Socket.IO Event Emitted:**

```javascript
io.emit("memberRemoved", { ...updatedTeamData });
```

---

### 6. Leave Team

**Endpoint:** `POST /teams/:teamId/leave`

**Authorization:** Must be a team member (not creator)

**Request Body:** None

**Restrictions:**

- Team creator cannot leave (must delete team instead)
- User must be a member of the team

**Response (200):**

```json
{
  "success": true,
  "message": "Left team successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Development Team",
    "members": [...],
    "createdBy": "507f1f77bcf86cd799439014"
  },
  "error": {}
}
```

**Socket.IO Event Emitted:**

```javascript
io.emit("memberLeft", {
  teamId: "507f1f77bcf86cd799439012",
  userId: "507f1f77bcf86cd799439015",
});
```

---

### 7. Get Team by ID

**Endpoint:** `GET /teams/:teamId`

**Authorization:** Must be a team member

**Request Body:** None

**Response (200):**

```json
{
  "success": true,
  "message": "Team found successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Development Team",
    "description": "Main dev team",
    "members": [
      {
        "_id": "507f1f77bcf86cd799439014",
        "fullName": "John Doe",
        "email": "john@example.com"
      }
    ],
    "createdBy": "507f1f77bcf86cd799439014",
    "createdAt": "2026-01-05T03:00:00.000Z",
    "updatedAt": "2026-01-05T04:30:00.000Z"
  },
  "error": {}
}
```

---

## 📋 Updated Task Endpoints

### Get All Tasks (Updated)

**Endpoint:** `GET /tasks`

**Authorization:** Authenticated user

**Behavior Change:** Now includes tasks shared with user's teams in addition to personal tasks.

**Response (200):**

```json
{
  "success": true,
  "message": "Tasks fetched successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Personal Task",
      "description": "My own task",
      "status": "Todo",
      "priority": "Medium",
      "createdBy": {...},
      "assignedUser": null
    },
    {
      "_id": "507f1f77bcf86cd799439017",
      "title": "Shared Team Task",
      "description": "Task shared with my team",
      "status": "In Progress",
      "priority": "High",
      "createdBy": {...},
      "assignedUser": {...}
    }
  ],
  "error": {}
}
```

---

### Get Task by ID (Updated)

**Endpoint:** `GET /tasks/:id`

**Authorization:** Must be creator, assigned user, OR team member with access

**Behavior Change:** Now checks team-based access in addition to personal access.

---

### Update Task (Updated)

**Endpoint:** `PUT /tasks/:id`

**Authorization:** Must be creator, assigned user, OR team member with edit/full permissions

**Behavior Change:** Team members with edit or full permissions can now update shared tasks.

---

### Delete Task (Updated)

**Endpoint:** `DELETE /tasks/:id`

**Authorization:** Must be creator, assigned user, OR team member with full permissions

**Behavior Change:** Team members with full permissions can now delete shared tasks.

---

## 🔑 Permission Levels

| Permission | View | Update | Delete |
| ---------- | ---- | ------ | ------ |
| `view`     | ✅   | ❌     | ❌     |
| `edit`     | ✅   | ✅     | ❌     |
| `full`     | ✅   | ✅     | ✅     |

**Default:** `edit`

---

## 🔄 All Socket.IO Events

| Event                    | Payload                                     | Description              |
| ------------------------ | ------------------------------------------- | ------------------------ |
| `taskShared`             | `{ taskId, teamId, sharedBy, permissions }` | Task shared with team    |
| `taskUnshared`           | `{ taskId, teamId }`                        | Task unshared from team  |
| `taskPermissionsUpdated` | `{ taskId, teamId, permissions }`           | Permissions updated      |
| `teamCreated`            | `<team object>`                             | New team created         |
| `teamUpdated`            | `<team object>`                             | Team details updated     |
| `memberInvited`          | `<team object>`                             | Member added to team     |
| `memberRemoved`          | `<team object>`                             | Member removed from team |
| `memberLeft`             | `{ teamId, userId }`                        | Member left team         |
| `taskCreated`            | `<task object>`                             | New task created         |
| `taskUpdated`            | `<task object>`                             | Task updated             |
| `taskDeleted`            | `<task object>`                             | Task deleted             |

---

## ❌ Common Error Responses

### 401 Unauthorized

```json
{
  "success": false,
  "message": "You are not logged in, please login to continue",
  "data": {},
  "error": "Missing token"
}
```

### 403 Forbidden

```json
{
  "success": false,
  "message": "You are not authorized to perform this action",
  "data": {},
  "error": "You are not authorized to perform this action"
}
```

### 404 Not Found

```json
{
  "success": false,
  "message": "Resource not found",
  "data": {},
  "error": "Resource not found"
}
```

### 400 Bad Request

```json
{
  "success": false,
  "message": "Validation error message",
  "data": {},
  "error": "Validation error message"
}
```

---

## 📝 Notes

- All timestamps are in ISO 8601 format (UTC)
- All IDs are MongoDB ObjectIds (24 character hex strings)
- Duplicate tasks are automatically filtered when user belongs to multiple teams with same shared task
- Removed team members immediately lose access to shared tasks
- Team creator is automatically added as a member when creating a team
