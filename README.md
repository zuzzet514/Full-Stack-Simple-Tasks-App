# API URL
https://full-stack-simple-tasks-app.onrender.com

# API routes

# API Routes
| Method | Path                 | Description                                               |
|--------|----------------------|-----------------------------------------------------------|
| POST   | `/api/auth/register` | Register a new user                                       |
| POST   | `/api/auth/login`    | Login user and return JWT token                           |
| GET    | `/api/tasks`         | Get all tasks for logged-in user                          |
| POST   | `/api/tasks`         | Create a new task for logged-in user                      |
| GET    | `/api/tasks/:id`     | Get a single task by ID (only if owned by logged-in user) |
| PUT    | `/api/tasks/:id`     | Update a task by ID (only if owned by logged-in user)     |
| DELETE | `/api/tasks/:id`     | Delete a task by ID (only if owned by logged-in user)     |

## Notes
- JWT token must be sent in the **Authorization header** as:  
