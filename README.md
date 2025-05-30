# Dynamic Form Template Builder

A powerful Angular-based application for building, managing, and submitting dynamic forms with role-based access control.

![Angular](https://img.shields.io/badge/Angular-14+-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![NgRx](https://img.shields.io/badge/NgRx-764ABC?style=for-the-badge&logo=ngrx&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)

## 🚀 Features

### Form Builder Interface
- **Drag-and-Drop Form Creation**
  - Text inputs (single-line and multi-line)
  - Dropdown selects with configurable options
  - Checkbox groups
  - Date pickers
  - Radio button groups

- **Field Configuration**
  - Customizable field labels
  - Required/optional settings
  - Help text support
  - Advanced validation rules
    - Min/max length
    - Pattern matching
    - Custom validation rules

### Form Management
- **Template Management**
  - List view of all form templates
  - Edit existing templates
  - Preview functionality
  - Delete templates (admin only)

### Form Submission
- **User Interface**
  - Dynamic form rendering
  - Real-time validation
  - Success/error handling
  - Form data submission
  - View submitted data

### Authorization
- **Role-Based Access Control**
  - Admin role
    - Create new templates
    - Edit existing templates
    - Delete templates
    - View all submissions
  - User role
    - View available templates
    - Fill out forms
    - Submit responses

## 🛠️ Technical Stack

- **Frontend Framework**: Angular 14+
- **State Management**: NgRx
- **Form Handling**: Reactive Forms
- **UI Framework**: Bootstrap 5
- **Testing**: Jasmine & Karma
- **Version Control**: Git

## 🏗️ Architecture

The application follows a modular architecture with the following key components:

- **Core Module**: Authentication, guards, and interceptors
- **Shared Module**: Common components and utilities
- **Form Builder Module**: Form creation and management
- **Template Module**: Template listing and management
- **Preview Module**: Form preview and submission

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Angular CLI (v14 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Krishnaa1298/dynamic-form-builder.git
   ```

2. Install dependencies:
   ```bash
   cd dynamic-form-builder
   npm install
   ```

3. Start the development server:
   ```bash
   ng serve
   ```

4. Navigate to `http://localhost:4200`

## 🧪 Testing

Run the test suite:
```bash
ng test
```

## 📦 Build

Generate a production build:
```bash
ng build --prod
```

## 🔑 Authentication

The application implements a simple role-based authentication system:
- Admin credentials: admin/admin
- User credentials: user/user

## 🎯 Key Features Implementation

### Form Builder
- Implemented using Angular CDK's drag-and-drop module
- Real-time form preview
- Field configuration dialog
- Validation rule management

### State Management
- NgRx store for managing application state
- Actions for template CRUD operations
- Selectors for efficient data retrieval
- Effects for handling side effects

### Form Validation
- Custom validators for different field types
- Real-time validation feedback
- Cross-field validation support

## 📝 Future Enhancements

- [ ] Form template versioning
- [ ] Form analytics and reporting
- [ ] Export/import form templates
- [ ] Advanced field types (file upload, rich text)
- [ ] Form template categories and tags

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Author

- **Krishnaa1298** - [GitHub Profile](https://github.com/Krishnaa1298)

---

⭐ Star this repository if you find it useful!
