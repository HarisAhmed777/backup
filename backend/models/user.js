const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    dob: Date,
    gender: String,
    phone: String,
    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String
    },
    education: [{
        degree: String,
        major: String,
        university: String,
        graduation_year: Number
    }],
    experience: [{
        title: String,
        company: String,
        startDate: Date,
        endDate: Date,
        description: String
    }],
    appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }]
});


const User = mongoose.model('User', userSchema);

module.exports = User;