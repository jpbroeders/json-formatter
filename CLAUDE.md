# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a simple client-side JSON formatter web application built with ASP.NET Core 10.0. The application serves a static HTML page that formats JSON in the browser using JavaScript. No backend processing or database is involved - all JSON formatting happens client-side.

**Key characteristic**: The JavaScript in `wwwroot/script.js:10` strips backslash characters from input before parsing JSON (`rawJson.value.replace(/\\/g, '')`) to handle escaped JSON strings.

## Architecture

The application has a minimal ASP.NET Core backend that serves static files:

- **Program.cs**: Minimal ASP.NET Core host configured to serve static files from `wwwroot/`
  - `UseDefaultFiles()` - serves `index.html` by default
  - `UseStaticFiles()` - enables serving static content

- **wwwroot/** - Contains all client-side assets:
  - `index.html` - Single page with input/output textareas and action buttons
  - `script.js` - Client-side JSON parsing and formatting logic
  - `styles.css` - Application styling
  - `favicon.ico` - Site icon

## Development Commands

### Build and Run

```bash
# Build the project
dotnet build

# Run locally (serves on http://localhost:5000 by default)
dotnet run

# Publish for production
dotnet publish -c Release -o ./publish
```

### Docker

```bash
# Build Docker image
docker build -t json-formatter .

# Run container (exposes on port 8080)
docker run -p 8080:8080 json-formatter
```

## CI/CD and Deployment

### Automatic Docker Hub Deployment

The project uses GitHub Actions to automatically build and push Docker images to Docker Hub:

- **Trigger**: Push to `main` branch (after PR merge)
- **Docker Hub repository**: `freelyit/json-formatter:latest`
- **Workflow file**: `.github/workflows/docker-build-push.yml`

**Workflow steps**:
1. Build and test .NET project
2. Build Docker image using multi-stage Dockerfile
3. Push to Docker Hub with `latest` tag
4. Uses layer caching for faster subsequent builds

**Required GitHub Secrets** (configured in repository settings):
- `DOCKERHUB_USERNAME` - Docker Hub username
- `DOCKERHUB_TOKEN` - Docker Hub Personal Access Token (not password)

See `DEPLOYMENT.md` for detailed setup instructions and troubleshooting.

### Docker Image Usage

```bash
# Pull latest image from Docker Hub
docker pull freelyit/json-formatter:latest

# Run container
docker run -p 8080:8080 freelyit/json-formatter:latest
```

## Project Structure

- **json-formatter.csproj**: .NET 10.0 web project with implicit usings and nullable reference types enabled
- **Dockerfile**: Multi-stage build using .NET 10.0 SDK and ASP.NET runtime, exposes port 8080
- **.dockerignore**: Optimizes Docker build context by excluding unnecessary files
- **appsettings.json**: Standard ASP.NET Core configuration (logging only)
- **.github/workflows/docker-build-push.yml**: GitHub Actions workflow for automated Docker Hub deployment
- **DEPLOYMENT.md**: Comprehensive guide for Docker Hub integration and troubleshooting

## Important Implementation Details

When modifying the JSON formatting logic:

1. **Backslash handling**: The application intentionally removes all backslashes before parsing JSON (see `script.js:10`). This is a deliberate design decision to handle certain input formats.

2. **Error handling**: Invalid JSON displays error messages in the output area rather than alerting the user.

3. **No server-side processing**: All JSON operations happen in the browser. The .NET backend only serves static files.
