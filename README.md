# Assignment 1

# Description
This project is a simple RESTful CRUD API implemented as part of the GEvidence MVP.
The API is used to manage ESG verification projects, simulating a real-world MVP where
IoT telemetry, ESG metrics, and cryptographic evidence are stored and managed.

The application uses Node.js with Express and stores data locally in a JSON file (`data.json`)
to keep the implementation simple and focused on backend fundamentals.

# Technologies Used
- Node.js
- Express.js
- UUID
- JSON file storage

# Installation

# 1. Clone the repository
```bash
git clone https://github.com/dayosama0/web2.1
cd gevidence-mvp-api

# 2. Install dependencies
npm install

# 3. Running the server
npm start
http://localhost:3000

### API Routes
GET /projects
Returns a list of all projects.

POST /projects
Creates a new project.

PUT /projects/:id
Updates an existing project by its ID.

DELETE /projects/:id
Deletes a project by its ID.


### Example Postman Requests
GET – Get all projects
Method: GET
URL: http://localhost:3000/projects

POST – Create a new project
Method: POST
URL: http://localhost:3000/projects
Headers:
Content-Type: application/json
Body (raw JSON):
{
  "name": "Solar Plant ESG Verification",
  "description": "MVP project for verifying renewable energy generation",
  "status": "active",
  "sector": "Renewable Energy"
}

PUT – Update a project
Method: PUT
URL: http://localhost:3000/projects/{id}
Headers:
Content-Type: application/json
Body (raw JSON):
{
  "name": "Solar Plant ESG Verification (Updated)",
  "status": "paused"
}

DELETE – Delete a project
Method: DELETE
URL: http://localhost:3000/projects/{id}

Notes
data.json acts as a local datastore and contains sample MVP data.
Postman is used only for testing API endpoints.
The API follows REST principles:
POST for creation
PUT for updates
DELETE for removal

Author: Turaliyev Ali
