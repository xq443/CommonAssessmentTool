const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = process.env.PORT || 3001;
const morgan = require('morgan');

const cors = require("cors");
app.use(cors());
app.use(morgan('dev'));

app.use(express.json()); // parse JSON entity

// read db.json
const dbPath = path.join(__dirname, "db.json");

// API endpoint to search clients by first name
app.get('/api/clients/search', (req, res) => {
  console.log('Received request for search with query:', req.query);
  const name = "John"; // Hardcoded name for testing
  console.log(`Searching for clients with name: ${name}`);

  // Read the clients data from db.json
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading database" });
    }

    const db = JSON.parse(data);
    const clients = db["form-submissions"] || []; // Ensure the clients array exists
    console.log('All clients:', clients); // Log all clients before filtering


    // Filter clients by first name (case insensitive)
    const matchingClients = clients.filter(client => {
      const firstName = client.firstName; // Get the first name
      return firstName && firstName.trim().toLowerCase() === name.trim().toLowerCase(); // Match case insensitively
    });

    console.log("Filtered clients:", matchingClients); // Log the filtered results
    res.json(matchingClients);
  });
});




function generateUniqueId(length = 4) {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

// API: create new user info form
app.post("/api/submit-form", (req, res) => {
  const formData = req.body;

  // Generate a unique ID for the new form submission
  const newSubmission = {
    id: generateUniqueId(), // Generate a 4-character unique ID
    ...formData,
  };

  // Read existing submissions
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading database" });
    }

    const db = JSON.parse(data);
    db["form-submissions"] = db["form-submissions"] || []; // Ensure the array exists
    db["form-submissions"].push(newSubmission); // Add the new submission

    // Write back to db.json
    fs.writeFile(dbPath, JSON.stringify(db, null, 2), (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error saving form submission" });
      }
      res
        .status(201)
        .json({
          message: "Form submitted successfully",
          submission: newSubmission,
        });
    });
  });
});

// API: read user info
app.get("/api/users", (req, res) => {
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading database" });
    }
    const db = JSON.parse(data);
    res.json(db["form-submissions"]);
  });
});

// API: update user info
app.put("/api/update-user/:id", (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;

  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading database" });
    }
    const db = JSON.parse(data);
    const userIndex = db["form-submissions"].findIndex(
      (user) => user.id === userId,
    );

    if (userIndex === -1) {
      return res.status(404).json({ message: "User not found" });
    }

    // update user info
    db["form-submissions"][userIndex] = {
      ...db["form-submissions"][userIndex],
      ...updatedData,
    };

    // write back to db.json
    fs.writeFile(dbPath, JSON.stringify(db, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: "Error updating database" });
      }
      res.json({ message: "User updated successfully", userId, updatedData });
    });
  });
});

// API: delete user info
app.delete("/api/delete-user/:id", (req, res) => {
  const userId = req.params.id;

  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading database" });
    }
    const db = JSON.parse(data);
    const userIndex = db["form-submissions"].findIndex(
      (user) => user.id === userId,
    );

    if (userIndex === -1) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove the user from the submissions
    db["form-submissions"].splice(userIndex, 1);

    // Write back to db.json
    fs.writeFile(dbPath, JSON.stringify(db, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: "Error updating database" });
      }
      res.json({ message: "User deleted successfully", userId });
    });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
