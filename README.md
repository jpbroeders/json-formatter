# JSON Formatter

A simple, privacy-focused JSON formatter web application built with ASP.NET Core 10.0.

## Description

This is a client-side JSON formatter that runs in a .NET 10 Docker container. The application provides a clean, simple interface for formatting and validating JSON data directly in your browser.

**Privacy First**: There is no backend processing or database. All JSON formatting happens client-side in your browser using JavaScript. Nothing will be stored or sent to any server.

A live demo can be found at [https://json-formatter.apps.freelyit.nl/](https://json-formatter.apps.freelyit.nl/)

## Features

- **Client-side Processing**: All JSON parsing and formatting happens in your browser
- **Real-time Formatting**: JSON is formatted as you type
- **Error Handling**: Clear error messages for invalid JSON
- **Copy to Clipboard**: One-click copy of formatted JSON
- **Clear Function**: Quick clear of both input and output
- **Backslash Handling**: Automatically strips backslash characters before parsing
- **Lightweight**: Minimal dependencies, fast loading
- **Privacy**: No data is sent to any server

## Usage

1. Paste your JSON into the left text area
2. The formatted JSON appears automatically in the right panel
3. Use the **Copy** button to copy the formatted JSON to your clipboard
4. Use the **Clear** button to reset both input and output

## Development

### Prerequisites

- .NET 10.0 SDK
- Docker (optional, for containerized deployment)

### Running Locally

```bash
# Clone the repository
git clone <repository-url>
cd json-formatter

# Build the project
dotnet build

# Run the application
dotnet run
```

The application will be available at `http://localhost:5000`

### Building for Production

```bash
# Publish the application
dotnet publish -c Release -o ./publish
```

## Docker Deployment

### Build the Docker Image

```bash
docker build -t json-formatter .
```

### Run the Container

```bash
docker run -p 8080:8080 json-formatter
```

The application will be available at `http://localhost:8080`

## Project Structure

```
json-formatter/
├── wwwroot/              # Static files
│   ├── index.html        # Main HTML page
│   ├── script.js         # JSON formatting logic
│   ├── styles.css        # Application styling
│   └── favicon.ico       # Site icon
├── Program.cs            # ASP.NET Core host configuration
├── Dockerfile            # Docker container definition
└── json-formatter.csproj # .NET project file
```

## Technical Details

- **Framework**: ASP.NET Core 10.0
- **Runtime**: .NET 10.0
- **Container**: Multi-stage Docker build with minimal ASP.NET runtime
- **Port**: 8080 (Docker), 5000 (local development)

## License

This project is open source and available for use.