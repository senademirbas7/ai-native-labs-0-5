---
issue_key: SCRUM-6
issue_url: 'https://epam-team-y3bxkrl5.atlassian.net/browse/SCRUM-6'
---
# User Story: STB-004 - Delete Task with Confirmation

**Story ID:** STORY-STB-004  
**Epic:** Epic-STB-001: Core Task Management System  
**Parent PRD:** Student Task Board PRD

---

## User Story Statement

**As a** task owner  
**I want to** delete tasks with a confirmation dialog to prevent accidental deletion  
**So that** I can remove completed or no-longer-needed tasks without permanently losing them

---

## Description

Users need to be able to remove tasks that are no longer relevant. A confirmation dialog prevents accidental deletions, which is critical since localStorage doesn't have a traditional undo mechanism. Deletion should be immediate after confirmation and update the task list accordingly. A temporary "undo" option (5-10 seconds) could provide additional safety.

### Related Epic
Epic-STB-001: Core Task Management System

### Related Stories
- STORY-STB-001: Display task list (removes from list)
- STORY-STB-004: Mark task complete (alternative to deletion)
- STORY-STB-005: Data persistence (deletion persists)

---

## Acceptance Criteria

- [ ] **Criterion 1:** Delete button/icon available on each task in the list
- [ ] **Criterion 2:** Clicking Delete shows confirmation dialog: "Are you sure you want to delete this task?"
- [ ] **Criterion 3:** Confirmation dialog has "Delete" and "Cancel" buttons
- [ ] **Criterion 4:** Clicking "Cancel" closes dialog without deleting task
- [ ] **Criterion 5:** Clicking "Delete" removes task from list immediately
- [ ] **Criterion 6:** Task is removed from localStorage after deletion
- [ ] **Criterion 7:** User receives visual confirmation ("Task deleted")
- [ ] **Criterion 8:** (Optional) Undo option available for 10 seconds after deletion

---

## Acceptance Tests / Examples

### Test Case 1: Delete task with confirmation
**Given** I have a task in my list  
**When** I click the Delete button  
**Then** A confirmation dialog appears asking "Are you sure?"

### Test Case 2: Confirm deletion removes task
**Given** A confirmation dialog is open  
**When** I click "Delete"  
**Then** The task disappears from the list immediately

### Test Case 3: Cancel deletion preserves task
**Given** A confirmation dialog is open  
**When** I click "Cancel"  
**Then** The dialog closes and the task remains in the list unchanged

### Test Case 4: Deleted task removed from localStorage
**Given** I delete a task  
**When** I refresh the page  
**Then** The deleted task does not reappear (confirmed deleted from localStorage)

### Test Case 5: Success message after deletion
**Given** I successfully delete a task  
**When** The deletion completes  
**Then** A confirmation message "Task deleted" briefly appears

---

## INVEST Principles Validation Checklist

### Independence
- [x] Story complete and valuable on its own
- [x] Can be developed independently
- [x] Doesn't block other features

### Negotiable
- [ ] Dialog style (native confirm vs custom modal) negotiable
- [ ] Deletion behavior (soft delete vs hard delete) could be discussed
- [ ] Undo timeout duration debatable (5 or 10 seconds)
- [ ] Confirmation message text flexible

### Valuable
- [x] Provides essential feature (ability to remove tasks)
- [x] Users interact with this feature regularly
- [x] Important for keeping task list clean

### Estimable
- [x] Team understands confirmation dialog pattern
- [x] Technical implementation straightforward
- [x] No hidden complexity

### Small
- [x] Can be completed in 1-2 days
- [x] Focused scope (delete with confirmation)
- [x] Simple state management

### Testable
- [x] Can manually delete and verify removal
- [x] Can test confirmation and cancel flows
- [x] Can verify localStorage deletion
- [x] Can test undo if implemented

---

## Effort & Estimation

| Aspect | Value |
|--------|-------|
| **Story Points** | 3 |
| **Estimated Hours** | 6-8 hours |
| **Assigned To** | [TBD] |
| **Priority** | High |

---

## Definition of Ready (Pre-Estimation)

- [x] Acceptance criteria specific
- [x] Confirmation dialog behavior clear
- [x] Undo requirement negotiable (optional feature)
- [x] No blocking dependencies
- [x] Storage deletion approach understood

---

## Definition of Done (Post-Development)

- [ ] Delete button/icon present on each task
- [ ] Confirmation dialog displays on delete click
- [ ] "Cancel" button closes dialog without deletion
- [ ] "Delete" button removes task from list and localStorage
- [ ] Success message displays after deletion
- [ ] Task does not reappear on page refresh
- [ ] Unit test for delete confirmation flow
- [ ] Unit test for localStorage removal
- [ ] No console errors
- [ ] Keyboard accessible (Tab, Enter, Esc)
- [ ] Code reviewed and merged

---

## Technical Notes

### Component Architecture
```typescript
<DeleteConfirmationDialog>
  - Modal/overlay component
  - Shows task title in message
  - Two buttons: Delete (red/danger), Cancel (neutral)
  - Optional: displays undo countdown timer
  
<TaskItem>
  - Delete button triggers dialog open
  - Uses deleteTask context method
  - Handles dialog callbacks
```

### State Management
```typescript
interface DeleteState {
  isOpen: boolean;
  taskIdToDelete: string | null;
  undoTimeout?: NodeJS.Timeout;
}

// Delete with optional undo
const deleteTask = (taskId: string) => {
  const taskToDelete = tasks.find(t => t.id === taskId);
  setTasks(tasks.filter(t => t.id !== taskId));
  
  // Optional: Show undo for 10 seconds
  const timeout = setTimeout(() => {
    saveToLocalStorage();  // Persist deletion
  }, 10000);
};

const undoDelete = (task: Task) => {
  clearTimeout(deleteState.undoTimeout);
  setTasks([...tasks, task]);
};
```

### Dialog Implementation
```typescript
<ConfirmDialog>
  <p>Are you sure you want to delete "{task.title}"?</p>
  <p>This action cannot be undone.</p>
  <button onClick={handleConfirmDelete}>Delete</button>
  <button onClick={handleCancel}>Cancel</button>
</ConfirmDialog>
```

---

## Notes & Comments

### Design Decisions
- Hard delete (not soft/recoverable) chosen for MVP
- Confirmation required to prevent accidents
- Optional undo for safety net
- Task title shown in confirmation to confirm correct task

### Implementation Approach
- Use React state for dialog open/close
- Extract ConfirmDialog to reusable component
- Call `taskContext.deleteTask(taskId)`
- Persist deletion to localStorage immediately (or after undo timeout)

### Edge Cases
- User clicks delete, clicks undo before timeout (restore task)
- User confirms delete, page refreshes while undo active (depends on implementation)
- Delete task that's currently being edited (close edit form)

---

## Testing Scenarios

### Happy Path
1. User views task list
2. User clicks delete icon
3. Dialog appears
4. User clicks Delete button
5. Task disappears from list
6. `localStorage` updated
7. Success message shows

### Cancellation Path
1. User views task list
2. User clicks delete icon
3. Dialog appears
4. User clicks Cancel button
5. Dialog closes
6. Task still in list
7. localStorage unchanged

### Undo Path (optional)
1. User deletes task
2. Task disappears from list
3. Undo button appears for 10 seconds
4. User clicks Undo within 10 seconds
5. Task reappears in list
6. Undo button disappears

---

## Metadata

| Field | Value |
|-------|-------|
| Story ID | STORY-STB-004 |
| Epic | Epic-STB-001 |
| Created By | Product Team |
| Created Date | Feb 17, 2026 |
| Last Updated | Feb 17, 2026 |
| Status | Backlog |
| Sprint | [TBD] |
| Priority | High |

---

*User Story - Delete Task with Confirmation*  
*Ready for estimation and development*
