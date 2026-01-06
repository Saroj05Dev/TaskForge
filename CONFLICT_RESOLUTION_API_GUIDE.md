# Conflict Resolution Feature - Complete API Guide

## ✨ Feature Overview

The conflict resolution system detects when multiple users try to update the same task simultaneously and provides mechanisms to resolve conflicts through merge or overwrite strategies.

---

## 🔧 How It Works

### Conflict Detection Flow

1. **User A** fetches task (version: 5)
2. **User B** updates task (version: 6)
3. **User A** tries to update with old version (5)
4. **Backend** detects conflict (5 < 6)
5. **Frontend** receives 409 error with server version
6. **User A** sees conflict modal with resolution options
7. **User A** chooses resolution strategy
8. **Backend** resolves conflict and increments version (7)

---

## 📡 API Endpoints

### Update Task (with Conflict Detection)

**Endpoint:** `PUT /tasks/:id`

**Authorization:** Bearer token required

**Request Body:**

```json
{
  "title": "Updated title",
  "description": "Updated description",
  "status": "In Progress",
  "priority": "High",
  "version": 5,
  "lastModified": "2026-01-06T10:00:00.000Z"
}
```

**Response (200 - Success):**

```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Updated title",
    "version": 6,
    "updatedBy": {
      "_id": "507f1f77bcf86cd799439014",
      "fullName": "John Doe",
      "email": "john@example.com"
    },
    "lastModified": "2026-01-06T10:05:00.000Z",
    "updatedAt": "2026-01-06T10:05:00.000Z"
  },
  "error": {}
}
```

**Response (409 - Conflict Detected):**

```json
{
  "success": false,
  "message": "Conflict detected. Server version: 6, Client version: 5",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Server's title",
    "description": "Server's description",
    "status": "Done",
    "priority": "Medium",
    "version": 6,
    "updatedBy": {
      "_id": "507f1f77bcf86cd799439015",
      "fullName": "Jane Smith",
      "email": "jane@example.com"
    },
    "lastModified": "2026-01-06T10:03:00.000Z"
  },
  "error": {}
}
```

---

### Resolve Conflict

**Endpoint:** `POST /tasks/:id/resolve-conflict`

**Authorization:** Bearer token required (creator, assignee, or team member with edit/full permission)

**Request Body (Overwrite):**

```json
{
  "resolutionType": "overwrite",
  "task": {
    "title": "My version",
    "description": "My description",
    "status": "In Progress",
    "priority": "High"
  }
}
```

**Request Body (Merge):**

```json
{
  "resolutionType": "merge",
  "task": {
    "title": "My updated title"
  }
}
```

**Response (200 - Success):**

```json
{
  "success": true,
  "message": "Conflict resolved via overwrite",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "My version",
    "description": "My description",
    "status": "In Progress",
    "priority": "High",
    "version": 7,
    "updatedBy": {
      "_id": "507f1f77bcf86cd799439014",
      "fullName": "John Doe",
      "email": "john@example.com"
    },
    "lastModified": "2026-01-06T10:10:00.000Z"
  },
  "error": {}
}
```

---

## 🔄 Resolution Strategies

### 1. Overwrite

**Behavior:** Client version completely replaces server version

**Use Case:** User wants to discard all server changes and keep their version

**Example:**

```
Server: { title: "Server Title", status: "Done" }
Client: { title: "Client Title", status: "In Progress" }
Result: { title: "Client Title", status: "In Progress" }
```

**Request:**

```json
{
  "resolutionType": "overwrite",
  "task": {
    "title": "Client Title",
    "status": "In Progress"
  }
}
```

---

### 2. Merge

**Behavior:** Server version is base, client changes overlay on top

**Use Case:** User wants to keep server changes and apply their changes on top

**Example:**

```
Server: { title: "Server Title", status: "Done", priority: "High" }
Client: { title: "Client Title" }
Result: { title: "Client Title", status: "Done", priority: "High" }
```

**Request:**

```json
{
  "resolutionType": "merge",
  "task": {
    "title": "Client Title"
  }
}
```

---

## 🔐 Authorization

### Who Can Resolve Conflicts?

1. ✅ **Task Creator** - Full access
2. ✅ **Assigned User** - Full access
3. ✅ **Team Members with Edit Permission** - Can resolve conflicts
4. ✅ **Team Members with Full Permission** - Can resolve conflicts
5. ❌ **Team Members with View Permission** - Cannot resolve conflicts
6. ❌ **Non-members** - Cannot resolve conflicts

---

## 🎯 Conflict Detection Methods

### Method 1: Version-Based (Recommended)

**How it works:**

```javascript
if (clientVersion < serverVersion) {
  // Conflict detected
}
```

**Advantages:**

- ✅ Reliable and deterministic
- ✅ No timezone issues
- ✅ Easy to debug
- ✅ Tracks number of updates

**Frontend Implementation:**

```javascript
// Store version when fetching task
const task = await fetchTask(taskId);
localStorage.setItem("taskVersion", task.version);

// Send version when updating
await updateTask(taskId, {
  ...updates,
  version: localStorage.getItem("taskVersion"),
});
```

---

### Method 2: Timestamp-Based (Fallback)

**How it works:**

```javascript
if (clientLastModified < serverLastModified && differentUser) {
  // Conflict detected
}
```

**Advantages:**

- ✅ Works without version field
- ✅ Backward compatible

**Disadvantages:**

- ⚠️ Timezone issues possible
- ⚠️ Clock skew problems
- ⚠️ Less reliable

---

## 📊 Socket.IO Events

### taskConflict Event

**Emitted When:** Conflict is detected during update

**Payload:**

```javascript
{
  taskId: "507f1f77bcf86cd799439011",
  conflictedBy: "507f1f77bcf86cd799439014",
  serverVersion: {
    _id: "507f1f77bcf86cd799439011",
    title: "Server's title",
    version: 6,
    updatedBy: {
      fullName: "Jane Smith"
    }
  },
  message: "Task has been modified by Jane Smith"
}
```

**Frontend Listener:**

```javascript
socket.on("taskConflict", ({ taskId, serverVersion, message }) => {
  if (currentTaskId === taskId) {
    showNotification(message, "warning");
    // Optionally refresh task data
  }
});
```

---

### taskUpdated Event

**Emitted When:** Task is successfully updated or conflict is resolved

**Payload:**

```javascript
{
  _id: "507f1f77bcf86cd799439011",
  title: "Updated title",
  version: 7,
  updatedBy: { ... },
  // ... all task fields
}
```

---

## 🧪 Testing Scenarios

### Scenario 1: Basic Conflict Detection

**Steps:**

1. User A fetches task (version: 5)
2. User B updates task → version becomes 6
3. User A tries to update with version: 5

**Expected:**

- ❌ 409 Conflict Error
- ✅ Server version (6) returned
- ✅ Socket.IO `taskConflict` event emitted

**Test:**

```bash
# User B updates first
PUT /tasks/507f1f77bcf86cd799439011
{
  "title": "User B's update",
  "version": 5
}
# Response: version 6

# User A tries to update
PUT /tasks/507f1f77bcf86cd799439011
{
  "title": "User A's update",
  "version": 5
}
# Response: 409 Conflict
```

---

### Scenario 2: Overwrite Resolution

**Steps:**

1. Conflict detected
2. User chooses "overwrite"
3. Client version replaces server version

**Test:**

```bash
POST /tasks/507f1f77bcf86cd799439011/resolve-conflict
{
  "resolutionType": "overwrite",
  "task": {
    "title": "My version wins",
    "status": "In Progress"
  }
}
```

**Expected:**

- ✅ Task updated with client data
- ✅ Version incremented (7)
- ✅ Action log created with type `conflict_resolved`

---

### Scenario 3: Merge Resolution

**Setup:**

- Server: `{ title: "Server", status: "Done", priority: "High" }`
- Client: `{ title: "Client" }`

**Test:**

```bash
POST /tasks/507f1f77bcf86cd799439011/resolve-conflict
{
  "resolutionType": "merge",
  "task": {
    "title": "Client"
  }
}
```

**Expected Result:**

```json
{
  "title": "Client",
  "status": "Done",
  "priority": "High"
}
```

---

### Scenario 4: Team Member Resolves Conflict

**Setup:**

- User A (team member with edit permission) encounters conflict

**Test:**

```bash
POST /tasks/507f1f77bcf86cd799439011/resolve-conflict
Authorization: Bearer <user-a-token>
{
  "resolutionType": "merge",
  "task": { "title": "Updated" }
}
```

**Expected:**

- ✅ 200 Success (team permission check works)
- ✅ Conflict resolved

---

### Scenario 5: View-Only Member Tries to Resolve

**Setup:**

- User C (team member with view permission) encounters conflict

**Test:**

```bash
POST /tasks/507f1f77bcf86cd799439011/resolve-conflict
Authorization: Bearer <user-c-token>
{
  "resolutionType": "overwrite",
  "task": { ... }
}
```

**Expected:**

- ❌ 403 Forbidden
- ❌ Error: "You are not authorized to resolve this conflict"

---

## 📝 Action Logs

### Conflict Resolution Log

**Action Type:** `conflict_resolved`

**Metadata:**

```json
{
  "resolutionType": "overwrite",
  "previousVersion": 6,
  "newVersion": 7
}
```

**Query Logs:**

```bash
GET /action-logs?actionType=conflict_resolved
```

---

## 🎯 Frontend Integration

### Complete Conflict Flow

```javascript
// 1. Fetch task and store version
const fetchTask = async (taskId) => {
  const response = await fetch(`/tasks/${taskId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const result = await response.json();

  // Store version locally
  setTaskVersion(result.data.version);
  setTask(result.data);
};

// 2. Update task with version
const updateTask = async (taskId, updates) => {
  try {
    const response = await fetch(`/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...updates,
        version: taskVersion, // Include current version
      }),
    });

    const result = await response.json();

    if (response.status === 409) {
      // Conflict detected!
      handleConflict(result.data, updates);
    } else {
      // Success - update local version
      setTaskVersion(result.data.version);
      setTask(result.data);
    }
  } catch (error) {
    console.error("Update failed:", error);
  }
};

// 3. Handle conflict
const handleConflict = (serverVersion, localChanges) => {
  showConflictModal({
    serverVersion,
    localChanges,
    onResolve: (strategy) => resolveConflict(strategy, localChanges),
  });
};

// 4. Resolve conflict
const resolveConflict = async (strategy, localChanges) => {
  const response = await fetch(`/tasks/${taskId}/resolve-conflict`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      resolutionType: strategy, // 'overwrite' or 'merge'
      task: localChanges,
    }),
  });

  const result = await response.json();

  if (result.success) {
    setTaskVersion(result.data.version);
    setTask(result.data);
    closeConflictModal();
    showSuccess(`Conflict resolved via ${strategy}`);
  }
};

// 5. Listen for conflicts
socket.on("taskConflict", ({ taskId, serverVersion, message }) => {
  if (currentTaskId === taskId) {
    showNotification(message, "warning");
    // Optionally show server version
    setServerVersion(serverVersion);
  }
});
```

---

### Conflict Modal UI Example

```javascript
const ConflictModal = ({ serverVersion, localChanges, onResolve }) => {
  return (
    <Modal>
      <h2>⚠️ Conflict Detected</h2>
      <p>This task has been modified by {serverVersion.updatedBy.fullName}</p>

      <div className="versions">
        <div className="server-version">
          <h3>Server Version</h3>
          <pre>{JSON.stringify(serverVersion, null, 2)}</pre>
        </div>

        <div className="your-version">
          <h3>Your Changes</h3>
          <pre>{JSON.stringify(localChanges, null, 2)}</pre>
        </div>
      </div>

      <div className="actions">
        <button onClick={() => onResolve("overwrite")}>
          Use My Version (Overwrite)
        </button>
        <button onClick={() => onResolve("merge")}>Merge Changes</button>
        <button onClick={() => window.location.reload()}>
          Discard My Changes
        </button>
      </div>
    </Modal>
  );
};
```

---

## ⚠️ Important Notes

### Version Field

**Required in Requests:**

```json
{
  "title": "Updated",
  "version": 5 // ← Must include current version
}
```

**Auto-incremented by Backend:**

- Every successful update increments version
- Conflict resolution increments version
- Version starts at 0 for new tasks

---

### Backward Compatibility

**Without Version Field:**

- Falls back to timestamp-based detection
- Still works but less reliable
- Recommended to migrate to version-based

---

### Team Permissions

**Edit Permission:**

- ✅ Can update tasks
- ✅ Can resolve conflicts
- ❌ Cannot delete others' content

**Full Permission:**

- ✅ Can update tasks
- ✅ Can resolve conflicts
- ✅ Can delete anything

---

## 📊 Summary

| Feature                          | Status         |
| -------------------------------- | -------------- |
| Version-based conflict detection | ✅ Implemented |
| Timestamp-based fallback         | ✅ Implemented |
| Team permission checks           | ✅ Fixed       |
| Overwrite resolution             | ✅ Working     |
| Merge resolution                 | ✅ Working     |
| Socket.IO notifications          | ✅ Implemented |
| Action logging                   | ✅ Implemented |
| assigneeEmail support            | ✅ Implemented |
| updatedBy population             | ✅ Fixed       |

---

## 🚀 Next Steps

1. **Update Frontend:**

   - Add version field to task state
   - Implement conflict modal UI
   - Handle 409 responses
   - Listen for Socket.IO events

2. **Testing:**

   - Test concurrent updates
   - Test all resolution strategies
   - Verify team permissions
   - Check action logs

3. **Monitoring:**
   - Track conflict frequency
   - Monitor resolution patterns
   - Analyze user behavior

---

## 📞 Support

**Common Issues:**

| Issue                 | Solution                     |
| --------------------- | ---------------------------- |
| Conflict not detected | Ensure version field is sent |
| 403 on resolve        | Check team permissions       |
| Merge not working     | Verify request format        |
| Version mismatch      | Refresh task data            |

**Debug Checklist:**

1. Is version field included in update request?
2. Is user authorized (creator/assignee/team member)?
3. Is resolutionType valid ('overwrite' or 'merge')?
4. Is Socket.IO connected?
5. Are action logs being created?
