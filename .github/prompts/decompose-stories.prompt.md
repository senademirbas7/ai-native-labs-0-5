---
name: Decompose Epics into User Stories
description: Break down an Epic into development-ready User Stories following INVEST principles
tags:
  - story
  - user-story
  - decomposition
  - agile
  - invest
context:
  - specs/templates/story-template.md
  - specs/templates/epic-template.md
variables:
  epicFile: Path to Epic document or Epic content
  numberOfStories: Number of stories to generate (typically 5-15 per epic)
  sprintSize: Sprint duration (1-2 weeks) for estimation
version: 1.0
author: Task Board Team
---

# Decompose Epic into User Stories

## Purpose
This prompt helps you break down an Epic into development-ready User Stories following INVEST principles and using the standardized User Story template located at `specs/templates/story-template.md`.

## How to Use

### Step 1: Prepare Your Epic
You can either:
- **Reference an existing Epic file**: `specs/epics/[epic-name].md`
- **Provide Epic content directly**: Paste the Epic text

### Step 2: Invoke the Decomposer
```
/decompose-stories

Epic Reference:
[specs/epics/epic-name.md OR paste Epic content]

Sprint Duration:
[1 week or 2 weeks]

Target Stories:
[5-15 stories recommended]
```

## Instructions for Copilot

You will now decompose the Epic into User Stories by:

1. **Using the Story Template Structure**: Follow the structure defined in `/specs/templates/story-template.md`

2. **Analyze Epic Components**:
   - **Epic Title** → Story grouping/theme
   - **Success Criteria** → Story acceptance criteria foundation
   - **Key Features** → Core story features
   - **Primary Persona** → All stories should address this persona
   - **Dependencies** → Identify story execution order

3. **Create User Stories**:
   - **Format**: "As a [user] I want [action] so that [benefit]"
   - **User**: Refer to personas from Epic/PRD
   - **Action**: Specific, testable functionality
   - **Benefit**: Clear business/user value

4. **Fill Story Template Sections**:
   - **Story ID**: Sequential numbering (STORY-001, STORY-002, etc.)
   - **User Story Statement**: Use "As a... I want... so that..." format
   - **Description**: Additional context and technical details
   - **Acceptance Criteria**: 3-5 specific, testable conditions
   - **Acceptance Tests**: BDD-style Given/When/Then scenarios
   - **INVEST Validation**: Confirm all INVEST principles are met
   - **Estimation**: Assign story points (1, 2, 3, 5, 8, 13)

5. **Validate INVEST Principles**:
   - **Independent**: Story can be completed independently
   - **Negotiable**: Details can be discussed, not overly prescriptive
   - **Valuable**: Delivers clear user/business value
   - **Estimable**: Team can understand and estimate effort
   - **Small**: Completable within one sprint
   - **Testable**: Clear success criteria, easily verified

6. **Ensure Proper Sequencing**:
   - Identify story dependencies
   - Place foundational stories first
   - Group dependencies logically
   - Consider parallel development opportunities

7. **Organize by Priority**:
   - MVP stories first (Critical/High priority)
   - Enhancement stories second (Medium/Low priority)
   - Clearly mark blocking stories

## Template Reference

Story template includes:
- Story ID and User Story Statement
- Description with context
- Acceptance Criteria (3-5 points)
- Acceptance Tests (BDD Given/When/Then)
- INVEST Validation Checklist
- Definition of Ready & Definition of Done
- Estimation (Story Points)
- Metadata (Status, Assignee, Timeline)

## Decomposition Strategy

### Story Sizing Guidelines

**Small (1-3 points)**: 
- Simple UI changes
- Basic CRUD operations
- Data formatting/display
- Estimated: 4-8 hours

**Medium (5 points)**:
- Feature with basic logic
- Integration of existing services
- Multiple UI components
- Estimated: 8-16 hours

**Large (8-13 points)**:
- Complex feature with business logic
- Multi-component integration
- Significant testing needs
- Consider breaking into smaller stories

### Story per Epic

Recommended breakdown:
- **Small Epics (3-4 weeks)**: 3-5 stories
- **Medium Epics (4-8 weeks)**: 5-10 stories
- **Large Epics (8-12 weeks)**: 10-15 stories

## Output Format

The generated Stories should:
- Be formatted in Markdown
- Each saved as separate file: `specs/stories/[story-id]-[story-name].md`
- Include clear sequential numbering (STORY-001, STORY-002, etc.)
- Reference parent Epic
- Link related stories and dependencies
- Include story point estimation
- Be ready for sprint planning and development

## Example

**Input:**
```
/decompose-stories

Epic: Task Management Engine

Sprint Duration: 2 weeks

Target Stories: 8
```

**Output:**
```
STORY-001: Display task list view
├── As a user I want to see all my tasks in a list
├── Scope: Small (2 points)
├── Acceptance: Load tasks from localStorage, display in table
└── Dependencies: None

STORY-002: Create new task form
├── As a user I want to create new tasks
├── Scope: Small (3 points)
├── Acceptance: Form validation, localStorage save, UI feedback
└── Dependencies: STORY-001

STORY-003: Edit existing task
├── As a user I want to modify task details
├── Scope: Medium (5 points)
├── Acceptance: Update title, priority, date, save changes
└── Dependencies: STORY-002

STORY-004: Delete task with confirmation
├── As a user I want to remove tasks
├── Scope: Small (2 points)
├── Acceptance: Confirmation dialog, remove from localStorage
└── Dependencies: STORY-001

STORY-005: Filter tasks by priority
├── As a user I want to filter by priority level
├── Scope: Small (3 points)
├── Acceptance: Filter controls, update view in real-time
└── Dependencies: STORY-001

STORY-006: Sort tasks by due date
├── As a user I want to organize tasks by date
├── Scope: Small (2 points)
├── Acceptance: Sort ascending/descending, persist preference
└── Dependencies: STORY-001

STORY-007: Task search functionality
├── As a user I want to find tasks quickly
├── Scope: Medium (5 points)
├── Acceptance: Search input, real-time filtering, highlight results
└── Dependencies: STORY-001

STORY-008: Task statistics dashboard
├── As a user I want to see my progress
├── Scope: Medium (5 points)
├── Acceptance: Count total/completed tasks, show completion %
└── Dependencies: STORY-001-007
```

## Story Writing Tips

### Clear User Stories
- ✅ "As a project manager I want to assign tasks to team members so that I can distribute work"
- ✅ "As a user I want to set task priorities so that I can focus on important items"
- ❌ "Add filtering"
- ❌ "Implement search feature"

### Good Acceptance Criteria
- ✅ Specific and measurable
- ✅ Testable without ambiguity
- ✅ Uses proper language (Given/When/Then for tests)
- ❌ Vague technical jargon
- ❌ Implementation prescriptions

### Proper Estimation
- Consider team velocity
- Account for testing and review time
- Include uncertainty buffer for complex stories
- Use Fibonacci scale (1, 2, 3, 5, 8, 13)

## Quality Checklist

For each generated Story:
- [ ] "As a..." user role is clear
- [ ] "I want..." action is specific and testable
- [ ] "So that..." benefit is valuable
- [ ] 3-5 acceptance criteria defined
- [ ] Acceptance tests use Given/When/Then format
- [ ] Story Point estimate is reasonable
- [ ] Dependencies are identified
- [ ] INVEST principles validated
- [ ] Links back to Epic
- [ ] Story is independent and valuable

## Dependencies & Ordering

Mark story dependencies:
- **Blocking**: Story X must complete before Story Y
- **Related**: Story X should be done together with Story Y
- **Optional**: Story X can be done after Story Y if time permits

## Next Steps

After Story decomposition:
1. Review stories with product team
2. Refine acceptance criteria based on team feedback
3. Add technical details if needed
4. Assign stories to sprints
5. Update Definition of Ready/Done with team
6. Start sprint planning and estimation

## Story Lifecycle

1. **Backlog**: Story created and documented
2. **Ready for Sprint**: Meets Definition of Ready
3. **In Progress**: Development started
4. **In Review**: Code review and testing
5. **Done**: Meets Definition of Done, deployed

## Related Prompts

- `/generate-prd` - Generate PRD from project brief
- `/decompose-epics` - Break PRD into Epics
- `/generate-story` - Generate individual detailed story

## Related Templates

- Story Template: `specs/templates/story-template.md`
- Epic Template: `specs/templates/epic-template.md`
- PRD Template: `specs/templates/prd-template.md`

**Save Location:** `specs/stories/[STORY-XXX]-[story-name].md` (separate file for each story)

**INVEST Principles:** Independence, Negotiable, Valuable, Estimable, Small, Testable
