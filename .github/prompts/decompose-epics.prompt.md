---
name: Decompose PRD into Epics
description: Break down a Product Requirements Document into manageable Epic specifications
tags:
  - epic
  - decomposition
  - requirements
  - documentation
context:
  - specs/templates/epic-template.md
  - specs/templates/prd-template.md
variables:
  prdFile: Path to PRD document or PRD content
  numberOfEpics: Number of epics to generate (typically 3-7)
  projectScope: Scope of epics (MVP, Phase 1, Phase 2, etc.)
version: 1.0
author: Task Board Team
---

# Decompose PRD into Epics

## Purpose
This prompt helps you break down a Product Requirements Document (PRD) into well-defined Epics using the standardized Epic template located at `specs/templates/epic-template.md`.

## How to Use

### Step 1: Prepare Your PRD
You can either:
- **Reference an existing PRD file**: `specs/prds/[project-name]-prd.md`
- **Provide PRD content directly**: Paste the PRD text

### Step 2: Invoke the Decomposer
```
/decompose-epics

PRD Reference:
[specs/prds/project-name-prd.md OR paste PRD content]

Phase/Scope:
[MVP, Phase 1, Phase 2, etc.]

Number of Epics:
[3-7 recommended]
```

## Instructions for Copilot

You will now decompose the PRD into Epics by:

1. **Using the Epic Template Structure**: Follow the structure defined in `/specs/templates/epic-template.md`

2. **Identify Epic Boundaries**:
   - Group related functional requirements into logical features
   - Ensure each epic is significant enough to span multiple sprints
   - Avoid creating epics that are too granular or too broad

3. **Analyze PRD Sections**:
   - **Functional Requirements** → Core Epic features
   - **Use Cases** → Epic acceptance criteria
   - **User Personas** → Epic primary personas
   - **Success Metrics** → Link to epic success criteria
   - **Scope** → Determine which phase each epic belongs to

4. **Fill Epic Template Sections**:
   - **Title**: Clear, action-oriented epic name (e.g., "User Authentication System", "Task Management Engine")
   - **Description**: Overview, business context, and key features included
   - **Primary Persona**: The most affected user persona from the PRD
   - **Success Criteria**: Convert PRD requirements into measurable acceptance criteria
   - **Scope & Complexity**: Estimate as Small, Medium, or Large based on effort
   - **Dependencies**: Identify internal (other epics), external, and team dependencies

5. **Maintain Consistency**:
   - Reference the parent PRD
   - Link related epics
   - Ensure no overlapping functionality between epics
   - Preserve PRD requirements completely

6. **Organize by Phase**:
   - Group MVP epics separately from Phase 2+ enhancements
   - Clearly mark phase dependencies

## Template Reference

Epic template includes these sections:
- Title and Description
- Primary Persona
- Success Criteria (with acceptance criteria and definition of done)
- Scope & Complexity (S/M/L), Effort, Assumptions, Constraints
- Dependencies (Internal, External, Team)
- Success Metrics, Known Issues, References, Metadata

## Decomposition Strategy

### MVP Epics (Typically 3-4)
- Core functionality needed for launch
- High priority and business value
- Independent or minimal dependencies

### Phase 1+ Epics (Typically 2-3)
- Secondary features enhancing the product
- Nice-to-have enhancements
- Can depend on MVP epics

## Output Format

The generated Epics should:
- Be formatted in Markdown
- Each saved as separate file: `specs/epics/[epic-name].md`
- Include clear numbering (Epic-1, Epic-2, etc.)
- Reference parent PRD document
- Link dependencies between epics
- Be ready for team estimation and planning

## Example

**Input:**
```
/decompose-epics

PRD: AI Task Assistant PRD

Phase: MVP

Number of Epics: 4
```

**Output:**
```
Epic-1: Natural Language Task Input & Processing
├── Primary Persona: Remote Worker
├── Scope: Large
├── Acceptance Criteria: NLP processing, task extraction, categorization
└── Dependencies: Backend NLP API integration

Epic-2: Core Task Management System
├── Primary Persona: Any User
├── Scope: Large
├── Acceptance Criteria: CRUD operations, task organization, filtering
└── Dependencies: localStorage integration, Epic-1

Epic-3: Smart Reminders & Notifications
├── Primary Persona: Busy Professional
├── Scope: Medium
├── Acceptance Criteria: Scheduled reminders, priority-based timing
└── Dependencies: Task system (Epic-2)

Epic-4: Collaboration Features
├── Primary Persona: Project Manager
├── Scope: Medium
├── Acceptance Criteria: Task sharing, team collaboration, permissions
└── Dependencies: All core features, Phase 2
```

## Epic Naming Conventions

Use clear, action-oriented names:
- ✅ "User Authentication System"
- ✅ "Task Collaborati & Sharing"
- ✅ "Advanced Analytics Dashboard"
- ❌ "Feature 1"
- ❌ "Stuff"

## Quality Checklist

For each generated Epic:
- [ ] Title is clear and descriptive
- [ ] Size estimate (S/M/L) is reasonable
- [ ] Success criteria are measurable
- [ ] Dependencies are identified
- [ ] Links back to PRD
- [ ] Primary persona is specified
- [ ] Business value is evident

## Tips

- **Balance Scope**: Avoid epics that are too small (should take 2-4 weeks) or too large (should not take > 8 weeks)
- **Minimize Dependencies**: Group related features to reduce cross-epic dependencies
- **Consider Team**: Account for team size and expertise when estimating complexity
- **Document Assumptions**: Note any assumptions about the PRD or scope
- **Use Metrics**: Link epic success criteria to PRD success metrics

## Next Steps

After Epic decomposition:
1. Review epics with product team
2. Validate epic boundaries and dependencies
3. Prioritize epics for implementation phases
4. Break epics into User Stories with `/decompose-stories`
5. Estimate story points (if using Scrum)

## Related Prompts

- `/generate-prd` - Generate PRD from project brief
- `/decompose-stories` - Break Epics into User Stories
- `/generate-story` - Generate individual User Story details

**Template Location:** `specs/templates/epic-template.md`

**PRD Template Location:** `specs/templates/prd-template.md`

**Save Location:** `specs/epics/[epic-name].md` (separate file for each epic)
