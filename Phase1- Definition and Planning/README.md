# User Personas

1. *Persona: Busy Professional (Primary User)*  
   - *Name:* Sarah  
   - *Age:* 32  
   - *Occupation:* Marketing Manager  
   - *Goals:* Stay organized, manage tasks efficiently, and track progress.  
   - *Frustrations:* Forgetting tasks, juggling multiple responsibilities, and using apps that don’t sync across devices.  
   - *Tech Savviness:* High  
   - *Device Usage:* Desktop during work hours, mobile on the go.  

2. *Persona: Student (Secondary User)*  
   - *Name:* Alex  
   - *Age:* 20  
   - *Occupation:* College Student  
   - *Goals:* Keep track of assignments, deadlines, and personal tasks.  
   - *Frustrations:* Missing deadlines, clunky task management tools, and apps that don’t work offline.  
   - *Tech Savviness:* Medium  
   - *Device Usage:* Mostly mobile, occasionally desktop.  

3. *Persona: Developer (Technical User)*  
   - *Name:* John  
   - *Age:* 28  
   - *Occupation:* Software Developer  
   - *Goals:* Ensure the app is functional, scalable, and integrates well with a PostgreSQL database.  
   - *Frustrations:* Poorly designed APIs, lack of documentation, and inconsistent data persistence.  
   - *Tech Savviness:* Very High  
   - *Device Usage:* Desktop for development, mobile for testing.  

---

# Use Cases and Usage Scenarios

### Use Case 1: Create a Task  
- *Actor:* User  
- *Description:* The user creates a new task with a title and optional details.  
- *Scenario:* Sarah opens the app and adds a task titled “Prepare Q2 Marketing Report” with a due date.  

### Use Case 2: View Task List  
- *Actor:* User  
- *Description:* The user views a list of all tasks, sorted by due date or completion status.  
- *Scenario:* Alex opens the app to check all pending assignments and personal tasks.  

### Use Case 3: Mark Task as Completed  
- *Actor:* User  
- *Description:* The user marks a task as completed, and the UI updates to reflect the change.  
- *Scenario:* Sarah completes the task “Email Client” and checks it off. The task moves to the “Completed” section.  

### Use Case 4: Edit a Task  
- *Actor:* User  
- *Description:* The user edits the title, due date, or status of an existing task.  
- *Scenario:* Alex realizes the due date for “Math Homework” is wrong and updates it.  

### Use Case 5: Delete a Task  
- *Actor:* User  
- *Description:* The user deletes a task they no longer need.  
- *Scenario:* Sarah deletes the task “Old Meeting Notes” as it’s no longer relevant.  

### Use Case 6: Responsive UI  
- *Actor:* User  
- *Description:* The app adapts to different screen sizes (desktop, tablet, mobile).  
- *Scenario:* Alex uses the app on their phone to check tasks while commuting.  

### Use Case 7: Connect to PostgreSQL Database  
- *Actor:* Developer  
- *Description:* The developer sets up an API to connect the frontend to a PostgreSQL database for persistent data storage.  
- *Scenario:* John configures the backend to store and retrieve tasks from the database.  



### Use Case 8: Persistent Task Storage  
- *Actor:* User  
- *Description:* The app remembers tasks even after the browser is closed.  
- *Scenario:* Alex closes the app and reopens it later to find all tasks still available.  

---

# Information Architecture

### App Structure  
1. *Home Screen:*  
   - Displays a list of tasks (completed and incomplete).  
   - Add Task button.  
   - Filter/Sort options (by due date, completion status).  

2. *Task Creation Screen:*  
   - Input fields for title, description, due date, and priority.  
   - Save/Cancel buttons.  

3. *Task Details Screen:*  
   - Displays full details of a task.  
   - Edit and Delete buttons.  

4. *Settings Screen:*  
   - Options for syncing, notifications, and theme customization.  

### Database Schema  
- *Tasks Table:*  
  - id (Primary Key)  
  - title (String)  
  - description (Text)  
  - due_date (DateTime)  
  - status (Boolean: Completed/Incomplete)  
  - created_at (DateTime)  
  - updated_at (DateTime)  

---

# Project Management for a Two-Person Team

### Team Roles  
1. *Person 1: Full-Stack Developer*  
   - Develop both the frontend and backend of the application.  
   - Implement the UI/UX design (responsive and user-friendly).  
   - Set up the API and integrate it with the PostgreSQL database.  
   - Ensure data persistence and handle CRUD operations (Create, Read, Update, Delete).  
   - Write unit tests for both frontend and backend.  

2. *Person 2: UI/UX Designer & QA Tester*  
   - Design the app’s user interface (wireframes, mockups, and prototypes).  
   - Ensure the app is visually appealing and easy to use.  
   - Conduct usability testing with real users.  
   - Perform functional and accessibility testing.  
   - Document bugs and work with the developer to resolve them.  
   - Assist with frontend development if needed (e.g., CSS, basic JavaScript).  

### Agile Methodology  
- *Sprints:* 1-week sprints to maintain momentum and adapt quickly.  
- *Daily Standups:* Quick 10-minute syncs to discuss progress and blockers.  
- *Backlog:* Shared backlog with clear priorities (e.g., task creation and persistence first, visual indicators later).  
- *Tools:*  
  - *Trello or Notion:* For task tracking and collaboration.  
  - *GitHub:* For version control and issue tracking.  

### Milestones  
1. *Milestone 1: Basic Task Management*  
   - Task creation and viewing.  
   - Simple UI for adding and listing tasks.  

2. *Milestone 2: Task Completion and Editing*  
   - Mark tasks as completed.  
   - Edit and delete tasks.  

3. *Milestone 3: Database Integration*  
   - Connect the app to PostgreSQL via an API.  
   - Ensure tasks persist between sessions.  

4. *Milestone 4: Responsive Design and Visual Indicators*  
   - Make the app responsive for desktop and mobile.  
   - Add visual cues for completed vs. incomplete tasks.  

5. *Milestone 5: Testing and Polish*  
   - Conduct usability and functional testing.  
   - Fix bugs and improve UI/UX.  

---

# User Testing

### Testing Plan  
1. *Usability Testing:*  
   - The UI/UX designer conducts informal usability tests with friends, family, or colleagues.  
   - Focus on ease of use, clarity, and responsiveness.  

2. *Functional Testing:*  
   - The developer writes unit tests for critical features (e.g., task creation, editing, and deletion).  
   - Both team members manually test edge cases (e.g., empty task list, long task titles).  

3. *Performance Testing:*  
   - Use lightweight tools like Lighthouse (built into Chrome DevTools) to test performance.  
   - Ensure the app works well on both desktop and mobile devices.  

4. *Accessibility Testing:*  
   - Use free tools like Axe or WAVE to check for accessibility issues.  
   - Ensure the app is usable for people with disabilities (e.g., screen reader compatibility).  

### Testing Tools  
- *Frontend Testing:* Jest or Cypress for unit and integration tests.  
- *Backend Testing:* Postman for API testing.  
- *Accessibility:* Axe or WAVE.  
- *Performance:* Lighthouse or Chrome DevTools.  

---

# Collaboration Tips for a Two-Person Team  
1. *Clear Communication:*  
   - Use tools like Slack or Discord for quick communication.  
   - Document decisions and share progress regularly.  

2. *Divide and Conquer:*  
   - Assign tasks based on strengths (e.g., one person focuses on backend, the other on frontend).  
   - Collaborate on critical features (e.g., database integration).  

3. *Iterative Development:*  
   - Build the app incrementally, starting with the core features (task creation and viewing).  
   - Add advanced features (e.g., visual indicators, responsive design) in later iterations.  

4. *User Feedback:*  
   - Share early prototypes with potential users to gather feedback.  
   - Use feedback to prioritize features and improvements.