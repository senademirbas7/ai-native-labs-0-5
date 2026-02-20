---
issue_key: SCRUM-4
issue_url: 'https://epam-team-y3bxkrl5.atlassian.net/browse/SCRUM-4'
---
# User Story: STB-002 - Create New Task

**Story ID:** STORY-STB-002  
**Epic:** Epic-STB-001: Core Task Management System  
**Parent PRD:** Student Task Board PRD

---

## User Story Statement

**As a** student or developer  
**I want to** create a new task with title, priority, due date, and category  
**So that** I can add important work to my task board for tracking

---

## Description

Users need a straightforward way to add new tasks to their task board. The creation flow should be simple but allow essential details: task title (required), description (optional), priority level, due date, and category. The form should provide immediate feedback on successful creation and ready the user to add another task or return to the list.

### Related Epic
Epic-STB-001: Core Task Management System

### Related Stories
- STORY-STB-001: Display task list view (shows created task)
- STORY-STB-003: Edit existing task (similar form)
- STORY-STB-006: Task data persistence (saves to localStorage)

---

## Acceptance Criteria

- [ ] **Criterion 1:** Task creation form accessible via "Add Task" or "+" button on task list
- [ ] **Criterion 2:** Form requires title (text input) and allows optional description (textarea)
- [ ] **Criterion 3:** Priority dropdown allows selection: High, Medium, Low (default: Medium)
- [ ] **Criterion 4:** Due date picker allows selecting future dates (calendar or date input)
- [ ] **Criterion 5:** Category dropdown allows selecting from existing categories or create new
- [ ] **Criterion 6:** Form validation prevents submission with empty title
- [ ] **Criterion 7:** On successful creation, task appears in list immediately and form resets
- [ ] **Criterion 8:** User receives visual confirmation ("Task created!" message)

---

## Acceptance Tests / Examples

### Test Case 1: Create task with all required fields
**Given** I'm on the task list view  
**When** I click "Add Task" and fill in title, priority, due date, category  
**And** I click "Save Task"  
**Then** The new task appears at the top of the task list with all details

### Test Case 2: Form validation on empty title
**Given** I'm on the task creation form  
**When** I leave the title empty and click "Save Task"  
**Then** The form shows an error message "Title is required" and does not submit

### Test Case 3: Form resets after creation
**Given** I successfully created a task  
**When** The form remains open  
**Then** All fields are cleared to default values (empty title, Medium priority, today's date)

### Test Case 4: Create task with optional description
**Given** I'm creating a new task  
**When** I fill in title, priority, due date, category AND description  
**And** I save the task  
**Then** The task is created with all details including description

### Test Case 5: Create task without due date
**Given** I'm creating a new task without specifying a due date  
**When** I fill in title and category and save  
**Then** The task is created with empty/null due date (optional field)

---

## INVEST Principles Validation Checklist

### Independence
- [x] Story complete and valuable on its own
- [x] Can be developed independently (uses same data model as STORY-STB-001)
- [x] Doesn't require other feature stories

### Negotiable
- [ ] Form layout (modal, inline, separate page) negotiable
- [ ] Category creation in form or separate story (negotiable)
- [ ] New task position (top of list vs bottom) can be discussed
- [ ] Optional fields debatable (description, due date)

### Valuable
- [x] Directly enables core user goal (add tasks)
- [x] This feature users interact with multiple times daily
- [x] Essential for application functionality

### Estimable
- [x] Team understands form concept
- [x] Complexity known (form building, validation, data creation)
- [x] No hidden technical challenges

### Small
- [x] Completable in 1-2 days
- [x] Focused scope (form creation only)
- [x] Doesn't include editing or deletion

### Testable
- [x] Can manually fill form and verify task creates
- [x] Can test validation scenarios
- [x] Can verify data persists to localStorage
- [x] Success states clearly defined

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

- [x] Story clearly defines all form fields
- [x] Acceptance criteria cover validation scenarios
- [x] Business value evident
- [x] Dependencies understood (STORY-STB-001 for list view)
- [x] No ambiguity on required vs optional fields
- [x] Form layout can be negotiated in planning

---

## Definition of Done (Post-Development)

- [ ] TaskForm component created with controlled form inputs
- [ ] Form validation logic implemented (required fields, date format)
- [ ] Error messages display for invalid inputs
- [ ] New task saved to context/state and localStorage
- [ ] Task appears in list immediately after creation
- [ ] Form resets after successful submission
- [ ] Success message displays temporarily
- [ ] Unit tests for form validation
- [ ] Integration test: create task → verify in list
- [ ] Code reviewed and merged
- [ ] No console errors
- [ ] Accessible form (labels, ARIA attributes)

---

## Technical Notes

### Component Architecture
```typescript
<TaskForm>
  - Controlled form with React state
  - inputs: title, description, priority, dueDate, category
  - functions: handleChange, handleSubmit, resetForm
  
<FormInput>
  - Reusable input component with label
  - error state and message display
  
<PrioritySelect>
  - Dropdown for High/Medium/Low
  - Default: Medium
  
<DatePicker>
  - HTML date input or calendar picker
  - Only allow future dates (optional: today+)
  
<CategorySelect>
  - Dropdown of existing categories
  - Option to create new category (inline)
```

### Form State
```typescript
interface TaskFormState {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;  // ISO format: YYYY-MM-DD
  category: string;
}

interface FormErrors {
  title?: string;
  dueDate?: string;
  category?: string;
}
```

### Validation Rules
```typescript
const validateForm = (formData) => {
  // title required and min 3 chars
  if (!formData.title || formData.title.length < 3) {
    errors.title = 'Title required (min 3 chars)';
  }
  // dueDate must be today or future
  if (formData.dueDate && formData.dueDate < today()) {
    errors.dueDate = 'Due date must be today or later';
  }
  // category required
  if (!formData.category) {
    errors.category = 'Category required';
  }
  return errors;
};
```

---

## Notes & Comments

### Design Decisions
- Form submits on button click (not on blur/change)
- Description field optional (not all tasks need detailed notes)
- New task appears at top of list (most recent first pattern)

### Implementation Approach
- Use React hooks (useState for form state)
- Extract validation to separate utility function
- Emit success/error events to parent TaskList
- Reset form immediately after successful creation

### Questions for Clarification
- Should category be required or optional? (Suggest: optional with default)
- Can user create category inline in form? (Suggest: no, in separate flow)
- Should due date default to "today" or "tomorrow"? (Suggest: empty)

---

## Dependencies & Integration

### Depends On
- TaskContext/Redux store for task creation
- STORY-STB-001 somewhat (displays in list)

### Blocks
- STORY-STB-006 (persistence) - should be in parallel

### Integration Points
- Calls `taskContext.addTask(newTask)`
- Emits event to parent to refresh task list
- Uses Task data model from Epic-STB-001

---

## Metadata

| Field | Value |
|-------|-------|
| Story ID | STORY-STB-002 |
| Epic | Epic-STB-001 |
| Created By | Product Team |
| Created Date | Feb 17, 2026 |
| Last Updated | Feb 17, 2026 |
| Status | Backlog |
| Sprint | [TBD] |
| Priority | Critical |

---

*User Story - Create New Task*  
*Ready for estimation and development*
