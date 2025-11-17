# Employee Management Interface

## Project Context
This project aims to provide an interactive graphical interface for managing employees within office spaces.  

### General Objectives
- Enable adding, moving, and removing employees directly from a graphical floor plan.  
- Ensure business rules compliance: employees can only be placed in zones authorized for their role.  
- Deliver a fluid, intuitive, and responsive user experience, accessible on desktop, tablet, and mobile.  
- Centralize personnel data management and spatial visualization in one platform.  

---

## User Stories

### Designer
- Ensure the interface is intuitive and fluid.  
- Define a coherent color palette and intuitive icons for navigation.  
- Create Desktop and Mobile versions with a modern design using Flexbox & Grid, rounded shapes, and colorful buttons.  

### Front-End Developer
- Build the HTML structure with a sidebar showing “Unassigned Staff” and an “Add New Worker” button.  
- Implement an employee addition modal with fields:  
  - Name  
  - Role  
  - Photo (URL)  
  - Email  
  - Phone  
  - Professional experiences (dynamic form with multiple entries)  
- Add photo preview in the modal.  
- Display the building floor plan with 6 zones:  
  1. Conference Room  
  2. Reception  
  3. Server Room  
  4. Security Room  
  5. Staff Room  
  6. Vault Room  
- Apply logical restrictions:  
  - Reception → Receptionists only  
  - Server Room → IT Technicians only  
  - Security Room → Security Agents only  
  - Managers → Anywhere  
  - Cleaning → Anywhere except Archives  
  - Other roles → Free access except restricted zones  
- Add “X” button to remove employees from zones and return them to “Unassigned”.  
- Enable detailed profile view on employee click (photo, name, role, email, phone, experiences, current location).  
- Add “+” button in each zone to assign eligible employees.  
- Highlight mandatory empty zones in pale red (except Conference & Staff rooms).  
- Limit the number of employees per zone.  
- Ensure responsiveness across all devices with smooth CSS animations.  
- Validate HTML & CSS with W3C Validator.  
- Deploy on GitHub Pages or Vercel.  

### Scrum Master
- Use Trello to organize User Stories and track progress.  
- Present the final project demonstrating all dynamic features.  

---

## Tech Stack
- HTML5 / CSS (Grid) / Tailwind (offline)
- JavaScript (DOM manipulation, dynamic forms, modal logic)  
- Deployment: GitHub Pages
- Project Management: Trello  

---

## Deliverables
- Interactive floor plan with employee management.  
- Fully responsive interface.  
- Validated HTML & CSS.  
- Deployed live demo.  

---

## How to Run
1. Clone the repository:  
   ```bash
   git clone https://github.com/ikara-py/Workspace-Staff-Manager.git

## incase you want to edit the file run this
   ```bash
   npx @tailwindcss/cli -i ./css/style.css -o ./css/output.css --watch

---

## by Ali Kara
