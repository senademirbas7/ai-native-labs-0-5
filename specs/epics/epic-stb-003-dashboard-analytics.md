# Epic: Dashboard & Progress Analytics

**Epic ID:** Epic-STB-003  
**Epic Title:** Dashboard & Progress Analytics  
**Parent PRD:** Student Task Board PRD (specs/prds/student-task-board-prd.md)

---

## Title
Dashboard & Progress Analytics - Statistics, Progress Tracking, Insights

---

## Description

### Overview
This epic delivers a comprehensive dashboard that gives users visibility into their task completion progress, upcoming deadlines, and productivity patterns. The dashboard provides motivational feedback and helps users identify bottlenecks. It transforms raw task data into actionable insights, addressing the human need for progress visualization and accomplishment recognition.

### Business Context
Progress tracking is psychologically important for sustaining motivation and engagement. Users want to see their productivity improving over time. The dashboard epic directly impacts user retention and satisfaction by celebrating completed work and showing tangible progress. This is particularly important for the "bootcamp graduate" persona who wants to showcase productivity in a portfolio.

### Key Features/Stories Included
- Overall task statistics (total, completed, completion percentage)
- Category-based progress breakdown (tasks completed per category)
- Upcoming deadlines summary (next 7 days)
- Overdue tasks alert/summary
- Completion streak tracking (consecutive days with completed tasks)
- Priority distribution pie chart/visualization
- Status summary (active vs completed)
- Progress over time (tasks completed this week, this month)
- Custom dashboard widgets (expandable feature)

---

## Primary Persona

**Persona Name:** Morgan Taylor - Bootcamp Graduate

**Role/Title:** Recent bootcamp graduate preparing for first tech job

**Key Goals:**
- Build impressive portfolio projects
- Demonstrate understanding of React and modern patterns
- Show ability to build complete, functional applications
- Showcase productivity and project management skills

**Pain Points Addressed:**
- Wants projects that demonstrate best practices
- Needs polished features for portfolio presentation
- Wants to show progress and productivity patterns
- Needs something impressive for interviews/GitHub

---

## Success Criteria

### Acceptance Criteria
- [ ] Dashboard displays overall statistics (total tasks, completed count, completion percentage)
- [ ] Dashboard shows progress breakdown by category with visual indicators
- [ ] Upcoming deadlines (next 7 days) are prominently displayed
- [ ] Overdue tasks are highlighted with visual warning
- [ ] At least one data visualization (chart/graph) is implemented
- [ ] Statistics update in real-time when tasks are created/completed
- [ ] Dashboard is responsive and looks good on all screen sizes
- [ ] Empty state displays helpful guidance when no tasks exist
- [ ] Dashboard data is calculated from task list (not stored separately)
- [ ] Performance remains good with 500+ tasks

### Definition of Done
- [ ] Dashboard components built with React best practices
- [ ] All statistics calculations accurate and verified
- [ ] Charts/visualizations render correctly and are accessible
- [ ] Dashboard refreshes instantly when task list changes
- [ ] localStorage data changes reflect immediately on dashboard
- [ ] TypeScript types defined for dashboard data structures
- [ ] Component documentation with examples
- [ ] Code reviewed for clarity and maintainability
- [ ] Performance optimized with React.memo where appropriate
- [ ] Tested on mobile, tablet, and desktop viewports

---

## Scope & Complexity

### Estimated Size
**Medium**

### Effort Breakdown
- **Story Points:** 13-16 total
- **Timeline:** 1.5-2 weeks
- **Team Size:** 1-2 developers

### Assumptions
- Dashboard data is calculated from tasks in real-time (no caching needed)
- Charts library (Chart.js, Recharts, or custom SVG) can be lightweight
- Statistics are straightforward calculations (counts, percentages)
- Mobile dashboard can be simplified version of desktop dashboard

### Constraints
- All dashboard data calculated in browser (no external API)
- Charts must be accessible to screen readers
- Dashboard must not impact overall app performance
- No external charting library if custom solution is simple enough

---

## Dependencies

### Internal Dependencies
- **Epic-STB-001: Core Task Management System** (REQUIRED)
  - Impact: Dashboard displays task data; must sync with task changes
  - Status: Must complete first

- **Epic-STB-002: Task Organization & Advanced Filtering** (RECOMMENDED)
  - Impact: Dashboard can filter data by category; optional but enhances value
  - Status: Can be parallel or sequential

### External Dependencies
- **React 18 hooks**: For state management and effects
- **Charting library** (optional): Chart.js, Recharts, or custom SVG

### Team Dependencies
- **Frontend Developer**: Implement dashboard components and calculations
- **UX/Design**: Dashboard layout and visual hierarchy (optional)

---

## Additional Information

### Success Metrics
- **Metric 1:** Dashboard calculations execute in <500ms with 500 tasks
- **Metric 2:** 70%+ of users visit dashboard within first week
- **Metric 3:** Chart accessibility: WCAG AA compliant
- **Metric 4:** Mobile dashboard load time <1 second

### Known Issues/Risks
- **Issue**: Performance with large datasets - Mitigation: Use React.memo; optimize calculations
- **Issue**: Chart library bundle size - Mitigation: Use lightweight lib or custom solution
- **Issue**: Accessibility of data visualizations - Mitigation: Include data tables alongside charts
- **Risk**: Dashboard data becoming stale - Mitigation: Calculate on demand from tasks

### References
- React performance optimization: https://react.dev/reference/react/memo
- Data visualization accessibility: https://www.w3.org/WAI/WCAG21/
- Recharts library (if used): https://recharts.org/

### Related Epics
- Depends on: Epic-STB-001 (Task data required)
- Related to: Epic-STB-002 (Can leverage filtering)
- Consumed by: Epic-STB-004 (Layout integration)

---

## Metadata

| Field | Value |
|-------|-------|
| Epic ID | Epic-STB-003 |
| Created By | Product Team |
| Created Date | Feb 17, 2026 |
| Last Updated | Feb 17, 2026 |
| Owner/Lead | [To be assigned] |
| Status | Backlog |
| Priority | High (portfolio value) |
| Phase | MVP v1.0 |
| Blocks | None |
| Blocked By | Epic-STB-001 |

---

## Technical Notes

### Data Model
```typescript
interface DashboardStats {
  totalTasks: number;
  completedTasks: number;
  activeTasks: number;
  completionPercentage: number;
  overdueTasks: number;
  upcomingDeadlines: Task[];
  categoryProgress: {
    category: string;
    total: number;
    completed: number;
    percentage: number;
  }[];
  priorityDistribution: {
    high: number;
    medium: number;
    low: number;
  };
}
```

### Calculation Functions
- `calculateStats(tasks: Task[]): DashboardStats`
- `groupByCategory(tasks: Task[]): Record<string, Task[]>`
- `getUpcomingDeadlines(tasks: Task[], days: number): Task[]`
- `getOverdueTasks(tasks: Task[]): Task[]`
- `calculateCompletionPercentage(total: number, completed: number): number`

### Component Architecture
- `Dashboard` - Main dashboard container
- `StatisticsCard` - Individual stat display (reusable)
- `ProgressChart` - Chart/graph (Recharts or custom)
- `UpcomingDeadlines` - List of upcoming tasks
- `CategoryBreakdown` - Progress by category
- `useDashboardStats` - Custom hook for calculations

---

*Epic prepared for decomposition into User Stories*
