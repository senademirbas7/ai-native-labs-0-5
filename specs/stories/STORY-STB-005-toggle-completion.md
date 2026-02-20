---
issue_key: SCRUM-7
issue_url: 'https://epam-team-y3bxkrl5.atlassian.net/browse/SCRUM-7'
---
# User Story: STB-005 - Mark Task Complete/Incomplete

**Story ID:** STORY-STB-005  
**Epic:** Epic-STB-001: Core Task Management System  
**Parent PRD:** Student Task Board PRD

---

## User Story Statement

**As a** task owner  
**I want to** quickly mark tasks as complete or incomplete with a single click  
**So that** I can track task progress and celebrate completed work

---

## Description

Users need a fast way to toggle task completion status. This is likely the most frequently used interaction in the app. A checkbox, toggle button, or status button should allow one-click completion. Completed tasks should be visually distinguished from active ones, reinforcing accomplishment. The completion status must persist to localStorage.

### Related Epic
Epic-STB-001: Core Task Management System

### Related Stories
- STORY-STB-001: Display task list (shows completion status)
- STORY-STB-006: Task persistence (saves completion status)
- STORY-STB-007: Dashboard analytics (uses completion data)

---

## Acceptance Criteria

- [ ] **Criterion 1:** Each task displays a clickable checkbox or completion toggle
- [ ] **Criterion 2:** Clicking the checkbox/toggle marks task as complete or incomplete
- [ ] **Criterion 3:** Completed tasks display with strikethrough text or reduced opacity
- [ ] **Criterion 4:** Completion status is immediately saved to localStorage
- [ ] **Criterion 5:** Toggle can be clicked multiple times to switch between states
- [ ] **Criterion 6:** Visual feedback provided on toggle (animation or color change)
- [ ] **Criterion 7:** Completed tasks can still be edited or deleted
- [ ] **Criterion 8:** Completion percentage update in dashboard (if available)

---

## Acceptance Tests / Examples

### Test Case 1: Mark task complete with checkbox
**Given** I have an active task in my list  
**When** I click the checkbox for that task  
**Then** The task appears with strikethrough and is marked complete

### Test Case 2: Mark task incomplete again
**Given** I have a completed task  
**When** I click its checkbox  
**Then** The strikethrough is removed and task status returns to active

### Test Case 3: Persist completion status
**Given** I marked a task as complete  
**When** I refresh the page  
**Then** The task still shows as completed and maintains its status

### Test Case 4: Incomplete toggle multiple times
**Given** I have a task marked complete  
**When** I click complete → incomplete → complete rapidly  
**Then** All status changes persist correctly

### Test Case 5: Edit completed task
**Given** I have a completed task  
**When** I click Edit on that task  
**Then** The edit form opens and I can modify any field

---

## INVEST Principles Validation Checklist

### Independence
- [x] Story is valuable and complete on its own
- [x] Can be developed with just task model
- [x] Doesn't require other features

### Negotiable
- [ ] UI for toggle (checkbox vs button vs slider) negotiable
- [ ] Visual styling (strikethrough vs opacity) debatable
- [ ] Position of checkbox (left vs right) can be discussed
- [ ] Require confirmation for status change (no, for speed)

### Valuable
- [x] Essential feature for task management
- [x] Most frequently used interaction
- [x] Directly delivers core user need

### Estimable
- [x] Team understands checkbox/toggle concept
- [x] Simple state update and persistence
- [x] No hidden complexity

### Small
- [x] Can be completed in 1 day
- [x] Minimal code changes
- [x] Focused scope (status update only)

### Testable
- [x] Can manually click checkbox and verify status
- [x] Can refresh page and verify persistence
- [x] Can verify completion count updates
- [x] Visual changes easily verifiable

---

## Effort & Estimation

| Aspect | Value |
|--------|-------|
| **Story Points** | 2 |
| **Estimated Hours** | 4-6 hours |
| **Assigned To** | [TBD] |
| **Priority** | Critical |

---

## Definition of Ready (Pre-Estimation)

- [x] Acceptance criteria clear and specific
- [x] Task model includes completion status
- [x] UI component for toggle selected
- [x] Persistence mechanism understood
- [x] No blocking dependencies

---

## Definition of Done (Post-Development)

- [ ] Checkbox/toggle button rendered on TaskItem
- [ ] onClick handler updates task.completed status
- [ ] Completed tasks display with strikethrough or opacity change
- [ ] Status change saves to localStorage immediately
- [ ] localStorage survives page refresh
- [ ] Toggle works bidirectionally (complete → incomplete)
- [ ] Visual feedback provided (animation or color)
- [ ] Unit test for toggle state update
- [ ] Unit test for localStorage persistence
- [ ] Integration test: toggle → refresh → verify status
- [ ] No console errors
- [ ] Accessible (semantic checkbox, labeled)
- [ ] Code reviewed and merged

---

## Technical Notes

### Component Architecture
```typescript
<TaskItem>
  <input 
    type="checkbox"
    checked={task.completed}
    onChange={() => handleToggleComplete(task.id)}
    aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
  />
  <span className={task.completed ? 'completed' : ''}>
    {task.title}
  </span>
</TaskItem>
```

### State Update
```typescript
const handleToggleComplete = (taskId: string) => {
  const updatedTasks = tasks.map(task => 
    task.id === taskId 
      ? { ...task, completed: !task.completed, updatedAt: new Date().toISOString() }
      : task
  );
  setTasks(updatedTasks);
  saveToLocalStorage(updatedTasks);
};
```

### Styling
```css
/* Completed task styling */
.task-item.completed {
  opacity: 0.6;
  text-decoration: line-through;
}

.task-item.completed .task-title {
  color: #999;
}

/* Smooth transition */
.task-item {
  transition: all 0.3s ease;
}
```

### Data Model Update
```typescript
interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;  // New/updated field
  dueDate: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}
```

---

## Notes & Comments

### Design Decisions
- Checkbox preferred over button (standard UX pattern)
- One-click toggle for speed (no confirmation needed)
- Strikethrough visual for clarity
- Opacity reduction for disabled appearance

### Implementation Approach
- Add `completed: boolean` to Task model
- Simple checkbox input in TaskItem
- Direct state update on checkbox change
- Immediate localStorage persistence
- No separate API call (client-side only)

### Performance Impact
- Minimal - single boolean toggle
- localStorage operations <10ms
- No re-render of other tasks

---

## Testing Scenarios

### Basic Toggle
1. Task starts as incomplete (checkbox unchecked)
2. User clicks checkbox
3. Task marked complete (checkbox checked, strikethrough)
4. User clicks checkbox again
5. Task marked incomplete (checkbox unchecked, no strikethrough)

### Persistence
1. User marks task complete
2. User refreshes page
3. Task still shows as complete

### Multiple Tasks
1. User has 5 tasks
2. User marks 2 as complete
3. Other 3 remain active
4. Refresh page - all statuses persist correctly

---

## Edge Cases

- User rapidly clicks checkbox (should handle without errors)
- Task completed while being edited (status updates correctly)
- Complete task with no due date (works same as others)
- Complete task in empty category (works same as others)

---

## Metadata

| Field | Value |
|-------|-------|
| Story ID | STORY-STB-005 |
| Epic | Epic-STB-001 |
| Created By | Product Team |
| Created Date | Feb 17, 2026 |
| Last Updated | Feb 17, 2026 |
| Status | Backlog |
| Sprint | [TBD] |
| Priority | Critical |

---

*User Story - Mark Task Complete/Incomplete*  
*Ready for estimation and development*
