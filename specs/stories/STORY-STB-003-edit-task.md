---
issue_key: SCRUM-5
issue_url: 'https://epam-team-y3bxkrl5.atlassian.net/browse/SCRUM-5'
---
# User Story: STB-003 - Edit Existing Task

**Story ID:** STORY-STB-003  
**Epic:** Epic-STB-001: Core Task Management System  
**Parent PRD:** Student Task Board PRD

---

## User Story Statement

**As a** task owner  
**I want to** edit any task details (title, description, priority, due date, category)  
**So that** I can keep my tasks up-to-date and correct any mistakes

---

## Description

Users need the ability to modify task details after creation. Changes may include correcting the title, updating priority based on new information, changing due dates, or reorganizing tasks. The edit flow should be similar to creation, prepopulating current values so users can easily see what's changing. Edits should save immediately and provide confirmation.

### Related Epic
Epic-STB-001: Core Task Management System

### Related Stories
- STORY-STB-002: Create new task (similar form)
- STORY-STB-001: Display task list (shows edited task)
- STORY-STB-004: Delete task (alternative modification)

---

## Acceptance Criteria

- [ ] **Criterion 1:** Edit button/link available on each task in the list
- [ ] **Criterion 2:** Edit form opens with all current task values prepopulated
- [ ] **Criterion 3:** User can modify any field (title, description, priority, due date, category)
- [ ] **Criterion 4:** Form validation prevents saving with empty title
- [ ] **Criterion 5:** Saving changes updates the task immediately in the list
- [ ] **Criterion 6:** User receives visual confirmation of successful update ("Task updated!")
- [ ] **Criterion 7:** Cancel button closes edit form without saving changes
- [ ] **Criterion 8:** Edited task retains its ID and creation timestamp (only updated fields change)

---

## Acceptance Tests / Examples

### Test Case 1: Edit task priority and due date
**Given** I have a task in my list  
**When** I click Edit, change priority from Medium to High, change due date  
**And** I click "Save Changes"  
**Then** The task in the list updates with new priority and due date

### Test Case 2: Prepopulated form values
**Given** I click Edit on a task  
**When** The edit form opens  
**Then** All form fields display the current task values exactly

### Test Case 3: Validation prevents empty title
**Given** I'm editing a task  
**When** I clear the title field and click "Save Changes"  
**Then** The form shows error "Title is required" and does not save

### Test Case 4: Cancel discards changes
**Given** I'm editing a task and made changes  
**When** I click "Cancel"  
**Then** The form closes and the task in the list remains unchanged

### Test Case 5: Edit description (optional field)
**Given** I'm editing a task without a description  
**When** I add a description and save  
**Then** The task is updated with the new description

---

## INVEST Principles Validation Checklist

### Independence
- [x] Story is valuable on its own
- [x] Can be developed independently (builds on Task model)
- [x] Doesn't require additional feature stories

### Negotiable
- [ ] Edit trigger (inline edit vs modal vs separate page) negotiable
- [ ] Which fields are editable possible to discuss
- [ ] Save strategy (auto-save vs button) debatable
- [ ] Form layout can be same as create or different

### Valuable
- [x] Directly delivers user need (modify tasks)
- [x] Essential feature for any task app
- [x] Users interact with this feature regularly

### Estimable
- [x] Team understands edit form concept
- [x] Similar to STORY-STB-002 (create form)
- [x] No hidden complexity

### Small
- [x] Can be completed in 1-2 days
- [x] Focused scope (edit form only)
- [x] Leverage create form implementation

### Testable
- [x] Can manually edit and verify changes save
- [x] Can verify form prepopulates correctly
- [x] Can test validation and cancel scenarios
- [x] Can verify data persists

---

## Effort & Estimation

| Aspect | Value |
|--------|-------|
| **Story Points** | 5 |
| **Estimated Hours** | 10-12 hours |
| **Assigned To** | [TBD] |
| **Priority** | Critical |

---

## Definition of Ready (Pre-Estimation)

- [x] Acceptance criteria specific and measurable
- [x] Dependencies clear (STORY-STB-002 form)
- [x] Edit interaction method understood
- [x] Task ID immutability requirement clear
- [x] Validation same as create (recanuse logic)

---

## Definition of Done (Post-Development)

- [ ] Edit button/icon visible on each task
- [ ] TaskEditForm created (or reuses TaskForm)
- [ ] Form prepopulates with current task data
- [ ] handleSubmit updates task in context/localStorage
- [ ] Task updates immediately in list
- [ ] Success confirmation message displays
- [ ] Cancel button properly closes form
- [ ] Task ID and createDate preserved
- [ ] Form validation same as create form
- [ ] Unit tests for form prepopulation
- [ ] Integration test: edit → verify list updates
- [ ] No console errors
- [ ] Code reviewed and merged

---

## Technical Notes

### Component Architecture
```typescript
<TaskEditForm>
  - Similar to TaskForm (STORY-STB-002)
  - Accepts task object as prop
  - Prepopulates form fields with task values
  - handleSubmit calls context.updateTask(updatedTask)
  
<EditTaskModal>
  - Modal wrapper around TaskEditForm
  - Triggered by Edit button on TaskItem
  - Passes task.id to identify what to update
```

### Implementation Strategy
```typescript
// Reuse TaskForm, add isEditing mode
<TaskForm 
  task={currentTask}        // null for create, Task object for edit
  onSubmit={handleSubmit}
  isEditing={true}
/>

// In TaskForm component
useEffect(() => {
  if (task) {
    setFormData(task);      // Prepopulate with existing data
  }
}, [task]);
```

### Update Logic
```typescript
const handleTaskUpdate = (updatedTask: Task) => {
  const updated = {
    ...updatedTask,
    updatedAt: new Date().toISOString()  // Update timestamp only
    // id and createdAt remain unchanged
  };
  taskContext.updateTask(updated);
  saveToLocalStorage();
};
```

---

## Notes & Comments

### Design Decisions
- Reuse form component from create (DRY principle)
- Edit form can be modal, inline, or separate page (negotiable)
- Only "updatedAt" timestamp updated on edits; "createdAt" preserved
- All fields editable (including category)

### Implementation Approach
- Extract TaskForm into reusable component
- Pass `initialTask` prop to determine edit vs create mode
- Title of form changes: "Create Task" vs "Edit Task"
- Button text changes: "Create" vs "Save Changes"

### Edge Cases
- User edits but makes no changes (still save with updated timestamp)
- User adds description to task without one
- User removes description from task
- User clicks browser back button in modal (should close)

---

## Dependencies & Integration

### Depends On
- STORY-STB-002: TaskForm component
- STORY-STB-001: Task display model

### Integration Points
- `taskContext.updateTask(updatedTask)`
- localStorage sync for edited task
- Refresh list view after edit

---

## Metadata

| Field | Value |
|-------|-------|
| Story ID | STORY-STB-003 |
| Epic | Epic-STB-001 |
| Created By | Product Team |
| Created Date | Feb 17, 2026 |
| Last Updated | Feb 17, 2026 |
| Status | Backlog |
| Sprint | [TBD] |
| Priority | Critical |

---

*User Story - Edit Task Details*  
*Ready for estimation and development*
