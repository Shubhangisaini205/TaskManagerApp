# Task Manager App

This Task Manager application helps users organize and track their tasks efficiently, similar to Trello. It features drag-and-drop task management, user authentication with Google Sign in, and full CRUD capabilities. The app follows an atomic design approach for better code modularity and reusability.

# Features
* Drag-and-Drop Task Management: Easily move tasks between "To Do," "In Progress," and "Done" columns using the @hello-pangea/dnd library.

* User Authentication: Standard user login and registration, along with Google SSO using JSON Web Tokens (JWT) for secure authentication.

* Task Assignment: Automatically assigns tasks to the currently logged-in user.

* Task CRUD Operations: Create, update, delete, and view tasks with ease.

* Sorting and Search: Search tasks by title and sort by recent or old tasks.

* Responsive Design: Optimized for desktop view with a three-column layout to visualize task status.

# Tech Stack
* Frontend: React.js, Tailwind CSS
* Backend: Node.js, Express.js, MongoDB
* State Management: React Context API
* Authentication: JWT for Google Login and standard login flow
* Drag-and-Drop: @hello-pangea/dnd

## Project Structure
The project follows an atomic design structure to create reusable components for better readability and maintainability. Key components include:

* Atoms: Smallest components, like buttons and icons.
* Molecules: Combinations of atoms, such as task cards.
* Organisms: Complex components combining molecules and atoms, like task columns.

# Installation and Setup
## Clone the repository:
* git clone https://github.com/Shubhangisaini205/TaskManagerApp.git
* cd TaskManagerApp
* Install dependencies for both frontend and backend:


## Backend
* cd backend
* npm install

### Environment Variables: Create .env files in backend directories and add the following variables.
* MONGO_URI=<MongoDB connection string>
* JWT_SECRET=<Your JWT secret>
* GOOGLE_CLIENT_SECRET=<Your Google client secret>
* GOOGLE_CLIENT_ID =<Your Google Client Id>

## command to run
* npm run serve


## Frontend
* cd frontend
* npm run start
* Access the app at http://localhost:3000.

# Usage
* Sign Up/Login: Create or access your account.
* Create Tasks: Click on the "Add Task" button and fill in the details.
* Manage Tasks: Drag and drop tasks between columns to change their status.
* Search and Sort: Use the search bar to find tasks by title and sort them by recent or oldest first.
