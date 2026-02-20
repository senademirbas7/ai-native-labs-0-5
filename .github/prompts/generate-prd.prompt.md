---
name: Generate PRD
description: Generate a Product Requirements Document from a project brief using the PRD template
tags:
  - prd
  - product
  - requirements
  - documentation
context:
  - specs/templates/prd-template.md
variables:
  projectName: Project name or title
  projectBrief: High-level description of the project
  targetAudience: Primary users/stakeholders
  keyFeatures: Main features or capabilities
  timeline: Expected timeline or release plan
version: 1.0
author: Task Board Team
---

# Generate PRD from Project Brief

## Purpose
This prompt helps you generate a comprehensive Product Requirements Document (PRD) from a project brief using the standardized PRD template located at `specs/templates/prd-template.md`.

## How to Use

### Step 1: Provide Your Project Brief
Share the following information about your project:

**Project Name:**
```
[Enter your project name]
```

**Project Description/Brief:**
```
[Provide a 2-3 sentence overview of what the project is about]
```

**Target Users/Audience:**
```
[Describe who will use this product]
```

**Key Features (at least 3-5):**
```
- [Feature 1]
- [Feature 2]
- [Feature 3]
```

**Timeline/Phase:**
```
[Specify if this is MVP, Phase 1, Phase 2, etc., and expected timeline]
```

### Step 2: Invoke the Generator
Copy and paste your project brief, then ask:

```
/generate-prd

Project Brief:
[Your brief information here]
```

## Instructions for Copilot

You will now generate a complete PRD by:

1. **Using the Template Structure**: Follow the structure and sections defined in `/specs/templates/prd-template.md`

2. **Filling Key Sections**:
   - **Overview**: Use the project brief to create a compelling product vision
   - **User Personas**: Generate 2-3 realistic personas based on the target audience
   - **Use Cases**: Create 2-3 realistic use cases describing how users will interact with the product
   - **Functional Requirements**: Extract or infer features from the project brief and organize them logically
   - **Non-Functional Requirements**: Add realistic performance, security, and scalability requirements appropriate for the product type
   - **Success Metrics**: Create KPIs relevant to the product goals
   - **Scope**: Define what's in MVP/Phase 1 vs. future phases

3. **Replace Placeholders**: Replace all `[...]` placeholders with concrete, detailed information specific to the project

4. **Maintain Professional Tone**: Use clear, concise language appropriate for stakeholders and product teams

5. **Include Examples**: Where applicable, provide specific examples rather than generic statements

## Template Reference

The PRD template includes these main sections:
- Overview (vision, goals, benefits)
- User Personas (3 personas with goals and pain points)
- Use Cases (3 detailed use cases)
- Functional Requirements (organized by feature)
- Non-Functional Requirements (performance, security, scalability, reliability, usability)
- Success Metrics (KPIs, engagement, business metrics)
- Scope (in/out of scope, phase-based rollout)
- Timeline, Assumptions, Risks, Approval, and Appendices

## Output Format

The generated PRD should:
- Be formatted in Markdown
- Include all sections from the template
- Replace all placeholders with specific content
- Be saved to `specs/prds/[project-name]-prd.md`
- Be ready for stakeholder review

## Example

**Input:**
```
/generate-prd

Project Brief:
- Name: AI Task Assistant
- Description: An AI-powered task management tool that uses natural language to help users create and manage tasks
- Target Users: Remote workers, project managers, busy professionals
- Key Features: Natural language task input, AI categorization, smart reminders, team collaboration
- Timeline: MVP in 3 months
```

**Output:**
A complete PRD document with:
- Specific personas (Remote Worker, Project Manager, Busy Professional)
- Realistic use cases for task creation and collaboration
- Detailed functional requirements for NLP processing and task management
- Non-functional requirements for AI model performance and data privacy
- Success metrics tied to task completion rates and user retention

## Tips

- **Be Specific**: The more detail in your brief, the better the generated PRD
- **Include Context**: Mention if this is a startup, internal tool, B2B, B2C, etc.
- **Reference Competitors**: If relevant, mentioning similar products helps define differentiation
- **Clarify Scope**: Explicitly state what should be MVP vs. future phases
- **Define Success**: Share your vision of what success looks like

## Next Steps

After PRD generation:
1. Review and validate the generated PRD
2. Refine any sections that need adjustment
3. Share with stakeholders for feedback
4. Use the PRD to generate Epics with `/generate-epic`
5. Break Epics into User Stories with `/generate-story`

---

**Related Prompts:**
- `/generate-epic` - Generate an Epic from PRD requirements
- `/generate-story` - Generate User Stories from Epic requirements

**Template Location:** `specs/templates/prd-template.md`

**Save Location:** `specs/prds/[project-name]-prd.md`
