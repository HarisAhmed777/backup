const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const app = express();
const bodyParser = require('body-parser');
const applicationRouter = require("./routes/applicationrouter.js");


app.use(bodyParser.json());
app.use(cors());
mongoose.connect('mongodb://localhost:27017/jobportal').then(()=>{console.log("Cpnnected DB")})
.catch((e)=>{console.log("Error in connecing db",e)})


const jobs = require('./models/jobs')
app.get('/jobs', async (req, res) => {
    try {
        const alljobs = await jobs.find();
        res.send(alljobs);
    } catch(error) {
        console.log("Error in server sending", error);
        res.status(500).send("Internal Server Error");
    }
});
app.get('/displayspecific/:_id', async (req, res) => {
    try {
        const _id = req.params._id; // Access _id from req.params
        const specificjob = await jobs.findOne({_id: _id}); // Use _id in the query
        res.send(specificjob);
    } catch(error) {
        console.log("Error in server sending", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get('/Webdeveloper', async (req, res) => {
    try {
        const software = await jobs.find({title:"Web Developer"});
        res.send(software);
    } catch(error) {
        console.log("Error in server sending", error);
        res.status(500).send("Internal Server Error");
    }
});
app.get('/FullStack', async (req, res) => {
    try {
        const software = await jobs.find({title:"Full Stack Developer"});
        res.send(software);
    } catch(error) {
        console.log("Error in server sending", error);
        res.status(500).send("Internal Server Error");
    }
});
app.get('/Backend', async (req, res) => {
    try {
        const software = await jobs.find({title:"Backend Developer"});
        res.send(software);
    } catch(error) {
        console.log("Error in server sending", error);
        res.status(500).send("Internal Server Error");
    }
});
app.get('/jobs/:inp', async (req, res) => {
    try {
        const inp = req.params;
        const software = await jobs.find({ title: inp });
        res.send(software);
    } catch(error) {
        console.log("Error in server sending", error);
        res.status(500).send("Internal Server Error");
    }
});

const User = require('./models/user');

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({email:email});
        if(user){
            if(user.password ===password){
                res.json({ message: "success", username: user.username });
            }
            else{
                res.json("wrong password")
            }
        }
        else{
            res.json("User name or password in correct")
        }
    }
    catch(e){
        console.log("Error in servore ",e);
    }
});

app.post('/userprofile', async (req, res) => {
    try {
        const {user}= req.body;
        console.log(user);
        const displayuser = await User.findOne({ username: user });
        res.send(displayuser);
    } catch (e) {
        console.log("error sending display user", e);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post('/register', async (req, res) => {
    try {
        // Extract user data from request body
        const { username, email, password, firstName, lastName, dob, gender, phone } = req.body;

        // Create a new instance of the User model
        const newUser = new User({
            username,
            email,
            password,
            firstName,
            lastName,
            dob,
            gender,
            phone
        });

        // Save the new user to the database
        await newUser.save();

        // Respond with success message
        res.status(201).json({ message: 'success' });
    } catch (error) {
        // Handle errors
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'An error occurred while registering user' });
    }
});


app.post('/users/:user/apply/:jobId', async (req, res) => {
    const { user, jobId } = req.params;

    try {
        console.log(user,jobId);
        // Find the user by username
        const foundUser = await User.findOne({ username: user });
        if (!foundUser) {
            return res.status(404).json({ message: 'User not found' });
            console.log("done brooo")
        }

        // Check if the job is already applied
        if (foundUser.appliedJobs.includes(jobId)) {
            return res.status(400).json({ message: 'Job already applied' });
            console.log("done broo")
        }

        // Add the job to the user's list of applied jobs
        foundUser.appliedJobs.push(jobId);
        await foundUser.save();
        console.log("done bro")

        res.status(200).json({ message: 'Job applied successfully' });
    } catch (error) {
        console.error('Error applying for job:', error);
        res.status(500).json({ error: 'An error occurred while applying for job' });
    }
});



app.listen(5000,()=>{
    console.log("Server is connected");
})




