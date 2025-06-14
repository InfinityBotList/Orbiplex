# Contributing to Orbiplex

Thank you for your interest in contributing to Orbiplex! This document provides guidelines and instructions for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/InfinityBotList/Orbiplex.git`
3. Install dependencies: `bun install`
4. Create a new branch: `git checkout -b feature/your-feature-name`

## Development Setup

```bash
# Start the development server
bun run dev

# Run linting
bun run lint

# Build the project
bun run build
```

## Pull Request Guidelines

1. **Branch Naming**
   - `feature/*` for new features
   - `fix/*` for bug fixes
   - `docs/*` for documentation changes
   - `refactor/*` for code refactoring

2. **Commit Messages**
   - Use clear, descriptive commit messages
   - Start with a verb in present tense (e.g., "Add feature" not "Added feature")
   - Reference issues if applicable

3. **Code Style**
   - Follow the existing code style
   - Use TypeScript for all new code
   - Include appropriate documentation
   - Ensure all tests pass

## Testing

- Add tests for new features
- Ensure existing tests pass
- Test across multiple platforms (Discord, Revolt, Guilded)

## Documentation

When adding new features, please update:
- Code comments
- README.md (if applicable)
- API documentation
- Component documentation

## Platform-Specific Guidelines

When contributing platform-specific features:

1. **Discord Integration**
   - Follow Discord API best practices
   - Test with both bot and OAuth2 flows

2. **Revolt Integration**
   - Ensure compatibility with Revolt's API
   - Test with development instances

3. **Guilded Integration**
   - Follow Guilded's development guidelines
   - Test with bot functionality

## Need Help?

- Join our [Discord server](https://discord.gg/ae6wpKqApt)
- Check existing issues and discussions
- Read our [documentation](https://docs.infinitybots.gg)

## License

By contributing to Orbiplex, you agree that your contributions will be licensed under the AGPL-3.0 License.
