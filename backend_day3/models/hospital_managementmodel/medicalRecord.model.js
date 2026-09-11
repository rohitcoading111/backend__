import mongoose from "mongoose";

const medicalSchema = new mongoose.Schema({
      patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true
      },
      
},{timestamps:true});

export const Medical = mongoose.model("Medical", medicalSchema);