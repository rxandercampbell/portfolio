# Nothing Crazy

A single-page application leveraging the Quasar Framework and .NET Web API, designed to provide an interactive and 
user-friendly interface for data visualization and manipulation through a dynamic Q-Table.

## Brief Description

**Nothing Crazy** is an example application, utilizing the Quasar framework for the frontend and 
a .NET Web API for the backend, to demonstrate work. The application enables 
custom **drag-and-drop column reordering** and **resizable columns**, utilizing data pulled from a .NET API service.

### Interaction Guide

- **Column Reordering:**
  - **How:** Hold down the mouse on any part of a column header and drag it to your desired position.
  - **Note:** The reordering is intuitive and reflects where the column will drop as you drag.
    
- **Column Resizing:**
  - **How:** Hover over a column header border, click, and drag to adjust its width.
  - **Resetting Size:** Simply double-click the same area to revert to the original width.

## Prerequisites

Ensure you have the following installed to run "Nothing Crazy":

- [Node.js](https://nodejs.org/) and npm: Required to run the Quasar application and manage its dependencies.
- [Quasar CLI](https://quasar.dev/quasar-cli/installation): Essential for serving the Quasar application in a 
development environment and building it for production. Install it using npm:
- NOTE: this step should not be needed as npm install in the later steps should add what is needed but just 
in case if it does not return to this step.  
```bash
  npm install -g @quasar/cli

- .NET SDK
- Visual Studio (optional, for Method 1)

## How to Run Nothing Crazy

### Method 1: Using Visual Studio

#### Backend
- Open the .NET Web API solution with Visual Studio.
- Press `F5` or click on “IIS Express” to run the application. The API should start on a development server.
- The application may look like it is not working to access swagger change the URL to localhost:7276/swagger.
- If using chrome and your system is not properly set up for developing with self signed SSL certs you may get 
an error screen. To get passed this while on that screen type ANYWHERE "thisisunsafe" no quotes. There is no text box just type it while in the window. Yes I also think this is a crazy thing...

#### Frontend
- Open a terminal/command prompt and navigate to the Quasar project directory (NothingCrazy). This can also be 
done in VS by right clicking the project name and selecting open in terminal.
- Install the dependencies and start the application:
  ```bash
  npm install
  quasar dev
  ```
- The application should be accessible via `http://localhost:9000`.

### Method 2: Using PowerShell

#### Backend
- Navigate to the .NET Web API project directory with PowerShell.
- Build and run the application using:
  ```powershell
  dotnet build
  dotnet run
  ```
- The API will start and be hosted on its designated port.

#### Frontend
- Navigate to the Quasar project directory, hold shift and right click in any white space. There will be a 
new option to open powershell. If it says command prompt that will also work.
- Install dependencies and run the Quasar app:
  ```powershell
  npm install
  quasar dev
  ```
- The application should be available at `http://localhost:9000`.

## Application Features

- **Drag and Drop:** Intuitively reorder columns by dragging and dropping them.
- **Resize Columns:** Adjust column widths via simple click-and-drag actions.
  
## API Interaction

Data displayed within the Q-Table is retrieved through API calls to the .NET Web API, show casing  a dynamic, 
real-time data interaction experience.

## Acknowledgments

- [Quasar Framework](https://quasar.dev/)
- [.NET](https://dotnet.microsoft.com/)
```