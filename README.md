<div align="center">
  <h1>🚀 TaskForge</h1>
  <p><strong>A Modern Collaborative Task Management Platform</strong></p>
  
  <p>
    <a href="#"><img src="https://img.shields.io/badge/version-1.0.0-blue.svg" alt="Version"></a>
    <a href="#"><img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License"></a>
    <a href="#"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome"></a>
    <a href="#"><img src="https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react" alt="React"></a>
    <a href="#"><img src="https://img.shields.io/badge/Vite-7.2.4-646CFF?logo=vite" alt="Vite"></a>
  </p>

  <p>
    <a href="#features">Features</a> •
    <a href="https://forgetask.netlify.app/dashboard">Demo</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#usage">Usage</a> •
    <a href="#contributing">Contributing</a>
  </p>
</div>

---

## 📋 About The Project

**TaskForge** is a powerful, real-time collaborative task management platform designed to streamline team workflows and boost productivity. Built with modern web technologies, it offers an intuitive interface for managing tasks, teams, and projects with real-time updates powered by Socket.IO.

### ✨ Why TaskForge?

- **Real-time Collaboration**: See changes instantly as your team works together
- **Intuitive Interface**: Clean, modern UI built with React and TailwindCSS
- **Team Management**: Organize teams, assign tasks, and track progress effortlessly
- **Activity Tracking**: Keep track of all changes and updates in real-time
- **Drag & Drop**: Intuitive task organization with drag-and-drop functionality
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices

---

## 🎯 Features

### Core Features

- ✅ **Task Management**

  - Create, update, and delete tasks
  - Assign tasks to team members via email or user ID
  - Set priorities, due dates, and status
  - Add subtasks and track progress
  - Attach files and documents
  - Add comments and collaborate

- 👥 **Team Collaboration**

  - Create and manage teams
  - Invite members via email
  - Role-based access control
  - Real-time team activity feed

- 🔄 **Real-time Updates**

  - Live task updates across all connected clients
  - Real-time notifications
  - Socket.IO powered synchronization
  - Instant activity feed updates

- 🎨 **User Experience**

  - Drag-and-drop task organization
  - Beautiful, responsive UI
  - Dark mode support (if implemented)
  - Smooth animations and transitions
  - Intuitive navigation

- 🔐 **Authentication & Security**
  - Secure user authentication
  - Protected routes
  - Session management
  - User profile management

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: [React 19.2.0](https://react.dev/) - Modern UI library
- **Build Tool**: [Vite 7.2.4](https://vitejs.dev/) - Lightning-fast build tool
- **Routing**: [React Router DOM 7.11.0](https://reactrouter.com/) - Client-side routing
- **State Management**: [Redux Toolkit 2.11.2](https://redux-toolkit.js.org/) - Predictable state container
- **Styling**: [TailwindCSS 4.1.18](https://tailwindcss.com/) - Utility-first CSS framework
- **Icons**: [Lucide React 0.562.0](https://lucide.dev/) - Beautiful icon library
- **Drag & Drop**: [@dnd-kit](https://dndkit.com/) - Modern drag-and-drop toolkit
- **HTTP Client**: [Axios 1.13.2](https://axios-http.com/) - Promise-based HTTP client
- **Real-time**: [Socket.IO Client 4.8.3](https://socket.io/) - Real-time bidirectional communication
- **Date Handling**: [date-fns 4.1.0](https://date-fns.org/) - Modern date utility library

### Backend

- **API**: RESTful API with Socket.IO integration
- **Real-time**: Socket.IO for live updates
- **Authentication**: JWT-based authentication

### Development Tools

- **Linting**: ESLint with React plugins
- **Code Quality**: React Hooks linting
- **Version Control**: Git
- **Deployment**: Netlify (configured)

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Git**

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Saroj05Dev/TaskForge.git
   cd TaskForge
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   VITE_API_BASE_URL=your_backend_api_url
   ```

4. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**

   Navigate to `http://localhost:5173` (or the port shown in your terminal)

---

## 📖 Usage

### Running the Application

```bash
# Development mode with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Project Structure

```
TaskForge/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images, fonts, etc.
│   ├── components/      # Reusable UI components
│   ├── contexts/        # React context providers
│   ├── features/        # Feature-based modules
│   │   ├── activity/    # Activity tracking
│   │   ├── auth/        # Authentication
│   │   ├── tasks/       # Task management
│   │   └── teams/       # Team management
│   ├── helpers/         # Helper functions
│   ├── hooks/           # Custom React hooks
│   ├── layouts/         # Layout components
│   ├── pages/           # Page components
│   ├── routes/          # Route configurations
│   ├── store/           # Redux store setup
│   ├── utils/           # Utility functions
│   ├── App.jsx          # Main App component
│   └── main.jsx         # Entry point
├── .env                 # Environment variables
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
└── README.md            # This file
```

### Key Features Usage

#### Creating a Task

1. Navigate to the Tasks page
2. Click "Create Task" button
3. Fill in task details (title, description, assignee, priority, due date)
4. Click "Save" to create the task

#### Managing Teams

1. Go to Teams section
2. Create a new team or select an existing one
3. Invite members via email
4. Assign tasks to team members

#### Real-time Collaboration

- All changes are automatically synced across all connected clients
- Activity feed shows real-time updates
- Notifications appear for important events

---

## 📸 Screenshots

> **Note**: Add your application screenshots here

![Dashboard](./screenshots/dashboard.png)
![Task Page](./screenshots/task-page.png)
![Task Details Page](./screenshots/task-details.png)
![Action Log Page](./screenshots/action-log.png)

---

## 🎯 Roadmap

- [x] Core task management functionality
- [x] Real-time updates with Socket.IO
- [x] Team collaboration features
- [x] Email-based task assignment
- [x] Activity tracking
- [ ] Dark mode support
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Integration with third-party tools (Slack, Jira, etc.)
- [ ] Calendar view
- [ ] Kanban board view
- [ ] Time tracking
- [ ] File storage integration

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

### How to Contribute

1. **Fork the Project**
2. **Create your Feature Branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your Changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the Branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

---

## 📄 License

Distributed under the MIT License. See `LICENSE` file for more information.

---

## 👨‍💻 Author

**Saroj Kumar Das**

- GitHub: [@Saroj05Dev](https://github.com/Saroj05Dev)
- LinkedIn: [Saroj Kumar Das](https://www.linkedin.com/in/saroj-kumar-das-86a36b30a/)
- Email: sarojkumardas.dev@gmail.com
- Portfolio: [sarojkr.netlify.app](https://sarojkr.netlify.app)

---

## 🙏 Acknowledgments

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Socket.IO](https://socket.io/)
- [Lucide Icons](https://lucide.dev/)
- All contributors who helped make this project better

---

## 📞 Support

If you have any questions or need help, feel free to:

- Open an issue on GitHub
- Contact me via email
- Join our community discussions

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/Saroj05Dev">Saroj Kumar Das</a></p>
  <p>⭐ Star this repository if you find it helpful!</p>
</div>
