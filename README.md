University Listings

Overview
This web application allows users to view a list of universities in the United Arab Emirates, search for specific universities, sort the list alphabetically, and view details of individual universities. The application is built using React with TypeScript, following the Model-View-Controller (MVC) architecture, and it uses the Fetch API for data retrieval.

Functionality
Main Features
Listing Page: Displays a list of universities fetched from an API.
Details Page: Displays detailed information about a selected university.
Search Functionality: Allows users to search for universities by name.
Sort Functionality: Allows users to sort the list of universities alphabetically.
Delete Functionality: Allows users to delete a university from the list.
Offline Support: Caches data in local storage to support offline use.

Design Decisions
MVC Architecture
The application follows the MVC architecture to separate concerns and improve code maintainability:

Model: Represents the data of the application. In this case, the University class in src/models/University.ts.
View: Handles the display of the data. The React components (Listing and Details) in src/components and the corresponding views in src/views.
Controller: Manages the data flow into the model object and updates the view whenever data changes. The UniversityController in src/controllers/UniversityController.ts.
Fetch API
The Fetch API is used instead of Axios for simplicity and native support in browsers. The Fetch API is utilized in the UniversityController to retrieve data from the API and handle caching in local storage.

React with TypeScript
TypeScript is used to add static type checking to JavaScript, which helps catch errors early during development. It also improves the development experience by providing better code completion and documentation.

Code Structure
Models
University: Represents a university with properties for name, country, web pages, and domains.
Controllers
UniversityController: Manages data fetching, caching, searching, sorting, and deleting universities.
Views
ListingView: Fetches universities, handles search, sort, and delete functionalities, and renders the Listing component.
DetailsView: Retrieves the selected university from the state and renders the Details component.

Components
Listing: Displays the list of universities, search input, sort button, and delete button.
Details: Displays detailed information about a selected university.
Testing
Controller Tests
The controller tests ensure that the data fetching, caching, searching, sorting, and deleting functionalities work correctly.

Component Tests
The component tests ensure that the components render correctly and respond to user interactions as expected.
