// Import necessary modules
const express = require("express");
const router = express.Router();

// Route to handle POST request for creating a new applicant
router.post("/api/v1/application/post", async (req, res) => {
  try {
    // Extract data from the request body
    const { name, email, phone, address, resume, jobId } = req.body;

    // Create a new application document
    const newApplication = new Application({
      name,
      email,
      phone,
      address,
      resume,
      jobId,
    });

    // Save the application to the database
    await newApplication.save();

    // Send a success response
    res.status(201).json({ message: "Application submitted successfully" });
  } catch (error) {
    // If an error occurs, send an error response
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
