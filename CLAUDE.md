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

## Project Structure

- **json-formatter.csproj**: .NET 10.0 web project with implicit usings and nullable reference types enabled
- **Dockerfile**: Multi-stage build using .NET 10.0 SDK and ASP.NET runtime, exposes port 8080
- **appsettings.json**: Standard ASP.NET Core configuration (logging only)

## Important Implementation Details

When modifying the JSON formatting logic:

1. **Backslash handling**: The application intentionally removes all backslashes before parsing JSON (see `script.js:10`). This is a deliberate design decision to handle certain input formats.

2. **Error handling**: Invalid JSON displays error messages in the output area rather than alerting the user.

3. **No server-side processing**: All JSON operations happen in the browser. The .NET backend only serves static files.
