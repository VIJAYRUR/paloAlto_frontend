# Contributing to FitFoodie

Thank you for your interest in contributing to FitFoodie! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)
- [Issue Reporting](#issue-reporting)
- [Feature Requests](#feature-requests)

## Code of Conduct

We expect all contributors to adhere to our Code of Conduct. Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before contributing.

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/paloAlto_frontend.git
   cd paloAlto_frontend
   ```
3. Add the original repository as an upstream remote:
   ```bash
   git remote add upstream https://github.com/VIJAYRUR/paloAlto_frontend.git
   ```
4. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
5. Follow the setup instructions in the [Setup Guide](./setup-guide.md)

## Development Workflow

1. Make your changes in your feature branch
2. Keep your branch updated with the upstream main branch:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```
3. Run tests to ensure your changes don't break existing functionality
4. Commit your changes with clear, descriptive commit messages
5. Push your branch to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
6. Create a pull request from your fork to the main repository

## Pull Request Process

1. Ensure your PR description clearly describes the problem and solution
2. Include the relevant issue number if applicable
3. Update documentation as needed
4. Make sure all tests pass
5. Get at least one code review from a maintainer
6. Once approved, a maintainer will merge your PR

## Coding Standards

### Frontend (React Native)

- Follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- Use functional components with hooks instead of class components
- Use the project's existing component structure and styling patterns
- Keep components small and focused on a single responsibility
- Use meaningful variable and function names

Example:

```javascript
// Good
const UserProfile = ({ user, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  const handleSubmit = () => {
    // Implementation
    onUpdate(user);
    setIsEditing(false);
  };
  
  return (
    // JSX
  );
};

// Bad
const Comp = (props) => {
  const [a, setA] = useState(false);
  
  const doStuff = () => {
    // Implementation
    props.func(props.data);
    setA(false);
  };
  
  return (
    // JSX
  );
};
```

### Backend (Python/Flask)

- Follow [PEP 8](https://www.python.org/dev/peps/pep-0008/) style guide
- Use docstrings for functions and classes
- Keep functions small and focused
- Use meaningful variable and function names
- Use type hints where appropriate

Example:

```python
def get_user_by_id(user_id: str) -> dict:
    """
    Retrieve a user by their ID.
    
    Args:
        user_id: The unique identifier of the user
        
    Returns:
        A dictionary containing the user data
        
    Raises:
        ValueError: If the user is not found
    """
    user = User.get_by_id(user_id)
    if not user:
        raise ValueError(f"User with ID {user_id} not found")
    return User.to_dict(user)
```

## Testing

### Frontend Testing

- Write unit tests for components using Jest and React Testing Library
- Test component rendering, user interactions, and state changes
- Run tests before submitting a PR:
  ```bash
  cd FitFoodie
  npm test
  ```

### Backend Testing

- Write unit tests for API endpoints and database models
- Test both success and error cases
- Run tests before submitting a PR:
  ```bash
  cd FitFoodie-Backend
  python -m unittest discover tests
  ```

## Documentation

- Update documentation when adding or changing features
- Document all API endpoints, components, and functions
- Use clear, concise language
- Include examples where appropriate

## Issue Reporting

When reporting issues, please include:

1. A clear, descriptive title
2. Steps to reproduce the issue
3. Expected behavior
4. Actual behavior
5. Screenshots if applicable
6. Environment information (OS, browser, device, etc.)

## Feature Requests

When requesting new features, please include:

1. A clear, descriptive title
2. Detailed description of the feature
3. Use cases and benefits
4. Any potential implementation ideas

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code changes that neither fix bugs nor add features
- `test`: Adding or updating tests
- `chore`: Changes to the build process or auxiliary tools

Examples:
```
feat(auth): add login functionality
fix(feed): resolve issue with post rendering
docs(api): update influencer endpoints documentation
```

## Questions?

If you have any questions about contributing, please reach out to the project maintainers or open an issue with your question.
