import mongoose from "mongoose";

const HospitalSchema = new mongoose.Schema({},{timestamps:true});

export const Hospital = mongoose.model("Hospital", hospitalSchema);
