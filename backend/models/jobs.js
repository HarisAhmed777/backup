const mongoose =  require('mongoose');

const jobSchema = mongoose.Schema({
    title:String,
    company:String,
    location:String,
    salary:String,
    description:String,
    requirements:String
})

const jobdata = mongoose.model('jobs',jobSchema);
module.exports = jobdata;