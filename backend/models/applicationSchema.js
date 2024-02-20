const mongoose =  require('mongoose');
const applicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your Name!"],
  },
  email: {
    type: String,
    required: [true, "Please enter your Email!"],

  },

  phone: {
    type: Number,
    required: [true, "Please enter your Phone Number!"],
  },
  address: {
    type: String,
    required: [true, "Please enter your Address!"],
  },
  resume: {
      type: String, 
      required:true
  },
  applicantID: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    
  },
}
});

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;