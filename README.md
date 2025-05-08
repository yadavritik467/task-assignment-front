# Task Assignment Front

This is a **Task Assignment Front** built using **Next.js** and **TypeScript**. The application is designed to allow users to create, assign, track, and manage tasks effectively while also implementing team collaboration features. It includes user authentication, task management, and filtering options based on various attributes like task title, status, priority, and due date.

## Features

### **User Authentication**:

- **Registration & Login**: Secure user registration and login functionalities with password hashing and session management.
- **JWT Authentication**: JSON Web Token (JWT) based authentication is used for managing user sessions securely.

### **Task Management**:

- **Task Creation**: Users can create tasks with attributes like title, description, due date, priority, and status.
- **CRUD Operations**: Full support for CRUD operations on tasks—Create, Read, Update, and Delete.

### **Team Collaboration**:

- **Task Assignment**: Users can assign tasks to other registered users within the system.
- **Notifications**: When a task is assigned to a user, they will be notified promptly.

### **Search & Filter**:

- **Search Functionality**: Search tasks by their title or description. This search is implemented from the **backend**, which ensures efficient search results even as the database grows.
- **Filter Tasks**: Tasks can be filtered by their status, priority, and due date, giving users more control over their task management. The filtering mechanism is also handled on the backend to ensure optimal performance and accuracy.

### **Dashboard**:

- Users can view:
  - **Tasks Assigned to Them**: All tasks that are assigned to the logged-in user.
  - **Tasks They Created**: A list of tasks the user has created.
  - **Overdue Tasks**: Tasks that are past their due date.

## Technologies Used

- **Frontend**: Next.js, TypeScript, React Context API
- **Backend**: Node.js with Express (or NestJS for advanced users)
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Version Control**: Git/GitHub for version control
- **Deployment**: Vercel for frontend hosting

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (>= 16.x)
- **npm** or **yarn**

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yadavritik467/task-assignment-front.git
   cd task-assignment-front
   ```
